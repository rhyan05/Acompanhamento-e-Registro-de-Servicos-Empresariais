export interface AtividadeConcluida {
    prazoEstimado: Date | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
}
export declare function calcularAderenciaPrazos(atividades: AtividadeConcluida[]): number;
export declare function calcularTma(atividades: AtividadeConcluida[]): number;
