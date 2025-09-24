import type { Route } from "./+types/simular-leads";
import { useState } from "react";
import DataTable from "~/components/DataTable";
import { useGetLeadsQuery, useSimulateLeadMutation } from "~/store/api/api";
import type { SimulatedLead, SimulateLeadRequest, SimulateLeadResponse } from "~/store/api/types";
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
    const [currentTab, setCurrentTab] = useState<'form' | 'result'>('form');
    const [formData, setFormData] = useState<SimulateLeadRequest>({
        cnpj: '',
        nome_empresa: '',
        segmento: '',
        capital_social: null,
        email: '',
        produto: '',
        valor_contrato: null,
    });
    const [simulationResult, setSimulationResult] = useState<SimulateLeadResponse | null>(null);
    const [snackbar, setSnackbar] = useState<{ show: boolean; message: string; type: 'error' | 'success' }>({
        show: false,
        message: '',
        type: 'error'
    });

    // Buscar dados da API
    const { data: leadsData, isLoading, error } = useGetLeadsQuery();
    const [simulateLead, { isLoading: isSimulating }] = useSimulateLeadMutation();

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

    // Funções para lidar com o formulário
    const handleInputChange = (field: keyof SimulateLeadRequest, value: string | number | null) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar se os campos numéricos obrigatórios foram preenchidos
        if (formData.capital_social === null || formData.valor_contrato === null) {
            setSnackbar({
                show: true,
                message: 'Por favor, preencha todos os campos obrigatórios.',
                type: 'error'
            });
            return;
        }

        try {
            // Preparar dados para envio, convertendo null para 0 se necessário
            const dataToSend = {
                ...formData,
                capital_social: formData.capital_social || 0,
                valor_contrato: formData.valor_contrato || 0,
            };

            const result = await simulateLead(dataToSend).unwrap();
            setSimulationResult(result);
            setCurrentTab('result');
            setSnackbar({
                show: true,
                message: result.message,
                type: 'success'
            });
        } catch (error: any) {
            setSnackbar({
                show: true,
                message: error?.data?.message || 'Erro ao simular lead. Tente novamente.',
                type: 'error'
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTab('form');
        setFormData({
            cnpj: '',
            nome_empresa: '',
            segmento: '',
            capital_social: null,
            email: '',
            produto: '',
            valor_contrato: null,
        });
        setSimulationResult(null);
    };

    const handleNewSimulation = () => {
        setCurrentTab('form');
        setSimulationResult(null);
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
                                <h3 className="text-lg font-medium text-gray-900">
                                    {currentTab === 'form' ? 'Simular Novo Lead' : 'Resultado da Simulação'}
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {currentTab === 'form' ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* CNPJ - linha completa */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            CNPJ <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.cnpj}
                                            onChange={(e) => handleInputChange('cnpj', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                                        />
                                    </div>

                                    {/* Nome Empresa e Segmento - duas colunas */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nome Empresa <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.nome_empresa}
                                                onChange={(e) => handleInputChange('nome_empresa', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Segmento <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.segmento}
                                                onChange={(e) => handleInputChange('segmento', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                                            />
                                        </div>
                                    </div>

                                    {/* Capital Social e Valor Contrato - duas colunas */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Capital Social <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                value={formData.capital_social || ''}
                                                onChange={(e) => handleInputChange('capital_social', e.target.value ? Number(e.target.value) : null)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Valor Contrato <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                value={formData.valor_contrato || ''}
                                                onChange={(e) => handleInputChange('valor_contrato', e.target.value ? Number(e.target.value) : null)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                                            />
                                        </div>
                                    </div>

                                    {/* Email - linha completa */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                                        />
                                    </div>

                                    {/* Produto - linha completa */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Produto <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.produto}
                                            onChange={(e) => handleInputChange('produto', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                                        />
                                    </div>

                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSimulating}
                                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSimulating ? 'Simulando...' : 'Simular'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    {simulationResult && (
                                        <>
                                            <div className="bg-green-50 border border-green-200 rounded-md p-4">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-green-800">
                                                            {simulationResult.message}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-green-700">
                                                            Lead ID: {simulationResult.lead_id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-md p-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-3">Dados do Lead Simulado:</h4>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <span className="font-medium text-gray-700">CNPJ:</span>
                                                        <p className="text-gray-900">{simulationResult.data.cnpj}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Empresa:</span>
                                                        <p className="text-gray-900">{simulationResult.data.nome_empresa}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Segmento:</span>
                                                        <p className="text-gray-900">{simulationResult.data.segmento}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Capital Social:</span>
                                                        <p className="text-gray-900">{formatCurrency(simulationResult.data.capital_social)}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Email:</span>
                                                        <p className="text-gray-900">{simulationResult.data.email}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Produto:</span>
                                                        <p className="text-gray-900">{simulationResult.data.produto}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Valor Contrato:</span>
                                                        <p className="text-gray-900">{formatCurrency(simulationResult.data.valor_contrato)}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <span className="font-medium text-gray-700">Cluster:</span>
                                                        <p className="text-purple-600 font-semibold text-lg">{simulationResult.data.cluster_name}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <span className="font-medium text-gray-700">Data Simulação:</span>
                                                        <p className="text-gray-900">{formatDate(simulationResult.data.data_simulacao)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleNewSimulation}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                                        >
                                            Nova Simulação
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                                        >
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Snackbar */}
            {snackbar.show && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className={`rounded-md p-4 shadow-lg ${snackbar.type === 'error'
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-green-50 border border-green-200'
                        }`}>
                        <div className="flex">
                            <div className="flex-shrink-0">
                                {snackbar.type === 'error' ? (
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className={`text-sm font-medium ${snackbar.type === 'error' ? 'text-red-800' : 'text-green-800'
                                    }`}>
                                    {snackbar.message}
                                </p>
                            </div>
                            <div className="ml-auto pl-3">
                                <button
                                    onClick={() => setSnackbar(prev => ({ ...prev, show: false }))}
                                    className={`inline-flex rounded-md p-1.5 ${snackbar.type === 'error'
                                        ? 'text-red-500 hover:bg-red-100'
                                        : 'text-green-500 hover:bg-green-100'
                                        }`}
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
