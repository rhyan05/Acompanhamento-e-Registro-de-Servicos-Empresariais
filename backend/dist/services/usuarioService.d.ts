export declare function listarUsuarios(empresaId: string): Promise<{
    id: string;
    nome: string;
    empresa: {
        id: string;
        nome: string;
    };
    email: string;
    funcao: string;
    nivelAcesso: string;
    empresaId: string;
    membros: ({
        operacao: {
            id: string;
            nome: string;
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
    })[];
}[]>;
export declare function buscarUsuario(id: string, empresaId: string): Promise<{
    id: string;
    nome: string;
    empresa: {
        id: string;
        nome: string;
    };
    email: string;
    funcao: string;
    nivelAcesso: string;
    empresaId: string;
    membros: ({
        operacao: {
            id: string;
            nome: string;
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
    })[];
} | null>;
export interface ContaInput {
    nome: string;
    email: string;
    senha: string;
    funcao: string;
    nivelAcesso: string;
}
export declare function criarConta(empresaId: string, data: ContaInput): Promise<{
    id: string;
    nome: string;
    empresa: {
        id: string;
        nome: string;
    };
    email: string;
    funcao: string;
    nivelAcesso: string;
    empresaId: string;
    membros: ({
        operacao: {
            id: string;
            nome: string;
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
    })[];
}>;
export interface ContaUpdate {
    nome?: string;
    funcao?: string;
    nivelAcesso?: string;
    senha?: string;
}
export declare function atualizarConta(empresaId: string, id: string, data: ContaUpdate): Promise<{
    id: string;
    nome: string;
    empresa: {
        id: string;
        nome: string;
    };
    email: string;
    funcao: string;
    nivelAcesso: string;
    empresaId: string;
    membros: ({
        operacao: {
            id: string;
            nome: string;
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
    })[];
}>;
