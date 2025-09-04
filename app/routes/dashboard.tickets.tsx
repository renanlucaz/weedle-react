import type { Route } from "./+types/dashboard";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Tickets - Dashboard Weedle" },
        { name: "description", content: "Gestão e análise de tickets de suporte" },
    ];
}

export default function DashboardTickets() {
    const tickets = [
        {
            id: "TKT-001",
            titulo: "Problema de acesso ao sistema",
            cliente: "Empresa ABC Ltda",
            prioridade: "Alta",
            status: "Em Andamento",
            categoria: "Suporte Técnico",
            criado: "15/01/2025",
            tempoResolucao: "2h 30min",
            responsavel: "João Silva"
        },
        {
            id: "TKT-002",
            titulo: "Dúvida sobre funcionalidade",
            cliente: "Comércio XYZ S.A.",
            prioridade: "Média",
            status: "Aberto",
            categoria: "Dúvidas",
            criado: "14/01/2025",
            tempoResolucao: "4h 15min",
            responsavel: "Maria Santos"
        },
        {
            id: "TKT-003",
            titulo: "Erro na importação de dados",
            cliente: "Indústria DEF",
            prioridade: "Alta",
            status: "Resolvido",
            categoria: "Bug",
            criado: "13/01/2025",
            tempoResolucao: "6h 45min",
            responsavel: "Pedro Costa"
        },
        {
            id: "TKT-004",
            titulo: "Solicitação de nova feature",
            cliente: "Serviços GHI",
            prioridade: "Baixa",
            status: "Em Análise",
            categoria: "Melhorias",
            criado: "12/01/2025",
            tempoResolucao: "1h 20min",
            responsavel: "Ana Oliveira"
        }
    ];

    const getPrioridadeColor = (prioridade: string) => {
        switch (prioridade) {
            case 'Alta': return 'bg-red-100 text-red-800';
            case 'Média': return 'bg-yellow-100 text-yellow-800';
            case 'Baixa': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Aberto': return 'bg-blue-100 text-blue-800';
            case 'Em Andamento': return 'bg-yellow-100 text-yellow-800';
            case 'Resolvido': return 'bg-green-100 text-green-800';
            case 'Em Análise': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Gestão de Tickets</h1>
                <p className="mt-2 text-gray-600">Controle e acompanhamento de tickets de suporte</p>
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
                            <p className="text-sm font-medium text-gray-500">Total de Tickets</p>
                            <p className="text-2xl font-semibold text-gray-900">156</p>
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
                            <p className="text-sm font-medium text-gray-500">Tempo Médio Resolução</p>
                            <p className="text-2xl font-semibold text-gray-900">9,77h</p>
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
                            <p className="text-sm font-medium text-gray-500">Resolvidos Hoje</p>
                            <p className="text-2xl font-semibold text-gray-900">23</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Satisfação</p>
                            <p className="text-2xl font-semibold text-gray-900">87%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráfico de Status dos Tickets */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Status dos Tickets</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-lg">45</span>
                        </div>
                        <p className="text-sm text-gray-600">Abertos</p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-lg">32</span>
                        </div>
                        <p className="text-sm text-gray-600">Em Andamento</p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-lg">28</span>
                        </div>
                        <p className="text-sm text-gray-600">Em Análise</p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-lg">51</span>
                        </div>
                        <p className="text-sm text-gray-600">Resolvidos</p>
                    </div>
                </div>
            </div>

            {/* Tabela de Tickets */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Lista de Tickets</h3>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                            Novo Ticket
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridade</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.titulo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.cliente}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPrioridadeColor(ticket.prioridade)}`}>
                                            {ticket.prioridade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.categoria}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.criado}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.tempoResolucao}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.responsavel}</td>
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
