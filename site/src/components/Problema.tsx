import { AlertTriangle } from 'lucide-react'
import { hipoteses } from '../data/content'
import { SectionHeading } from './SectionHeading'

const dores = [
  'Atividades dispersas entre planilhas, e-mails e mensagens',
  'Ausência de rastreabilidade de quem mudou o quê e quando',
  'Retrabalho e prazos estourados sem visibilidade',
  'Nenhum indicador confiável para embasar decisões',
]

export function Problema() {
  return (
    <section id="problema" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="animate-slide-up">
            <SectionHeading
              eyebrow="O problema"
              titulo="Por que isso importa"
              descricao="Sem um sistema único, o acompanhamento operacional depende de esforço manual e conhecimento informal — o que custa tempo, esconde gargalos e fragiliza a tomada de decisão."
            />

            <ul className="mt-8 space-y-3">
              {dores.map(dor => (
                <li key={dor} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 shrink-0 rounded-lg bg-bloqueado-soft text-bloqueado flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-content-muted">{dor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {hipoteses.map((h, i) => (
              <div
                key={h.sigla}
                className="card card-hover p-6 animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-primary-soft text-primary font-extrabold flex items-center justify-center">
                    {h.sigla}
                  </span>
                  <h3 className="font-bold text-content">{h.titulo}</h3>
                </div>
                <p className="mt-3 text-sm text-content-muted leading-relaxed">{h.texto}</p>
              </div>
            ))}
            <p className="text-xs text-content-subtle px-1">
              Hipóteses que a plataforma foi construída para validar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
