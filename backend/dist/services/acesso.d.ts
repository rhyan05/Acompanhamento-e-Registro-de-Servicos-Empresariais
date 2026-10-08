export { operacaoPermitida } from './escopoCalculos.js';
export declare function operacoesAcessiveis(userId: string, empresaId: string, nivel: string): Promise<{
    todas: boolean;
    ids: string[];
}>;
export declare function assertOperacaoDaEmpresa(operacaoId: string, empresaId: string): Promise<{
    id: string;
    nome: string;
    createdAt: Date;
    empresaId: string;
    descricao: string | null;
}>;
export declare function assertAcessoOperacao(operacaoId: string, userId: string, empresaId: string, nivel: string): Promise<void>;
