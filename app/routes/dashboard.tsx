import type { Route } from "./+types/dashboard";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Dashboard - Weedle" },
        { name: "description", content: "Dashboard principal com métricas e análises" },
    ];
}

export default function Dashboard() {
    const [selectedCluster, setSelectedCluster] = useState<string>("all");

    // Dados mockados para demonstração
    const clusterOptions = [
        { id: "all", name: "Filtrar por cluster", color: "bg-gray-100 text-gray-800" },
        { id: "0", name: "Cluster 0 - Clientes Campeões", color: "bg-green-100 text-green-800" },
        { id: "1", name: "Cluster 1 - Clientes Satisfeitos", color: "bg-blue-100 text-blue-800" },
        { id: "2", name: "Cluster 2 - Clientes em Risco", color: "bg-yellow-100 text-yellow-800" },
        { id: "3", name: "Cluster 3 - Clientes Críticos", color: "bg-red-100 text-red-800" },
    ];

    const mockKPIs = {
        growth: {
            ltv: 125000,
            ticketMedio: 8500,
            crossSell: 35.2
        },
        satisfaction: {
            npsGeral: 7.8,
            npsRelacional: 8.2,
            npsSuporte: 6.9,
            npsProduto: 8.1,
            tmr: 2.3,
            ticketsProduto: [
                { produto: "Sistema A", tickets: 45 },
                { produto: "Sistema B", tickets: 32 },
                { produto: "Sistema C", tickets: 28 }
            ]
        },
        retention: {
            diasAtivos: 18.5,
            duracaoUso: 125.7
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="border-b border-gray-200 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard Executivo</h1>
                        <p className="mt-2 text-gray-600">
                            Acompanhe a evolução dos KPIs e a saúde dos seus clientes
                        </p>
                    </div>
                    <div className="relative">
                        <select
                            id="cluster-select"
                            value={selectedCluster}
                            onChange={(e) => setSelectedCluster(e.target.value)}
                            className="pl-4 py-3 w-64 bg-white border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm text-purple-700 appearance-none"
                        >
                            {clusterOptions.map((cluster) => (
                                <option key={cluster.id} value={cluster.id}>
                                    {cluster.name}
                                </option>
                            ))}
                        </select>

                        {/* Ícone customizado */}
                        <svg
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-700 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>


            {/* KPIs de Crescimento e Receita */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="#9810fa" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    KPIs de Crescimento e Receita
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Estes KPIs medem a saúde financeira e o crescimento gerado pelos clientes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Lifetime Value */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">Lifetime Value (LTV) Médio</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    R$ {mockKPIs.growth.ltv.toLocaleString()}
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Valor total médio por cliente
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Médio */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">Valor Médio por Contrato</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    R$ {mockKPIs.growth.ticketMedio.toLocaleString()}
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Ticket médio de venda
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Cross-sell */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">Taxa de Cross-sell</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    {mockKPIs.growth.crossSell}%
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Clientes com múltiplos produtos
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPIs de Satisfação e Qualidade do Serviço */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="#9810fa" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    KPIs de Satisfação e Qualidade do Serviço
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Estes KPIs medem o quão felizes e bem atendidos seus clientes estão.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* NPS Geral */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">NPS Geral</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    {mockKPIs.satisfaction.npsGeral}
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Satisfação geral
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* NPS Relacional */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">NPS Relacional</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    {mockKPIs.satisfaction.npsRelacional}
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Relacionamento
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* NPS Suporte */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">NPS Suporte</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    {mockKPIs.satisfaction.npsSuporte}
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Qualidade do suporte
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* NPS Produto */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">NPS Produto</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    {mockKPIs.satisfaction.npsProduto}
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Qualidade do produto
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* TMR */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">Tempo Médio de Resolução</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    {mockKPIs.satisfaction.tmr} dias
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Eficiência do suporte
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Volume de Tickets por Produto */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <h3 className="text-sm font-medium text-purple-800 mb-4">Volume de Tickets por Produto</h3>
                        <div className="space-y-3">
                            {mockKPIs.satisfaction.ticketsProduto.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-purple-700">{item.produto}</span>
                                    <span className="text-sm font-semibold text-purple-900">{item.tickets} tickets</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* KPIs de Retenção e Engajamento */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="#9810fa" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    KPIs de Retenção e Engajamento
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Estes KPIs medem o quão "saudável" é o relacionamento e o uso dos produtos pelos clientes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Dias Ativos */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">Dias Ativos por Mês (Média)</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    {mockKPIs.retention.diasAtivos} dias
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Engajamento mensal
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Duração de Uso */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-purple-800">Duração de Uso por Mês (Média)</h3>
                                <p className="text-2xl font-bold text-purple-900 mt-2">
                                    {mockKPIs.retention.duracaoUso}h
                                </p>
                                <p className="text-xs text-purple-700 mt-1">
                                    Intensidade de uso
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
