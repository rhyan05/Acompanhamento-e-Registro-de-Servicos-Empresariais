import { useEffect, useState, useCallback } from 'react'
import { api } from '../services/api'
import type { Departamento, Fluxo, Operacao, OperacaoMembro, Usuario } from '../types'
import type { ToastTipo } from '../context/toast-context'
import { useToast } from '../hooks/useToast'
import { useConfirm } from '../hooks/useConfirm'
import { Plus, Trash2 } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

type Notify = (mensagem: string, tipo?: ToastTipo) => void

export function AdminPage() {
  const notify = useToast()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [operacoes, setOperacoes] = useState<Operacao[]>([])
  const [fluxos, setFluxos] = useState<Fluxo[]>([])

  const carregar = useCallback(async () => {
    const [u, o, f] = await Promise.all([api.usuarios.list(), api.operacoes.list(), api.fluxos.list()])
    setUsuarios(u)
    setOperacoes(o)
    setFluxos(f)
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      <PageHeader titulo="Administração" subtitulo="Gerencie operações, contas, equipes e fluxos." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OperacoesCard operacoes={operacoes} onDone={carregar} notify={notify} />
        <ContasCard usuarios={usuarios} onDone={carregar} notify={notify} />
      </div>
      <EquipesCard operacoes={operacoes} onDone={carregar} notify={notify} />
      <MembrosCard operacoes={operacoes} usuarios={usuarios} notify={notify} />
      <FluxosCard operacoes={operacoes} fluxos={fluxos} onDone={carregar} notify={notify} />
    </div>
  )
}

function OperacoesCard({
  operacoes,
  onDone,
  notify,
}: {
  operacoes: Operacao[]
  onDone: () => Promise<void>
  notify: Notify
}) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

  async function criar(e: React.FormEvent) {
    e.preventDefault()
    try {
      await api.operacoes.create({ nome, descricao: descricao || undefined })
      setNome('')
      setDescricao('')
      await onDone()
      notify('Operação criada.')
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Erro', 'error')
    }
  }

  return (
    <div className="card p-5">
      <h2 className="font-semibold text-content mb-3">Operações ({operacoes.length})</h2>
      <form onSubmit={criar} className="space-y-2 mb-4">
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da operação" className="input" required />
        <input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição (opcional)" className="input" />
        <button type="submit" className="btn btn-primary w-full">Criar operação</button>
      </form>
      <ul className="divide-y divide-border text-sm">
        {operacoes.map(o => (
          <li key={o.id} className="py-2 flex items-center justify-between">
            <span className="text-content">{o.nome}</span>
            <span className="text-xs text-content-subtle">{o._count?.departamentos ?? 0} equipes</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContasCard({
  usuarios,
  onDone,
  notify,
}: {
  usuarios: Usuario[]
  onDone: () => Promise<void>
  notify: Notify
}) {
  const [form, setForm] = useState({ nome: '', email: '', senha: '123456', funcao: '', nivelAcesso: 'operacional' })

  async function criar(e: React.FormEvent) {
    e.preventDefault()
    try {
      await api.usuarios.create(form)
      setForm({ nome: '', email: '', senha: '123456', funcao: '', nivelAcesso: 'operacional' })
      await onDone()
      notify('Conta criada.')
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Erro', 'error')
    }
  }

  return (
    <div className="card p-5">
      <h2 className="font-semibold text-content mb-3">Contas ({usuarios.length})</h2>
      <form onSubmit={criar} className="space-y-2 mb-4">
        <input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Nome" className="input" required />
        <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" className="input" required />
        <input value={form.senha} onChange={e => setForm(f => ({ ...f, senha: e.target.value }))} placeholder="Senha" className="input" required />
        <div className="flex gap-2">
          <input value={form.funcao} onChange={e => setForm(f => ({ ...f, funcao: e.target.value }))} placeholder="Função" className="input" required />
          <select value={form.nivelAcesso} onChange={e => setForm(f => ({ ...f, nivelAcesso: e.target.value }))} className="input !w-auto">
            <option value="operacional">Operacional</option>
            <option value="gestor">Gestor</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-full">Criar conta</button>
      </form>
      <ul className="divide-y divide-border text-sm max-h-56 overflow-y-auto">
        {usuarios.map(u => (
          <li key={u.id} className="py-2">
            <b className="text-content">{u.nome}</b> <span className="text-content-subtle">· {u.email}</span>
            <span className="block text-xs text-content-muted">{u.nivelAcesso} · {u.membros?.length ?? 0} operação(ões)</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function EquipesCard({
  operacoes,
  onDone,
  notify,
}: {
  operacoes: Operacao[]
  onDone: () => Promise<void>
  notify: Notify
}) {
  const [operacaoId, setOperacaoId] = useState('')
  const [nome, setNome] = useState('')
  const [equipes, setEquipes] = useState<Departamento[]>([])

  const carregarEquipes = useCallback(async (opId: string) => {
    if (!opId) return setEquipes([])
    setEquipes(await api.departamentos.list(opId))
  }, [])

  useEffect(() => {
    carregarEquipes(operacaoId)
  }, [operacaoId, carregarEquipes])

  async function criar(e: React.FormEvent) {
    e.preventDefault()
    if (!operacaoId) return
    try {
      await api.departamentos.create(nome, operacaoId)
      setNome('')
      await carregarEquipes(operacaoId)
      await onDone()
      notify('Equipe criada.')
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Erro', 'error')
    }
  }

  return (
    <div className="card p-5">
      <h2 className="font-semibold text-content mb-3">Equipes</h2>
      <form onSubmit={criar} className="flex flex-wrap gap-2 mb-4">
        <select value={operacaoId} onChange={e => setOperacaoId(e.target.value)} className="input !w-auto" required>
          <option value="">Operação...</option>
          {operacoes.map(o => (
            <option key={o.id} value={o.id}>{o.nome}</option>
          ))}
        </select>
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da equipe" className="input flex-1 min-w-[12rem]" required />
        <button type="submit" className="btn btn-primary">Criar</button>
      </form>
      <ul className="flex flex-wrap gap-2 text-sm">
        {equipes.map(eq => (
          <li key={eq.id} className="badge bg-surface-muted text-content-muted border border-border !px-3 !py-1">{eq.nome}</li>
        ))}
        {operacaoId && equipes.length === 0 && <li className="text-content-subtle">Nenhuma equipe.</li>}
      </ul>
    </div>
  )
}

function MembrosCard({
  operacoes,
  usuarios,
  notify,
}: {
  operacoes: Operacao[]
  usuarios: Usuario[]
  notify: Notify
}) {
  const confirm = useConfirm()
  const [operacaoId, setOperacaoId] = useState('')
  const [equipes, setEquipes] = useState<Departamento[]>([])
  const [membros, setMembros] = useState<OperacaoMembro[]>([])
  const [form, setForm] = useState({ usuarioId: '', departamentoId: '', papel: 'operacional' })

  const recarregar = useCallback(async (opId: string) => {
    if (!opId) {
      setEquipes([])
      setMembros([])
      return
    }
    const [eq, mb] = await Promise.all([api.departamentos.list(opId), api.operacoes.membros(opId)])
    setEquipes(eq)
    setMembros(mb)
  }, [])

  useEffect(() => {
    recarregar(operacaoId)
  }, [operacaoId, recarregar])

  async function vincular(e: React.FormEvent) {
    e.preventDefault()
    if (!operacaoId) return
    try {
      await api.operacoes.definirMembro(operacaoId, {
        usuarioId: form.usuarioId,
        departamentoId: form.departamentoId || null,
        papel: form.papel,
      })
      setForm({ usuarioId: '', departamentoId: '', papel: 'operacional' })
      await recarregar(operacaoId)
      notify('Vínculo atualizado.')
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Erro', 'error')
    }
  }

  async function remover(usuarioId: string) {
    if (!(await confirm({ titulo: 'Remover membro?', mensagem: 'O usuário deixará esta operação.', confirmLabel: 'Remover' }))) return
    await api.operacoes.removerMembro(operacaoId, usuarioId)
    await recarregar(operacaoId)
    notify('Vínculo removido.')
  }

  return (
    <div className="card p-5">
      <h2 className="font-semibold text-content mb-3">Membros por operação</h2>
      <select value={operacaoId} onChange={e => setOperacaoId(e.target.value)} className="input !w-auto mb-3">
        <option value="">Selecione a operação...</option>
        {operacoes.map(o => (
          <option key={o.id} value={o.id}>{o.nome}</option>
        ))}
      </select>

      {operacaoId && (
        <>
          <form onSubmit={vincular} className="flex flex-wrap gap-2 mb-4">
            <select value={form.usuarioId} onChange={e => setForm(f => ({ ...f, usuarioId: e.target.value }))} className="input !w-auto" required>
              <option value="">Usuário...</option>
              {usuarios.map(u => (
                <option key={u.id} value={u.id}>{u.nome}</option>
              ))}
            </select>
            <select value={form.departamentoId} onChange={e => setForm(f => ({ ...f, departamentoId: e.target.value }))} className="input !w-auto">
              <option value="">Equipe...</option>
              {equipes.map(eq => (
                <option key={eq.id} value={eq.id}>{eq.nome}</option>
              ))}
            </select>
            <select value={form.papel} onChange={e => setForm(f => ({ ...f, papel: e.target.value }))} className="input !w-auto">
              <option value="operacional">Operacional</option>
              <option value="gestor">Gestor</option>
            </select>
            <button type="submit" className="btn btn-primary">Vincular</button>
          </form>

          <ul className="divide-y divide-border text-sm">
            {membros.map(m => (
              <li key={m.id} className="py-2 flex items-center justify-between">
                <span>
                  <b className="text-content">{m.usuario?.nome}</b>
                  <span className="text-content-subtle"> · {m.departamento?.nome ?? 'sem equipe'} · {m.papel}</span>
                </span>
                <button onClick={() => remover(m.usuarioId)} className="btn-danger p-1.5 rounded-lg" title="Remover">
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
            {membros.length === 0 && <li className="py-2 text-content-subtle">Nenhum membro.</li>}
          </ul>
        </>
      )}
    </div>
  )
}

function FluxosCard({
  operacoes,
  fluxos,
  onDone,
  notify,
}: {
  operacoes: Operacao[]
  fluxos: Fluxo[]
  onDone: () => Promise<void>
  notify: Notify
}) {
  const [operacaoId, setOperacaoId] = useState('')
  const [equipes, setEquipes] = useState<Departamento[]>([])
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [etapas, setEtapas] = useState<{ nome: string; equipeId: string }[]>([{ nome: '', equipeId: '' }])

  useEffect(() => {
    if (!operacaoId) return setEquipes([])
    api.departamentos.list(operacaoId).then(setEquipes)
  }, [operacaoId])

  function atualizarEtapa(i: number, campo: 'nome' | 'equipeId', valor: string) {
    setEtapas(prev => prev.map((e, idx) => (idx === i ? { ...e, [campo]: valor } : e)))
  }

  async function criar(e: React.FormEvent) {
    e.preventDefault()
    if (!operacaoId) return
    try {
      await api.fluxos.create({
        operacaoId,
        nome,
        descricao: descricao || undefined,
        etapas: etapas.filter(e => e.nome && e.equipeId),
      })
      setNome('')
      setDescricao('')
      setEtapas([{ nome: '', equipeId: '' }])
      await onDone()
      notify('Fluxo criado.')
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Erro', 'error')
    }
  }

  return (
    <div className="card p-5">
      <h2 className="font-semibold text-content mb-3">Fluxos / Grades ({fluxos.length})</h2>
      <form onSubmit={criar} className="space-y-2 mb-4">
        <select value={operacaoId} onChange={e => setOperacaoId(e.target.value)} className="input" required>
          <option value="">Operação...</option>
          {operacoes.map(o => (
            <option key={o.id} value={o.id}>{o.nome}</option>
          ))}
        </select>
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do fluxo" className="input" required />
        <input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição (opcional)" className="input" />
        <p className="text-xs text-content-muted">Etapas (na ordem):</p>
        {etapas.map((et, i) => (
          <div key={i} className="flex gap-2">
            <input value={et.nome} onChange={e => atualizarEtapa(i, 'nome', e.target.value)} placeholder={`Etapa ${i + 1}`} className="input flex-1" />
            <select value={et.equipeId} onChange={e => atualizarEtapa(i, 'equipeId', e.target.value)} className="input flex-1">
              <option value="">Equipe</option>
              {equipes.map(eq => (
                <option key={eq.id} value={eq.id}>{eq.nome}</option>
              ))}
            </select>
            <button type="button" onClick={() => setEtapas(prev => prev.filter((_, idx) => idx !== i))} className="btn-danger p-2 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setEtapas(prev => [...prev, { nome: '', equipeId: '' }])} className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
          <Plus className="w-4 h-4" /> Adicionar etapa
        </button>
        <button type="submit" className="btn btn-primary w-full">Criar fluxo</button>
      </form>
      <ul className="space-y-1 text-sm">
        {fluxos.map(f => (
          <li key={f.id} className="text-content-muted">
            <b className="text-content">{f.nome}</b>: {f.etapas.map(e => `${e.ordem}. ${e.nome} (${e.equipe?.nome})`).join(' → ')}
          </li>
        ))}
      </ul>
    </div>
  )
}
