import type { Route } from "./+types/simular-leads";
import { useState } from "react";
import DataTable from "~/components/DataTable";
import { useGetLeadsQuery } from "~/store/api/api";
import type { SimulatedLead } from "~/store/api/types";
import { ClientStatsSkeleton, ClientTableSkeleton } from "~/components/ClientSkeleton";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Simular Leads - Weedle" },
        { name: "description", content: "Simule cenários de leads e clusters" },
    ];
}

// Interface local para dados formatados da tabela
interface FormattedLead extends SimulatedLead {
    capitalFormatted: string;
    contractValueFormatted: string;
    simulationDateFormatted: string;
}

export default function SimularLeads() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Buscar dados da API
    const { data: leadsData, isLoading, error } = useGetLeadsQuery();

    const simulatedLeads = leadsData?.leads || [];
    const totalSimulated = leadsData?.total || 0;
    const modelAccuracy = 96.2;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatPercentage = (value: number) => {
        return `${(value * 100).toFixed(1)}%`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Preparar dados para o DataTable
    const tableData: FormattedLead[] = simulatedLeads.map(lead => ({
        ...lead,
        capitalFormatted: formatCurrency(lead.capital_social),
        contractValueFormatted: formatCurrency(lead.valor_contrato),
        simulationDateFormatted: formatDate(lead.data_simulacao),
    }));

    // Definir colunas para o DataTable
    const columns = [
        { key: 'cnpj' as keyof FormattedLead, label: 'CNPJ', sortable: true },
        { key: 'nome_empresa' as keyof FormattedLead, label: 'Nome Empresa', sortable: true },
        { key: 'segmento' as keyof FormattedLead, label: 'Segmento', sortable: true },
        { key: 'capitalFormatted' as keyof FormattedLead, label: 'Capital Social', sortable: true },
        { key: 'email' as keyof FormattedLead, label: 'Email', sortable: true },
        { key: 'produto' as keyof FormattedLead, label: 'Produto', sortable: true },
        { key: 'contractValueFormatted' as keyof FormattedLead, label: 'Valor Contrato', sortable: true },
        { key: 'cluster_name' as keyof FormattedLead, label: 'Cluster', sortable: true },
        { key: 'simulationDateFormatted' as keyof FormattedLead, label: 'Data Simulação', sortable: true },
    ];

    // Tratamento de loading e erro
    if (isLoading) {
        return (
            <div className="p-8 space-y-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Simular Leads</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Simule diferentes cenários de leads para otimizar seus clusters
                            </p>
                        </div>
                        <div className="bg-gray-200 rounded-lg px-4 py-3 animate-pulse">
                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Cards de informações com skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ClientStatsSkeleton />
                    <ClientStatsSkeleton />
                </div>

                {/* Tabela com skeleton */}
                <ClientTableSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 space-y-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar dados</h3>
                        <p className="text-gray-600">Não foi possível carregar os leads simulados. Tente novamente mais tarde.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Simular Leads</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Simule diferentes cenários de leads para otimizar seus clusters
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Simular Novo Lead
                    </button>
                </div>
            </div>

            {/* Sessão 1: Cards de Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1: Leads Simulados */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Leads Simulados</p>
                            <p className="text-2xl font-bold text-gray-900">{totalSimulated}</p>
                        </div>
                    </div>
                </div>


                {/* Card 3: Acurácia do Modelo */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Acurácia do Modelo</p>
                            <p className="text-2xl font-bold text-gray-900">{modelAccuracy}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sessão 2: Tabela de Leads Simulados */}
            <DataTable
                data={tableData}
                columns={columns}
                title="Leads Simulados"
                searchPlaceholder="Pesquisar..."
                itemsPerPage={6}
            />

            {/* Modal de Simular Novo Lead */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-[2px] bg-black/30 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Simular Novo Lead</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form className="space-y-4">
                                {[
                                    { label: "CNPJ", type: "text" },
                                    { label: "Nome Empresa", type: "text" },
                                    { label: "Segmento", type: "text" },
                                    { label: "Capital Social", type: "number" },
                                    { label: "Email", type: "email" },
                                    { label: "Produto", type: "text" },
                                    { label: "Valor Contrato", type: "number" },
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                ))}

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                                    >
                                        Simular
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
