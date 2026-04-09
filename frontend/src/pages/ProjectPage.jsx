import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProjectInput from '../components/ProjectInput'
import StakeholderCard from '../components/StakeholderCard'
import EmpathyMapDisplay from '../components/EmpathyMapDisplay'
import CriticalAnalysis from '../components/CriticalAnalysis'
import DesignReport from '../components/DesignReport'
import { projectsApi } from '../api/api'

const TABS = ['Stakeholders', 'Empathy Maps', 'Critical Analysis', 'Design Report']

export default function ProjectPage() {
  const { id } = useParams()
  const isNew = id === 'new'
  const [project, setProject] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [selectedStakeholder, setSelectedStakeholder] = useState('')
  const [loading, setLoading] = useState(!isNew)

  useEffect(() => {
    if (!isNew && id) {
      projectsApi.get(id).then(res => {
        const p = res.data
        setProject(p)
        if (p.stakeholders) {
          setAnalysis({
            stakeholders: p.stakeholders,
            empathy_maps: p.empathy_maps,
            critical_analysis: p.critical_analysis,
            design_report: p.design_report,
          })
          if (p.stakeholders?.length > 0) setSelectedStakeholder(p.stakeholders[0].name)
        }
      }).finally(() => setLoading(false))
    }
  }, [id, isNew])

  const handleAnalysisComplete = ({ project: p, analysis: a }) => {
    setProject(p)
    setAnalysis(a)
    if (a.stakeholders?.length > 0) setSelectedStakeholder(a.stakeholders[0].name)
  }

  if (loading) return <div className="text-center text-gray-400 py-20">Loading project...</div>

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-black text-white mb-2">
        {isNew ? 'New Analysis' : project?.title || 'Project'}
      </h1>
      <p className="text-gray-400 mb-8">
        {isNew ? 'Describe your project and let EmpathyForge do the thinking.' : `${project?.product_category} · ${project?.design_stage}`}
      </p>

      {(!analysis || isNew) && (
        <div className="bg-[#111827] rounded-2xl p-8 border border-gray-800 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">🎯 Project Details</h2>
          <ProjectInput onAnalysisComplete={handleAnalysisComplete} existingProject={isNew ? null : project} />
        </div>
      )}

      {analysis && (
        <>
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {TABS.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                  activeTab === i ? 'bg-[#FF5F1F] text-white' : 'bg-[#111827] text-gray-400 hover:text-white'
                }`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
            {activeTab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(analysis.stakeholders || []).map((s, i) => (
                  <StakeholderCard key={i} stakeholder={s} />
                ))}
              </div>
            )}

            {activeTab === 1 && (
              <div>
                <div className="mb-4">
                  <label className="text-white font-semibold mr-3">Select Stakeholder:</label>
                  <select value={selectedStakeholder} onChange={e => setSelectedStakeholder(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF5F1F]">
                    {(analysis.stakeholders || []).map(s => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <EmpathyMapDisplay
                  stakeholderName={selectedStakeholder}
                  data={analysis.empathy_maps?.[selectedStakeholder]}
                />
              </div>
            )}

            {activeTab === 2 && <CriticalAnalysis data={analysis.critical_analysis} />}
            {activeTab === 3 && <DesignReport data={analysis.design_report} />}
          </div>

          {!isNew && (
            <div className="mt-4 text-center">
              <button onClick={() => setAnalysis(null)}
                className="text-gray-400 hover:text-[#FF5F1F] text-sm transition">
                🔄 Re-analyze this project
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
