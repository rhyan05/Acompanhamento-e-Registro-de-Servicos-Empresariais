import { Terminal, Container, KeyRound } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-background p-4 text-[13px] leading-relaxed text-content">
      <code>{children}</code>
    </pre>
  )
}

const etapas = [
  {
    icon: Container,
    titulo: 'Docker (recomendado)',
    codigo: `docker compose up --build\n# acesse http://localhost:8080`,
    texto: 'Sobe front-end (Nginx) e API automaticamente, aplicando o schema e o seed na primeira execução.',
  },
  {
    icon: Terminal,
    titulo: 'Desenvolvimento local',
    codigo: `# backend\ncd backend && npm install && npm run db:push && npm run dev\n\n# frontend (outro terminal)\ncd Organizador_Tarefa && npm install && npm run dev\n# acesse http://localhost:5173`,
    texto: 'Backend e front-end com hot reload, prontos para iterar no código.',
  },
]

export function Executar() {
  return (
    <section id="executar" className="py-20 sm:py-28 bg-surface-muted/60 border-y border-border">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Como rodar"
          titulo="Coloque no ar em minutos"
          descricao="O projeto é um monorepo com backend e front-end. Use Docker para subir tudo de uma vez."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {etapas.map(e => (
            <div key={e.titulo} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <e.icon className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-content">{e.titulo}</h3>
              </div>
              <p className="mt-3 text-sm text-content-muted">{e.texto}</p>
              <div className="mt-4">
                <Code>{e.codigo}</Code>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
          <KeyRound className="w-5 h-5 text-pendente shrink-0 mt-0.5" />
          <p className="text-sm text-content-muted">
            Contas de demonstração criadas pelo seed:{' '}
            <code className="px-1.5 py-0.5 rounded bg-surface-muted text-content">admin@aurora.com</code>{' '}
            e{' '}
            <code className="px-1.5 py-0.5 rounded bg-surface-muted text-content">admin@beta.com</code>{' '}
            — senha <code className="px-1.5 py-0.5 rounded bg-surface-muted text-content">123456</code>.
          </p>
        </div>
      </div>
    </section>
  )
}
