import { Link } from 'react-router-dom'

const features = [
  {
    icon: '👥',
    title: 'Stakeholder Discovery',
    desc: 'AI identifies all relevant stakeholders in your product ecosystem — from end users to manufacturers to regulators.',
  },
  {
    icon: '🗺️',
    title: 'Empathy Mapping',
    desc: 'Deep dive into what each stakeholder thinks, feels, says, and does. Understand pain points and gains.',
  },
  {
    icon: '📊',
    title: 'Design Intelligence',
    desc: 'Get critical perspectives from 7 expert personas and a comprehensive design report with actionable insights.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F2C]">
      {/* Hero */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-[#FF5F1F]/10 border border-[#FF5F1F]/30 text-[#FF5F1F] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🧠 Powered by Google Gemini AI
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Forge Empathy.<br />
            <span className="text-[#FF5F1F]">Design with Intelligence.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The AI-powered tool that helps designers understand every stakeholder in their product ecosystem. Built for Industrial Designers, design students, and product innovators worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition">
              Get Started Free →
            </Link>
            <a href="#how-it-works" className="border border-gray-700 hover:border-gray-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="py-20 px-6 bg-[#111827]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-4">How EmpathyForge Works</h2>
          <p className="text-gray-400 text-center mb-12">Four steps to design intelligence</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-[#0A0F2C] rounded-2xl p-8 border border-gray-800 hover:border-[#FF5F1F]/50 transition">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">Ready to Forge Better Designs?</h2>
          <p className="text-gray-400 mb-8">Join designers who use EmpathyForge to build products people actually love.</p>
          <Link to="/register" className="bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold px-10 py-5 rounded-xl text-xl transition inline-block">
            Start for Free →
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-600 border-t border-gray-800">
        <p>Built with ❤️ for Bilal Mubarak — Lecturer, Industrial Design, University of Gujrat, Pakistan</p>
      </footer>
    </div>
  )
}
