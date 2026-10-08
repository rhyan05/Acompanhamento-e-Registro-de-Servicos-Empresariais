import { prisma } from '../database/prisma.js';
import { AppError } from './errors.js';
import { operacoesAcessiveis } from './acesso.js';
const includeResumo = {
    _count: { select: { departamentos: true, atividades: true, casos: true, membros: true } },
};
export async function listarOperacoes(userId, empresaId, nivel) {
    if (nivel === 'gestor') {
        return prisma.operacao.findMany({ where: { empresaId }, include: includeResumo, orderBy: { createdAt: 'asc' } });
    }
    const { ids } = await operacoesAcessiveis(userId, empresaId, nivel);
    return prisma.operacao.findMany({
        where: { empresaId, id: { in: ids } },
        include: includeResumo,
        orderBy: { createdAt: 'asc' },
    });
}
export async function buscarOperacao(id, empresaId) {
    return prisma.operacao.findFirst({
        where: { id, empresaId },
        include: {
            departamentos: true,
            fluxos: {
                include: {
                    etapas: { orderBy: { ordem: 'asc' }, include: { equipe: { select: { id: true, nome: true } } } },
                },
            },
        },
    });
}
export async function criarOperacao(empresaId, nome, descricao) {
    return prisma.operacao.create({ data: { empresaId, nome, descricao }, include: includeResumo });
}
export async function atualizarOperacao(empresaId, id, nome, descricao) {
    const existe = await prisma.operacao.findFirst({ where: { id, empresaId } });
    if (!existe)
        throw new AppError('Operação não encontrada', 404);
    return prisma.operacao.update({ where: { id }, data: { nome, descricao }, include: includeResumo });
}
export async function listarMembros(operacaoId, empresaId) {
    const operacao = await prisma.operacao.findFirst({ where: { id: operacaoId, empresaId } });
    if (!operacao)
        throw new AppError('Operação não encontrada', 404);
    return prisma.operacaoMembro.findMany({
        where: { operacaoId },
        include: {
            usuario: { select: { id: true, nome: true, email: true, funcao: true } },
            departamento: { select: { id: true, nome: true } },
        },
        orderBy: { usuario: { nome: 'asc' } },
    });
}
export async function definirMembro(operacaoId, empresaId, data) {
    const operacao = await prisma.operacao.findFirst({ where: { id: operacaoId, empresaId } });
    if (!operacao)
        throw new AppError('Operação não encontrada', 404);
    const usuario = await prisma.usuario.findFirst({ where: { id: data.usuarioId, empresaId } });
    if (!usuario)
        throw new AppError('Usuário não pertence à empresa');
    if (data.departamentoId) {
        const depto = await prisma.departamento.findFirst({ where: { id: data.departamentoId, operacaoId } });
        if (!depto)
            throw new AppError('Equipe não pertence a esta operação');
    }
    return prisma.operacaoMembro.upsert({
        where: { operacaoId_usuarioId: { operacaoId, usuarioId: data.usuarioId } },
        update: { departamentoId: data.departamentoId ?? null, papel: data.papel ?? 'operacional' },
        create: {
            operacaoId,
            usuarioId: data.usuarioId,
            departamentoId: data.departamentoId ?? null,
            papel: data.papel ?? 'operacional',
        },
        include: {
            usuario: { select: { id: true, nome: true, email: true, funcao: true } },
            departamento: { select: { id: true, nome: true } },
        },
    });
}
export async function removerMembro(operacaoId, usuarioId, empresaId) {
    const operacao = await prisma.operacao.findFirst({ where: { id: operacaoId, empresaId } });
    if (!operacao)
        throw new AppError('Operação não encontrada', 404);
    await prisma.operacaoMembro.deleteMany({ where: { operacaoId, usuarioId } });
}
