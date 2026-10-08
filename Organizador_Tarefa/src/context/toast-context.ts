import { createContext } from 'react'

export type ToastTipo = 'success' | 'error' | 'info'

export interface ToastItem {
  id: number
  mensagem: string
  tipo: ToastTipo
}

export interface ToastContextValue {
  toast: (mensagem: string, tipo?: ToastTipo) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
