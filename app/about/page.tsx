import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'About - Valaiyam',
  description: 'Learn about Valaiyam and our mission to help businesses succeed online with premium websites.',
}

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center">About Valaiyam</h1>
            <p className="text-xl text-muted text-center mb-16">
              Building premium digital experiences for businesses that want to grow.
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted leading-relaxed">
                  Valaiyam exists to help small businesses, startups, and professionals establish a powerful digital presence. We believe every business deserves a premium website that builds trust, attracts customers, and drives growth—without the traditional agency price tag or timeline.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">How We're Different</h2>
                <p className="text-muted leading-relaxed mb-6">
                  We combine AI-assisted rapid development with professional engineering quality. This unique approach allows us to deliver premium websites faster and more affordably than traditional agencies, without compromising on quality or performance.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border border-white/10 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Fast Delivery</h3>
                    <p className="text-sm text-muted">7-10 day turnaround for most projects</p>
                  </div>
                  <div className="border border-white/10 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Premium Quality</h3>
                    <p className="text-sm text-muted">Modern tech stack and clean code</p>
                  </div>
                  <div className="border border-white/10 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Affordable Pricing</h3>
                    <p className="text-sm text-muted">Transparent pricing from ₹9,999</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Our Process</h2>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Discovery', desc: 'We understand your business, goals, and target audience' },
                    { step: '2', title: 'Design', desc: 'Create a modern, conversion-focused design tailored to your brand' },
                    { step: '3', title: 'Development', desc: 'Build your website with clean code and best practices' },
                    { step: '4', title: 'Launch', desc: 'Deploy your website and provide training and support' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start border border-white/10 p-6 rounded-lg">
                      <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
                <ul className="space-y-3 text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span><strong className="text-white">Business-First Approach:</strong> We focus on outcomes that matter—leads, conversions, and growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span><strong className="text-white">Modern Technology:</strong> Built with Next.js, React, and Tailwind for speed and scalability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span><strong className="text-white">Transparent Process:</strong> Clear pricing, timelines, and communication throughout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span><strong className="text-white">Full Ownership:</strong> You get complete source code access and ownership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span><strong className="text-white">Ongoing Support:</strong> Post-launch support and maintenance options available</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16 text-center bg-secondary p-12 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
              <p className="text-muted mb-8">Let's build something amazing for your business.</p>
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
