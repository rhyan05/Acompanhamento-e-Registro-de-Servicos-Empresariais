import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/prisma.js';
import { criarEmpresa } from './empresaService.js';
export async function registrarEmpresa(data) {
    const existe = await prisma.usuario.findUnique({ where: { email: data.email } });
    if (existe)
        return { erro: 'Email já cadastrado' };
    const empresa = await criarEmpresa(data.empresaNome);
    const senhaHash = await bcrypt.hash(data.senha, 10);
    const usuario = await prisma.usuario.create({
        data: {
            nome: data.nome,
            email: data.email,
            senha: senhaHash,
            funcao: data.funcao ?? 'Gestor',
            nivelAcesso: 'gestor',
            empresaId: empresa.id,
        },
        select: { id: true, nome: true, email: true, funcao: true, nivelAcesso: true, empresaId: true },
    });
    return { usuario, empresa };
}
export async function autenticar(email, senha) {
    const usuario = await prisma.usuario.findUnique({
        where: { email },
        include: { empresa: { select: { id: true, nome: true } } },
    });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha)))
        return null;
    const token = jwt.sign({ id: usuario.id, empresaId: usuario.empresaId, nivelAcesso: usuario.nivelAcesso }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return {
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            funcao: usuario.funcao,
            nivelAcesso: usuario.nivelAcesso,
            empresaId: usuario.empresaId,
            empresa: usuario.empresa,
        },
    };
}
