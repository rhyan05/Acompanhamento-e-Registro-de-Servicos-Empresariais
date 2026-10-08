import { useContext } from 'react'
import { ConfirmContext } from '../context/confirm-context'

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm precisa ser usado dentro de <ConfirmProvider>')
  return ctx
}
