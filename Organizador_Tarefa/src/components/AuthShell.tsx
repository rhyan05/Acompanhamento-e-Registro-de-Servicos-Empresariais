import { Workflow, KanbanSquare, GitBranch, ShieldCheck } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const destaques = [
  { icon: KanbanSquare, titulo: 'Kanban por equipe', texto: 'Fluxo de trabalho visual e ordenado.' },
  { icon: GitBranch, titulo: 'Grades e etapas', texto: 'Cada tarefa avança pela equipe certa.' },
  { icon: ShieldCheck, titulo: 'Auditoria imutável', texto: 'Histórico completo de cada mudança.' },
]

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex w-[46%] relative overflow-hidden bg-gradient-to-br from-primary via-indigo-600 to-violet-700 text-white p-12 flex-col justify-between">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
            <Workflow className="w-6 h-6" />
          </div>
          <span className="text-lg font-bold tracking-tight">Organizador de Tarefas</span>
        </div>

        <div className="relative">
          <h2 className="text-3xl font-extrabold leading-tight mb-3">
            Organize o trabalho,
            <br />
            impulsione a equipe.
          </h2>
          <p className="text-white/80 mb-8 max-w-sm">
            Centralize operações, equipes e tarefas em um fluxo claro — do pedido à entrega.
          </p>
          <ul className="space-y-4">
            {destaques.map(d => (
              <li key={d.titulo} className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                  <d.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{d.titulo}</p>
                  <p className="text-white/70 text-sm">{d.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-white/60 text-xs">
          © {new Date().getFullYear()} Organizador de Tarefas
        </p>
      </aside>

      <main className="flex-1 relative flex items-center justify-center p-6">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md animate-slide-up">{children}</div>
      </main>
    </div>
  )
}
