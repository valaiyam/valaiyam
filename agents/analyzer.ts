/**
 * analyzer.ts — Agent 2
 *
 * Reads intake data and outputs a structured website specification:
 * - Business category
 * - Pages to generate
 * - Color theme
 * - Features needed (e.g. booking, menu, product list)
 */

import { runClaude } from '@/lib/claude-runner'

export async function runAnalyzerAgent(intakeData: any): Promise<WebsiteSpec> {
  const prompt = `
You are a website planner for small Indian businesses.

Given this business intake data, produce a website specification as JSON.

INTAKE DATA:
${JSON.stringify(intakeData, null, 2)}

Output a JSON object with exactly this structure:
{
  "business_category": "restaurant" | "salon" | "clinic" | "grocery" | "pharmacy" | "hardware" | "tutor" | "other",
  "template": "restaurant" | "salon" | "clinic" | "grocery" | "generic",
  "color_theme": {
    "primary": "<hex color matching business type and vibe>",
    "secondary": "<hex>",
    "accent": "<hex>"
  },
  "pages": ["home", "services", "about", "contact"],
  "features": {
    "whatsapp_button": true,
    "google_maps": true | false,
    "menu": true | false,
    "booking": true | false,
    "product_list": true | false,
    "testimonials": true | false,
    "photo_gallery": true | false,
    "opening_hours": true | false
  },
  "tagline": "<a short punchy tagline for the business>",
  "language": "english" | "tamil" | "hindi"
}

Rules:
- Choose colors that suit the business type (e.g. green for grocery, warm red for restaurant, calm blue for clinic)
- Only include features that make sense for this business type
- Output ONLY the JSON — no explanation
`

  const result = runClaude({ prompt })

  if (!result.json) {
    throw new Error(`Analyzer returned invalid JSON: ${result.raw}`)
  }

  return result.json as WebsiteSpec
}

export interface WebsiteSpec {
  business_category: string
  template: string
  color_theme: { primary: string; secondary: string; accent: string }
  pages: string[]
  features: Record<string, boolean>
  tagline: string
  language: string
}
