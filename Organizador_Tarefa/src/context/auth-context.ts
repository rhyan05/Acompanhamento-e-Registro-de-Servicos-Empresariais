import { createContext } from 'react'
import type { Usuario } from '../types'

export interface AuthContextValue {
  usuario: Usuario | null
  loading: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
