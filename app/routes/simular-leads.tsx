import type { Route } from "./+types/simular-leads";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Simular Leads - Weedle" },
        { name: "description", content: "Simule cenários de leads e clusters" },
    ];
}

export default function SimularLeads() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Simular Leads</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Simule diferentes cenários de leads para otimizar seus clusters
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Formulário de Simulação */}
                <div className="lg:col-span-1">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Parâmetros da Simulação</h3>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número de Leads
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10000"
                                    defaultValue="1000"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Segmento de Mercado
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="tech">Tecnologia</option>
                                    <option value="finance">Finanças</option>
                                    <option value="healthcare">Saúde</option>
                                    <option value="retail">Varejo</option>
                                    <option value="education">Educação</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Faixa Etária
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Localização
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="all">Todas as regiões</option>
                                    <option value="south">Sul</option>
                                    <option value="southeast">Sudeste</option>
                                    <option value="northeast">Nordeste</option>
                                    <option value="north">Norte</option>
                                    <option value="midwest">Centro-Oeste</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Critérios de Qualificação
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="ml-2 text-sm text-gray-700">Interesse demonstrado</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="ml-2 text-sm text-gray-700">Poder de compra</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="ml-2 text-sm text-gray-700">Decisão de compra</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="ml-2 text-sm text-gray-700">Urgência</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Algoritmo de Clustering
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="kmeans">K-Means</option>
                                    <option value="hierarchical">Hierárquico</option>
                                    <option value="dbscan">DBSCAN</option>
                                    <option value="gaussian">Gaussian Mixture</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número de Clusters
                                </label>
                                <input
                                    type="number"
                                    min="2"
                                    max="20"
                                    defaultValue="5"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                            >
                                Executar Simulação
                            </button>
                        </form>
                    </div>
                </div>

                {/* Resultados da Simulação */}
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        {/* Estatísticas da Simulação */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Resultados da Simulação</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">1,247</p>
                                    <p className="text-sm text-gray-500">Leads Simulados</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">5</p>
                                    <p className="text-sm text-gray-500">Clusters Criados</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-purple-600">89.2%</p>
                                    <p className="text-sm text-gray-500">Precisão do Modelo</p>
                                </div>
                            </div>
                        </div>

                        {/* Visualização dos Clusters */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Distribuição dos Clusters</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-900">Cluster 1 - Alta Prioridade</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">312 leads</span>
                                        <span className="text-sm text-gray-600">25.0%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-900">Cluster 2 - Média Prioridade</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">298 leads</span>
                                        <span className="text-sm text-gray-600">23.9%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '23.9%' }}></div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-900">Cluster 3 - Baixa Prioridade</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">267 leads</span>
                                        <span className="text-sm text-gray-600">21.4%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '21.4%' }}></div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-900">Cluster 4 - Teste</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">201 leads</span>
                                        <span className="text-sm text-gray-600">16.1%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '16.1%' }}></div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-900">Cluster 5 - Excluídos</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">169 leads</span>
                                        <span className="text-sm text-gray-600">13.6%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '13.6%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Métricas de Performance */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Métricas de Performance</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Taxa de Conversão por Cluster</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Cluster 1</span>
                                            <span className="font-medium">67.3%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Cluster 2</span>
                                            <span className="font-medium">45.2%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Cluster 3</span>
                                            <span className="font-medium">23.1%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Cluster 4</span>
                                            <span className="font-medium">18.9%</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">ROI Estimado</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Cluster 1</span>
                                            <span className="font-medium text-green-600">R$ 45.2k</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Cluster 2</span>
                                            <span className="font-medium text-green-600">R$ 28.7k</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Cluster 3</span>
                                            <span className="font-medium text-yellow-600">R$ 12.4k</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Cluster 4</span>
                                            <span className="font-medium text-red-600">R$ 8.1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ações Recomendadas */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Ações Recomendadas</h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Focar no Cluster 1</p>
                                        <p className="text-sm text-gray-500">Alta conversão e ROI, priorizar campanhas direcionadas</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Otimizar Cluster 2</p>
                                        <p className="text-sm text-gray-500">Potencial de melhoria com ajustes na estratégia</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Reavaliar Cluster 3</p>
                                        <p className="text-sm text-gray-500">Considerar segmentação adicional ou exclusão</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex space-x-4">
                            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium">
                                Aplicar Simulação
                            </button>
                            <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors font-medium">
                                Exportar Relatório
                            </button>
                            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
                                Nova Simulação
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
