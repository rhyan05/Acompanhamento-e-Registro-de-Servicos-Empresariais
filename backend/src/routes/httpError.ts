import { Response } from 'express'
import { z } from 'zod'
import { AppError } from '../services/errors.js'

export function responderErro(err: unknown, res: Response) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message })
  }
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: 'Dados inválidos', details: err.errors })
  }
  return res.status(500).json({ error: 'Erro interno' })
}
