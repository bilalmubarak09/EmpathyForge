import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser(res.data)
      }).catch((err) => {
        console.error('Auth token validation failed:', err)
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
      }).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    const params = new URLSearchParams()
    params.append('username', email)
    params.append('password', password)
    const res = await axios.post(`${API_URL}/auth/login`, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    const { access_token } = res.data
    localStorage.setItem('token', access_token)
    setToken(access_token)
    const userRes = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    setUser(userRes.data)
    return userRes.data
  }

  const register = async (fullName, email, password) => {
    await axios.post(`${API_URL}/auth/register`, {
      full_name: fullName,
      email,
      password
    })
    return await login(email, password)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
