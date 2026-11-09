import { CheckCircle2 } from 'lucide-react'
import { metrics } from '../data/content'
import { SectionHeading } from './SectionHeading'

const criterios = [
  'Toda transição de status gera log rastreável com autoria e timestamp.',
  'O dashboard atualiza indicadores automaticamente, sem planilhas.',
  'Identificar responsável, prazo e gargalo de qualquer tarefa em menos de 3 cliques.',
]

export function Impacto() {
  return (
    <section id="impacto" className="py-20 sm:py-28 bg-surface-muted/60 border-y border-border">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Impacto"
          titulo="Do dado bruto à decisão"
          descricao="A plataforma substitui o acompanhamento manual por informação estruturada e visual."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.rotulo}
              className="card p-6 text-center animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="text-4xl font-extrabold tracking-tight text-gradient">
                {m.valor}
                <span className="text-2xl">{m.sufixo}</span>
              </p>
              <p className="mt-2 text-sm text-content-muted leading-relaxed">{m.rotulo}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-center font-bold text-content">Critérios de aceite</h3>
          <ul className="mt-5 space-y-3">
            {criterios.map(c => (
              <li key={c} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                <CheckCircle2 className="w-5 h-5 text-concluido shrink-0 mt-0.5" />
                <span className="text-sm text-content-muted">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
