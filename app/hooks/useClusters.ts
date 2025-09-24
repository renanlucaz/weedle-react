import { useGetClustersQuery } from '../store/api/api';

// Interface para o cluster formatado para a UI
export interface ClusterUI {
    id: string;
    name: string;
    size: number;
    color: string;
    x: number;
    y: number;
    description: string;
    comportamento: string;
    acoes: string[];
    metrics: {
        totalClients: number;
        avgTicket: string;
        frequency: string;
        lastOrder: string;
        totalTicketsAbertos: number;
        totalDescontoConcedido: number;
        mediaNps: number;
        qtdAvaliacoesNps: number;
        qtdContratos: number;
        valorTotalContratado: string;
        mediaDiasResolucaoTicket: number;
    };
    keywords: string[];
}

// Cores para os clusters baseadas no ID
const clusterColors = [
    "#F59E0B", // Engajamento Moderado
    "#8B5CF6", // Clientes Inativos
    "#10B981", // Clientes Premium
    "#06B6D4", // Clientes Neutros
    "#EF4444", // Clientes Críticos
];

// Keywords baseadas no tipo de cluster
const getClusterKeywords = (clusterId: number, description: string): string[] => {
    const keywordsMap: { [key: number]: string[] } = {
        0: [ // Engajamento Moderado
            "COMPRAS FREQUENTES",
            "TICKET ALTO",
            "FIDELIDADE",
            "PRODUTOS PREMIUM",
            "ATENDIMENTO VIP",
            "ENTREGAS RÁPIDAS",
            "DESCONTOS EXCLUSIVOS",
            "SUPORTE PRIORITÁRIO"
        ],
        1: [ // Clientes Inativos
            "COMPRAS REGULARES",
            "TICKET MÉDIO",
            "PRODUTOS BÁSICOS",
            "PROMOÇÕES",
            "ATENDIMENTO PADRÃO",
            "ENTREGAS NORMALS",
            "CUPONS",
            "CAMPANHAS"
        ],
        2: [ // Clientes Premium
            "COMPRAS OCASIONAIS",
            "TICKET BAIXO",
            "PRODUTOS BÁSICOS",
            "OFERTAS",
            "ATENDIMENTO BÁSICO",
            "ENTREGAS PADRÃO",
            "DESCONTOS",
            "REATIVAÇÃO"
        ],
        3: [ // Clientes Neutros
            "PRIMEIRA COMPRA",
            "ONBOARDING",
            "PRODUTOS INICIAIS",
            "BEM-VINDO",
            "ATENDIMENTO ESPECIAL",
            "ENTREGAS RÁPIDAS",
            "DESCONTO INICIAL",
            "ACOMPANHAMENTO"
        ],
        4: [ // Clientes Críticos
            "COMPRAS CORPORATIVAS",
            "TICKET ALTO",
            "CONTRATOS",
            "ATENDIMENTO DEDICADO",
            "ENTREGAS PROGRAMADAS",
            "DESCONTOS VOLUME",
            "SUPORTE TÉCNICO",
            "RELACIONAMENTO"
        ]
    };

    return keywordsMap[clusterId] || [];
};

// Função para formatar valores monetários
const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

// Função para calcular frequência baseada nos dados
const calculateFrequency = (qtdContratos: number, nClients: number): string => {
    if (qtdContratos === 0) return "0x/mês";
    const avg = qtdContratos / nClients;
    if (avg >= 5) return "5x/semana";
    if (avg >= 3) return "3x/semana";
    if (avg >= 2) return "2x/semana";
    if (avg >= 1) return "1x/semana";
    return "1x/mês";
};

// Função para calcular ticket médio
const calculateAvgTicket = (valorTotalContratado: number, qtdContratos: number): string => {
    if (qtdContratos === 0) return "R$ 0,00";
    const avg = valorTotalContratado / qtdContratos;
    return formatCurrency(avg);
};

export const useClusters = () => {
    const { data, isLoading, isError, isFetching } = useGetClustersQuery();

    // Transformar dados da API para o formato da UI
    const clusters: ClusterUI[] = data?.clusters?.map((cluster, index) => ({
        id: `cluster-${cluster.cluster_id}`,
        name: cluster.descricao,
        size: cluster.n_clients,
        color: clusterColors[cluster.cluster_id] || clusterColors[index % clusterColors.length],
        x: 0, // Será calculado pelo gráfico
        y: 0, // Será calculado pelo gráfico
        description: cluster.descricao,
        comportamento: cluster.comportamento || "Análise comportamental não disponível",
        acoes: cluster.acoes?.map(acao => acao.acao) || [],
        metrics: {
            totalClients: cluster.n_clients,
            avgTicket: calculateAvgTicket(cluster.valor_total_contratado, cluster.qtd_contratos),
            frequency: calculateFrequency(cluster.qtd_contratos, cluster.n_clients),
            lastOrder: "15/01/2025", // Mock data - não disponível na API
            totalTicketsAbertos: cluster.total_tickets_abertos,
            totalDescontoConcedido: cluster.total_desconto_concedido,
            mediaNps: cluster.media_nps,
            qtdAvaliacoesNps: cluster.qtd_avaliacoes_nps,
            qtdContratos: cluster.qtd_contratos,
            valorTotalContratado: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(cluster.valor_total_contratado),
            mediaDiasResolucaoTicket: cluster.media_dias_resolucao_ticket,
        },
        keywords: getClusterKeywords(cluster.cluster_id, cluster.descricao),
    })) || [];

    return {
        clusters,
        isLoading,
        isError,
        isFetching,
    };
};
