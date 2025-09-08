import type { Route } from "./+types/dashboard";
import { useState, useEffect } from "react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Contratos - Dashboard Weedle" },
        { name: "description", content: "Análise e gestão de contratos" },
    ];
}

export default function DashboardContratos() {
    // Estados para responsividade
    const [windowWidth, setWindowWidth] = useState(1024);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Definir largura inicial
        handleResize();

        // Adicionar listener para redimensionamento
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Dados dos contratos baseados na imagem
    const contratosData = [
        {
            title: "Contratos Totais",
            value: "72,6 Mil",
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            bgColor: "bg-blue-100",
            textColor: "text-blue-600"
        },
        {
            title: "Contratos Ativos",
            value: "55,5 Mil",
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bgColor: "bg-green-100",
            textColor: "text-green-600"
        },
        {
            title: "Contratos Cancelados",
            value: "9.977",
            icon: (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bgColor: "bg-red-100",
            textColor: "text-red-600"
        },
        {
            title: "Contratos Suspensos",
            value: "64",
            icon: (
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            ),
            bgColor: "bg-yellow-100",
            textColor: "text-yellow-600"
        },
        {
            title: "Contratos Pendentes",
            value: "373",
            icon: (
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bgColor: "bg-orange-100",
            textColor: "text-orange-600"
        },
        {
            title: "Contratos Gratuitos",
            value: "2.649",
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            bgColor: "bg-purple-100",
            textColor: "text-purple-600"
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard de Contratos</h1>
                <p className="mt-2 text-gray-600">Visão geral e análise dos contratos da empresa</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {contratosData.map((contrato, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center">
                            <div className={`p-2 ${contrato.bgColor} rounded-lg`}>
                                {contrato.icon}
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">{contrato.title}</p>
                                <p className={`text-2xl font-semibold ${contrato.textColor}`}>{contrato.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Seção de gráficos e análises adicionais */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card de resumo */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Resumo dos Contratos</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Taxa de Ativação</span>
                            <span className="font-semibold text-green-600">76.4%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Taxa de Cancelamento</span>
                            <span className="font-semibold text-red-600">13.7%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Contratos Gratuitos</span>
                            <span className="font-semibold text-purple-600">3.6%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Contratos Pendentes</span>
                            <span className="font-semibold text-orange-600">0.5%</span>
                        </div>
                    </div>
                </div>

                {/* Card de tendências */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tendências Recentes</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                <span className="text-gray-600">Novos Contratos (30 dias)</span>
                            </div>
                            <span className="font-semibold text-green-600">+1,247</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                                <span className="text-gray-600">Cancelamentos (30 dias)</span>
                            </div>
                            <span className="font-semibold text-red-600">-89</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span className="text-gray-600">Crescimento Líquido</span>
                            </div>
                            <span className="font-semibold text-blue-600">+1,158</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
