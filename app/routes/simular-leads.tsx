import type { Route } from "./+types/simular-leads";
import { useState } from "react";
import DataTable from "~/components/DataTable";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Simular Leads - Weedle" },
        { name: "description", content: "Simule cenários de leads e clusters" },
    ];
}

interface SimulatedLead {
    id: string;
    name: string;
    cluster: string;
    churnRisk: number;
    nps: number;
    contractCount: number;
    contractValue: number;
    simulationDate: string;
}

export default function SimularLeads() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dados mockados para demonstração
    const simulatedLeads: SimulatedLead[] = [
        { id: "1", name: "TechCorp Solutions", cluster: "Tecnologia", churnRisk: 0.15, nps: 8.5, contractCount: 3, contractValue: 45000, simulationDate: "2024-01-15" },
        { id: "2", name: "Hospital São Lucas", cluster: "Saúde", churnRisk: 0.08, nps: 9.2, contractCount: 2, contractValue: 32000, simulationDate: "2024-01-14" },
        { id: "3", name: "Universidade Federal", cluster: "Educação", churnRisk: 0.22, nps: 7.8, contractCount: 1, contractValue: 18000, simulationDate: "2024-01-13" },
        { id: "4", name: "Banco Nacional", cluster: "Financeiro", churnRisk: 0.12, nps: 8.9, contractCount: 4, contractValue: 67000, simulationDate: "2024-01-12" },
        { id: "5", name: "Supermercado Central", cluster: "Varejo", churnRisk: 0.18, nps: 8.1, contractCount: 2, contractValue: 28000, simulationDate: "2024-01-11" },
        { id: "6", name: "AutoMega Concessionária", cluster: "Automotivo", churnRisk: 0.14, nps: 8.3, contractCount: 3, contractValue: 52000, simulationDate: "2024-01-10" },
        { id: "7", name: "Restaurante Gourmet", cluster: "Alimentício", churnRisk: 0.09, nps: 9.1, contractCount: 2, contractValue: 35000, simulationDate: "2024-01-09" },
        { id: "8", name: "Imobiliária Premium", cluster: "Imobiliário", churnRisk: 0.25, nps: 7.5, contractCount: 1, contractValue: 15000, simulationDate: "2024-01-08" },
        { id: "9", name: "Telecom Global", cluster: "Telecomunicações", churnRisk: 0.11, nps: 8.7, contractCount: 5, contractValue: 78000, simulationDate: "2024-01-07" },
        { id: "10", name: "Energia Verde Ltda", cluster: "Energia", churnRisk: 0.16, nps: 8.4, contractCount: 2, contractValue: 41000, simulationDate: "2024-01-06" },
    ];

    const totalSimulated = simulatedLeads.length;
    const totalConverted = simulatedLeads.filter(lead => lead.churnRisk < 0.15).length;
    const modelAccuracy = 87.5;

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
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    // Preparar dados para o DataTable
    const tableData = simulatedLeads.map(lead => ({
        ...lead,
        churnRiskFormatted: formatPercentage(lead.churnRisk),
        contractValueFormatted: formatCurrency(lead.contractValue),
        simulationDateFormatted: formatDate(lead.simulationDate),
        churnRiskColor: lead.churnRisk < 0.1 ? 'text-green-600' :
            lead.churnRisk < 0.2 ? 'text-yellow-600' : 'text-red-600',
        actions: (
            <button className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors duration-200 cursor-pointer">
                Ver detalhes
            </button>
        )
    }));

    // Definir colunas para o DataTable
    const columns = [
        { key: 'name' as keyof typeof tableData[0], label: 'Nome', sortable: true },
        { key: 'cluster' as keyof typeof tableData[0], label: 'Cluster', sortable: true },
        { key: 'churnRiskFormatted' as keyof typeof tableData[0], label: 'Risco de Churn', sortable: true },
        { key: 'nps' as keyof typeof tableData[0], label: 'NPS', sortable: true },
        { key: 'contractCount' as keyof typeof tableData[0], label: 'Qtd. Contratos', sortable: true },
        { key: 'contractValueFormatted' as keyof typeof tableData[0], label: 'Valor do Contrato', sortable: true },
        { key: 'simulationDateFormatted' as keyof typeof tableData[0], label: 'Data da Simulação', sortable: true },
        { key: 'actions' as keyof typeof tableData[0], label: 'Ver Detalhes', sortable: false }
    ];

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                {/* Card 2: Leads Convertidos */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Leads Convertidos</p>
                            <p className="text-2xl font-bold text-gray-900">{totalConverted}</p>
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
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Simular Novo Lead</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Cluster
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                                        <option value="">Selecione um cluster</option>
                                        <option value="tecnologia">Tecnologia</option>
                                        <option value="saude">Saúde</option>
                                        <option value="educacao">Educação</option>
                                        <option value="financeiro">Financeiro</option>
                                        <option value="varejo">Varejo</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Risco de Churn
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        NPS
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantidade de Contratos
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Valor do Contrato
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1000"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
