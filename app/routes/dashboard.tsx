import type { Route } from "./+types/dashboard";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Dashboard - Weedle" },
        { name: "description", content: "Dashboard principal com métricas e análises" },
    ];
}

export default function Dashboard() {
    return (
        <div className="p-8 space-y-6 rounded-lg">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Visão geral das métricas e performance do sistema
                </p>
            </div>



            {/* Stats Cards - Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="py-5">
                        <div className="flex items-center">
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Clientes com contrato ativo</dt>
                                    <dd className="text-2xl font-bold text-purple-600">7.965</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="py-5">
                        <div className="flex items-center">
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">NPS</dt>
                                    <dd className="text-2xl font-bold text-purple-600">75%</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="py-5">
                        <div className="flex items-center">
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Valor financeiro total</dt>
                                    <dd className="text-2xl font-bold text-purple-600">R$ 496.829.416</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="py-5">
                        <div className="flex items-center">
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Contratos totais ativos</dt>
                                    <dd className="text-2xl font-bold text-purple-600">55.538</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="py-5">
                        <div className="flex items-center">
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Média de dias de resolução de ticket</dt>
                                    <dd className="text-2xl font-bold text-purple-600">9,77</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="py-5">
                        <div className="flex items-center">
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Ticket médio</dt>
                                    <dd className="text-2xl font-bold text-purple-600">R$ 9.745</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Segmentações Table - Middle Section */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Segmentações</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPS</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renda estimada</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canal mais utilizado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última compra</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Clientes leais</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$12.412,00</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Portal TOTVS</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/12/14</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                    <a href="#" className="hover:text-purple-800">Ver detalhes</a>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Risco de churn</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$12.412,00</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Portal TOTVS</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/12/14</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                    <a href="#" className="hover:text-purple-800">Ver detalhes</a>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Novas oportunidade</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$12.412,00</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Portal TOTVS</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/12/14</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                    <a href="#" className="hover:text-purple-800">Ver detalhes</a>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Baixo rendimento</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$12.412,00</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Portal TOTVS</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/12/14</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                    <a href="#" className="hover:text-purple-800">Ver detalhes</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
