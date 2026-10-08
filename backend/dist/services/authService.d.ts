export interface RegistroEmpresaInput {
    empresaNome: string;
    nome: string;
    email: string;
    senha: string;
    funcao?: string;
}
export declare function registrarEmpresa(data: RegistroEmpresaInput): Promise<{
    erro: "Email já cadastrado";
    usuario?: undefined;
    empresa?: undefined;
} | {
    usuario: {
        id: string;
        nome: string;
        email: string;
        funcao: string;
        nivelAcesso: string;
        empresaId: string;
    };
    empresa: {
        id: string;
        nome: string;
        createdAt: Date;
    };
    erro?: undefined;
}>;
export declare function autenticar(email: string, senha: string): Promise<{
    token: string;
    usuario: {
        id: string;
        nome: string;
        email: string;
        funcao: string;
        nivelAcesso: string;
        empresaId: string;
        empresa: {
            id: string;
            nome: string;
        };
    };
} | null>;
