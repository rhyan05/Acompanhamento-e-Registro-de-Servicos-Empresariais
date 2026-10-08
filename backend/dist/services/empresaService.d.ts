export declare function criarEmpresa(nome: string): Promise<{
    id: string;
    nome: string;
    createdAt: Date;
}>;
export declare function buscarEmpresa(id: string): Promise<{
    id: string;
    nome: string;
} | null>;
