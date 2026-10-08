import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, gestorOnly } from '../middleware/auth.js';
import { listarUsuarios, buscarUsuario, criarConta, atualizarConta } from '../services/usuarioService.js';
import { responderErro } from './httpError.js';
const router = Router();
router.use(authMiddleware);
const contaSchema = z.object({
    nome: z.string().min(1),
    email: z.string().email(),
    senha: z.string().min(6),
    funcao: z.string().min(1),
    nivelAcesso: z.enum(['operacional', 'gestor']).default('operacional'),
});
const contaUpdateSchema = z.object({
    nome: z.string().min(1).optional(),
    funcao: z.string().min(1).optional(),
    nivelAcesso: z.enum(['operacional', 'gestor']).optional(),
    senha: z.string().min(6).optional(),
});
router.get('/', async (req, res) => {
    try {
        return res.json(await listarUsuarios(req.empresaId));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.post('/', gestorOnly, async (req, res) => {
    try {
        const data = contaSchema.parse(req.body);
        return res.status(201).json(await criarConta(req.empresaId, data));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (req.userLevel !== 'gestor' && id !== req.userId) {
            return res.status(403).json({ error: 'Sem permissão' });
        }
        const usuario = await buscarUsuario(id, req.empresaId);
        if (!usuario)
            return res.status(404).json({ error: 'Usuário não encontrado' });
        return res.json(usuario);
    }
    catch (err) {
        return responderErro(err, res);
    }
});
router.patch('/:id', gestorOnly, async (req, res) => {
    try {
        const data = contaUpdateSchema.parse(req.body);
        return res.json(await atualizarConta(req.empresaId, req.params.id, data));
    }
    catch (err) {
        return responderErro(err, res);
    }
});
export default router;
