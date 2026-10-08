import { prisma } from '../database/prisma.js'
import { AppError } from './errors.js'
import { assertAcessoOperacao, escopoOperacoes } from './acesso.js'

const includeCaso = {
  atividade: { select: { id: true, titulo: true } },
  equipe: { select: { id: true, nome: true } },
  operacao: { select: { id: true, nome: true } },
  registradoPor: { select: { id: true, nome: true } },
  anexos: { orderBy: { createdAt: 'desc' } as const },
}

export async function listarCasos(
  empresaId: string,
  filtros: { status?: string; operacaoId?: string; equipeId?: string },
  userId: string,
  nivel: string
) {
  const where: any = { operacao: { empresaId } }
  if (filtros.status) where.status = filtros.status
  if (filtros.operacaoId) {
    await assertAcessoOperacao(filtros.operacaoId, userId, empresaId, nivel)
    where.operacaoId = filtros.operacaoId
  } else {
    const ids = await escopoOperacoes(userId, empresaId, nivel)
    if (ids) where.operacaoId = { in: ids }
  }
  if (filtros.equipeId) where.equipeId = filtros.equipeId
  return prisma.caso.findMany({ where, include: includeCaso, orderBy: { createdAt: 'desc' } })
}

export async function buscarCaso(id: string, empresaId: string, userId: string, nivel: string) {
  const caso = await prisma.caso.findFirst({ where: { id, operacao: { empresaId } }, include: includeCaso })
  if (caso) await assertAcessoOperacao(caso.operacaoId, userId, empresaId, nivel)
  return caso
}

export interface CasoInput {
  titulo: string
  descricao: string
  operacaoId?: string
  atividadeId?: string
  equipeId?: string
}

export async function criarCaso(empresaId: string, data: CasoInput, userId: string, nivel: string) {
  let operacaoId = data.operacaoId ?? null

  if (data.atividadeId) {
    const atividade = await prisma.atividade.findFirst({ where: { id: data.atividadeId, operacao: { empresaId } } })
    if (!atividade) throw new AppError('Tarefa não encontrada')
    operacaoId = atividade.operacaoId
  } else if (data.equipeId) {
    const depto = await prisma.departamento.findFirst({ where: { id: data.equipeId, operacao: { empresaId } } })
    if (!depto) throw new AppError('Equipe não encontrada')
    operacaoId = depto.operacaoId
  }

  if (!operacaoId) throw new AppError('Informe a operação')
  await assertAcessoOperacao(operacaoId, userId, empresaId, nivel)

  return prisma.caso.create({
    data: {
      operacaoId,
      titulo: data.titulo,
      descricao: data.descricao,
      atividadeId: data.atividadeId ?? null,
      equipeId: data.equipeId ?? null,
      registradoPorId: userId,
    },
    include: includeCaso,
  })
}

export async function atualizarStatusCaso(empresaId: string, id: string, status: string, userId: string, nivel: string) {
  const existe = await prisma.caso.findFirst({ where: { id, operacao: { empresaId } } })
  if (!existe) throw new AppError('Caso não encontrado', 404)
  await assertAcessoOperacao(existe.operacaoId, userId, empresaId, nivel)
  return prisma.caso.update({ where: { id }, data: { status }, include: includeCaso })
}

export async function adicionarAnexo(empresaId: string, casoId: string, nome: string, caminho: string, mime: string | undefined, userId: string, nivel: string) {
  const existe = await prisma.caso.findFirst({ where: { id: casoId, operacao: { empresaId } } })
  if (!existe) throw new AppError('Caso não encontrado', 404)
  await assertAcessoOperacao(existe.operacaoId, userId, empresaId, nivel)
  return prisma.anexo.create({ data: { casoId, nome, caminho, mime } })
}
