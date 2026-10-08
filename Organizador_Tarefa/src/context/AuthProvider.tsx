import { useCallback, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Usuario } from '../types'
import { api } from '../services/api'
import { AuthContext } from './auth-context'

function lerUsuarioSalvo(): Usuario | null {
  const token = localStorage.getItem('token')
  const stored = localStorage.getItem('usuario')
  if (!token || !stored) return null
  try {
    return JSON.parse(stored) as Usuario
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<Usuario | null>(() => lerUsuarioSalvo())

  const login = useCallback(async (email: string, senha: string) => {
    const res = await api.auth.login(email, senha)
    localStorage.setItem('token', res.token)
    localStorage.setItem('usuario', JSON.stringify(res.usuario))
    setUsuario(res.usuario)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
    navigate('/login')
  }, [navigate])

  return (
    <AuthContext.Provider value={{ usuario, loading: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
