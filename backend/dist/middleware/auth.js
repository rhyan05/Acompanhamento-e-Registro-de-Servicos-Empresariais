import jwt from 'jsonwebtoken';
export function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.empresaId) {
            return res.status(401).json({ error: 'Sessão desatualizada, faça login novamente' });
        }
        req.userId = decoded.id;
        req.empresaId = decoded.empresaId;
        req.userLevel = decoded.nivelAcesso;
        next();
    }
    catch {
        return res.status(401).json({ error: 'Token inválido' });
    }
}
export function gestorOnly(req, res, next) {
    if (req.userLevel !== 'gestor') {
        return res.status(403).json({ error: 'Acesso restrito a gestores' });
    }
    next();
}
