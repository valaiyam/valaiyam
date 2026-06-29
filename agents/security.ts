/**
 * security.ts — Security Agent
 *
 * Scans generated files for common issues before QA or deployment.
 * Uses Claude to review the code + runs simple pattern checks.
 */

import { runClaude } from '@/lib/claude-runner'
import { GeneratedFile } from './generator'

interface SecurityResult {
  passed: boolean
  issues: string[]
}

// Patterns that should never appear in generated code
const DANGEROUS_PATTERNS = [
  { pattern: /process\.env\.[A-Z_]+/g, label: 'Exposed env variable' },
  { pattern: /eval\s*\(/g, label: 'eval() usage' },
  { pattern: /dangerouslySetInnerHTML/g, label: 'dangerouslySetInnerHTML without review' },
  { pattern: /document\.write\s*\(/g, label: 'document.write()' },
  { pattern: /<script\s+src=["'](?!https:\/\/)(.*?)["']/g, label: 'Non-HTTPS external script' },
  { pattern: /localStorage\.setItem/g, label: 'localStorage usage' },
  { pattern: /api[_-]?key\s*[:=]\s*["'][^"']+["']/gi, label: 'Hardcoded API key' },
  { pattern: /password\s*[:=]\s*["'][^"']+["']/gi, label: 'Hardcoded password' },
]

export async function runSecurityAgent(files: GeneratedFile[]): Promise<SecurityResult> {
  const issues: string[] = []

  // 1. Pattern scan — fast, deterministic
  for (const file of files) {
    for (const { pattern, label } of DANGEROUS_PATTERNS) {
      if (pattern.test(file.content)) {
        issues.push(`${label} found in ${file.path}`)
      }
      pattern.lastIndex = 0 // reset regex state
    }
  }

  // 2. Claude review — catches semantic issues pattern scan misses
  const filesSummary = files
    .map(f => `--- ${f.path} ---\n${f.content.slice(0, 800)}`) // first 800 chars of each
    .join('\n\n')

  const prompt = `
You are a security reviewer for generated Next.js websites.

Review these generated files and identify any security concerns.
Focus on: hardcoded secrets, XSS vulnerabilities, unsafe external scripts,
exposed sensitive data, or anything that looks like malicious code.

FILES:
${filesSummary}

Output JSON:
{
  "issues": ["issue 1", "issue 2"],
  "passed": true | false
}

If no issues, return { "issues": [], "passed": true }
Output ONLY the JSON.
`

  const result = runClaude({ prompt, timeoutMs: 2 * 60 * 1000 })

  if (result.json) {
    if (!result.json.passed) {
      issues.push(...(result.json.issues || []))
    }
  }

  return {
    passed: issues.length === 0,
    issues
  }
}
