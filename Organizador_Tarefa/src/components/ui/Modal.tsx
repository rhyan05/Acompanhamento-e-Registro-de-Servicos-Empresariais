import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

const sizes: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
}

interface ModalProps {
  onClose: () => void
  title?: ReactNode
  size?: keyof typeof sizes
  children: ReactNode
}

export function Modal({ onClose, title, size = 'md', children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (!d.open) d.showModal()
    const aoFechar = () => onClose()
    d.addEventListener('close', aoFechar)
    return () => d.removeEventListener('close', aoFechar)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      className={`modal-panel ${sizes[size]} p-6`}
      onClick={e => {
        if (e.target === ref.current) onClose()
      }}
    >
      {title != null && (
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 className="font-bold text-content text-lg">{title}</h2>
          <button type="button" onClick={onClose} className="btn-icon shrink-0" aria-label="Fechar">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      {children}
    </dialog>
  )
}
