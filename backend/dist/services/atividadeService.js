import { prisma } from '../database/prisma.js';
import { AppError } from './errors.js';
import { diferenciarEdicao } from './edicaoCalculos.js';
import { assertAcessoOperacao, assertOperacaoDaEmpresa, operacoesAcessiveis } from './acesso.js';
const includeCard = {
    responsavel: { select: { id: true, nome: true, email: true } },
    responsaveis: { include: { usuario: { select: { id: true, nome: true, email: true } } } },
    solicitante: { select: { id: true, nome: true } },
    criadoPor: { select: { id: true, nome: true } },
    operacao: { select: { id: true, nome: true } },
    equipe: { select: { id: true, nome: true } },
    etapaAtual: { select: { id: true, nome: true, ordem: true } },
    fluxo: { select: { id: true, nome: true } },
};
const includeDetalhe = {
    ...includeCard,
    fluxo: {
        include: {
            etapas: {
                orderBy: { ordem: 'asc' },
                include: { equipe: { select: { id: true, nome: true } } },
            },
        },
    },
    historico: { orderBy: { timestamp: 'desc' } },
    movimentacoes: {
        orderBy: { timestamp: 'desc' },
        include: {
            etapaOrigem: { select: { id: true, nome: true, ordem: true } },
            etapaDestino: { select: { id: true, nome: true, ordem: true } },
            movidoPor: { select: { id: true, nome: true } },
        },
    },
    casos: { orderBy: { createdAt: 'desc' } },
};
async function registrarHistorico(atividadeId, usuarioId, acao, extra = {}) {
    await prisma.historico.create({
        data: {
            atividadeId,
            usuarioId,
            acaoExecutada: acao,
            campo: extra.campo ?? null,
            valorAnterior: extra.valorAnterior ?? null,
            valorNovo: extra.valorNovo ?? null,
            alteracaoEstado: extra.alteracaoEstado ?? null,
        },
    });
}
async function escolherResponsavel(equipeId) {
    const membro = await prisma.operacaoMembro.findFirst({
        where: { departamentoId: equipeId },
        orderBy: { id: 'asc' },
    });
    if (!membro)
        throw new AppError('Não há usuário vinculado à equipe de destino');
    return membro.usuarioId;
}
export async function listarAtividades(userId, nivel, empresaId, filtros) {
    const where = { deletedAt: null, operacao: { empresaId } };
    if (filtros.operacaoId) {
        await assertAcessoOperacao(filtros.operacaoId, userId, empresaId, nivel);
        where.operacaoId = filtros.operacaoId;
    }
    else if (nivel !== 'gestor') {
        const { ids } = await operacoesAcessiveis(userId, empresaId, nivel);
        where.operacaoId = { in: ids };
    }
    if (filtros.status)
        where.status = filtros.status;
    if (filtros.responsavelId)
        where.responsavelId = filtros.responsavelId;
    if (filtros.prioridade)
        where.prioridade = filtros.prioridade;
    if (filtros.equipeId)
        where.equipeId = filtros.equipeId;
    if (filtros.fluxoId)
        where.fluxoId = filtros.fluxoId;
    if (filtros.etapaAtualId)
        where.etapaAtualId = filtros.etapaAtualId;
    return prisma.atividade.findMany({
        where,
        include: includeCard,
        orderBy: [{ prioridade: 'asc' }, { createdAt: 'desc' }],
    });
}
export async function buscarAtividade(id, empresaId) {
    return prisma.atividade.findFirst({
        where: { id, deletedAt: null, operacao: { empresaId } },
        include: includeDetalhe,
    });
}
export async function criarAtividade(data, userId, empresaId) {
    let operacaoId = data.operacaoId ?? null;
    let equipeId = null;
    let etapaAtualId = data.etapaAtualId ?? null;
    let responsavelId = data.responsavelId ?? null;
    if (etapaAtualId) {
        const etapa = await prisma.etapaFluxo.findUnique({ where: { id: etapaAtualId }, include: { fluxo: true } });
        if (!etapa)
            throw new AppError('Etapa inválida');
        operacaoId = etapa.fluxo.operacaoId;
        equipeId = etapa.equipeId;
        if (!responsavelId)
            responsavelId = await escolherResponsavel(etapa.equipeId);
    }
    else if (data.fluxoId) {
        const fluxo = await prisma.fluxo.findUnique({ where: { id: data.fluxoId } });
        if (!fluxo)
            throw new AppError('Fluxo inválido');
        operacaoId = fluxo.operacaoId;
    }
    if (!operacaoId)
        throw new AppError('Informe a operação');
    await assertOperacaoDaEmpresa(operacaoId, empresaId);
    if (!responsavelId)
        throw new AppError('Informe o responsável');
    if (!equipeId) {
        const membro = await prisma.operacaoMembro.findFirst({ where: { operacaoId, usuarioId: responsavelId } });
        equipeId = membro?.departamentoId ?? null;
    }
    const atividade = await prisma.atividade.create({
        data: {
            operacaoId,
            titulo: data.titulo,
            descricao: data.descricao,
            responsavelId,
            solicitanteId: data.solicitanteId,
            criadoPorId: userId,
            prioridade: data.prioridade ?? 'media',
            prazoEstimado: data.prazoEstimado ? new Date(data.prazoEstimado) : null,
            fluxoId: data.fluxoId ?? null,
            etapaAtualId,
            equipeId,
        },
    });
    await prisma.atividadeResponsavel.create({ data: { atividadeId: atividade.id, usuarioId: responsavelId } });
    await registrarHistorico(atividade.id, userId, 'criacao');
    if (etapaAtualId) {
        await prisma.movimentacaoEtapa.create({
            data: {
                atividadeId: atividade.id,
                etapaOrigemId: null,
                etapaDestinoId: etapaAtualId,
                tipo: 'criacao',
                movidoPorId: userId,
            },
        });
    }
    return prisma.atividade.findUnique({ where: { id: atividade.id }, include: includeCard });
}
async function acharAtividade(id, empresaId) {
    const atividade = await prisma.atividade.findFirst({ where: { id, deletedAt: null, operacao: { empresaId } } });
    if (!atividade)
        throw new AppError('Atividade não encontrada', 404);
    return atividade;
}
export async function editarAtividade(id, dados, userId, empresaId) {
    const atual = await acharAtividade(id, empresaId);
    const { data, logs } = diferenciarEdicao(atual, dados);
    if (Object.keys(data).length === 0) {
        return prisma.atividade.findFirst({ where: { id }, include: includeCard });
    }
    const atividade = await prisma.atividade.update({ where: { id }, data, include: includeCard });
    for (const log of logs) {
        await registrarHistorico(id, userId, 'edicao', log);
    }
    return atividade;
}
export async function atualizarStatus(id, status, userId, empresaId) {
    const atual = await acharAtividade(id, empresaId);
    const agora = new Date();
    const data = { status };
    if (status === 'em_execucao' && !atual.dataInicio)
        data.dataInicio = agora;
    if (status === 'concluido') {
        data.dataConclusao = agora;
        if (atual.dataInicio)
            data.tempoGastoMin = Math.round((agora.getTime() - atual.dataInicio.getTime()) / 60000);
    }
    else if (atual.status === 'concluido') {
        data.dataConclusao = null;
        data.tempoGastoMin = null;
    }
    const atividade = await prisma.atividade.update({ where: { id }, data, include: includeCard });
    await registrarHistorico(id, userId, 'mudanca_status', {
        campo: 'status',
        valorAnterior: atual.status,
        valorNovo: status,
        alteracaoEstado: `${atual.status} → ${status}`,
    });
    return atividade;
}
async function moverEtapa(id, userId, empresaId, direcao) {
    const atividade = await prisma.atividade.findFirst({
        where: { id, deletedAt: null, operacao: { empresaId } },
        include: { etapaAtual: true, fluxo: { include: { etapas: { orderBy: { ordem: 'asc' } } } } },
    });
    if (!atividade)
        throw new AppError('Atividade não encontrada', 404);
    if (!atividade.fluxo || !atividade.etapaAtual)
        throw new AppError('Atividade não pertence a um fluxo');
    if (direcao === 1 && atividade.status !== 'concluido') {
        throw new AppError('Conclua a etapa atual antes de avançar');
    }
    const etapas = atividade.fluxo.etapas;
    const idx = etapas.findIndex(e => e.id === atividade.etapaAtualId);
    const destino = etapas[idx + direcao];
    if (!destino) {
        throw new AppError(direcao === 1 ? 'Esta já é a última etapa do fluxo' : 'Esta já é a primeira etapa do fluxo');
    }
    const responsavelId = await escolherResponsavel(destino.equipeId);
    const updated = await prisma.atividade.update({
        where: { id },
        data: {
            etapaAtualId: destino.id,
            equipeId: destino.equipeId,
            responsavelId,
            status: direcao === 1 ? 'pendente' : 'em_execucao',
            dataInicio: direcao === 1 ? null : new Date(),
            dataConclusao: null,
            tempoGastoMin: null,
        },
        include: includeCard,
    });
    await prisma.movimentacaoEtapa.create({
        data: {
            atividadeId: id,
            etapaOrigemId: atividade.etapaAtualId,
            etapaDestinoId: destino.id,
            tipo: direcao === 1 ? 'avanco' : 'retorno',
            movidoPorId: userId,
        },
    });
    await prisma.atividadeResponsavel.upsert({
        where: { atividadeId_usuarioId: { atividadeId: id, usuarioId: responsavelId } },
        update: {},
        create: { atividadeId: id, usuarioId: responsavelId },
    });
    await registrarHistorico(id, userId, direcao === 1 ? 'avanco_etapa' : 'retorno_etapa', {
        campo: 'etapa',
        valorAnterior: atividade.etapaAtual.nome,
        valorNovo: destino.nome,
    });
    return updated;
}
export function avancarEtapa(id, userId, empresaId) {
    return moverEtapa(id, userId, empresaId, 1);
}
export function retornarEtapa(id, userId, empresaId) {
    return moverEtapa(id, userId, empresaId, -1);
}
export async function adicionarResponsavel(atividadeId, usuarioId, userId, empresaId) {
    await acharAtividade(atividadeId, empresaId);
    const usuario = await prisma.usuario.findFirst({ where: { id: usuarioId, empresaId } });
    if (!usuario)
        throw new AppError('Usuário não pertence à empresa');
    await prisma.atividadeResponsavel.upsert({
        where: { atividadeId_usuarioId: { atividadeId, usuarioId } },
        update: {},
        create: { atividadeId, usuarioId },
    });
    await registrarHistorico(atividadeId, userId, 'edicao', { campo: 'responsaveis', valorNovo: usuario.nome });
    return buscarAtividade(atividadeId, empresaId);
}
export async function removerResponsavel(atividadeId, usuarioId, userId, empresaId) {
    const atividade = await acharAtividade(atividadeId, empresaId);
    const total = await prisma.atividadeResponsavel.count({ where: { atividadeId } });
    if (total <= 1)
        throw new AppError('A tarefa precisa de ao menos um responsável');
    await prisma.atividadeResponsavel.deleteMany({ where: { atividadeId, usuarioId } });
    if (atividade.responsavelId === usuarioId) {
        const outro = await prisma.atividadeResponsavel.findFirst({ where: { atividadeId }, orderBy: { createdAt: 'asc' } });
        if (outro) {
            await prisma.atividade.update({ where: { id: atividadeId }, data: { responsavelId: outro.usuarioId } });
        }
    }
    await registrarHistorico(atividadeId, userId, 'edicao', { campo: 'responsaveis', valorAnterior: usuarioId });
    return buscarAtividade(atividadeId, empresaId);
}
export async function excluirAtividade(id, userId, empresaId) {
    await acharAtividade(id, empresaId);
    await registrarHistorico(id, userId, 'exclusao');
    return prisma.atividade.update({ where: { id }, data: { deletedAt: new Date() } });
}
