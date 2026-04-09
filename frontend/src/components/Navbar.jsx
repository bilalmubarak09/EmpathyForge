import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-[#111827] border-b border-gray-800 px-6 py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-black">
          <span className="text-white">Empathy</span>
          <span className="text-[#FF5F1F]">Forge</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
              <Link to="/project/new" className="text-gray-300 hover:text-white transition">New Project</Link>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-gray-300 text-sm">{user.full_name}</span>
              <button
                onClick={handleLogout}
                className="bg-[#FF5F1F] hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
              <Link to="/register" className="bg-[#FF5F1F] hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
