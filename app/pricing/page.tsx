import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Pricing - Valaiyam',
  description: 'Transparent pricing for premium business websites. Choose the plan that fits your needs.',
}

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '₹4,999',
      desc: 'Perfect for solo consultants & small local businesses',
      perfectFor: 'Just starting online, need basic presence',
      features: [
        '3 Pages Included',
        'Mobile Responsive Design',
        'Contact Form',
        'Basic SEO Setup',
        '7-Day Delivery Guarantee',
        '30-Day Support',
      ],
      notIncluded: [
        'No custom design',
        'Basic support only',
        'No advanced features',
      ],
      popular: true
    },
    {
      name: 'Standard',
      price: '₹9,999',
      desc: 'Ideal for growing businesses & startups',
      perfectFor: 'Need professional design & more features',
      features: [
        '5 Pages Included',
        'Custom Design',
        'WhatsApp Integration',
        'Google Analytics Setup',
        '2 Revision Rounds',
        '7-Day Delivery',
        '30-Day Support',
      ],
      notIncluded: [
        'No advanced animations',
        'Standard support',
        'No blog/CMS',
      ]
    },
    {
      name: 'Premium',
      price: '₹14,999',
      desc: 'Complete solution for established businesses',
      perfectFor: 'Need advanced features & priority support',
      features: [
        '8 Pages Included',
        'Advanced Features',
        'Priority Support',
        'Blog/CMS Integration',
        'Custom Animations',
        '7-Day Delivery',
        '90-Day Maintenance',
      ],
      notIncluded: [
        'No enterprise features',
        'Limited custom development',
      ]
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted text-center max-w-3xl mx-auto mb-16">
              No hidden fees. No surprises. Choose the plan that fits your business needs.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan, i) => (
                <div key={i} className={`glass glass-hover ${plan.popular ? 'border-accent' : ''} p-8 rounded-lg transition-all hover:scale-105 relative`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 rounded-full text-sm text-white">
                      Introductory Rate
                    </div>
                  )}
                  <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                  <p className="text-4xl font-bold mb-2">{plan.price}</p>
                  <p className="text-sm text-muted mb-4">{plan.perfectFor}</p>
                  <ul className="space-y-3 mb-4">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {plan.notIncluded.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1">✗</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link href="/contact" className={`block text-center px-6 py-3 rounded-lg transition-all ${plan.popular ? 'bg-accent hover:bg-blue-600 text-white' : 'border border-accent hover:bg-accent text-white'}`}>
                    Get Started
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-secondary p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">All Plans Include:</h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-muted">
                <div>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Mobile-First Design</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Fast Loading Speed</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> SSL Certificate</p>
                </div>
                <div>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Vercel Hosting Setup</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Domain Configuration</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Email Support</p>
                </div>
                <div>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Source Code Access</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Documentation</p>
                  <p className="flex items-center gap-2"><span className="text-accent">✓</span> Training Session</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-muted mb-8">Contact us for enterprise projects and custom requirements.</p>
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition inline-block">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
