
import type { Route } from "./+types/clusters";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Clusters - Weedle" },
        { name: "description", content: "Análise de clusters de clientes e ações estratégicas" },
    ];
}

export default function Clusters() {
    const clientes = [
        {
            nome: "Empresa 1",
            localizacao: "Av Paulista, São Paulo - SP",
            ticketMedio: "R$1.240,00",
            frequencia: "3x/semana",
            ultimoPedido: "12/02/2023"
        },
        {
            nome: "Empresa 2",
            localizacao: "Av Paulista, São Paulo - SP",
            ticketMedio: "R$1.240,00",
            frequencia: "3x/semana",
            ultimoPedido: "12/02/2023"
        },
        {
            nome: "Empresa 3",
            localizacao: "Av Paulista, São Paulo - SP",
            ticketMedio: "R$1.240,00",
            frequencia: "3x/semana",
            ultimoPedido: "12/02/2023"
        },
        {
            nome: "Empresa 4",
            localizacao: "Av Paulista, São Paulo - SP",
            ticketMedio: "R$1.240,00",
            frequencia: "3x/semana",
            ultimoPedido: "12/02/2023"
        }
    ];

    const acoesEstrategicas = [
        "Programa de fidelidade com cashback ou pontos extras",
        "Ofertas exclusivas de pré lançamento de produtos",
        "Convite para eventos VIP ou experiências personalizadas",
        "Envio de cupons"
    ];

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Resumo do Cluster */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo do cluster</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Número de clientes</p>
                        <p className="text-2xl font-bold text-purple-600">80</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Ticket médio</p>
                        <p className="text-2xl font-bold text-purple-600">1.241,00</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Frequência média</p>
                        <p className="text-2xl font-bold text-purple-600">12</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Tempo médio como cliente</p>
                        <p className="text-2xl font-bold text-purple-600">1.3 anos</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Principal canal de compra</p>
                        <p className="text-2xl font-bold text-purple-600">canal 1</p>
                    </div>
                </div>
            </div>

            {/* Lista de Clientes e Ações Estratégicas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Lista de Clientes */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-5 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Lista de clientes</h3>
                    </div>
                    <div className="p-5">
                        {/* Barra de pesquisa */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Pesquisar por clientes..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-500"
                            />
                            <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Tabela */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 text-sm font-medium text-gray-700">Nome</th>
                                        <th className="text-left py-3 text-sm font-medium text-gray-700">Localização</th>
                                        <th className="text-left py-3 text-sm font-medium text-gray-700">Ticket médio</th>
                                        <th className="text-left py-3 text-sm font-medium text-gray-700">Frequência</th>
                                        <th className="text-left py-3 text-sm font-medium text-gray-700">Último pedido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((cliente, index) => (
                                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 text-sm text-gray-800 font-medium">{cliente.nome}</td>
                                            <td className="py-3 text-sm text-gray-600">{cliente.localizacao}</td>
                                            <td className="py-3 text-sm text-gray-800 font-medium">{cliente.ticketMedio}</td>
                                            <td className="py-3 text-sm text-gray-600">{cliente.frequencia}</td>
                                            <td className="py-3 text-sm text-gray-600">{cliente.ultimoPedido}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Paginação */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600">Linhas por página:</span>
                                <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                    <option>5</option>
                                    <option>10</option>
                                    <option>25</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600">1-9 de 9</span>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ações Estratégicas */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-5 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Ações estratégicas</h3>
                        </div>
                    </div>
                    <div className="p-5">
                        <ul className="space-y-4">
                            {acoesEstrategicas.map((acao, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                                    <span className="text-sm text-gray-700 leading-relaxed">{acao}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Evolução de compras ao longo do tempo */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Evolução de compras ao longo do tempo</h3>
                    </div>
                    <div className="p-4">
                        <div className="h-64 flex items-end justify-between">
                            {meses.map((mes, index) => {
                                const valores = [20, 40, -60, 80, 90, -40, 30, 10, 50, 60, 80, 40];
                                const altura = ((valores[index] + 100) / 200) * 100;
                                return (
                                    <div key={mes} className="flex flex-col items-center">
                                        <div
                                            className="w-8 bg-purple-500 rounded-t"
                                            style={{ height: `${altura}%` }}
                                        ></div>
                                        <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                                            {mes}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>-100</span>
                            <span>-50</span>
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                    </div>
                </div>

                {/* Distribuição de ticket médio */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Distribuição de ticket médio</h3>
                    </div>
                    <div className="p-4">
                        <div className="h-64 flex items-end justify-between">
                            {meses.slice(0, 7).map((mes, index) => {
                                const valoresBarras = [30, 45, 60, 35, 70, 80, 85];
                                const valoresLinha = [50, 40, 70, 30, 75, 90, 60];
                                const alturaBarra = (valoresBarras[index] / 100) * 100;
                                const alturaLinha = (valoresLinha[index] / 100) * 100;

                                return (
                                    <div key={mes} className="flex flex-col items-center relative">
                                        {/* Barra */}
                                        <div
                                            className="w-8 bg-purple-500 rounded-t"
                                            style={{ height: `${alturaBarra}%` }}
                                        ></div>

                                        {/* Linha */}
                                        <div
                                            className="absolute w-2 h-2 bg-teal-500 rounded-full"
                                            style={{
                                                bottom: `${alturaLinha}%`,
                                                transform: 'translateX(50%)'
                                            }}
                                        ></div>

                                        <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                                            {mes}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>0</span>
                            <span>25</span>
                            <span>50</span>
                            <span>75</span>
                            <span>100</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">© Copyright 2025 Weedle</p>
            </div>
        </div>
    );
}
