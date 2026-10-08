export declare function listarDepartamentos(empresaId: string, operacaoId?: string): Promise<{
    id: string;
    nome: string;
    operacaoId: string;
}[]>;
export declare function criarDepartamento(empresaId: string, nome: string, operacaoId: string): Promise<{
    id: string;
    nome: string;
    operacaoId: string;
}>;
export declare function atualizarDepartamento(empresaId: string, id: string, nome: string): Promise<{
    id: string;
    nome: string;
    operacaoId: string;
}>;
export declare function excluirDepartamento(empresaId: string, id: string): Promise<void>;
