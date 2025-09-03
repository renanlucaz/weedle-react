import type { Route } from "./+types/dashboard";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Dashboard - Weedle" },
        { name: "description", content: "Dashboard principal com métricas e análises" },
    ];
}

export default function Dashboard() {
    return (
        <div className="p-8 space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Visão geral das métricas e performance do sistema
                </p>
            </div>

            {/* Stats Cards - Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="py-5">
                        <div className="flex items-center">
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total de clientes</dt>
                                    <dd className="text-2xl font-bold text-purple-600">10.412</dd>
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
                                    <dt className="text-sm font-medium text-gray-500 truncate">Receita média</dt>
                                    <dd className="text-2xl font-bold text-purple-600">R$12.020</dd>
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
                                    <dt className="text-sm font-medium text-gray-500 truncate">Clientes ativos</dt>
                                    <dd className="text-2xl font-bold text-purple-600">5.369</dd>
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
                                    <dd className="text-2xl font-bold text-purple-600">95</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Segmentações Table - Middle Section */}
            <div className="bg-white shadow rounded-lg">
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
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Clientes leais</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$12.412,00</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Portal TOTVS</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/12/14</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                    <a href="#" className="hover:text-purple-800">Ver detalhes</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Risco de churn</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$12.412,00</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Portal TOTVS</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/12/14</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                    <a href="#" className="hover:text-purple-800">Ver detalhes</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Novas oportunidade</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$12.412,00</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Portal TOTVS</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12/12/14</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                                    <a href="#" className="hover:text-purple-800">Ver detalhes</a>
                                </td>
                            </tr>
                            <tr>
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

            {/* Charts Section - Bottom Section - 2x2 Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top-Left Chart - Horizontal Bar Chart */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Receita média por cluster</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <div className="w-full h-full p-4">
                            <div className="flex flex-col space-y-2 h-full justify-center">
                                {['January', 'February', 'March', 'April', 'May', 'June', 'July'].map((month, index) => (
                                    <div key={month} className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-600 w-16">{month}</span>
                                        <div className="flex-1 flex">
                                            <div className="bg-green-300 h-4 rounded-l" style={{ width: `${Math.abs(index - 3) * 15}%` }}></div>
                                            <div className="bg-purple-300 h-4 rounded-r" style={{ width: `${(index + 1) * 10}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top-Right Chart - Vertical Bar Chart */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Receita média por cluster</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <div className="w-full h-full p-4">
                            <div className="flex items-end justify-between h-full space-x-2">
                                {['January', 'February', 'March', 'April', 'May', 'June', 'July'].map((month, index) => (
                                    <div key={month} className="flex flex-col items-center space-y-1">
                                        <div className="flex space-x-1">
                                            <div className="bg-purple-400 w-3 rounded-t" style={{ height: `${30 + index * 8}%` }}></div>
                                            <div className="bg-green-400 w-3 rounded-t" style={{ height: `${40 + index * 6}%` }}></div>
                                        </div>
                                        <span className="text-xs text-gray-600 rotate-45 origin-left">{month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom-Left Chart - Line Chart */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Receita média por cluster</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <div className="w-full h-full p-4">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <polyline
                                    fill="none"
                                    stroke="#8b5cf6"
                                    strokeWidth="2"
                                    points="10,50 20,30 30,70 40,20 50,80 60,40 70,60 80,10 90,90"
                                />
                                <polyline
                                    fill="none"
                                    stroke="#86efac"
                                    strokeWidth="2"
                                    points="10,60 20,40 30,80 40,30 50,90 60,50 70,70 80,20 90,100"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Bottom-Right Chart - Area Chart */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Receita média por cluster</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                        <div className="w-full h-full p-4">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <path
                                    fill="rgba(139, 92, 246, 0.3)"
                                    stroke="#8b5cf6"
                                    strokeWidth="1"
                                    d="M10,50 L20,30 L30,70 L40,20 L50,80 L60,40 L70,60 L80,10 L90,90 L90,100 L10,100 Z"
                                />
                                <path
                                    fill="rgba(134, 239, 172, 0.3)"
                                    stroke="#86efac"
                                    strokeWidth="1"
                                    d="M10,60 L20,40 L30,80 L40,30 L50,90 L60,50 L70,70 L80,20 L90,100 L90,100 L10,100 Z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
