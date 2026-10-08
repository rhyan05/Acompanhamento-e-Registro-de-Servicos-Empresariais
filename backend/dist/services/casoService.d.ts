export declare function listarCasos(empresaId: string, filtros: {
    status?: string;
    operacaoId?: string;
    equipeId?: string;
}): Promise<({
    operacao: {
        id: string;
        nome: string;
    };
    atividade: {
        id: string;
        titulo: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    registradoPor: {
        id: string;
        nome: string;
    };
    anexos: {
        id: string;
        nome: string;
        createdAt: Date;
        caminho: string;
        mime: string | null;
        casoId: string;
    }[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string;
    operacaoId: string;
    atividadeId: string | null;
    equipeId: string | null;
    registradoPorId: string;
})[]>;
export declare function buscarCaso(id: string, empresaId: string): Promise<({
    operacao: {
        id: string;
        nome: string;
    };
    atividade: {
        id: string;
        titulo: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    registradoPor: {
        id: string;
        nome: string;
    };
    anexos: {
        id: string;
        nome: string;
        createdAt: Date;
        caminho: string;
        mime: string | null;
        casoId: string;
    }[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string;
    operacaoId: string;
    atividadeId: string | null;
    equipeId: string | null;
    registradoPorId: string;
}) | null>;
export interface CasoInput {
    titulo: string;
    descricao: string;
    operacaoId?: string;
    atividadeId?: string;
    equipeId?: string;
}
export declare function criarCaso(empresaId: string, data: CasoInput, userId: string): Promise<{
    operacao: {
        id: string;
        nome: string;
    };
    atividade: {
        id: string;
        titulo: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    registradoPor: {
        id: string;
        nome: string;
    };
    anexos: {
        id: string;
        nome: string;
        createdAt: Date;
        caminho: string;
        mime: string | null;
        casoId: string;
    }[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string;
    operacaoId: string;
    atividadeId: string | null;
    equipeId: string | null;
    registradoPorId: string;
}>;
export declare function atualizarStatusCaso(empresaId: string, id: string, status: string): Promise<{
    operacao: {
        id: string;
        nome: string;
    };
    atividade: {
        id: string;
        titulo: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    registradoPor: {
        id: string;
        nome: string;
    };
    anexos: {
        id: string;
        nome: string;
        createdAt: Date;
        caminho: string;
        mime: string | null;
        casoId: string;
    }[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string;
    operacaoId: string;
    atividadeId: string | null;
    equipeId: string | null;
    registradoPorId: string;
}>;
export declare function adicionarAnexo(empresaId: string, casoId: string, nome: string, caminho: string, mime?: string): Promise<{
    id: string;
    nome: string;
    createdAt: Date;
    caminho: string;
    mime: string | null;
    casoId: string;
}>;
