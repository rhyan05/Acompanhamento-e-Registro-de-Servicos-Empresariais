import { prisma } from '../database/prisma.js';
export async function criarEmpresa(nome) {
    return prisma.empresa.create({ data: { nome } });
}
export async function buscarEmpresa(id) {
    return prisma.empresa.findUnique({ where: { id }, select: { id: true, nome: true } });
}
