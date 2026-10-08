import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  userId?: string
  empresaId?: string
  userLevel?: string
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      empresaId: string
      nivelAcesso: string
    }
    if (!decoded.empresaId) {
      return res.status(401).json({ error: 'Sessão desatualizada, faça login novamente' })
    }
    req.userId = decoded.id
    req.empresaId = decoded.empresaId
    req.userLevel = decoded.nivelAcesso
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}

export function gestorOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.userLevel !== 'gestor') {
    return res.status(403).json({ error: 'Acesso restrito a gestores' })
  }
  next()
}
