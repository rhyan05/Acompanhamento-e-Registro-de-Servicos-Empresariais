import { tech } from '../data/content'
import { SectionHeading } from './SectionHeading'

export function Tecnologias() {
  return (
    <section id="tecnologias" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Tecnologias"
          titulo="Construído com uma stack moderna"
          descricao="Do front-end reativo ao banco de dados e à conteinerização, tudo versionado e testado por integração contínua."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {tech.map(t => (
            <div key={t.area} className="card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-content-subtle">
                {t.area}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.itens.map(item => (
                  <span
                    key={item}
                    className="badge bg-primary-soft text-primary !px-3 !py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
