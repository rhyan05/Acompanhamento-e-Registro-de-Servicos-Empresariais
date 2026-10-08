function texto(valor) {
    if (valor === null || valor === undefined)
        return null;
    return String(valor);
}
const CAMPOS_SIMPLES = ['titulo', 'descricao', 'prioridade', 'responsavelId'];
export function diferenciarEdicao(atual, dados) {
    const data = {};
    const logs = [];
    for (const campo of CAMPOS_SIMPLES) {
        const novo = dados[campo];
        if (novo !== undefined && novo !== atual[campo]) {
            data[campo] = novo;
            logs.push({ campo, valorAnterior: texto(atual[campo]), valorNovo: texto(novo) });
        }
    }
    if (dados.prazoEstimado !== undefined) {
        const novo = dados.prazoEstimado ? new Date(dados.prazoEstimado) : null;
        const antigoIso = atual.prazoEstimado ? new Date(atual.prazoEstimado).toISOString() : null;
        const novoIso = novo ? novo.toISOString() : null;
        if (antigoIso !== novoIso) {
            data.prazoEstimado = novo;
            logs.push({ campo: 'prazoEstimado', valorAnterior: antigoIso, valorNovo: novoIso });
        }
    }
    return { data, logs };
}
