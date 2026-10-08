import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import { useAsync } from '../hooks/useAsync'
import { useToast } from '../hooks/useToast'
import { Plus, ArrowRight, Boxes, Users, ListChecks, AlertTriangle } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { Spinner } from '../components/ui/Spinner'

export function OperacoesPage() {
  const { usuario } = useAuth()
  const toast = useToast()
  const { data, loading, error, run } = useAsync(() => api.operacoes.list(), [])
  const operacoes = data ?? []

  const [showNovo, setShowNovo] = useState(false)
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

  async function criar(e: React.FormEvent) {
    e.preventDefault()
    try {
      await api.operacoes.create({ nome, descricao: descricao || undefined })
      setNome('')
      setDescricao('')
      setShowNovo(false)
      await run()
      toast('Operação criada com sucesso.')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Erro', 'error')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      <PageHeader titulo="Operações" subtitulo="Unidades de negócio da empresa.">
        {usuario?.nivelAcesso === 'gestor' && (
          <button onClick={() => setShowNovo(v => !v)} className="btn btn-primary">
            <Plus className="w-4 h-4" /> Nova operação
          </button>
        )}
      </PageHeader>

      {showNovo && (
        <form onSubmit={criar} className="card p-5 space-y-3 max-w-lg animate-slide-up">
          <div>
            <label className="label">Nome</label>
            <input
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex.: Produção de Bolo"
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Descrição</label>
            <input
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Opcional"
              className="input"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">Criar</button>
            <button type="button" onClick={() => setShowNovo(false)} className="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      )}

      {error && <p className="text-sm text-bloqueado">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {operacoes.map(op => (
          <Link key={op.id} to={`/operacoes/${op.id}`} className="card card-hover p-5 group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <Boxes className="w-5 h-5" />
                </div>
                <p className="font-semibold text-content">{op.nome}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-content-subtle transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
            {op.descricao && <p className="text-sm text-content-muted mb-3 line-clamp-2">{op.descricao}</p>}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-content-subtle mt-2">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {op._count?.departamentos ?? 0} equipes
              </span>
              <span className="flex items-center gap-1">
                <ListChecks className="w-3.5 h-3.5" /> {op._count?.atividades ?? 0} tarefas
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> {op._count?.casos ?? 0} casos
              </span>
            </div>
          </Link>
        ))}
      </div>

      {operacoes.length === 0 && (
        <div className="card p-10 text-center">
          <p className="text-content-subtle">Nenhuma operação disponível.</p>
        </div>
      )}
    </div>
  )
}
