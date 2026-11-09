import { features } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function Features() {
  return (
    <section id="recursos" className="py-20 sm:py-28 bg-surface-muted/60 border-y border-border">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Recursos"
          titulo="Tudo o que a operação precisa, em um só lugar"
          descricao="Do registro da tarefa ao indicador gerencial: recursos pensados para dar visibilidade e controle sobre cada processo."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.titulo}
              className="card card-hover p-6 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                <f.icon className="w-5 h-5" />
              </span>
              <h3 className="mt-4 font-bold text-content">{f.titulo}</h3>
              <p className="mt-2 text-sm text-content-muted leading-relaxed">{f.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
