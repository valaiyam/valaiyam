# Valaiyam - Premium Business Website

Modern, AI-assisted business website built with Next.js, React, and Tailwind CSS.

## Features

- ✅ Modern dark premium aesthetic
- ✅ Mobile-first responsive design
- ✅ Fast loading performance
- ✅ SEO optimized
- ✅ Contact form integration
- ✅ WhatsApp chat button
- ✅ Google Maps integration
- ✅ FAQ accordion
- ✅ Portfolio showcase
- ✅ Pricing tables

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Configuration

### Update Contact Information

1. **WhatsApp Number:** Update in `components/WhatsAppButton.tsx` and `app/contact/page.tsx`
2. **Email:** Already set to `hello@valaiyam.com`
3. **Phone:** Add your phone number in the footer and contact page

### Update Content

- **Home Page:** `app/page.tsx`
- **Services:** `app/services/page.tsx`
- **Portfolio:** `app/portfolio/page.tsx`
- **Pricing:** `app/pricing/page.tsx`
- **FAQ:** `app/faq/page.tsx`
- **Contact:** `app/contact/page.tsx`
- **About:** `app/about/page.tsx`

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Connect Custom Domain

1. Go to your Vercel project dashboard
2. Navigate to Settings → Domains
3. Add `valaiyam.com`
4. Update DNS records at your domain registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

## Environment Variables

If you add form submission or analytics:

```env
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── about/
│   ├── services/
│   ├── portfolio/
│   ├── pricing/
│   ├── faq/
│   └── contact/
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── Footer.tsx          # Footer component
│   └── WhatsAppButton.tsx  # Floating WhatsApp button
├── public/                 # Static assets
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Performance Optimization

- Images: Use Next.js Image component for optimization
- Fonts: Using next/font for optimized font loading
- CSS: Tailwind CSS with purging for minimal bundle size
- Deployment: Vercel Edge Network for fast global delivery

## Support

For questions or issues:
- Email: hello@valaiyam.com
- WhatsApp: [Add your number]

## License

© 2024 Valaiyam. All rights reserved.
