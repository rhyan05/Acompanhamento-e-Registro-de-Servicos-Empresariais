import { prisma } from '../database/prisma.js';
import { AppError } from './errors.js';
import { assertOperacaoDaEmpresa } from './acesso.js';
export async function listarDepartamentos(empresaId, operacaoId) {
    const where = { operacao: { empresaId } };
    if (operacaoId)
        where.operacaoId = operacaoId;
    return prisma.departamento.findMany({ where, orderBy: { nome: 'asc' } });
}
export async function criarDepartamento(empresaId, nome, operacaoId) {
    await assertOperacaoDaEmpresa(operacaoId, empresaId);
    const existe = await prisma.departamento.findFirst({ where: { nome, operacaoId } });
    if (existe)
        throw new AppError('Já existe uma equipe com esse nome nesta operação');
    return prisma.departamento.create({ data: { nome, operacaoId } });
}
export async function atualizarDepartamento(empresaId, id, nome) {
    const existe = await prisma.departamento.findFirst({ where: { id, operacao: { empresaId } } });
    if (!existe)
        throw new AppError('Equipe não encontrada', 404);
    return prisma.departamento.update({ where: { id }, data: { nome } });
}
export async function excluirDepartamento(empresaId, id) {
    const depto = await prisma.departamento.findFirst({ where: { id, operacao: { empresaId } } });
    if (!depto)
        throw new AppError('Equipe não encontrada', 404);
    const etapas = await prisma.etapaFluxo.count({ where: { equipeId: id } });
    if (etapas > 0) {
        throw new AppError('Esta equipe é usada em etapas de fluxo. Remova essas etapas antes de excluir a equipe.');
    }
    await prisma.$transaction([
        prisma.operacaoMembro.updateMany({ where: { departamentoId: id }, data: { departamentoId: null } }),
        prisma.atividade.updateMany({ where: { equipeId: id }, data: { equipeId: null } }),
        prisma.caso.updateMany({ where: { equipeId: id }, data: { equipeId: null } }),
        prisma.departamento.delete({ where: { id } }),
    ]);
}
