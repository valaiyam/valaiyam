import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Portfolio - Valaiyam',
  description: 'View our portfolio of premium business websites and web applications.',
}

export default function Portfolio() {
  const projects = [
    { name: 'Healthcare Clinic', category: 'Business Website', tech: 'Next.js, Tailwind' },
    { name: 'Consulting Firm', category: 'Corporate Website', tech: 'Next.js, Tailwind' },
    { name: 'Restaurant', category: 'Business Website', tech: 'Next.js, Tailwind' },
    { name: 'Educational Institute', category: 'Website + Portal', tech: 'Next.js, Tailwind' },
    { name: 'Startup Landing', category: 'Landing Page', tech: 'Next.js, Tailwind' },
    { name: 'Professional Portfolio', category: 'Portfolio Site', tech: 'Next.js, Tailwind' },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">Our Work</h1>
            <p className="text-xl text-muted text-center max-w-3xl mx-auto mb-16">
              Premium websites built for businesses across industries. Each project designed for conversion and growth.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="bg-secondary aspect-video rounded-lg mb-4 flex items-center justify-center border border-white/10 group-hover:border-accent/50 transition">
                    <span className="text-muted">Coming Soon</span>
                  </div>
                  <h3 className="font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-muted mb-1">{project.category}</p>
                  <p className="text-xs text-muted">{project.tech}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center bg-secondary p-12 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Want Your Project Here?</h2>
              <p className="text-muted mb-8">Let's build something amazing together.</p>
              <Link href="/contact" className="bg-accent px-8 py-4 rounded-lg hover:bg-blue-600 transition inline-block">
                Start Your Project
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
