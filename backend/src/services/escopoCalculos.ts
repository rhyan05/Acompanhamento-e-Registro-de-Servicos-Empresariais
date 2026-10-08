export function operacaoPermitida(nivel: string, idsAcesso: string[], operacaoId: string): boolean {
  if (nivel === 'gestor') return true
  return idsAcesso.includes(operacaoId)
}
