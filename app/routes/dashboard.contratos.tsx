import type { Route } from "./+types/dashboard";
import { useState, useEffect } from "react";
import { Top10BarChart } from "../components/charts";
import { DataTable } from "../components";

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

    // Calcular largura responsiva
    const chartWidth = typeof window !== 'undefined' ? Math.min(windowWidth - 100, 1200) : 1000;

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

    // Dados dos gráficos baseados na imagem
    const contratosPorSegmentoData = [
        { label: "SERVICOS", value: 17.4, fullLabel: "SERVIÇOS" },
        { label: "VAREJO", value: 15.0, fullLabel: "VAREJO" },
        { label: "MANUFATURA", value: 15.0, fullLabel: "MANUFATURA" },
        { label: "CONSTRUCAO E PROJETOS", value: 5.2, fullLabel: "CONSTRUÇÃO E PROJETOS" },
        { label: "DISTRIBUICAO", value: 5.0, fullLabel: "DISTRIBUIÇÃO" },
        { label: "LOGISTICA", value: 4.2, fullLabel: "LOGÍSTICA" },
        { label: "EDUCACIONAL", value: 3.2, fullLabel: "EDUCACIONAL" },
        { label: "HOSPITALITY", value: 2.7, fullLabel: "HOSPITALITY" },
        { label: "SAUDE", value: 2.3, fullLabel: "SAÚDE" },
        { label: "AGROINDUSTRIA", value: 1.5, fullLabel: "AGROINDÚSTRIA" },
        { label: "JURIDICO", value: 1.3, fullLabel: "JURÍDICO" },
        { label: "FINANCIAL SERVICES", value: 0.0, fullLabel: "SERVIÇOS FINANCEIROS" },
        { label: "TOTVS", value: 0.0, fullLabel: "TOTVS" },
        { label: "SUPERMERCADOS", value: 0.0, fullLabel: "SUPERMERCADOS" }
    ];

    const mediaContratosPorClienteData = [
        { label: "JURIDICO", value: 11.6, fullLabel: "JURÍDICO" },
        { label: "SAUDE", value: 7.8, fullLabel: "SAÚDE" },
        { label: "TOTVS", value: 7.5, fullLabel: "TOTVS" },
        { label: "CONSTRUCAO E PROJETOS", value: 7.4, fullLabel: "CONSTRUÇÃO E PROJETOS" },
        { label: "AGROINDUSTRIA", value: 7.3, fullLabel: "AGROINDÚSTRIA" },
        { label: "SERVICOS", value: 7.2, fullLabel: "SERVIÇOS" },
        { label: "MANUFATURA", value: 7.1, fullLabel: "MANUFATURA" },
        { label: "VAREJO", value: 6.9, fullLabel: "VAREJO" },
        { label: "LOGISTICA", value: 6.5, fullLabel: "LOGÍSTICA" },
        { label: "EDUCACIONAL", value: 6.0, fullLabel: "EDUCACIONAL" },
        { label: "DISTRIBUICAO", value: 5.8, fullLabel: "DISTRIBUIÇÃO" },
        { label: "SUPERMERCADOS", value: 5.5, fullLabel: "SUPERMERCADOS" },
        { label: "HOSPITALITY", value: 4.8, fullLabel: "HOSPITALITY" },
        { label: "FINANCIAL SERVICES", value: 4.3, fullLabel: "SERVIÇOS FINANCEIROS" }
    ];

    // Tipo para os dados da tabela de contratos
    type DadosContratos = {
        cdCliente: string;
        uf: string;
        segmento: string;
        subsegmento: string;
        marcaTotvs: string;
        dsProduto: string;
        situacaoContrato: string;
        qtdeContratos: number;
    };

    // Dados da tabela de contratos baseados na imagem
    const dadosContratos: DadosContratos[] = [
        {
            cdCliente: "TC3698",
            uf: "MT",
            segmento: "SERVICOS",
            subsegmento: "PROVEDOR SERVICOS",
            marcaTotvs: "DISTRIBUICAO & VAREJO - CORE",
            dsProduto: "SAT PRO ATE 25",
            situacaoContrato: "ATIVO",
            qtdeContratos: 112
        },
        {
            cdCliente: "TDC1GA",
            uf: "SP",
            segmento: "LOGISTICA",
            subsegmento: "TRANSPORTADOR",
            marcaTotvs: "SUPERMERCADOS - CORE",
            dsProduto: "CONSINCO MÓDULO NF-E SMS",
            situacaoContrato: "ATIVO",
            qtdeContratos: 73
        },
        {
            cdCliente: "T14189",
            uf: "BA",
            segmento: "VAREJO",
            subsegmento: "SUPERMERCADO",
            marcaTotvs: "CLOUD",
            dsProduto: "CONSINCO MD-E POR CNPJ SMS",
            situacaoContrato: "ATIVO",
            qtdeContratos: 69
        },
        {
            cdCliente: "T45067",
            uf: "RJ",
            segmento: "SAUDE",
            subsegmento: "SAUDE",
            marcaTotvs: "RH - CORE",
            dsProduto: "APP MEU RH 101 AO 250 ID",
            situacaoContrato: "ATIVO",
            qtdeContratos: 44
        },
        {
            cdCliente: "TEWBTY",
            uf: "RS",
            segmento: "MANUFATURA",
            subsegmento: "METAL-MECANICO & PLASTICO",
            marcaTotvs: "CROSS - TRADICIONAL",
            dsProduto: "SMS FULL TOTVS TRAD",
            situacaoContrato: "TROCADO",
            qtdeContratos: 22
        },
        {
            cdCliente: "TFCQV8",
            uf: "SP",
            segmento: "LOGISTICA",
            subsegmento: "TRANSPORTADOR",
            marcaTotvs: "LOGISTICA - CORE",
            dsProduto: "CONSINCO WMS MOBILE SUBSC",
            situacaoContrato: "ATIVO",
            qtdeContratos: 21
        },
        {
            cdCliente: "TGH123",
            uf: "MG",
            segmento: "SERVICOS",
            subsegmento: "PROVEDOR SERVICOS",
            marcaTotvs: "DISTRIBUICAO & VAREJO - CORE",
            dsProduto: "ADM DIG COM INT 1 A 15",
            situacaoContrato: "ATIVO",
            qtdeContratos: 18
        },
        {
            cdCliente: "TJK456",
            uf: "PR",
            segmento: "VAREJO",
            subsegmento: "SUPERMERCADO",
            marcaTotvs: "SUPERMERCADOS - CORE",
            dsProduto: "CONS SAT OU MFE BALANC CDU",
            situacaoContrato: "ATIVO",
            qtdeContratos: 15
        },
        {
            cdCliente: "TLM789",
            uf: "SC",
            segmento: "SAUDE",
            subsegmento: "SAUDE",
            marcaTotvs: "CLOUD",
            dsProduto: "HOSPEDAGEM E SUPORTE",
            situacaoContrato: "ATIVO",
            qtdeContratos: 12
        },
        {
            cdCliente: "TNP012",
            uf: "GO",
            segmento: "MANUFATURA",
            subsegmento: "METAL-MECANICO & PLASTICO",
            marcaTotvs: "RH - CORE",
            dsProduto: "SMS FULL TOTVS TRAD",
            situacaoContrato: "ATIVO",
            qtdeContratos: 9
        }
    ];

    // Colunas para a tabela de contratos
    const colunasContratos = [
        { key: "cdCliente" as keyof DadosContratos, label: "CD_CLIENTE", sortable: true },
        { key: "uf" as keyof DadosContratos, label: "UF", sortable: true },
        { key: "segmento" as keyof DadosContratos, label: "SEGMENTO", sortable: true },
        { key: "subsegmento" as keyof DadosContratos, label: "SUBSEGMENTO", sortable: true },
        { key: "marcaTotvs" as keyof DadosContratos, label: "MARCA_TOTVS", sortable: true },
        { key: "dsProduto" as keyof DadosContratos, label: "DS_PRODUTO", sortable: true },
        { key: "situacaoContrato" as keyof DadosContratos, label: "SITUACAO_CONTRATO", sortable: true },
        { key: "qtdeContratos" as keyof DadosContratos, label: "QTDE_CONTRATOS", sortable: true, highlighted: true }
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

            {/* Gráficos de Contratos por Segmento */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Gráfico 1: Contratos Totais por Segmento */}
                <div className="bg-white shadow rounded-lg p-6 h-[400px]">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contratos totais - por segmento</h3>
                    <div className="w-full overflow-hidden">
                        <Top10BarChart
                            data={contratosPorSegmentoData}
                            width={Math.min(chartWidth * 0.5 - 48, 600)}
                            height={400}
                            color="#8b5cf6"
                            showValues={true}
                            fontSize={12}
                            margin={{ top: 20, right: 20, bottom: 190, left: 50 }}
                        />
                    </div>
                </div>

                {/* Gráfico 2: Média de Contratos por Cliente por Segmento */}
                <div className="bg-white shadow rounded-lg p-6 h-[400px]">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Média de contratos - por cliente por segmento</h3>
                    <div className="w-full overflow-hidden">
                        <Top10BarChart
                            data={mediaContratosPorClienteData}
                            width={Math.min(chartWidth * 0.5 - 48, 600)}
                            height={400}
                            color="#8b5cf6"
                            showValues={true}
                            fontSize={12}
                            margin={{ top: 20, right: 20, bottom: 190, left: 50 }}
                        />
                    </div>
                </div>
            </div>

            {/* Tabela de Contratos */}
            <div className="mt-6">
                <DataTable
                    data={dadosContratos}
                    columns={colunasContratos}
                    title="Detalhamento de Contratos"
                    searchPlaceholder="Pesquisar contratos..."
                    itemsPerPage={10}
                    height="500px"
                />
            </div>
        </div>
    );
}
