import bcrypt from 'bcryptjs'
import { prisma } from '../database/prisma.js'
import { AppError } from './errors.js'

const selectUsuario = {
  id: true,
  nome: true,
  email: true,
  funcao: true,
  nivelAcesso: true,
  empresaId: true,
  empresa: { select: { id: true, nome: true } },
  membros: {
    include: {
      operacao: { select: { id: true, nome: true } },
      departamento: { select: { id: true, nome: true } },
    },
  },
} as const

export async function listarUsuarios(empresaId: string) {
  return prisma.usuario.findMany({ where: { empresaId }, select: selectUsuario, orderBy: { nome: 'asc' } })
}

export async function buscarUsuario(id: string, empresaId: string) {
  return prisma.usuario.findFirst({ where: { id, empresaId }, select: selectUsuario })
}

export interface ContaInput {
  nome: string
  email: string
  senha: string
  funcao: string
  nivelAcesso: string
}

export async function criarConta(empresaId: string, data: ContaInput) {
  const existe = await prisma.usuario.findUnique({ where: { email: data.email } })
  if (existe) throw new AppError('Email já cadastrado')

  const senhaHash = await bcrypt.hash(data.senha, 10)
  return prisma.usuario.create({
    data: { ...data, senha: senhaHash, empresaId },
    select: selectUsuario,
  })
}

export interface ContaUpdate {
  nome?: string
  funcao?: string
  nivelAcesso?: string
  senha?: string
}

export async function atualizarConta(empresaId: string, id: string, data: ContaUpdate) {
  const existe = await prisma.usuario.findFirst({ where: { id, empresaId } })
  if (!existe) throw new AppError('Usuário não encontrado', 404)

  const payload: any = { ...data }
  if (data.senha) {
    payload.senha = await bcrypt.hash(data.senha, 10)
  } else {
    delete payload.senha
  }
  return prisma.usuario.update({ where: { id }, data: payload, select: selectUsuario })
}
