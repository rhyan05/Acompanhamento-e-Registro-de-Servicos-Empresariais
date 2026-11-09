import { ArrowRight, LayoutDashboard } from 'lucide-react'
import { repo } from '../data/content'
import { GithubIcon } from './icons'

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[520px] grid-bg pointer-events-none" />

      <div className="container-x relative pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="max-w-3xl animate-slide-up">
          <span className="eyebrow mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Trabalho de Conclusão de Curso · Plataforma web
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-content">
            Centralize processos.{' '}
            <span className="text-gradient">Visualize o trabalho.</span>{' '}
            Decida com dados.
          </h1>

          <p className="mt-6 text-lg text-content-muted leading-relaxed max-w-2xl">
            O <strong className="text-content">Organizador de Tarefas</strong> reúne a documentação,
            o rastreamento e os indicadores dos fluxos operacionais em um só lugar — convertendo dados
            transacionais em painéis visuais de apoio à decisão.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#telas" className="btn btn-primary">
              <LayoutDashboard className="w-4 h-4" />
              Explorar as telas
            </a>
            <a href={repo} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <GithubIcon className="w-4 h-4" />
              Ver no GitHub
            </a>
          </div>
        </div>

        <div className="mt-14 animate-slide-up">
          <div className="card p-2 sm:p-3 overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="w-3 h-3 rounded-full bg-bloqueado/70" />
              <span className="w-3 h-3 rounded-full bg-pendente/70" />
              <span className="w-3 h-3 rounded-full bg-concluido/70" />
              <span className="ml-3 text-xs text-content-subtle">Dashboard · Visão geral</span>
            </div>
            <img
              src="/screenshots/dashboard.png"
              alt="Dashboard gerencial do Organizador de Tarefas"
              className="w-full rounded-xl border border-border"
              loading="eager"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-content-muted">
            <span className="inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" /> Rastreabilidade ponta a ponta
            </span>
            <span className="inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" /> Indicadores automáticos
            </span>
            <span className="inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" /> Kanban por equipe
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
