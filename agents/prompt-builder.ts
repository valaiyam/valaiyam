/**
 * prompt-builder.ts — Agent 3
 *
 * Deterministic (no AI). Assembles the final prompt for the website generator.
 * This is the single most important file for output quality and structure.
 */

import { WebsiteSpec } from './analyzer'

// Pages required per business type
const PAGES_BY_TYPE: Record<string, { path: string; title: string; content: string }[]> = {
  restaurant: [
    { path: 'app/page.tsx', title: 'Home', content: 'Hero, quick highlights (best dishes, hours, location), WhatsApp order CTA, 3 testimonials, visit us section' },
    { path: 'app/menu/page.tsx', title: 'Menu', content: 'Full menu with ALL items grouped by category (Breakfast/Tiffin, Meals, Snacks, Beverages, Specials). Every item has name, description, price. Weekend specials highlighted.' },
    { path: 'app/about/page.tsx', title: 'About', content: 'Founding story, year established, philosophy (no MSG, fresh daily etc), what makes them unique, 3 achievement stats' },
    { path: 'app/contact/page.tsx', title: 'Contact', content: 'Full address, map placeholder, all contact methods, opening hours table, WhatsApp order link, directions note' },
  ],
  clinic: [
    { path: 'app/page.tsx', title: 'Home', content: 'Hero with doctor credentials, 4 key services preview, trust stats, testimonials, book appointment CTA' },
    { path: 'app/services/page.tsx', title: 'Services', content: 'All services with descriptions, what to expect at each consultation, common conditions treated' },
    { path: 'app/doctors/page.tsx', title: 'Doctor', content: 'Doctor profile card, qualifications, years experience, specializations, approach to patient care, memberships' },
    { path: 'app/timings/page.tsx', title: 'Timings & Fees', content: 'Full consultation schedule table, consultation fee, what to bring, insurance info, emergency contact' },
    { path: 'app/contact/page.tsx', title: 'Contact', content: 'Clinic address, map placeholder, parking info, all contact methods, hours, emergency line' },
  ],
  salon: [
    { path: 'app/page.tsx', title: 'Home', content: 'Hero with salon vibe, featured services preview with prices, owner intro, 3 testimonials (include one bridal), book now CTA' },
    { path: 'app/services/page.tsx', title: 'Services & Prices', content: 'ALL services organised by category (Hair, Skin, Nails, Bridal, Others) with exact prices, duration, description. Mark popular ones.' },
    { path: 'app/bridal/page.tsx', title: 'Bridal', content: 'Bridal package details, what is included, trial session info, how to book, real bridal testimonials, photo gallery placeholders' },
    { path: 'app/about/page.tsx', title: 'About', content: 'Owner story, years of experience, training background, philosophy, certifications, why clients trust them' },
    { path: 'app/contact/page.tsx', title: 'Contact & Booking', content: 'Address, hours (note closed day), WhatsApp booking link, Instagram link, map placeholder, how to book note' },
  ],
  gym: [
    { path: 'app/page.tsx', title: 'Home', content: 'Bold dark hero, program highlights (4-6), real transformation stories, free trial CTA, member testimonials' },
    { path: 'app/programs/page.tsx', title: 'Programs', content: 'All programs with full descriptions, schedule (days/times), who it is for, what equipment/space, trainer name' },
    { path: 'app/membership/page.tsx', title: 'Membership', content: 'All plans with prices, what is included, per-month breakdown, FAQ section, join on WhatsApp CTA' },
    { path: 'app/trainers/page.tsx', title: 'Trainers', content: 'All trainer profiles — name, specialization, years exp, certifications, philosophy, programs they lead' },
    { path: 'app/contact/page.tsx', title: 'Contact', content: 'Gym address, hours (early morning to late night), parking, WhatsApp, map placeholder, free trial link' },
  ],
  school: [
    { path: 'app/page.tsx', title: 'Home', content: 'Prestigious hero, key stats (years/alumni/results), why choose us (6 points), achievements banner, admissions CTA' },
    { path: 'app/about/page.tsx', title: 'About', content: 'School history, founding vision, affiliation board, infrastructure (labs, library, sports, bus), faculty overview' },
    { path: 'app/academics/page.tsx', title: 'Academics', content: 'Classes offered (LKG–12), stream details (Science/Commerce/Arts), curriculum approach, exam results history, achievements' },
    { path: 'app/admissions/page.tsx', title: 'Admissions', content: 'Admissions process step by step, documents required, fee structure per grade, important dates, enquiry CTA' },
    { path: 'app/contact/page.tsx', title: 'Contact', content: 'School address, office hours, admin contact, transport enquiry, map placeholder, WhatsApp for admissions' },
  ],
  bakery: [
    { path: 'app/page.tsx', title: 'Home', content: 'Warm hero, featured bestsellers (4 items with prices), founder intro snippet, Instagram gallery placeholder, order CTA' },
    { path: 'app/menu/page.tsx', title: 'Menu & Prices', content: 'All products by category (Cakes, Bread/Pastries, Cookies/Bars, Beverages if any) with prices. Mark eggless options clearly.' },
    { path: 'app/custom/page.tsx', title: 'Custom Orders', content: '4-step custom cake process, flavours/sizes/tiers available, pricing guide, 48hr advance notice, gallery placeholders, order on WhatsApp' },
    { path: 'app/about/page.tsx', title: 'About', content: 'Baker story, how it started, baking philosophy (fresh daily, no preservatives), awards/features, signature items' },
    { path: 'app/contact/page.tsx', title: 'Contact & Order', content: 'Address, hours (note closed day), WhatsApp order link, Instagram, map, delivery info, custom order lead time' },
  ],
  pharmacy: [
    { path: 'app/page.tsx', title: 'Home', content: 'Trust-heavy hero with license info, 4 key services, home delivery CTA, generic medicines highlight, testimonials' },
    { path: 'app/services/page.tsx', title: 'Services', content: 'All services with descriptions — prescription, generics, OTC, baby care, diabetic care, surgical, health monitors' },
    { path: 'app/generics/page.tsx', title: 'Generic Medicines', content: 'What generics are, why they are as good as branded, how much patients save (60-80%), how to ask for them, DCGI certification note' },
    { path: 'app/delivery/page.tsx', title: 'Home Delivery', content: 'How delivery works (step by step), delivery zone, min order, charges, timing, WhatsApp prescription photo process' },
    { path: 'app/contact/page.tsx', title: 'Contact', content: 'Pharmacy address (opposite hospital), all hours, 24hr emergency line, WhatsApp, map placeholder, drug license visible' },
  ],
  hardware: [
    { path: 'app/page.tsx', title: 'Home', content: 'Industrial bold hero, product category grid (8 categories), why choose us, brand logos strip, contractor CTA' },
    { path: 'app/products/page.tsx', title: 'Products', content: 'All categories with subcategories and specific products listed. Brands stocked per category. Bulk pricing note.' },
    { path: 'app/services/page.tsx', title: 'Services', content: 'Free delivery terms, contractor credit account info, bulk discount tiers, free technical advice, project consultation' },
    { path: 'app/about/page.tsx', title: 'About', content: 'Founding year, family business story, how they grew, relationship with contractors, what makes them trusted' },
    { path: 'app/contact/page.tsx', title: 'Contact', content: 'Shop address, hours, WhatsApp for quotes, map placeholder, wholesale enquiry note, parking/access info' },
  ],
  generic: [
    { path: 'app/page.tsx', title: 'Home', content: 'Hero with business highlights, services preview, trust stats, testimonials, CTA' },
    { path: 'app/services/page.tsx', title: 'Services', content: 'All services with descriptions and pricing' },
    { path: 'app/about/page.tsx', title: 'About', content: 'Business story, founder, experience, values' },
    { path: 'app/contact/page.tsx', title: 'Contact', content: 'Address, hours, all contact methods, map placeholder' },
  ],
}

export function buildPrompt(intakeData: any, spec: WebsiteSpec): string {
  const template = spec.template as keyof typeof PAGES_BY_TYPE
  const pages = PAGES_BY_TYPE[template] || PAGES_BY_TYPE['generic']

  const pageList = pages
    .map(p => `  - ${p.path} (${p.title}): ${p.content}`)
    .join('\n')

  const featureList = Object.entries(spec.features)
    .filter(([, enabled]) => enabled)
    .map(([f]) => `  - ${f.replace(/_/g, ' ')}`)
    .join('\n')

  return `
You are a senior UI/UX designer and Next.js developer building a professional MULTI-PAGE website
for a real Indian small business. This is NOT a demo — this is a real business that real
customers will visit, judge, and either trust or leave.

BUSINESS DETAILS:
- Name: ${intakeData.business_name}
- Type: ${intakeData.business_type}
- Description: ${intakeData.business_description}
- Services/Products: ${Array.isArray(intakeData.services) ? intakeData.services.join(', ') : intakeData.services}
- What makes them special: ${intakeData.usp || 'Quality and reliability'}
- Address: ${intakeData.address}, ${intakeData.city}
- Opening Hours: ${intakeData.opening_hours || 'Please contact us'}
- Display Phone: ${intakeData.phone_display || ''}
- WhatsApp: ${intakeData.whatsapp_number || ''}
- Instagram: ${intakeData.instagram_url || 'None'}
- Google Maps: ${intakeData.google_maps_url || 'None'}

DESIGN SPECIFICATION:
- Template: ${spec.template}
- Tagline: ${spec.tagline}
- Primary color: ${spec.color_theme.primary}
- Secondary color: ${spec.color_theme.secondary}
- Accent color: ${spec.color_theme.accent}
- Features:
${featureList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MULTI-PAGE ARCHITECTURE — CRITICAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate SEPARATE Next.js pages for each route. Each page must be a full, rich
standalone experience — NOT a stub, NOT a single scroll with JS tab switching.

PAGES TO GENERATE:
${pageList}

SHARED LAYOUT (app/layout.tsx) MUST INCLUDE:
1. Sticky header with Next.js <Link> navigation to ALL pages above
2. Active page highlighting in nav (use pathname from usePathname hook)
3. WhatsApp floating button — fixed bottom-right, visible on EVERY page
4. Footer with 3-4 columns: brand blurb, page links, hours, contact details
5. Google Fonts loading via <link> tags
6. SEO metadata (title template, default description)

Every page gets its OWN export const metadata with:
- title: "[Page Name] — [Business Name]"
- description: specific to that page's content

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN QUALITY STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ NEVER DO:
- Single-page with JS useState to show/hide sections as "pages"
- Flat single-color hero with just text and a button
- Identical generic cards with no real content
- Lorem ipsum or placeholder text
- Minimal footer with just copyright
- Testimonials with no names or specifics

✅ ALWAYS DO:
- Proper Next.js routes — separate page.tsx per route
- Serif + sans-serif font pairing (Playfair Display/Lora + Inter)
- Hero: atmospheric gradient, floating visual cards, trust signals, 2 CTAs
- Primary color used in: section backgrounds, gradient overlays, card borders, stat numbers
- Stats ribbon after every hero (4 key metrics)
- Cards with hover lift (translateY + box-shadow), color top-border accent
- Section alternation: light → colored → dark → light as you scroll
- Testimonials: ⭐⭐⭐⭐⭐, customer name, how long they've been a customer, specific detail
- Footer: 3-4 columns with substance
- WhatsApp FAB: green, pill-shaped on desktop, pulse animation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Next.js 14, App Router
2. Tailwind CSS only (no external CSS libraries)
3. Google Fonts via <link> in layout.tsx <head>
4. 'use client' only on components that need hooks (usePathname for active nav)
5. No <img> tags — emoji, gradients, CSS patterns only
6. No placeholder text anywhere — all content real and specific to this business
7. TypeScript throughout
8. Mobile-first, fully responsive (sm:, md:, lg: breakpoints used throughout)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Output a single JSON object — no markdown fences, no explanation:
{
  "files": [
    { "path": "app/layout.tsx", "content": "..." },
    { "path": "app/globals.css", "content": "..." },
    { "path": "app/page.tsx", "content": "..." },
    ${pages.filter(p => p.path !== 'app/page.tsx').map(p => `{ "path": "${p.path}", "content": "..." }`).join(',\n    ')},
    { "path": "tailwind.config.ts", "content": "..." }
  ]
}
`.trim()
}
