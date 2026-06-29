import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { runAnalyzerAgent } from '@/agents/analyzer'
import { buildPrompt } from '@/agents/prompt-builder'
import { runGeneratorAgent } from '@/agents/generator'
import { runSecurityAgent } from '@/agents/security'
import { runQAAgent } from '@/agents/qa'
import { runDeploymentAgent } from '@/agents/deployment'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

// You trigger this manually from the email link for now.
// Later: replace with a cron job that picks up 'intake' status projects automatically.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')
  const secret = searchParams.get('secret')

  if (secret !== process.env.PIPELINE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!projectId) {
    return NextResponse.json({ error: 'projectId required' }, { status: 400 })
  }

  // Fetch project
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  // Run pipeline (non-blocking — return immediately, process in background)
  runPipeline(project).catch(console.error)

  return NextResponse.json({ message: 'Pipeline started', projectId })
}

async function setStatus(projectId: string, status: string, extra: object = {}) {
  await supabase.from('projects').update({ status, current_agent: status, ...extra }).eq('id', projectId)
}

async function logError(projectId: string, agent: string, error: string) {
  const { data } = await supabase.from('projects').select('error_log').eq('id', projectId).single()
  const log = data?.error_log || []
  await supabase.from('projects').update({
    error_log: [...log, { agent, error, timestamp: new Date().toISOString() }]
  }).eq('id', projectId)
}

async function runPipeline(project: any) {
  const { id: projectId, intake_data } = project
  const MAX_RETRIES = 3

  try {
    // --- Agent 2: Analyze ---
    await setStatus(projectId, 'analyzing')
    const websiteSpec = await runAnalyzerAgent(intake_data)
    await supabase.from('projects').update({ website_spec: websiteSpec }).eq('id', projectId)

    // --- Agent 3: Build prompt ---
    const prompt = buildPrompt(intake_data, websiteSpec)
    await supabase.from('projects').update({ generation_prompt: prompt }).eq('id', projectId)

    // --- Agent 4: Generate (with retry) ---
    await setStatus(projectId, 'generating')
    let generatedFiles = null
    let retries = 0

    while (retries < MAX_RETRIES) {
      try {
        generatedFiles = await runGeneratorAgent(projectId, prompt, websiteSpec)
        break
      } catch (err: any) {
        retries++
        await logError(projectId, 'generator', err.message)
        if (retries >= MAX_RETRIES) throw new Error('Generator failed after max retries')
      }
    }

    await supabase.from('projects').update({ generated_files: generatedFiles, retry_count: retries }).eq('id', projectId)

    // --- Security Agent ---
    await setStatus(projectId, 'security_check')
    const securityResult = await runSecurityAgent(generatedFiles)
    await supabase.from('projects').update({ security_result: securityResult }).eq('id', projectId)

    if (!securityResult.passed) {
      await setStatus(projectId, 'failed')
      await logError(projectId, 'security', JSON.stringify(securityResult.issues))
      // TODO: notify operator for manual review
      return
    }

    // --- Agent 5: QA ---
    await setStatus(projectId, 'qa')
    const qaResult = await runQAAgent(generatedFiles, intake_data)
    await supabase.from('projects').update({ qa_result: qaResult }).eq('id', projectId)

    if (!qaResult.passed) {
      await setStatus(projectId, 'failed')
      await logError(projectId, 'qa', JSON.stringify(qaResult.issues))
      return
    }

    // --- Agent 6: Deploy to preview ---
    await setStatus(projectId, 'deploying')
    const { previewUrl, vercelProjectId, githubRepo } = await runDeploymentAgent(projectId, generatedFiles, intake_data)
    await supabase.from('projects').update({
      preview_url: previewUrl,
      vercel_project_id: vercelProjectId,
      github_repo: githubRepo,
      status: 'awaiting_review'
    }).eq('id', projectId)

    // --- Notify customer ---
    await notifyCustomerPreview(project, previewUrl)

  } catch (err: any) {
    console.error('Pipeline error:', err)
    await setStatus(projectId, 'failed')
    await logError(projectId, 'pipeline', err.message)
  }
}

async function notifyCustomerPreview(project: any, previewUrl: string) {
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY!)

  await resend.emails.send({
    from: 'Valaiyam <hello@valaiyam.in>',
    to: project.customer_email,
    subject: `Your website preview is ready — ${project.intake_data.business_name}`,
    text: `
Hi ${project.customer_name},

Your website preview is ready!

👉 ${previewUrl}

Please review it and reply to this email with:
- Any changes you'd like
- Or "Approved" if you're happy with it

Once approved, we'll send you the payment link (₹4,999) and make your site live.

— Valaiyam Team
    `.trim()
  })
}
