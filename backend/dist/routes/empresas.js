import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { buscarEmpresa } from '../services/empresaService.js';
import { responderErro } from './httpError.js';
const router = Router();
router.use(authMiddleware);
router.get('/', async (req, res) => {
    try {
        return res.json(await buscarEmpresa(req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
export default router;
