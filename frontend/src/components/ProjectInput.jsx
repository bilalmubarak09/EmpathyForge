import { useState } from 'react'
import { projectsApi, empathyApi } from '../api/api'
import LoadingSpinner from './LoadingSpinner'

const CATEGORIES = ['Furniture', 'Electronics', 'Medical', 'Fashion', 'Food & Beverage', 'Education', 'Transportation', 'Home & Living', 'Other']
const STAGES = ['Idea Stage', 'Concept Development', 'Prototype', 'Market Ready']

export default function ProjectInput({ onAnalysisComplete, existingProject }) {
  const [form, setForm] = useState({
    title: existingProject?.title || '',
    description: existingProject?.description || '',
    product_category: existingProject?.product_category || CATEGORIES[0],
    design_stage: existingProject?.design_stage || STAGES[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.description.length < 100) {
      setError('Description must be at least 100 characters.')
      return
    }
    setLoading(true)
    try {
      let project
      if (existingProject) {
        project = existingProject
      } else {
        const res = await projectsApi.create(form)
        project = res.data
      }
      const analysisRes = await empathyApi.analyze(project.id)
      onAnalysisComplete({ project, analysis: analysisRes.data })
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">{error}</div>}
      
      <div>
        <label className="block text-white font-semibold mb-2">Project Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          disabled={!!existingProject}
          placeholder="e.g., Ergonomic Study Chair for University Students"
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5F1F] transition disabled:opacity-60"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">Product Description
          <span className="text-gray-500 font-normal ml-2 text-sm">(min 100 characters)</span>
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          disabled={!!existingProject}
          placeholder="Describe your product, its purpose, target users, context of use, and any specific design challenges you face..."
          rows={5}
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5F1F] transition resize-none disabled:opacity-60"
        />
        <p className={`text-xs mt-1 ${form.description.length < 100 ? 'text-gray-500' : 'text-[#10B981]'}`}>
          {form.description.length} / 100 characters minimum
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">Product Category</label>
          <select
            name="product_category"
            value={form.product_category}
            onChange={handleChange}
            disabled={!!existingProject}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5F1F] transition disabled:opacity-60"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Design Stage</label>
          <select
            name="design_stage"
            value={form.design_stage}
            onChange={handleChange}
            disabled={!!existingProject}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5F1F] transition disabled:opacity-60"
          >
            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition"
      >
        🚀 Analyze with EmpathyForge
      </button>
    </form>
  )
}
