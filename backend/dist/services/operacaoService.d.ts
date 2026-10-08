export declare function listarOperacoes(userId: string, empresaId: string, nivel: string): Promise<({
    _count: {
        membros: number;
        atividades: number;
        casos: number;
        departamentos: number;
    };
} & {
    id: string;
    nome: string;
    createdAt: Date;
    empresaId: string;
    descricao: string | null;
})[]>;
export declare function buscarOperacao(id: string, empresaId: string): Promise<({
    departamentos: {
        id: string;
        nome: string;
        operacaoId: string;
    }[];
    fluxos: ({
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
    })[];
} & {
    id: string;
    nome: string;
    createdAt: Date;
    empresaId: string;
    descricao: string | null;
}) | null>;
export declare function criarOperacao(empresaId: string, nome: string, descricao?: string): Promise<{
    _count: {
        membros: number;
        atividades: number;
        casos: number;
        departamentos: number;
    };
} & {
    id: string;
    nome: string;
    createdAt: Date;
    empresaId: string;
    descricao: string | null;
}>;
export declare function atualizarOperacao(empresaId: string, id: string, nome: string, descricao?: string): Promise<{
    _count: {
        membros: number;
        atividades: number;
        casos: number;
        departamentos: number;
    };
} & {
    id: string;
    nome: string;
    createdAt: Date;
    empresaId: string;
    descricao: string | null;
}>;
export declare function listarMembros(operacaoId: string, empresaId: string): Promise<({
    usuario: {
        id: string;
        nome: string;
        email: string;
        funcao: string;
    };
    departamento: {
        id: string;
        nome: string;
    } | null;
} & {
    id: string;
    operacaoId: string;
    usuarioId: string;
    departamentoId: string | null;
    papel: string;
})[]>;
export interface MembroInput {
    usuarioId: string;
    departamentoId?: string | null;
    papel?: string;
}
export declare function definirMembro(operacaoId: string, empresaId: string, data: MembroInput): Promise<{
    usuario: {
        id: string;
        nome: string;
        email: string;
        funcao: string;
    };
    departamento: {
        id: string;
        nome: string;
    } | null;
} & {
    id: string;
    operacaoId: string;
    usuarioId: string;
    departamentoId: string | null;
    papel: string;
}>;
export declare function removerMembro(operacaoId: string, usuarioId: string, empresaId: string): Promise<void>;
