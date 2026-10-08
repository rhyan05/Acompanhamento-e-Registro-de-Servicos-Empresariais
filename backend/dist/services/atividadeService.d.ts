export interface FiltrosAtividade {
    status?: string;
    responsavelId?: string;
    prioridade?: string;
    operacaoId?: string;
    equipeId?: string;
    fluxoId?: string;
    etapaAtualId?: string;
}
export declare function listarAtividades(userId: string, nivel: string, empresaId: string, filtros: FiltrosAtividade): Promise<({
    operacao: {
        id: string;
        nome: string;
    };
    responsavel: {
        id: string;
        nome: string;
        email: string;
    };
    solicitante: {
        id: string;
        nome: string;
    } | null;
    criadoPor: {
        id: string;
        nome: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    fluxo: {
        id: string;
        nome: string;
    } | null;
    etapaAtual: {
        id: string;
        nome: string;
        ordem: number;
    } | null;
    responsaveis: ({
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        usuarioId: string;
        atividadeId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
})[]>;
export declare function buscarAtividade(id: string, empresaId: string): Promise<({
    movimentacoes: ({
        etapaOrigem: {
            id: string;
            nome: string;
            ordem: number;
        } | null;
        etapaDestino: {
            id: string;
            nome: string;
            ordem: number;
        } | null;
        movidoPor: {
            id: string;
            nome: string;
        };
    } & {
        id: string;
        timestamp: Date;
        atividadeId: string;
        tipo: string;
        obs: string | null;
        etapaOrigemId: string | null;
        etapaDestinoId: string | null;
        movidoPorId: string;
    })[];
    casos: {
        id: string;
        createdAt: Date;
        status: string;
        titulo: string;
        descricao: string;
        operacaoId: string;
        atividadeId: string | null;
        equipeId: string | null;
        registradoPorId: string;
    }[];
    operacao: {
        id: string;
        nome: string;
    };
    historico: {
        id: string;
        usuarioId: string;
        acaoExecutada: string;
        campo: string | null;
        valorAnterior: string | null;
        valorNovo: string | null;
        alteracaoEstado: string | null;
        timestamp: Date;
        atividadeId: string;
    }[];
    responsavel: {
        id: string;
        nome: string;
        email: string;
    };
    solicitante: {
        id: string;
        nome: string;
    } | null;
    criadoPor: {
        id: string;
        nome: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    fluxo: ({
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
    }) | null;
    etapaAtual: {
        id: string;
        nome: string;
        ordem: number;
    } | null;
    responsaveis: ({
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        usuarioId: string;
        atividadeId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
}) | null>;
export interface AtividadeInput {
    titulo: string;
    descricao?: string;
    responsavelId?: string;
    solicitanteId?: string;
    prioridade?: string;
    prazoEstimado?: string;
    operacaoId?: string;
    fluxoId?: string;
    etapaAtualId?: string;
}
export declare function criarAtividade(data: AtividadeInput, userId: string, empresaId: string): Promise<({
    operacao: {
        id: string;
        nome: string;
    };
    responsavel: {
        id: string;
        nome: string;
        email: string;
    };
    solicitante: {
        id: string;
        nome: string;
    } | null;
    criadoPor: {
        id: string;
        nome: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    fluxo: {
        id: string;
        nome: string;
    } | null;
    etapaAtual: {
        id: string;
        nome: string;
        ordem: number;
    } | null;
    responsaveis: ({
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        usuarioId: string;
        atividadeId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
}) | null>;
export interface EdicaoInput {
    titulo?: string;
    descricao?: string;
    prioridade?: string;
    responsavelId?: string;
    prazoEstimado?: string | null;
}
export declare function editarAtividade(id: string, dados: EdicaoInput, userId: string, empresaId: string): Promise<({
    operacao: {
        id: string;
        nome: string;
    };
    responsavel: {
        id: string;
        nome: string;
        email: string;
    };
    solicitante: {
        id: string;
        nome: string;
    } | null;
    criadoPor: {
        id: string;
        nome: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    fluxo: {
        id: string;
        nome: string;
    } | null;
    etapaAtual: {
        id: string;
        nome: string;
        ordem: number;
    } | null;
    responsaveis: ({
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        usuarioId: string;
        atividadeId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
}) | null>;
export declare function atualizarStatus(id: string, status: string, userId: string, empresaId: string): Promise<{
    operacao: {
        id: string;
        nome: string;
    };
    responsavel: {
        id: string;
        nome: string;
        email: string;
    };
    solicitante: {
        id: string;
        nome: string;
    } | null;
    criadoPor: {
        id: string;
        nome: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    fluxo: {
        id: string;
        nome: string;
    } | null;
    etapaAtual: {
        id: string;
        nome: string;
        ordem: number;
    } | null;
    responsaveis: ({
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        usuarioId: string;
        atividadeId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
}>;
export declare function avancarEtapa(id: string, userId: string, empresaId: string): Promise<{
    operacao: {
        id: string;
        nome: string;
    };
    responsavel: {
        id: string;
        nome: string;
        email: string;
    };
    solicitante: {
        id: string;
        nome: string;
    } | null;
    criadoPor: {
        id: string;
        nome: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    fluxo: {
        id: string;
        nome: string;
    } | null;
    etapaAtual: {
        id: string;
        nome: string;
        ordem: number;
    } | null;
    responsaveis: ({
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        usuarioId: string;
        atividadeId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
}>;
export declare function retornarEtapa(id: string, userId: string, empresaId: string): Promise<{
    operacao: {
        id: string;
        nome: string;
    };
    responsavel: {
        id: string;
        nome: string;
        email: string;
    };
    solicitante: {
        id: string;
        nome: string;
    } | null;
    criadoPor: {
        id: string;
        nome: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    fluxo: {
        id: string;
        nome: string;
    } | null;
    etapaAtual: {
        id: string;
        nome: string;
        ordem: number;
    } | null;
    responsaveis: ({
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        usuarioId: string;
        atividadeId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
}>;
export declare function adicionarResponsavel(atividadeId: string, usuarioId: string, userId: string, empresaId: string): Promise<({
    movimentacoes: ({
        etapaOrigem: {
            id: string;
            nome: string;
            ordem: number;
        } | null;
        etapaDestino: {
            id: string;
            nome: string;
            ordem: number;
        } | null;
        movidoPor: {
            id: string;
            nome: string;
        };
    } & {
        id: string;
        timestamp: Date;
        atividadeId: string;
        tipo: string;
        obs: string | null;
        etapaOrigemId: string | null;
        etapaDestinoId: string | null;
        movidoPorId: string;
    })[];
    casos: {
        id: string;
        createdAt: Date;
        status: string;
        titulo: string;
        descricao: string;
        operacaoId: string;
        atividadeId: string | null;
        equipeId: string | null;
        registradoPorId: string;
    }[];
    operacao: {
        id: string;
        nome: string;
    };
    historico: {
        id: string;
        usuarioId: string;
        acaoExecutada: string;
        campo: string | null;
        valorAnterior: string | null;
        valorNovo: string | null;
        alteracaoEstado: string | null;
        timestamp: Date;
        atividadeId: string;
    }[];
    responsavel: {
        id: string;
        nome: string;
        email: string;
    };
    solicitante: {
        id: string;
        nome: string;
    } | null;
    criadoPor: {
        id: string;
        nome: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    fluxo: ({
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
    }) | null;
    etapaAtual: {
        id: string;
        nome: string;
        ordem: number;
    } | null;
    responsaveis: ({
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        usuarioId: string;
        atividadeId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
}) | null>;
export declare function removerResponsavel(atividadeId: string, usuarioId: string, userId: string, empresaId: string): Promise<({
    movimentacoes: ({
        etapaOrigem: {
            id: string;
            nome: string;
            ordem: number;
        } | null;
        etapaDestino: {
            id: string;
            nome: string;
            ordem: number;
        } | null;
        movidoPor: {
            id: string;
            nome: string;
        };
    } & {
        id: string;
        timestamp: Date;
        atividadeId: string;
        tipo: string;
        obs: string | null;
        etapaOrigemId: string | null;
        etapaDestinoId: string | null;
        movidoPorId: string;
    })[];
    casos: {
        id: string;
        createdAt: Date;
        status: string;
        titulo: string;
        descricao: string;
        operacaoId: string;
        atividadeId: string | null;
        equipeId: string | null;
        registradoPorId: string;
    }[];
    operacao: {
        id: string;
        nome: string;
    };
    historico: {
        id: string;
        usuarioId: string;
        acaoExecutada: string;
        campo: string | null;
        valorAnterior: string | null;
        valorNovo: string | null;
        alteracaoEstado: string | null;
        timestamp: Date;
        atividadeId: string;
    }[];
    responsavel: {
        id: string;
        nome: string;
        email: string;
    };
    solicitante: {
        id: string;
        nome: string;
    } | null;
    criadoPor: {
        id: string;
        nome: string;
    } | null;
    equipe: {
        id: string;
        nome: string;
    } | null;
    fluxo: ({
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
    }) | null;
    etapaAtual: {
        id: string;
        nome: string;
        ordem: number;
    } | null;
    responsaveis: ({
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        usuarioId: string;
        atividadeId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
}) | null>;
export declare function excluirAtividade(id: string, userId: string, empresaId: string): Promise<{
    id: string;
    createdAt: Date;
    status: string;
    titulo: string;
    descricao: string | null;
    prioridade: string;
    responsavelId: string;
    prazoEstimado: Date | null;
    operacaoId: string;
    solicitanteId: string | null;
    criadoPorId: string | null;
    equipeId: string | null;
    fluxoId: string | null;
    etapaAtualId: string | null;
    dataInicio: Date | null;
    dataConclusao: Date | null;
    tempoGastoMin: number | null;
    deletedAt: Date | null;
}>;
