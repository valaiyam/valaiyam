/**
 * generator.ts — Agent 4
 *
 * Calls Claude Code CLI with the assembled prompt.
 * Claude returns a JSON payload of { files: [{ path, content }] }
 * We write those files to a temp directory for QA and deployment.
 */

import { runClaude } from '@/lib/claude-runner'
import { WebsiteSpec } from './analyzer'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { execSync } from 'child_process'

export interface GeneratedFile {
  path: string
  content: string
}

export async function runGeneratorAgent(
  projectId: string,
  prompt: string,
  spec: WebsiteSpec
): Promise<GeneratedFile[]> {

  // Claude Code has a context limit — for large prompts, give it more time
  const result = runClaude({ prompt, timeoutMs: 10 * 60 * 1000 })

  if (!result.json || !Array.isArray(result.json.files)) {
    throw new Error(`Generator returned invalid output: ${result.raw.slice(0, 500)}`)
  }

  const files: GeneratedFile[] = result.json.files

  // Validate minimum required files
  const requiredPaths = ['app/page.tsx', 'app/layout.tsx']
  for (const req of requiredPaths) {
    if (!files.find(f => f.path === req)) {
      throw new Error(`Missing required file: ${req}`)
    }
  }

  // Write files to a temp directory so security + QA agents can inspect them
  const projectDir = path.join(os.tmpdir(), 'valaiyam', projectId)
  fs.mkdirSync(projectDir, { recursive: true })

  for (const file of files) {
    const filePath = path.join(projectDir, file.path)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, file.content, 'utf-8')
  }

  // Write package.json if not generated
  const pkgPath = path.join(projectDir, 'package.json')
  if (!fs.existsSync(pkgPath)) {
    fs.writeFileSync(pkgPath, JSON.stringify({
      name: projectId,
      version: '0.1.0',
      private: true,
      scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
      dependencies: {
        next: '14.2.0',
        react: '^18',
        'react-dom': '^18',
      },
      devDependencies: {
        typescript: '^5',
        '@types/react': '^18',
        tailwindcss: '^3',
        autoprefixer: '^10',
        postcss: '^8',
      }
    }, null, 2))
  }

  // Try building to catch compilation errors early
  try {
    execSync('npm install --prefer-offline && npm run build', {
      cwd: projectDir,
      timeout: 5 * 60 * 1000,
      stdio: 'pipe'
    })
  } catch (buildErr: any) {
    throw new Error(`Build failed: ${buildErr.stderr?.toString()?.slice(0, 1000)}`)
  }

  return files
}

// Helper: get the temp directory for a project
export function getProjectDir(projectId: string): string {
  return path.join(os.tmpdir(), 'valaiyam', projectId)
}
