'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const whatsappLink = "/contact"

const growthBenefits = [
  'Found on Google',
  'Accept WhatsApp Orders',
  'Build Trust',
  'Professional Look',
  'Open 24/7',
  'Works on Mobile',
]

const businessTypes = ['🛒 Grocery', '🍽️ Restaurant', '🏥 Clinic', '✂️ Salon', '🏋️ Gym', '🎒 School', '🧁 Bakery', '🔧 Hardware', '💊 Pharmacy']

export default function Home() {
  useScrollAnimation()

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-40 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-brand-green/5 to-brand-purple/10 pointer-events-none" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl opacity-50" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center relative z-10">
            <div className="text-center lg:text-left">
              <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-in-up">
                <span className="text-brand-orange">●</span>
                <span className="text-sm font-semibold">Preview first. Pay after approval.</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.05s'}}>
                Your Next Customer Is Searching.<br /><span className="text-gradient">Make Sure They Find You.</span>
              </h1>
              <div className="text-xl text-muted max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in-up space-y-2" style={{animationDelay: '0.1s'}}>
                <p>Professional business website.</p>
                <p>Delivered overnight.</p>
                <p>Preview before you pay.</p>
                <p>No technical knowledge required.</p>
              </div>
              <div className="flex gap-4 justify-center lg:justify-start flex-wrap animate-fade-in-up mb-8" style={{animationDelay: '0.2s'}}>
                <Link href={whatsappLink} className="bg-accent px-8 py-4 rounded-lg hover:bg-brand-navy transition-all text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 text-white">
                  Build My Website
                </Link>
                <Link href="/portfolio" className="glass glass-hover px-8 py-4 rounded-lg transition-all text-lg font-semibold hover:scale-105">
                  See Demo Website
                </Link>
              </div>
              <p className="text-sm text-muted animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                Helping local businesses get found, earn trust, and receive more enquiries—starting with an overnight website.
              </p>
            </div>

            <div className="glass p-6 md:p-8 rounded-3xl animate-fade-in-up" style={{animationDelay: '0.15s'}}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted">Animated customer flow</p>
                  <h2 className="text-2xl font-bold">From search to WhatsApp enquiry</h2>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center animate-pulse-soft">💬</div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: '🏪', title: 'Business', text: 'Kumar uploads logo, photos, prices' },
                  { icon: '💬', title: 'WhatsApp', text: 'Valai asks simple questions' },
                  { icon: '🌐', title: 'Website', text: 'Professional preview appears overnight' },
                  { icon: '🧍‍♀️', title: 'Customer', text: 'Ananya finds you and contacts you' },
                ].map((item, i) => (
                  <div key={item.title} className="relative flex items-center gap-4 rounded-2xl bg-white/5 p-4 animate-flow-card" style={{animationDelay: `${i * 0.18}s`}}>
                    <div className="text-3xl w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">{item.icon}</div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-muted">{item.text}</p>
                    </div>
                    {i < 3 && <span className="absolute -bottom-4 left-10 text-accent text-xl">↓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 scroll-fade">
            {[
              { label: 'Projects Delivered', value: '12+' },
              { label: 'Cities Served', value: '4' },
              { label: 'Businesses Online', value: '10+' },
              { label: 'Average Delivery Time', value: 'Overnight' },
            ].map((metric) => (
              <div key={metric.label} className="glass glass-hover p-6 rounded-lg text-center transition-all hover:scale-105">
                <div className="text-3xl font-bold text-accent mb-1">{metric.value}</div>
                <div className="text-sm text-muted">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 scroll-fade">Without a Website, Customers Leave Quietly</h2>
            <p className="text-center text-muted mb-12 scroll-fade">The difference is usually one search result and one WhatsApp button.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-2xl border-red-500/30 scroll-fade">
                <h3 className="text-2xl font-bold mb-6 text-red-300">Without Website</h3>
                {['Customer searches', 'No products', 'No trust', 'Leaves'].map((step, i) => (
                  <div key={step} className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">{i + 1}</span>
                    <span>{step}</span>
                    {i < 3 && <span className="ml-auto text-red-300">↓</span>}
                  </div>
                ))}
              </div>
              <div className="glass p-8 rounded-2xl border-brand-green/40 scroll-fade" style={{animationDelay: '0.1s'}}>
                <h3 className="text-2xl font-bold mb-6 text-brand-green">With Valaiyam Website</h3>
                {['Customer searches', 'Website appears', 'WhatsApp opens', 'Customer contacts you'].map((step, i) => (
                  <div key={step} className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full bg-brand-green/15 flex items-center justify-center">{i + 1}</span>
                    <span>{step}</span>
                    {i < 3 && <span className="ml-auto text-brand-green">↓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div className="scroll-fade">
              <p className="text-accent font-semibold mb-3">A simple local-business story</p>
              <h2 className="text-4xl font-bold mb-6">You may already be losing customers</h2>
              <p className="text-muted text-lg">Ananya needs groceries tonight. She searches online, cannot find timings, product details, or WhatsApp ordering, and chooses the competitor who made it easy.</p>
            </div>
            <div className="glass p-8 rounded-3xl space-y-4 scroll-fade">
              {['🧍‍♀️ Ananya wants groceries', '🔎 Searches online', '❌ Cannot find useful information', '🏪 Chooses a competitor'].map((item, i) => (
                <div key={item} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 animate-flow-card" style={{animationDelay: `${i * 0.15}s`}}>
                  <span className="text-2xl">{item.split(' ')[0]}</span>
                  <span>{item.replace(/^\S+ /, '')}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 scroll-fade">Built for Real Business Results</h2>
            <p className="text-center text-muted mb-12 scroll-fade">No tech jargon. Just what helps local customers choose you.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {growthBenefits.map((benefit, i) => (
                <div key={benefit} className="glass glass-hover p-6 rounded-lg transition-all scroll-fade hover:scale-105" style={{animationDelay: `${i * 0.08}s`}}>
                  <div className="text-2xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold">{benefit}</h3>
                </div>
              ))}
            </div>
            <div className="text-center mt-10 scroll-fade">
              <Link href={whatsappLink} className="bg-accent px-8 py-4 rounded-lg hover:bg-brand-navy transition-all inline-block text-white font-semibold">
                Start on WhatsApp
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 scroll-fade">Overnight Process</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {[
                { step: '1', title: 'Answer WhatsApp Questions', time: '10 minutes' },
                { step: '2', title: 'Upload Logo & Photos', time: '15 minutes' },
                { step: '3', title: 'We Build Overnight', time: '12–18 hours' },
                { step: '4', title: 'Preview Website', time: 'Next morning' },
                { step: '5', title: 'Go Live', time: 'Same day' },
              ].map((phase, i) => (
                <div key={phase.step} className="text-center scroll-fade" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="glass glass-hover w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-accent transition-all hover:scale-110">
                    {phase.step}
                  </div>
                  <h3 className="font-semibold mb-2">{phase.title}</h3>
                  <p className="text-sm text-brand-green">{phase.time}</p>
                  {i < 4 && <p className="hidden md:block text-accent mt-4">↓</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 scroll-fade">Preview First. Pay Later.</h2>
            <p className="text-center text-muted mb-12 scroll-fade">Your risk is lower because you approve the homepage before the remaining payment.</p>
            <div className="grid md:grid-cols-4 gap-6">
              {['Business details', 'Website preview', 'Approve design', 'Pay & go live'].map((item, i) => (
                <div key={item} className="glass p-6 rounded-2xl text-center scroll-fade" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="text-4xl mb-4">{['🏪', '🖥️', '👍', '🚀'][i]}</div>
                  <h3 className="font-bold">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 scroll-fade">Before → After Portfolio</h2>
            <p className="text-center text-muted mb-12 scroll-fade">We focus on the business goal, not just the website screen.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { before: 'No Website', after: 'Professional Website', industry: 'Playschool', time: '3 days', goal: 'Build parent trust' },
                { before: 'Old Facebook Page', after: 'Mobile Website', industry: 'Restaurant', time: 'Overnight', goal: 'WhatsApp orders' },
                { before: 'Only Phone Calls', after: 'Search + WhatsApp', industry: 'Clinic', time: '2 days', goal: 'More appointments' },
              ].map((project, i) => (
                <div key={project.industry} className="glass glass-hover p-6 rounded-2xl scroll-fade hover:scale-105 transition-all" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="rounded-xl bg-red-500/10 p-4 text-center text-sm">{project.before}</div>
                    <div className="rounded-xl bg-brand-green/10 p-4 text-center text-sm">{project.after}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{project.industry}</h3>
                  <p className="text-sm text-muted">Time Taken: <span className="text-primary">{project.time}</span></p>
                  <p className="text-sm text-muted">Customer Goal: <span className="text-primary">{project.goal}</span></p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10 scroll-fade">
              <Link href="/portfolio" className="text-accent hover:underline font-medium">See demo website →</Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 scroll-fade">Who We Build For</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4">
              {businessTypes.map((type) => (
                <div key={type} className="glass glass-hover rounded-2xl p-4 text-center text-sm font-semibold scroll-fade">
                  {type}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
            <div className="scroll-fade">
              <h2 className="text-4xl font-bold mb-6">Traditional Agency vs Valaiyam</h2>
              <p className="text-muted text-lg">For many local businesses, speed and clarity matter more than meetings and jargon.</p>
            </div>
            <div className="glass rounded-2xl overflow-hidden scroll-fade">
              {[
                ['Traditional Agency', 'Weeks', 'Expensive', 'Meetings'],
                ['Valaiyam', 'Overnight', 'Affordable', 'WhatsApp'],
              ].map((row, i) => (
                <div key={row[0]} className={`grid grid-cols-4 gap-2 p-5 ${i === 1 ? 'bg-brand-green/10' : 'border-b border-white/10'}`}>
                  {row.map((cell) => <div key={cell} className="font-semibold text-sm md:text-base">{cell}</div>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 scroll-fade">Founding Customer Program</h2>
            <p className="text-center text-muted mb-12 scroll-fade">We're selecting 3 local businesses to build premium websites at 50% discount. In return, we ask for a testimonial.</p>
            <div className="glass border-accent p-8 rounded-3xl max-w-4xl mx-auto text-center scroll-fade">
              <p className="text-lg mb-6">Reserve your slot for <span className="text-4xl font-bold text-gradient">₹999</span>, approve your preview, then pay the remaining amount only when you're happy.</p>
              <Link href={whatsappLink} className="bg-accent px-8 py-4 rounded-lg hover:bg-brand-navy transition-all inline-block text-white font-semibold">
                Preview My Website
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 scroll-fade">What Early Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Priya S.', role: 'Boutique Owner', quote: 'Website ready overnight. Customers now order directly on WhatsApp.' },
                { name: 'Arun K.', role: 'Clinic Admin', quote: 'Patients can see timings and contact us without repeated phone calls.' },
                { name: 'Meena R.', role: 'Home Baker', quote: 'The preview-first process made it easy to trust the team.' },
              ].map((t, i) => (
                <div key={t.name} className="glass p-6 rounded-2xl scroll-fade" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="text-brand-orange mb-3">★★★★★</div>
                  <p className="mb-5">“{t.quote}”</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center font-bold">{t.name[0]}</div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl scroll-fade">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Get Your Business Online</h2>
            <p className="text-xl text-muted mb-8">Answer a few WhatsApp questions today. See your homepage preview tomorrow.</p>
            <Link href={whatsappLink} className="bg-accent px-8 py-4 rounded-lg hover:bg-brand-navy transition-all text-lg font-semibold inline-block hover:scale-105 hover:shadow-2xl hover:shadow-accent/50 text-white">
              Build My Website
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
