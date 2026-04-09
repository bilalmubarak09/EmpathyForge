import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await register(form.fullName, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black">
            <span className="text-white">Empathy</span><span className="text-[#FF5F1F]">Forge</span>
          </h1>
          <p className="text-gray-400 mt-2">Create your free account</p>
        </div>
        <div className="bg-[#111827] rounded-2xl p-8 border border-gray-800">
          {error && <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Full Name</label>
              <input type="text" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                required placeholder="Your full name"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5F1F] transition" />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required placeholder="you@example.com"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5F1F] transition" />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required placeholder="Min 8 characters"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5F1F] transition" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-gray-400 mt-4 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF5F1F] hover:underline font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
