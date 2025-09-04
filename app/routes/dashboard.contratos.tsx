import type { Route } from "./+types/dashboard";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Contratos - Dashboard Weedle" },
        { name: "description", content: "Gestão e análise de contratos" },
    ];
}

export default function DashboardContratos() {
    const contratos = [
        {
            id: "CTR-001",
            cliente: "Empresa ABC Ltda",
            produto: "Sistema ERP Premium",
            valor: "R$ 25.000,00",
            status: "Ativo",
            dataInicio: "01/01/2024",
            dataFim: "31/12/2024",
            renovacao: "Automática",
            responsavel: "João Silva"
        },
        {
            id: "CTR-002",
            cliente: "Comércio XYZ S.A.",
            produto: "Sistema de Vendas",
            valor: "R$ 18.500,00",
            status: "Ativo",
            dataInicio: "01/03/2024",
            dataFim: "28/02/2025",
            renovacao: "Manual",
            responsavel: "Maria Santos"
        },
        {
            id: "CTR-003",
            cliente: "Indústria DEF",
            produto: "Sistema de Produção",
            valor: "R$ 45.200,00",
            status: "Ativo",
            dataInicio: "01/06/2024",
            dataFim: "31/05/2025",
            renovacao: "Automática",
            responsavel: "Pedro Costa"
        },
        {
            id: "CTR-004",
            cliente: "Serviços GHI",
            produto: "Sistema de Gestão",
            valor: "R$ 12.800,00",
            status: "Expirado",
            dataInicio: "01/01/2024",
            dataFim: "31/12/2024",
            renovacao: "Manual",
            responsavel: "Ana Oliveira"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ativo': return 'bg-green-100 text-green-800';
            case 'Expirado': return 'bg-red-100 text-red-800';
            case 'Pendente': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRenovacaoColor = (renovacao: string) => {
        switch (renovacao) {
            case 'Automática': return 'bg-blue-100 text-blue-800';
            case 'Manual': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Gestão de Contratos</h1>
                <p className="mt-2 text-gray-600">Controle e acompanhamento de contratos ativos</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total de Contratos</p>
                            <p className="text-2xl font-semibold text-gray-900">55.538</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Contratos Ativos</p>
                            <p className="text-2xl font-semibold text-gray-900">52.847</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Valor Total</p>
                            <p className="text-2xl font-semibold text-gray-900">R$ 496.829.416</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Ticket Médio</p>
                            <p className="text-2xl font-semibold text-gray-900">R$ 9.745</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráfico de Status dos Contratos */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Status dos Contratos</h3>
                <div className="grid grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-xl">52.8k</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Ativos</p>
                        <p className="text-xs text-gray-500">95.2%</p>
                    </div>
                    <div className="text-center">
                        <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-xl">2.1k</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Pendentes</p>
                        <p className="text-xs text-gray-500">3.8%</p>
                    </div>
                    <div className="text-center">
                        <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-xl">0.6k</span>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Expirados</p>
                        <p className="text-xs text-gray-500">1.0%</p>
                    </div>
                </div>
            </div>

            {/* Tabela de Contratos */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Lista de Contratos</h3>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                            Novo Contrato
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Início</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Fim</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renovação</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {contratos.map((contrato) => (
                                <tr key={contrato.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contrato.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contrato.cliente}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contrato.produto}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{contrato.valor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contrato.status)}`}>
                                            {contrato.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contrato.dataInicio}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contrato.dataFim}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRenovacaoColor(contrato.renovacao)}`}>
                                            {contrato.renovacao}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contrato.responsavel}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                        <a href="#" className="hover:text-purple-800 mr-3">Ver</a>
                                        <a href="#" className="hover:text-purple-800">Editar</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
