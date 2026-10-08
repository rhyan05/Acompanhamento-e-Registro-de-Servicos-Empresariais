import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import { KanbanPage } from './KanbanPage'
import { ArrowLeft } from 'lucide-react'

export function EquipeKanbanPage() {
  const { operacaoId, equipeId } = useParams<{ operacaoId: string; equipeId: string }>()
  const [nome, setNome] = useState('Equipe')

  useEffect(() => {
    if (!operacaoId || !equipeId) return
    api.departamentos.list(operacaoId).then(deps => {
      const eq = deps.find(d => d.id === equipeId)
      if (eq) setNome(eq.nome)
    })
  }, [operacaoId, equipeId])

  if (!operacaoId || !equipeId) return null
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-3 bg-surface border-b border-border">
        <Link
          to={`/operacoes/${operacaoId}?aba=equipes`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <ArrowLeft className="w-3 h-3" /> Voltar para equipes da operação
        </Link>
      </div>
      <KanbanPage operacaoId={operacaoId} equipeId={equipeId} titulo={`Equipe: ${nome}`} subtitulo="Kanban específico da equipe" />
    </div>
  )
}
