import { useCallback, useRef, useState, type ReactNode } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { ToastContext, type ToastItem, type ToastTipo } from './toast-context'

const estilos: Record<ToastTipo, { icon: typeof Info; classe: string }> = {
  success: { icon: CheckCircle2, classe: 'text-concluido bg-concluido-soft border-concluido/30' },
  error: { icon: AlertCircle, classe: 'text-bloqueado bg-bloqueado-soft border-bloqueado/30' },
  info: { icon: Info, classe: 'text-execucao bg-execucao-soft border-execucao/30' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const contador = useRef(0)

  const remover = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = useCallback(
    (mensagem: string, tipo: ToastTipo = 'success') => {
      const id = ++contador.current
      setToasts(prev => [...prev, { id, mensagem, tipo }])
      setTimeout(() => remover(id), 4000)
    },
    [remover],
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 w-[min(22rem,calc(100vw-2rem))]">
        {toasts.map(t => {
          const { icon: Icon, classe } = estilos[t.tipo]
          return (
            <div
              key={t.id}
              role="status"
              className={`flex items-start gap-3 rounded-xl border p-3 shadow-card bg-surface animate-slide-up ${classe}`}
            >
              <Icon className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-sm text-content flex-1">{t.mensagem}</p>
              <button onClick={() => remover(t.id)} className="text-content-subtle hover:text-content" aria-label="Fechar">
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
