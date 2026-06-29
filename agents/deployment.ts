/**
 * deployment.ts — Agent 6
 *
 * 1. Creates a GitHub repo for the project
 * 2. Pushes generated files
 * 3. Creates a Vercel project linked to the repo
 * 4. Returns the preview URL
 *
 * No AI needed here — pure API calls.
 */

import { GeneratedFile, getProjectDir } from './generator'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!
const GITHUB_ORG = process.env.GITHUB_ORG!        // your GitHub username or org
const VERCEL_TOKEN = process.env.VERCEL_TOKEN!
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID  // optional, for team accounts

interface DeploymentResult {
  githubRepo: string
  previewUrl: string
  vercelProjectId: string
}

export async function runDeploymentAgent(
  projectId: string,
  files: GeneratedFile[],
  intakeData: any
): Promise<DeploymentResult> {
  const repoName = `valaiyam-${slugify(intakeData.business_name)}-${projectId.slice(0, 6)}`
  const projectDir = getProjectDir(projectId)

  // 1. Create GitHub repo
  const repoResponse = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoName,
      private: true,
      auto_init: false,
      description: `Valaiyam website for ${intakeData.business_name}`,
    }),
  })

  if (!repoResponse.ok) {
    throw new Error(`GitHub repo creation failed: ${await repoResponse.text()}`)
  }

  const repo = await repoResponse.json()

  // 2. Push files via git
  execSync(`
    cd ${projectDir} &&
    git init &&
    git config user.email "deploy@valaiyam.in" &&
    git config user.name "Valaiyam Deploy" &&
    git add . &&
    git commit -m "Initial website for ${intakeData.business_name}" &&
    git branch -M main &&
    git remote add origin https://${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/${repoName}.git &&
    git push -u origin main
  `, { stdio: 'pipe' })

  // 3. Create Vercel project linked to GitHub repo
  const vercelResponse = await fetch('https://api.vercel.com/v10/projects', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoName,
      framework: 'nextjs',
      gitRepository: {
        type: 'github',
        repo: `${GITHUB_ORG}/${repoName}`,
      },
      ...(VERCEL_TEAM_ID ? { teamId: VERCEL_TEAM_ID } : {}),
    }),
  })

  if (!vercelResponse.ok) {
    throw new Error(`Vercel project creation failed: ${await vercelResponse.text()}`)
  }

  const vercelProject = await vercelResponse.json()

  // 4. Trigger a deployment
  const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoName,
      gitSource: {
        type: 'github',
        repo: `${GITHUB_ORG}/${repoName}`,
        ref: 'main',
      },
      projectId: vercelProject.id,
      ...(VERCEL_TEAM_ID ? { teamId: VERCEL_TEAM_ID } : {}),
    }),
  })

  if (!deployResponse.ok) {
    throw new Error(`Vercel deploy failed: ${await deployResponse.text()}`)
  }

  const deployment = await deployResponse.json()

  // Vercel takes a minute to build — poll until ready
  const previewUrl = await waitForDeployment(deployment.id)

  return {
    githubRepo: repo.html_url,
    previewUrl,
    vercelProjectId: vercelProject.id,
  }
}

async function waitForDeployment(deploymentId: string, maxWaitMs = 5 * 60 * 1000): Promise<string> {
  const start = Date.now()

  while (Date.now() - start < maxWaitMs) {
    await sleep(10_000) // poll every 10 seconds

    const res = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}`, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    })
    const data = await res.json()

    if (data.readyState === 'READY') {
      return `https://${data.url}`
    }

    if (data.readyState === 'ERROR') {
      throw new Error(`Vercel deployment failed: ${data.errorMessage}`)
    }
  }

  throw new Error('Vercel deployment timed out')
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
