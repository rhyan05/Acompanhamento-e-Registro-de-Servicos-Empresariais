export interface DiffLog {
    campo: string;
    valorAnterior: string | null;
    valorNovo: string | null;
}
export declare function diferenciarEdicao(atual: Record<string, any>, dados: Record<string, any>): {
    data: Record<string, any>;
    logs: DiffLog[];
};
