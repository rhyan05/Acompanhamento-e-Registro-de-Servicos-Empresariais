import { Workflow } from 'lucide-react'
import { repo } from '../data/content'
import { GithubIcon } from './icons'

export function Footer() {
  return (
    <footer className="py-14">
      <div className="container-x">
        <div className="card p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 hero-glow pointer-events-none opacity-70" />
          <div className="relative text-center sm:text-left">
            <h2 className="text-2xl font-extrabold tracking-tight text-content">
              Veja o projeto no repositório
            </h2>
            <p className="mt-2 text-sm text-content-muted">
              Código-fonte, documentação e histórico de desenvolvimento.
            </p>
          </div>
          <a href={repo} target="_blank" rel="noreferrer" className="btn btn-primary relative">
            <GithubIcon className="w-4 h-4" />
            Abrir no GitHub
          </a>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-content-subtle">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center">
              <Workflow className="w-4 h-4 text-white" />
            </span>
            <span>Organizador de Tarefas</span>
          </div>
          <span>Trabalho de Conclusão de Curso · {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
