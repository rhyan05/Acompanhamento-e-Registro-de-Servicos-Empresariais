export interface DiffLog {
  campo: string
  valorAnterior: string | null
  valorNovo: string | null
}

function texto(valor: unknown): string | null {
  if (valor === null || valor === undefined) return null
  return String(valor)
}

const CAMPOS_SIMPLES = ['titulo', 'descricao', 'prioridade', 'responsavelId'] as const

export function diferenciarEdicao(
  atual: Record<string, any>,
  dados: Record<string, any>
): { data: Record<string, any>; logs: DiffLog[] } {
  const data: Record<string, any> = {}
  const logs: DiffLog[] = []

  for (const campo of CAMPOS_SIMPLES) {
    const novo = dados[campo]
    if (novo !== undefined && novo !== atual[campo]) {
      data[campo] = novo
      logs.push({ campo, valorAnterior: texto(atual[campo]), valorNovo: texto(novo) })
    }
  }

  if (dados.prazoEstimado !== undefined) {
    const novo = dados.prazoEstimado ? new Date(dados.prazoEstimado) : null
    const antigoIso = atual.prazoEstimado ? new Date(atual.prazoEstimado).toISOString() : null
    const novoIso = novo ? novo.toISOString() : null
    if (antigoIso !== novoIso) {
      data.prazoEstimado = novo
      logs.push({ campo: 'prazoEstimado', valorAnterior: antigoIso, valorNovo: novoIso })
    }
  }

  return { data, logs }
}
