import type { Route } from "./+types/dashboard";
import { LineChart, GaugeChart } from "../components/charts";
import { DataTable, ClientStatsSkeleton, ClientChartSkeleton, ClientTableSkeleton } from "../components";
import { useState, useEffect } from "react";
import { useMockLoading } from "../hooks";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "NPS - Dashboard Weedle" },
        { name: "description", content: "Análise e gestão do Net Promoter Score" },
    ];
}

export default function DashboardNPS() {
    // Hook para simular carregamento inicial apenas na primeira visita
    const { isLoading } = useMockLoading(2500, 'dashboard-nps');

    const npsData = [
        { mes: "Jan", nps: 72, respondentes: 1250, tendencia: "up" },
        { mes: "Fev", nps: 75, respondentes: 1180, tendencia: "up" },
        { mes: "Mar", nps: 78, respondentes: 1320, tendencia: "up" },
        { mes: "Abr", nps: 76, respondentes: 1290, tendencia: "down" },
        { mes: "Mai", nps: 79, respondentes: 1410, tendencia: "up" },
        { mes: "Jun", nps: 82, respondentes: 1380, tendencia: "up" },
        { mes: "Jul", nps: 80, respondentes: 1350, tendencia: "down" },
        { mes: "Ago", nps: 83, respondentes: 1420, tendencia: "up" },
        { mes: "Set", nps: 85, respondentes: 1480, tendencia: "up" },
        { mes: "Out", nps: 87, respondentes: 1520, tendencia: "up" },
        { mes: "Nov", nps: 89, respondentes: 1580, tendencia: "up" },
        { mes: "Dez", nps: 91, respondentes: 1620, tendencia: "up" }
    ];

    // Dados para o gráfico de linha anual
    const npsAnualData = [
        { year: "2019", value: 14 },
        { year: "2020", value: 31 },
        { year: "2021", value: 41 },
        { year: "2022", value: 48 },
        { year: "2023", value: 53 },
        { year: "2024", value: 78 },
        { year: "2025", value: 76 }
    ];

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

    // Calcular largura responsiva
    const chartWidth = typeof window !== 'undefined' ? Math.min(windowWidth - 100, 1200) : 1000; // More responsive base width

    const segmentacoes = [
        { nome: "Clientes Leais", nps: 92, total: 2340, percentual: 29.3 },
        { nome: "Risco de Churn", nps: 45, total: 890, percentual: 11.1 },
        { nome: "Novas Oportunidades", nps: 78, total: 1560, percentual: 19.5 },
        { nome: "Baixo Rendimento", nps: 65, total: 1230, percentual: 15.4 },
        { nome: "Clientes Premium", nps: 95, total: 980, percentual: 12.3 },
        { nome: "Clientes Básicos", nps: 71, total: 1000, percentual: 12.5 }
    ];

    // Tipo para os dados do Analítico NPS
    type DadosAnaliticoNPS = {
        cdCliente: string;
        segmento: string;
        subsegmento: string;
        faixaFaturamento: string;
        situacaoContrato: string;
        valorTotalContrato: string;
        percentualDesconto: string;
        mediaResolucaoTicket: string;
        classificacaoNPS: string;
        notaMedia: string;
    };

    // Dados para a tabela Analítico NPS
    const dadosAnaliticoNPS: DadosAnaliticoNPS[] = [
        {
            cdCliente: "TEZMHC",
            segmento: "VAREJO",
            subsegmento: "MAGAZINE E LOJA DE DEPARTAMENTOS",
            faixaFaturamento: "Faixa 02 - De 7,5 M ate 15 M",
            situacaoContrato: "ATIVO",
            valorTotalContrato: "R$ 4.107.036",
            percentualDesconto: "1,11%",
            mediaResolucaoTicket: "",
            classificacaoNPS: "DETRATOR",
            notaMedia: "3,04"
        },
        {
            cdCliente: "TEZMHC",
            segmento: "VAREJO",
            subsegmento: "MAGAZINE E LOJA DE DEPARTAMENTOS",
            faixaFaturamento: "Faixa 02 - De 7,5 M ate 15 M",
            situacaoContrato: "ATIVO",
            valorTotalContrato: "R$ 4.107.036",
            percentualDesconto: "1,11%",
            mediaResolucaoTicket: "",
            classificacaoNPS: "NEUTRO",
            notaMedia: "7,79"
        },
        {
            cdCliente: "TEZMHC",
            segmento: "VAREJO",
            subsegmento: "MAGAZINE E LOJA DE DEPARTAMENTOS",
            faixaFaturamento: "Faixa 02 - De 7,5 M ate 15 M",
            situacaoContrato: "ATIVO",
            valorTotalContrato: "R$ 4.107.036",
            percentualDesconto: "1,11%",
            mediaResolucaoTicket: "",
            classificacaoNPS: "PROMOTOR",
            notaMedia: "9,82"
        },
        {
            cdCliente: "TEZM89",
            segmento: "LOGISTICA",
            subsegmento: "TRANSPORTADOR",
            faixaFaturamento: "Faixa 07 - De 75 M ate 150 M",
            situacaoContrato: "ATIVO",
            valorTotalContrato: "R$ 4.027.219",
            percentualDesconto: "0,88%",
            mediaResolucaoTicket: "",
            classificacaoNPS: "DETRATOR",
            notaMedia: "1,80"
        },
        {
            cdCliente: "TEZM89",
            segmento: "LOGISTICA",
            subsegmento: "TRANSPORTADOR",
            faixaFaturamento: "Faixa 07 - De 75 M ate 150 M",
            situacaoContrato: "ATIVO",
            valorTotalContrato: "R$ 4.027.219",
            percentualDesconto: "0,88%",
            mediaResolucaoTicket: "",
            classificacaoNPS: "NEUTRO",
            notaMedia: "7,50"
        },
        {
            cdCliente: "TEZM89",
            segmento: "LOGISTICA",
            subsegmento: "TRANSPORTADOR",
            faixaFaturamento: "Faixa 07 - De 75 M ate 150 M",
            situacaoContrato: "ATIVO",
            valorTotalContrato: "R$ 4.027.219",
            percentualDesconto: "0,88%",
            mediaResolucaoTicket: "",
            classificacaoNPS: "PROMOTOR",
            notaMedia: "10,00"
        },
        {
            cdCliente: "TEZMFC",
            segmento: "SERVICOS",
            subsegmento: "PROVEDOR SERVICOS",
            faixaFaturamento: "Faixa 03 - De 15 M ate 25 M",
            situacaoContrato: "ATIVO",
            valorTotalContrato: "R$ 4.018.639",
            percentualDesconto: "0,75%",
            mediaResolucaoTicket: "",
            classificacaoNPS: "DETRATOR",
            notaMedia: "1,00"
        }
    ];

    // Colunas para a tabela Analítico NPS
    const colunasAnaliticoNPS = [
        { key: "cdCliente" as keyof DadosAnaliticoNPS, label: "Cliente", sortable: true },
        { key: "segmento" as keyof DadosAnaliticoNPS, label: "Segmento", sortable: true },
        { key: "subsegmento" as keyof DadosAnaliticoNPS, label: "Subsegmento", sortable: true },
        { key: "faixaFaturamento" as keyof DadosAnaliticoNPS, label: "Faixa Faturamento", sortable: true },
        { key: "situacaoContrato" as keyof DadosAnaliticoNPS, label: "Status Contrato", sortable: true },
        { key: "valorTotalContrato" as keyof DadosAnaliticoNPS, label: "Valor Total Contrato", sortable: true },
        { key: "percentualDesconto" as keyof DadosAnaliticoNPS, label: "%Desconto", sortable: true },
        { key: "mediaResolucaoTicket" as keyof DadosAnaliticoNPS, label: "Tempo resolução tickets", sortable: true },
        { key: "classificacaoNPS" as keyof DadosAnaliticoNPS, label: "Classificacao NPS", sortable: true },
        { key: "notaMedia" as keyof DadosAnaliticoNPS, label: "Nota Media", sortable: true }
    ];

    const getNPSColor = (nps: number) => {
        if (nps >= 80) return "text-green-600";
        if (nps >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getTendenciaIcon = (tendencia: string) => {
        if (tendencia === "up") {
            return (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            );
        }
        return (
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        );
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Net Promoter Score (NPS)</h1>
                <p className="mt-2 text-gray-600">Análise e gestão da satisfação dos clientes</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {isLoading ? (
                    <>
                        <ClientStatsSkeleton />
                        <ClientStatsSkeleton />
                        <ClientStatsSkeleton />
                        <ClientStatsSkeleton />
                    </>
                ) : (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">NPS Atual</p>
                                    <p className="text-2xl font-semibold text-green-600">91</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Respondentes</p>
                                    <p className="text-2xl font-semibold text-gray-900">1.620</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Crescimento</p>
                                    <p className="text-2xl font-semibold text-green-600">+6</p>
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
                                    <p className="text-sm font-medium text-gray-500">Taxa Resposta</p>
                                    <p className="text-2xl font-semibold text-gray-900">78%</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Gráficos de NPS */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
                {isLoading ? (
                    <>
                        <ClientChartSkeleton className="lg:w-[65%]" />
                        <ClientChartSkeleton className="w-full max-w-[400px] mx-auto" />
                    </>
                ) : (
                    <>
                        {/* Gráfico de Evolução NPS Anual - 65% */}
                        <div className="bg-white shadow rounded-lg p-6 lg:w-[65%]">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Evolução do nível de satisfação ano x ano</h3>
                            <div className="w-full overflow-hidden">
                                <LineChart
                                    data={npsAnualData}
                                    width={Math.min(chartWidth * 0.65 - 48, 1000)}
                                    height={300}
                                    color="#8b5cf6"
                                    showValues={true}
                                />
                            </div>
                        </div>

                        {/* Gráfico Gauge de Satisfação - 35% */}
                        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center w-full max-w-[400px] mx-auto">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Nível de satisfação de clientes
                            </h3>
                            <div className="w-full h-full flex items-center justify-center">
                                <GaugeChart value={75} maxValue={100} width={400} height={180} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
