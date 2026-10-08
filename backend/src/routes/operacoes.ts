import { Router, Response } from 'express'
import { z } from 'zod'
import { AuthRequest, authMiddleware, gestorOnly } from '../middleware/auth.js'
import {
  listarOperacoes,
  buscarOperacao,
  criarOperacao,
  atualizarOperacao,
  listarMembros,
  definirMembro,
  removerMembro,
} from '../services/operacaoService.js'
import { assertAcessoOperacao } from '../services/acesso.js'
import { responderErro } from './httpError.js'

const router = Router()
router.use(authMiddleware)

const createSchema = z.object({ nome: z.string().min(1), descricao: z.string().optional() })
const membroSchema = z.object({
  usuarioId: z.string().uuid(),
  departamentoId: z.string().uuid().nullable().optional(),
  papel: z.enum(['operacional', 'gestor']).optional(),
})

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    return res.json(await listarOperacoes(req.userId!, req.empresaId!, req.userLevel!))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.post('/', gestorOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { nome, descricao } = createSchema.parse(req.body)
    return res.status(201).json(await criarOperacao(req.empresaId!, nome, descricao))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string
    await assertAcessoOperacao(id, req.userId!, req.empresaId!, req.userLevel!)
    const operacao = await buscarOperacao(id, req.empresaId!)
    if (!operacao) return res.status(404).json({ error: 'Operação não encontrada' })
    return res.json(operacao)
  } catch (err) {
    return responderErro(err, res)
  }
})

router.patch('/:id', gestorOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { nome, descricao } = createSchema.parse(req.body)
    return res.json(await atualizarOperacao(req.empresaId!, req.params.id as string, nome, descricao))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.get('/:id/membros', gestorOnly, async (req: AuthRequest, res: Response) => {
  try {
    return res.json(await listarMembros(req.params.id as string, req.empresaId!))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.put('/:id/membros', gestorOnly, async (req: AuthRequest, res: Response) => {
  try {
    const data = membroSchema.parse(req.body)
    return res.json(await definirMembro(req.params.id as string, req.empresaId!, data))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.delete('/:id/membros/:usuarioId', gestorOnly, async (req: AuthRequest, res: Response) => {
  try {
    await removerMembro(req.params.id as string, req.params.usuarioId as string, req.empresaId!)
    return res.status(204).send()
  } catch (err) {
    return responderErro(err, res)
  }
})

export default router
