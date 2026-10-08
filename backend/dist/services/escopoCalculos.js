export function operacaoPermitida(nivel, idsAcesso, operacaoId) {
    if (nivel === 'gestor')
        return true;
    return idsAcesso.includes(operacaoId);
}
