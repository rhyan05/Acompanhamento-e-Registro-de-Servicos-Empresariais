import { Workflow } from 'lucide-react'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#topo" className="flex items-center gap-2.5 group">
      <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center shadow-soft">
        <Workflow className="w-5 h-5 text-white" />
      </span>
      {!compact && (
        <span className="font-bold text-sm text-content leading-tight">
          Organizador
          <span className="block text-[11px] font-medium text-content-subtle">de Tarefas</span>
        </span>
      )}
    </a>
  )
}
