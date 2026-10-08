export declare function listarFluxos(empresaId: string, operacaoId?: string): Promise<({
    etapas: ({
        equipe: {
            id: string;
            nome: string;
        };
    } & {
        id: string;
        nome: string;
        equipeId: string;
        fluxoId: string;
        ordem: number;
    })[];
} & {
    id: string;
    nome: string;
    createdAt: Date;
    descricao: string | null;
    operacaoId: string;
})[]>;
export interface FluxoInput {
    operacaoId: string;
    nome: string;
    descricao?: string;
    etapas: {
        nome: string;
        equipeId: string;
    }[];
}
export declare function criarFluxo(empresaId: string, data: FluxoInput): Promise<{
    etapas: ({
        equipe: {
            id: string;
            nome: string;
        };
    } & {
        id: string;
        nome: string;
        equipeId: string;
        fluxoId: string;
        ordem: number;
    })[];
} & {
    id: string;
    nome: string;
    createdAt: Date;
    descricao: string | null;
    operacaoId: string;
}>;
export declare function adicionarEtapa(empresaId: string, fluxoId: string, data: {
    nome: string;
    equipeId: string;
}): Promise<{
    equipe: {
        id: string;
        nome: string;
    };
} & {
    id: string;
    nome: string;
    equipeId: string;
    fluxoId: string;
    ordem: number;
}>;
export declare function removerEtapa(empresaId: string, etapaId: string): Promise<{
    ok: boolean;
}>;
