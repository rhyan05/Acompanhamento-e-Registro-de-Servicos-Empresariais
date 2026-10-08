export declare function getMetricas(empresaId: string, periodo?: string, operacaoId?: string): Promise<{
    totalAtividades: number;
    aderenciaPrazos: number;
    tmaMedio: number;
    porStatus: {
        status: string;
        count: number;
    }[];
    porPrioridade: {
        prioridade: string;
        count: number;
    }[];
    carga: {
        responsavel: string;
        equipe: string;
        quantidade: number;
    }[];
    cargaPorEquipe: {
        equipe: string;
        quantidade: number;
    }[];
    retrabalho: number;
}>;
export declare function getAndamento(empresaId: string, operacaoId?: string): Promise<{
    porEquipe: any[];
    porFluxo: {
        fluxo: string;
        etapas: {
            etapa: string;
            ordem: number;
            equipe: string;
            total: number;
            concluidas: number;
        }[];
        total: number;
        concluidas: number;
        progresso: number;
    }[];
}>;
