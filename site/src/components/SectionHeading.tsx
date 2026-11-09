import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  titulo,
  descricao,
  center = false,
}: {
  eyebrow?: string
  titulo: ReactNode
  descricao?: string
  center?: boolean
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-content">{titulo}</h2>
      {descricao && <p className="mt-4 text-content-muted leading-relaxed">{descricao}</p>}
    </div>
  )
}
