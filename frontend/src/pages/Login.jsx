import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password.')
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
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>
        <div className="bg-[#111827] rounded-2xl p-8 border border-gray-800">
          {error && <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required placeholder="you@example.com"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5F1F] transition" />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required placeholder="••••••••"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5F1F] transition" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-gray-400 mt-4 text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[#FF5F1F] hover:underline font-semibold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
