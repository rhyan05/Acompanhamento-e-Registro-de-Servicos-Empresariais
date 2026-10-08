import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, gestorOnly } from '../middleware/auth.js';
import { listarOperacoes, buscarOperacao, criarOperacao, atualizarOperacao, listarMembros, definirMembro, removerMembro, } from '../services/operacaoService.js';
import { assertAcessoOperacao } from '../services/acesso.js';
import { responderErro } from './httpError.js';
const router = Router();
router.use(authMiddleware);
const createSchema = z.object({ nome: z.string().min(1), descricao: z.string().optional() });
const membroSchema = z.object({
    usuarioId: z.string().uuid(),
    departamentoId: z.string().uuid().nullable().optional(),
    papel: z.enum(['operacional', 'gestor']).optional(),
});
router.get('/', async (req, res) => {
    try {
        return res.json(await listarOperacoes(req.userId, req.empresaId, req.userLevel));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.post('/', gestorOnly, async (req, res) => {
    try {
        const { nome, descricao } = createSchema.parse(req.body);
        return res.status(201).json(await criarOperacao(req.empresaId, nome, descricao));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await assertAcessoOperacao(id, req.userId, req.empresaId, req.userLevel);
        const operacao = await buscarOperacao(id, req.empresaId);
        if (!operacao)
            return res.status(404).json({ error: 'Operação não encontrada' });
        return res.json(operacao);
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.patch('/:id', gestorOnly, async (req, res) => {
    try {
        const { nome, descricao } = createSchema.parse(req.body);
        return res.json(await atualizarOperacao(req.empresaId, req.params.id, nome, descricao));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.get('/:id/membros', gestorOnly, async (req, res) => {
    try {
        return res.json(await listarMembros(req.params.id, req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.put('/:id/membros', gestorOnly, async (req, res) => {
    try {
        const data = membroSchema.parse(req.body);
        return res.json(await definirMembro(req.params.id, req.empresaId, data));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.delete('/:id/membros/:usuarioId', gestorOnly, async (req, res) => {
    try {
        await removerMembro(req.params.id, req.params.usuarioId, req.empresaId);
        return res.status(204).send();
    }
    catch (err) {
        return responderErro(err, res);
    }
});
export default router;
