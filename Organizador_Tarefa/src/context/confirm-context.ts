import { createContext } from 'react'

export interface ConfirmOptions {
  titulo: string
  mensagem?: string
  confirmLabel?: string
  danger?: boolean
}

export type ConfirmFn = (opcoes: ConfirmOptions) => Promise<boolean>

export const ConfirmContext = createContext<ConfirmFn | null>(null)
