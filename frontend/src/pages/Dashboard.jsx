import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectsApi } from '../api/api'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    projectsApi.list().then(res => setProjects(res.data)).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id, e) => {
    e.preventDefault()
    if (!confirm('Delete this project?')) return
    await projectsApi.delete(id)
    setProjects(p => p.filter(proj => proj.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Welcome back, <span className="text-[#FF5F1F]">{user?.full_name?.split(' ')[0]}!</span></h1>
          <p className="text-gray-400 mt-1">Your design intelligence workspace</p>
        </div>
        <Link to="/project/new" className="bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition">
          + New Project
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold text-white mb-2">No projects yet</h2>
          <p className="text-gray-400 mb-6">Start your first empathy analysis to see the magic!</p>
          <Link to="/project/new" className="bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition inline-block">
            Create Your First Project →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Link to={`/project/${project.id}`} key={project.id}
              className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-[#FF5F1F]/50 transition group">
              <div className="flex items-start justify-between mb-3">
                <span className="bg-[#FF5F1F]/10 text-[#FF5F1F] text-xs font-semibold px-3 py-1 rounded-full">
                  {project.product_category}
                </span>
                <button onClick={(e) => handleDelete(project.id, e)}
                  className="text-gray-600 hover:text-red-400 transition text-xs">
                  ✕
                </button>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#FF5F1F] transition">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{project.design_stage}</span>
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
