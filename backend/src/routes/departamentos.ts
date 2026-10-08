import { Router, Response } from 'express'
import { z } from 'zod'
import { AuthRequest, authMiddleware, gestorOnly } from '../middleware/auth.js'
import { listarDepartamentos, criarDepartamento, atualizarDepartamento, excluirDepartamento } from '../services/departamentoService.js'
import { responderErro } from './httpError.js'

const router = Router()
router.use(authMiddleware)

const createSchema = z.object({ nome: z.string().min(1), operacaoId: z.string().uuid() })
const updateSchema = z.object({ nome: z.string().min(1) })

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { operacaoId } = req.query as { operacaoId?: string }
    return res.json(await listarDepartamentos(req.empresaId!, operacaoId))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.post('/', gestorOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { nome, operacaoId } = createSchema.parse(req.body)
    return res.status(201).json(await criarDepartamento(req.empresaId!, nome, operacaoId))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.patch('/:id', gestorOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { nome } = updateSchema.parse(req.body)
    return res.json(await atualizarDepartamento(req.empresaId!, req.params.id as string, nome))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.delete('/:id', gestorOnly, async (req: AuthRequest, res: Response) => {
  try {
    await excluirDepartamento(req.empresaId!, req.params.id as string)
    return res.status(204).send()
  } catch (err) {
    return responderErro(err, res)
  }
})

export default router
