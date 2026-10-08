import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, gestorOnly } from '../middleware/auth.js';
import { listarFluxos, criarFluxo, adicionarEtapa, removerEtapa } from '../services/fluxoService.js';
import { responderErro } from './httpError.js';
const router = Router();
router.use(authMiddleware);
const fluxoSchema = z.object({
    operacaoId: z.string().uuid(),
    nome: z.string().min(1),
    descricao: z.string().optional(),
    etapas: z.array(z.object({ nome: z.string().min(1), equipeId: z.string().uuid() })).min(1),
});
router.get('/', async (req, res) => {
    try {
        const { operacaoId } = req.query;
        return res.json(await listarFluxos(req.empresaId, operacaoId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.post('/', gestorOnly, async (req, res) => {
    try {
        const data = fluxoSchema.parse(req.body);
        return res.status(201).json(await criarFluxo(req.empresaId, data));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
const etapaSchema = z.object({ nome: z.string().min(1), equipeId: z.string().uuid() });
router.post('/:id/etapas', gestorOnly, async (req, res) => {
    try {
        const data = etapaSchema.parse(req.body);
        return res.status(201).json(await adicionarEtapa(req.empresaId, req.params.id, data));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.delete('/etapas/:etapaId', gestorOnly, async (req, res) => {
    try {
        await removerEtapa(req.empresaId, req.params.etapaId);
        return res.status(204).send();
    }
    catch (err) {
        return responderErro(err, res);
    }
});
export default router;
