import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, gestorOnly } from '../middleware/auth.js';
import { listarAtividades, buscarAtividade, criarAtividade, editarAtividade, atualizarStatus, avancarEtapa, retornarEtapa, excluirAtividade, adicionarResponsavel, removerResponsavel, } from '../services/atividadeService.js';
import { responderErro } from './httpError.js';
const router = Router();
router.use(authMiddleware);
const prioridadeEnum = z.enum(['baixa', 'media', 'alta', 'urgente']);
const statusEnum = z.enum(['pendente', 'em_execucao', 'revisao', 'concluido', 'bloqueado']);
const createSchema = z.object({
    titulo: z.string().min(1),
    descricao: z.string().optional(),
    responsavelId: z.string().uuid().optional(),
    solicitanteId: z.string().uuid().optional(),
    prioridade: prioridadeEnum.default('media'),
    prazoEstimado: z.string().datetime().optional(),
    operacaoId: z.string().uuid().optional(),
    fluxoId: z.string().uuid().optional(),
    etapaAtualId: z.string().uuid().optional(),
});
const edicaoSchema = z.object({
    titulo: z.string().min(1).optional(),
    descricao: z.string().optional(),
    prioridade: prioridadeEnum.optional(),
    responsavelId: z.string().uuid().optional(),
    prazoEstimado: z.string().datetime().nullable().optional(),
});
const statusSchema = z.object({ status: statusEnum });
router.get('/', async (req, res) => {
    try {
        const f = req.query;
        const atividades = await listarAtividades(req.userId, req.userLevel, req.empresaId, {
            status: f.status,
            responsavelId: f.responsavelId,
            prioridade: f.prioridade,
            operacaoId: f.operacaoId,
            equipeId: f.equipeId,
            fluxoId: f.fluxoId,
            etapaAtualId: f.etapaAtualId,
        });
        return res.json(atividades);
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const atividade = await buscarAtividade(req.params.id, req.empresaId);
        if (!atividade)
            return res.status(404).json({ error: 'Atividade não encontrada' });
        return res.json(atividade);
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.post('/', async (req, res) => {
    try {
        const data = createSchema.parse(req.body);
        return res.status(201).json(await criarAtividade(data, req.userId, req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const data = edicaoSchema.parse(req.body);
        return res.json(await editarAtividade(req.params.id, data, req.userId, req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = statusSchema.parse(req.body);
        return res.json(await atualizarStatus(req.params.id, status, req.userId, req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.post('/:id/avancar-etapa', async (req, res) => {
    try {
        return res.json(await avancarEtapa(req.params.id, req.userId, req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.post('/:id/retornar-etapa', async (req, res) => {
    try {
        return res.json(await retornarEtapa(req.params.id, req.userId, req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
const responsavelSchema = z.object({ usuarioId: z.string().uuid() });
router.post('/:id/responsaveis', async (req, res) => {
    try {
        const { usuarioId } = responsavelSchema.parse(req.body);
        return res.status(201).json(await adicionarResponsavel(req.params.id, usuarioId, req.userId, req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.delete('/:id/responsaveis/:usuarioId', async (req, res) => {
    try {
        return res.json(await removerResponsavel(req.params.id, req.params.usuarioId, req.userId, req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.delete('/:id', gestorOnly, async (req, res) => {
    try {
        await excluirAtividade(req.params.id, req.userId, req.empresaId);
        return res.status(204).send();
    }
    catch (err) {
        return responderErro(err, res);
    }
});
export default router;
