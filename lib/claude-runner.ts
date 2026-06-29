/**
 * claude-runner.ts
 *
 * Runs Claude Code CLI as a subprocess.
 * Uses your existing Claude Code subscription — no API key needed.
 *
 * All agents use this utility. Claude outputs structured JSON,
 * which we parse and store in Supabase.
 */

import { execSync } from 'child_process'

interface ClaudeRunOptions {
  prompt: string
  timeoutMs?: number   // default: 5 minutes
}

interface ClaudeRunResult {
  raw: string
  json?: any           // parsed if output is valid JSON
}

export function runClaude({ prompt, timeoutMs = 5 * 60 * 1000 }: ClaudeRunOptions): ClaudeRunResult {
  // Escape the prompt for shell safety
  const escaped = prompt.replace(/'/g, `'"'"'`)

  let raw: string

  try {
    raw = execSync(`claude --print '${escaped}'`, {
      timeout: timeoutMs,
      encoding: 'utf-8',
      // Use the current user's Claude credentials (~/.claude)
      env: { ...process.env, HOME: process.env.HOME },
    })
  } catch (err: any) {
    throw new Error(`Claude CLI failed: ${err.message}`)
  }

  // Try to extract JSON from response
  // Claude often wraps JSON in markdown code blocks — strip them
  const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]+?)```/) || [null, raw]
  const jsonString = jsonMatch[1]?.trim() || raw.trim()

  let json: any
  try {
    json = JSON.parse(jsonString)
  } catch {
    // Not JSON — that's fine for some agents
    json = undefined
  }

  return { raw, json }
}
