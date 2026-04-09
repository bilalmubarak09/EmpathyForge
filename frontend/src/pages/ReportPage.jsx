import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsApi } from '../api/api'
import DesignReport from '../components/DesignReport'
import StakeholderCard from '../components/StakeholderCard'
import CriticalAnalysis from '../components/CriticalAnalysis'

export default function ReportPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    projectsApi.get(id).then(res => setProject(res.data)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center text-gray-400 py-20">Loading report...</div>
  if (!project) return <div className="text-center text-red-400 py-20">Report not found.</div>

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 print:py-4">
      <div className="flex items-center justify-between mb-8 print:hidden">
        <Link to={`/project/${id}`} className="text-gray-400 hover:text-white transition">← Back to Project</Link>
        <button onClick={() => window.print()} className="bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition">
          🖨️ Print / Save PDF
        </button>
      </div>

      <h1 className="text-3xl font-black text-white mb-2">{project.title}</h1>
      <p className="text-gray-400 mb-8">{project.product_category} · {project.design_stage} · {new Date(project.created_at).toLocaleDateString()}</p>

      {project.stakeholders && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">👥 Stakeholders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.stakeholders.map((s, i) => <StakeholderCard key={i} stakeholder={s} />)}
          </div>
        </section>
      )}

      {project.critical_analysis && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">🔍 Critical Analysis</h2>
          <CriticalAnalysis data={project.critical_analysis} />
        </section>
      )}

      {project.design_report && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">📊 Design Intelligence Report</h2>
          <DesignReport data={project.design_report} />
        </section>
      )}
    </div>
  )
}
