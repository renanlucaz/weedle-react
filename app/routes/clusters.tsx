
import type { Route } from "./+types/clusters";
import { useState } from "react";
import { ClusterNetworkChart, ClusterDrawer } from "../components";

interface Cluster {
    id: string;
    name: string;
    size: number;
    color: string;
    x: number;
    y: number;
    description: string;
    metrics: {
        totalClients: number;
        avgTicket: string;
        frequency: string;
        lastOrder: string;
    };
    keywords: string[];
}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Clusters - Weedle" },
        { name: "description", content: "Análise de clusters de clientes e ações estratégicas" },
    ];
}

export default function Clusters() {
    const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Dados mockados dos clusters
    const clusters: Cluster[] = [
        {
            id: "cluster-1",
            name: "Clientes Premium",
            size: 120,
            color: "#8B5CF6",
            x: 0,
            y: 0,
            description: "Clientes de alto valor com frequência de compra elevada e ticket médio superior",
            metrics: {
                totalClients: 45,
                avgTicket: "R$ 2.450,00",
                frequency: "5x/semana",
                lastOrder: "15/01/2025"
            },
            keywords: [
                "COMPRAS FREQUENTES",
                "TICKET ALTO",
                "FIDELIDADE",
                "PRODUTOS PREMIUM",
                "ATENDIMENTO VIP",
                "ENTREGAS RÁPIDAS",
                "DESCONTOS EXCLUSIVOS",
                "SUPORTE PRIORITÁRIO"
            ]
        },
        {
            id: "cluster-2",
            name: "Clientes Regulares",
            size: 100,
            color: "#10B981",
            x: 0,
            y: 0,
            description: "Base sólida de clientes com padrão de compra consistente e moderado",
            metrics: {
                totalClients: 128,
                avgTicket: "R$ 1.200,00",
                frequency: "2x/semana",
                lastOrder: "18/01/2025"
            },
            keywords: [
                "COMPRAS REGULARES",
                "TICKET MÉDIO",
                "PRODUTOS BÁSICOS",
                "PROMOÇÕES",
                "ATENDIMENTO PADRÃO",
                "ENTREGAS NORMALS",
                "CUPONS",
                "CAMPANHAS"
            ]
        },
        {
            id: "cluster-3",
            name: "Clientes Ocasionais",
            size: 80,
            color: "#F59E0B",
            x: 0,
            y: 0,
            description: "Clientes com baixa frequência mas potencial de crescimento",
            metrics: {
                totalClients: 89,
                avgTicket: "R$ 850,00",
                frequency: "1x/mês",
                lastOrder: "05/01/2025"
            },
            keywords: [
                "COMPRAS OCASIONAIS",
                "TICKET BAIXO",
                "PRODUTOS BÁSICOS",
                "OFERTAS",
                "ATENDIMENTO BÁSICO",
                "ENTREGAS PADRÃO",
                "DESCONTOS",
                "REATIVAÇÃO"
            ]
        },
        {
            id: "cluster-4",
            name: "Novos Clientes",
            size: 60,
            color: "#EF4444",
            x: 0,
            y: 0,
            description: "Clientes recém-cadastrados em processo de onboarding",
            metrics: {
                totalClients: 67,
                avgTicket: "R$ 650,00",
                frequency: "1x/mês",
                lastOrder: "20/01/2025"
            },
            keywords: [
                "PRIMEIRA COMPRA",
                "ONBOARDING",
                "PRODUTOS INICIAIS",
                "BEM-VINDO",
                "ATENDIMENTO ESPECIAL",
                "ENTREGAS RÁPIDAS",
                "DESCONTO INICIAL",
                "ACOMPANHAMENTO"
            ]
        },
        {
            id: "cluster-5",
            name: "Clientes Corporativos",
            size: 140,
            color: "#06B6D4",
            x: 0,
            y: 0,
            description: "Empresas com volume alto de compras e contratos especiais",
            metrics: {
                totalClients: 23,
                avgTicket: "R$ 5.200,00",
                frequency: "3x/semana",
                lastOrder: "19/01/2025"
            },
            keywords: [
                "COMPRAS CORPORATIVAS",
                "TICKET ALTO",
                "CONTRATOS",
                "ATENDIMENTO DEDICADO",
                "ENTREGAS PROGRAMADAS",
                "DESCONTOS VOLUME",
                "SUPORTE TÉCNICO",
                "RELACIONAMENTO"
            ]
        },
        {
            id: "cluster-6",
            name: "Clientes Sazonais",
            size: 70,
            color: "#EC4899",
            x: 0,
            y: 0,
            description: "Clientes que compram apenas em períodos específicos do ano",
            metrics: {
                totalClients: 34,
                avgTicket: "R$ 1.800,00",
                frequency: "2x/ano",
                lastOrder: "12/12/2024"
            },
            keywords: [
                "COMPRAS SAZONAIS",
                "PERÍODOS ESPECÍFICOS",
                "PRODUTOS TEMÁTICOS",
                "CAMPANHAS SAZONAIS",
                "ATENDIMENTO ESPECIAL",
                "ENTREGAS URGENTES",
                "PROMOÇÕES TEMPORAIS",
                "LEMBRETE"
            ]
        }
    ];

    const handleClusterClick = (cluster: Cluster) => {
        setSelectedCluster(cluster);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedCluster(null);
    };

    // Filtrar clusters baseado na busca
    const filteredClusters = clusters.filter(cluster =>
        cluster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cluster.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cluster.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">Mapa de Clusters</h2>
                        <p className="text-sm text-gray-600">
                            Clique em um cluster para visualizar detalhes
                        </p>
                    </div>
                </div>
            </div>

            {/* Cluster Network Chart - Full Screen */}
            <div className="flex-1 bg-white overflow-hidden">
                <ClusterNetworkChart
                    clusters={filteredClusters}
                    onClusterClick={handleClusterClick}
                    selectedCluster={selectedCluster}
                />
            </div>

            {/* Cluster Drawer */}
            <ClusterDrawer
                cluster={selectedCluster}
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
            />
        </div>
    );
}
