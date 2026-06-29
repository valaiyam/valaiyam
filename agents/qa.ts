/**
 * qa.ts — Agent 5
 *
 * Checks the generated files for quality before deployment.
 * No browser required — checks happen at the file/content level.
 * (Add Playwright checks later when you want visual QA.)
 */

import { GeneratedFile } from './generator'

interface QAResult {
  passed: boolean
  issues: string[]
  checklist: Record<string, boolean>
}

export async function runQAAgent(
  files: GeneratedFile[],
  intakeData: any
): Promise<QAResult> {
  const issues: string[] = []
  const checklist: Record<string, boolean> = {}

  const allContent = files.map(f => f.content).join('\n')
  const homepage = files.find(f => f.path === 'app/page.tsx')?.content || ''
  const layout = files.find(f => f.path === 'app/layout.tsx')?.content || ''

  // 1. Business name present
  checklist.business_name = allContent.includes(intakeData.business_name)
  if (!checklist.business_name) issues.push(`Business name "${intakeData.business_name}" not found in generated site`)

  // 2. Phone number present (if provided)
  if (intakeData.phone_display) {
    checklist.phone_number = allContent.includes(intakeData.phone_display)
    if (!checklist.phone_number) issues.push('Phone number not found in generated site')
  }

  // 3. WhatsApp button
  if (intakeData.whatsapp_number) {
    checklist.whatsapp_button = allContent.includes('wa.me') || allContent.includes('whatsapp')
    if (!checklist.whatsapp_button) issues.push('WhatsApp button missing')
  }

  // 4. Address present
  checklist.address = allContent.includes(intakeData.city)
  if (!checklist.address) issues.push('City / address not found in generated site')

  // 5. Meta tags in layout
  checklist.meta_title = layout.includes('<title>') || layout.includes('metadata')
  if (!checklist.meta_title) issues.push('Missing page title / metadata')

  // 6. Tailwind present
  checklist.tailwind = allContent.includes('className=') || allContent.includes('class=')
  if (!checklist.tailwind) issues.push('No Tailwind classes found — layout may be unstyled')

  // 7. No Lorem Ipsum
  checklist.no_placeholder = !allContent.toLowerCase().includes('lorem ipsum')
  if (!checklist.no_placeholder) issues.push('Placeholder text (Lorem Ipsum) found')

  // 8. Responsive classes present
  checklist.responsive = allContent.includes('md:') || allContent.includes('sm:') || allContent.includes('lg:')
  if (!checklist.responsive) issues.push('No responsive Tailwind breakpoints found')

  // 9. Footer present
  checklist.footer = allContent.includes('<footer') || allContent.includes('Footer')
  if (!checklist.footer) issues.push('No footer found')

  // 10. Nav present
  checklist.nav = allContent.includes('<nav') || allContent.includes('Nav')
  if (!checklist.nav) issues.push('No navigation found')

  return {
    passed: issues.length === 0,
    issues,
    checklist
  }
}
