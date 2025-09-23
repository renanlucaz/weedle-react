
import type { Route } from "./+types/clusters";
import { useState } from "react";
import { ClusterNetworkChart } from "../components";
import { useClusters } from "../hooks";

// Interface para o cluster formatado para a UI
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
        totalTicketsAbertos: number;
        totalDescontoConcedido: number;
        mediaNps: number;
        qtdAvaliacoesNps: number;
        qtdContratos: number;
        valorTotalContratado: number;
        mediaDiasResolucaoTicket: number;
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

    // Hook para buscar dados dos clusters da API
    const { clusters, isLoading, isError } = useClusters();

    const handleClusterClick = (cluster: Cluster) => {
        setSelectedCluster(cluster);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedCluster(null);
    };

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
                {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Carregando clusters...</p>
                        </div>
                    </div>
                ) : isError ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-red-500 text-6xl mb-4">⚠️</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar clusters</h3>
                            <p className="text-gray-600">Não foi possível carregar os dados dos clusters.</p>
                        </div>
                    </div>
                ) : (
                    <ClusterNetworkChart
                        clusters={clusters}
                        onClusterClick={handleClusterClick}
                        selectedCluster={selectedCluster}
                    />
                )}
            </div>

        </div>
    );
}
