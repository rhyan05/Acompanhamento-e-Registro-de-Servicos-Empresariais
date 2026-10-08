import bcrypt from 'bcryptjs';
import { prisma } from '../database/prisma.js';
import { AppError } from './errors.js';
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
};
export async function listarUsuarios(empresaId) {
    return prisma.usuario.findMany({ where: { empresaId }, select: selectUsuario, orderBy: { nome: 'asc' } });
}
export async function buscarUsuario(id, empresaId) {
    return prisma.usuario.findFirst({ where: { id, empresaId }, select: selectUsuario });
}
export async function criarConta(empresaId, data) {
    const existe = await prisma.usuario.findUnique({ where: { email: data.email } });
    if (existe)
        throw new AppError('Email já cadastrado');
    const senhaHash = await bcrypt.hash(data.senha, 10);
    return prisma.usuario.create({
        data: { ...data, senha: senhaHash, empresaId },
        select: selectUsuario,
    });
}
export async function atualizarConta(empresaId, id, data) {
    const existe = await prisma.usuario.findFirst({ where: { id, empresaId } });
    if (!existe)
        throw new AppError('Usuário não encontrado', 404);
    const payload = { ...data };
    if (data.senha) {
        payload.senha = await bcrypt.hash(data.senha, 10);
    }
    else {
        delete payload.senha;
    }
    return prisma.usuario.update({ where: { id }, data: payload, select: selectUsuario });
}
