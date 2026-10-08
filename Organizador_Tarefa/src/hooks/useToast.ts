import { useContext } from 'react'
import { ToastContext } from '../context/toast-context'

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast precisa ser usado dentro de <ToastProvider>')
  return ctx.toast
}
