import { prisma } from '../database/prisma.js';
import { AppError } from './errors.js';
import { assertOperacaoDaEmpresa } from './acesso.js';
const includeCaso = {
    atividade: { select: { id: true, titulo: true } },
    equipe: { select: { id: true, nome: true } },
    operacao: { select: { id: true, nome: true } },
    registradoPor: { select: { id: true, nome: true } },
    anexos: { orderBy: { createdAt: 'desc' } },
};
export async function listarCasos(empresaId, filtros) {
    const where = { operacao: { empresaId } };
    if (filtros.status)
        where.status = filtros.status;
    if (filtros.operacaoId)
        where.operacaoId = filtros.operacaoId;
    if (filtros.equipeId)
        where.equipeId = filtros.equipeId;
    return prisma.caso.findMany({ where, include: includeCaso, orderBy: { createdAt: 'desc' } });
}
export async function buscarCaso(id, empresaId) {
    return prisma.caso.findFirst({ where: { id, operacao: { empresaId } }, include: includeCaso });
}
export async function criarCaso(empresaId, data, userId) {
    let operacaoId = data.operacaoId ?? null;
    if (data.atividadeId) {
        const atividade = await prisma.atividade.findFirst({ where: { id: data.atividadeId, operacao: { empresaId } } });
        if (!atividade)
            throw new AppError('Tarefa não encontrada');
        operacaoId = atividade.operacaoId;
    }
    else if (data.equipeId) {
        const depto = await prisma.departamento.findFirst({ where: { id: data.equipeId, operacao: { empresaId } } });
        if (!depto)
            throw new AppError('Equipe não encontrada');
        operacaoId = depto.operacaoId;
    }
    if (!operacaoId)
        throw new AppError('Informe a operação');
    await assertOperacaoDaEmpresa(operacaoId, empresaId);
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
    });
}
export async function atualizarStatusCaso(empresaId, id, status) {
    const existe = await prisma.caso.findFirst({ where: { id, operacao: { empresaId } } });
    if (!existe)
        throw new AppError('Caso não encontrado', 404);
    return prisma.caso.update({ where: { id }, data: { status }, include: includeCaso });
}
export async function adicionarAnexo(empresaId, casoId, nome, caminho, mime) {
    const existe = await prisma.caso.findFirst({ where: { id: casoId, operacao: { empresaId } } });
    if (!existe)
        throw new AppError('Caso não encontrado', 404);
    return prisma.anexo.create({ data: { casoId, nome, caminho, mime } });
}
