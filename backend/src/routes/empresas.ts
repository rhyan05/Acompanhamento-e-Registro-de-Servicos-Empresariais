import { Router, Response } from 'express'
import { AuthRequest, authMiddleware } from '../middleware/auth.js'
import { buscarEmpresa } from '../services/empresaService.js'
import { responderErro } from './httpError.js'

const router = Router()
router.use(authMiddleware)

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    return res.json(await buscarEmpresa(req.empresaId!))
  } catch (err) {
    return responderErro(err, res)
  }
})

export default router
