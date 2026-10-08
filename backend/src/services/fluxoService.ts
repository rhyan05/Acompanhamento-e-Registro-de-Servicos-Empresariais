import { prisma } from '../database/prisma.js'
import { AppError } from './errors.js'
import { assertOperacaoDaEmpresa } from './acesso.js'

export async function listarFluxos(empresaId: string, operacaoId?: string) {
  const where: any = { operacao: { empresaId } }
  if (operacaoId) where.operacaoId = operacaoId
  return prisma.fluxo.findMany({
    where,
    orderBy: { nome: 'asc' },
    include: {
      etapas: {
        orderBy: { ordem: 'asc' },
        include: { equipe: { select: { id: true, nome: true } } },
      },
    },
  })
}

export interface FluxoInput {
  operacaoId: string
  nome: string
  descricao?: string
  etapas: { nome: string; equipeId: string }[]
}

export async function criarFluxo(empresaId: string, data: FluxoInput) {
  if (data.etapas.length === 0) throw new AppError('O fluxo precisa de ao menos uma etapa')
  await assertOperacaoDaEmpresa(data.operacaoId, empresaId)

  for (const etapa of data.etapas) {
    const depto = await prisma.departamento.findFirst({ where: { id: etapa.equipeId, operacaoId: data.operacaoId } })
    if (!depto) throw new AppError('Equipe inválida para esta operação')
  }

  return prisma.fluxo.create({
    data: {
      operacaoId: data.operacaoId,
      nome: data.nome,
      descricao: data.descricao,
      etapas: {
        create: data.etapas.map((e, i) => ({ nome: e.nome, equipeId: e.equipeId, ordem: i + 1 })),
      },
    },
    include: {
      etapas: {
        orderBy: { ordem: 'asc' },
        include: { equipe: { select: { id: true, nome: true } } },
      },
    },
  })
}

export async function adicionarEtapa(
  empresaId: string,
  fluxoId: string,
  data: { nome: string; equipeId: string }
) {
  const fluxo = await prisma.fluxo.findFirst({ where: { id: fluxoId, operacao: { empresaId } } })
  if (!fluxo) throw new AppError('Fluxo não encontrado', 404)

  const depto = await prisma.departamento.findFirst({ where: { id: data.equipeId, operacaoId: fluxo.operacaoId } })
  if (!depto) throw new AppError('Equipe não pertence à operação do fluxo')

  const max = await prisma.etapaFluxo.aggregate({ where: { fluxoId }, _max: { ordem: true } })
  const ordem = (max._max.ordem ?? 0) + 1
  return prisma.etapaFluxo.create({
    data: { fluxoId, nome: data.nome, equipeId: data.equipeId, ordem },
    include: { equipe: { select: { id: true, nome: true } } },
  })
}

export async function removerEtapa(empresaId: string, etapaId: string) {
  const etapa = await prisma.etapaFluxo.findFirst({
    where: { id: etapaId, fluxo: { operacao: { empresaId } } },
  })
  if (!etapa) throw new AppError('Etapa não encontrada', 404)

  const emUso = await prisma.atividade.count({ where: { etapaAtualId: etapaId, deletedAt: null } })
  if (emUso > 0) throw new AppError('Há tarefas nesta etapa. Mova-as antes de remover a etapa.')

  const total = await prisma.etapaFluxo.count({ where: { fluxoId: etapa.fluxoId } })
  if (total <= 1) throw new AppError('O fluxo precisa de ao menos uma etapa')

  await prisma.etapaFluxo.delete({ where: { id: etapaId } })

  const restantes = await prisma.etapaFluxo.findMany({ where: { fluxoId: etapa.fluxoId }, orderBy: { ordem: 'asc' } })
  let i = 1
  for (const e of restantes) {
    if (e.ordem !== i) await prisma.etapaFluxo.update({ where: { id: e.id }, data: { ordem: i } })
    i++
  }
  return { ok: true }
}
