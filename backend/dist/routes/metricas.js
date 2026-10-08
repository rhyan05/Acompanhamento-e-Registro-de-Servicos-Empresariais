import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getMetricas, getAndamento } from '../services/metricasService.js';
import { assertAcessoOperacao } from '../services/acesso.js';
import { responderErro } from './httpError.js';
const router = Router();
router.use(authMiddleware);
router.get('/', async (req, res) => {
    try {
        const { periodo, operacaoId } = req.query;
        if (operacaoId)
            await assertAcessoOperacao(operacaoId, req.userId, req.empresaId, req.userLevel);
        return res.json(await getMetricas(req.empresaId, periodo, operacaoId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.get('/andamento', async (req, res) => {
    try {
        const { operacaoId } = req.query;
        if (operacaoId)
            await assertAcessoOperacao(operacaoId, req.userId, req.empresaId, req.userLevel);
        return res.json(await getAndamento(req.empresaId, operacaoId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
export default router;
