import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    userId?: string;
    empresaId?: string;
    userLevel?: string;
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function gestorOnly(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
