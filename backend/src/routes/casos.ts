import { Router, Response } from 'express'
import { z } from 'zod'
import fs from 'node:fs'
import path from 'node:path'
import multer from 'multer'
import { AuthRequest, authMiddleware } from '../middleware/auth.js'
import {
  listarCasos,
  buscarCaso,
  criarCaso,
  atualizarStatusCaso,
  adicionarAnexo,
} from '../services/casoService.js'
import { responderErro } from './httpError.js'

const router = Router()
router.use(authMiddleware)

const uploadDir = path.resolve('uploads')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

const casoSchema = z.object({
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  operacaoId: z.string().uuid().optional(),
  atividadeId: z.string().uuid().optional(),
  equipeId: z.string().uuid().optional(),
})

const statusSchema = z.object({
  status: z.enum(['aberto', 'em_analise', 'resolvido']),
})

const filtroSchema = z.object({
  status: z.enum(['aberto', 'em_analise', 'resolvido']).optional(),
  operacaoId: z.string().uuid().optional(),
  equipeId: z.string().uuid().optional(),
})

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const filtros = filtroSchema.parse(req.query)
    return res.json(await listarCasos(req.empresaId!, filtros))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const caso = await buscarCaso(req.params.id as string, req.empresaId!)
    if (!caso) return res.status(404).json({ error: 'Caso não encontrado' })
    return res.json(caso)
  } catch (err) {
    return responderErro(err, res)
  }
})

router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const data = casoSchema.parse(req.body)
    return res.status(201).json(await criarCaso(req.empresaId!, data, req.userId!))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.patch('/:id/status', async (req: AuthRequest, res: Response) => {
  try {
    const { status } = statusSchema.parse(req.body)
    return res.json(await atualizarStatusCaso(req.empresaId!, req.params.id as string, status))
  } catch (err) {
    return responderErro(err, res)
  }
})

router.post('/:id/anexos', upload.single('arquivo'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Arquivo não enviado' })
    const anexo = await adicionarAnexo(
      req.empresaId!,
      req.params.id as string,
      req.file.originalname,
      `/uploads/${req.file.filename}`,
      req.file.mimetype
    )
    return res.status(201).json(anexo)
  } catch (err) {
    return responderErro(err, res)
  }
})

export default router
