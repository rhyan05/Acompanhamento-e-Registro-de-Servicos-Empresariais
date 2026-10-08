import type {
  Andamento,
  AuthResponse,
  Atividade,
  Caso,
  Departamento,
  Empresa,
  EtapaFluxo,
  Fluxo,
  Metricas,
  Operacao,
  OperacaoMembro,
  Usuario,
} from '../types'

export type { Andamento, Metricas } from '../types'

const BASE = '/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })

  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    if (window.location.pathname !== '/login') window.location.href = '/login'
    throw new Error('Sessão expirada. Faça login novamente.')
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

function qs(params?: Record<string, string | undefined>) {
  const clean: Record<string, string> = {}
  for (const [k, v] of Object.entries(params ?? {})) if (v) clean[k] = v
  const query = new URLSearchParams(clean).toString()
  return query ? `?${query}` : ''
}

export const api = {
  auth: {
    login: (email: string, senha: string) =>
      request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),
    register: (data: { empresaNome: string; nome: string; email: string; senha: string; funcao?: string }) =>
      request<{ usuario: Usuario; empresa: Empresa }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  empresas: {
    atual: () => request<Empresa>('/empresas'),
  },
  operacoes: {
    list: () => request<Operacao[]>('/operacoes'),
    get: (id: string) => request<Operacao & { departamentos: Departamento[]; fluxos: Fluxo[] }>(`/operacoes/${id}`),
    create: (data: { nome: string; descricao?: string }) =>
      request<Operacao>('/operacoes', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: { nome: string; descricao?: string }) =>
      request<Operacao>(`/operacoes/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    membros: (id: string) => request<OperacaoMembro[]>(`/operacoes/${id}/membros`),
    definirMembro: (id: string, data: { usuarioId: string; departamentoId?: string | null; papel?: string }) =>
      request<OperacaoMembro>(`/operacoes/${id}/membros`, { method: 'PUT', body: JSON.stringify(data) }),
    removerMembro: (id: string, usuarioId: string) =>
      request<void>(`/operacoes/${id}/membros/${usuarioId}`, { method: 'DELETE' }),
  },
  atividades: {
    list: (params?: {
      status?: string
      responsavelId?: string
      prioridade?: string
      operacaoId?: string
      equipeId?: string
      fluxoId?: string
      etapaAtualId?: string
    }) => request<Atividade[]>(`/atividades${qs(params)}`),
    get: (id: string) => request<Atividade>(`/atividades/${id}`),
    create: (data: Partial<Atividade>) =>
      request<Atividade>('/atividades', { method: 'POST', body: JSON.stringify(data) }),
    edit: (id: string, data: Partial<Atividade>) =>
      request<Atividade>(`/atividades/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) =>
      request<Atividade>(`/atividades/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    avancarEtapa: (id: string) => request<Atividade>(`/atividades/${id}/avancar-etapa`, { method: 'POST' }),
    retornarEtapa: (id: string) => request<Atividade>(`/atividades/${id}/retornar-etapa`, { method: 'POST' }),
    adicionarResponsavel: (id: string, usuarioId: string) =>
      request<Atividade>(`/atividades/${id}/responsaveis`, { method: 'POST', body: JSON.stringify({ usuarioId }) }),
    removerResponsavel: (id: string, usuarioId: string) =>
      request<Atividade>(`/atividades/${id}/responsaveis/${usuarioId}`, { method: 'DELETE' }),
    delete: (id: string) => request<void>(`/atividades/${id}`, { method: 'DELETE' }),
  },
  usuarios: {
    list: () => request<Usuario[]>('/usuarios'),
    get: (id: string) => request<Usuario>(`/usuarios/${id}`),
    create: (data: { nome: string; email: string; senha: string; funcao: string; nivelAcesso?: string }) =>
      request<Usuario>('/usuarios', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Record<string, unknown>) =>
      request<Usuario>(`/usuarios/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  },
  departamentos: {
    list: (operacaoId?: string) => request<Departamento[]>(`/departamentos${qs({ operacaoId })}`),
    create: (nome: string, operacaoId: string) =>
      request<Departamento>('/departamentos', { method: 'POST', body: JSON.stringify({ nome, operacaoId }) }),
    update: (id: string, nome: string) =>
      request<Departamento>(`/departamentos/${id}`, { method: 'PATCH', body: JSON.stringify({ nome }) }),
    remove: (id: string) => request<void>(`/departamentos/${id}`, { method: 'DELETE' }),
  },
  fluxos: {
    list: (operacaoId?: string) => request<Fluxo[]>(`/fluxos${qs({ operacaoId })}`),
    create: (data: { operacaoId: string; nome: string; descricao?: string; etapas: { nome: string; equipeId: string }[] }) =>
      request<Fluxo>('/fluxos', { method: 'POST', body: JSON.stringify(data) }),
    adicionarEtapa: (fluxoId: string, data: { nome: string; equipeId: string }) =>
      request<EtapaFluxo>(`/fluxos/${fluxoId}/etapas`, { method: 'POST', body: JSON.stringify(data) }),
    removerEtapa: (etapaId: string) => request<void>(`/fluxos/etapas/${etapaId}`, { method: 'DELETE' }),
  },
  casos: {
    list: (params?: { status?: string; operacaoId?: string; equipeId?: string }) =>
      request<Caso[]>(`/casos${qs(params)}`),
    get: (id: string) => request<Caso>(`/casos/${id}`),
    create: (data: { titulo: string; descricao: string; operacaoId?: string; atividadeId?: string; equipeId?: string }) =>
      request<Caso>('/casos', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) =>
      request<Caso>(`/casos/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    uploadAnexo: async (id: string, arquivo: File) => {
      const form = new FormData()
      form.append('arquivo', arquivo)
      const token = getToken()
      const res = await fetch(`${BASE}/casos/${id}/anexos`, {
        method: 'POST',
        body: form,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Erro no upload' }))
        throw new Error(err.error || `HTTP ${res.status}`)
      }
      return res.json()
    },
  },
  metricas: {
    get: (periodo?: string, operacaoId?: string) =>
      request<Metricas>(`/metricas${qs({ periodo, operacaoId })}`),
    andamento: (operacaoId?: string) => request<Andamento>(`/metricas/andamento${qs({ operacaoId })}`),
  },
}
