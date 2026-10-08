export interface AtividadeConcluida {
  prazoEstimado: Date | null
  dataInicio: Date | null
  dataConclusao: Date | null
}

const MS_POR_DIA = 1000 * 60 * 60 * 24

export function calcularAderenciaPrazos(atividades: AtividadeConcluida[]): number {
  const comPrazo = atividades.filter(a => a.prazoEstimado && a.dataConclusao)
  if (comPrazo.length === 0) return 0
  const dentroPrazo = comPrazo.filter(a => a.dataConclusao! <= a.prazoEstimado!).length
  return Math.round((dentroPrazo / comPrazo.length) * 100)
}

export function calcularTma(atividades: AtividadeConcluida[]): number {
  const comInicio = atividades.filter(a => a.dataInicio && a.dataConclusao)
  if (comInicio.length === 0) return 0
  const somaMs = comInicio.reduce(
    (soma, a) => soma + (a.dataConclusao!.getTime() - a.dataInicio!.getTime()),
    0
  )
  const mediaDias = somaMs / comInicio.length / MS_POR_DIA
  return Math.round(mediaDias * 10) / 10
}
