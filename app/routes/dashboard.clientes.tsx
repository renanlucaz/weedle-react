import type { Route } from "./+types/dashboard";
import { ActivityBarChart, Top10BarChart, Top5HorizontalBarChart } from "../components/charts";
import { DataTable } from "../components";
import { useState, useEffect } from "react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Clientes - Dashboard Weedle" },
        { name: "description", content: "Gestão e análise de clientes" },
    ];
}

export default function DashboardClientes() {
    // Dados de faturamento
    const dadosFaturamento = [
        { faixa: "Sem Informações de Faturamento", quantidade: 5058 },
        { faixa: "Faixa 11 - Acima de 850 M", quantidade: 114 },
        { faixa: "Faixa 10 - De 500 M até 850 M", quantidade: 75 },
        { faixa: "Faixa 09 - De 300 M até 500 M", quantidade: 143 },
        { faixa: "Faixa 08 - De 150 M até 300 M", quantidade: 299 },
        { faixa: "Faixa 07 - De 75 M até 150 M", quantidade: 444 },
        { faixa: "Faixa 06 - De 50 M até 75 M", quantidade: 346 },
        { faixa: "Faixa 05 - De 35 M até 50 M", quantidade: 310 },
        { faixa: "Faixa 04 - De 25 M até 35 M", quantidade: 366 },
        { faixa: "Faixa 03 - De 15 M até 25 M", quantidade: 581 },
        { faixa: "Faixa 02 - De 7,5 M até 15 M", quantidade: 732 },
        { faixa: "Faixa 01 - De 4,5 M até 7,5 M", quantidade: 521 },
        { faixa: "Faixa 00 - Até 4,5 M", quantidade: 1626 }
    ];

    // Dados de atividade comercial para o gráfico horizontal
    const dadosAtividade = [
        { label: "SERVICOS", value: 2424 },
        { label: "VAREJO", value: 2185 },
        { label: "MANUFATURA", value: 2072 },
        { label: "DISTRIBUICAO", value: 861 },
        { label: "CONSTRUCAO E PROJETOS", value: 702 },
        { label: "LOGISTICA", value: 650 },
        { label: "HOSPITALITY", value: 567 },
        { label: "EDUCACIONAL", value: 527 },
        { label: "SAUDE", value: 298 },
        { label: "AGROINDUSTRIA", value: 204 },
        { label: "JURIDICO", value: 111 },
        { label: "FINANCIAL SERVICES", value: 10 },
        { label: "SUPERMERCADOS", value: 2 },
        { label: "TOTVS", value: 2 }
    ];

    const totalClientes = dadosFaturamento.reduce((sum, item) => sum + item.quantidade, 0);

    // Dados TOP 10 - Marca TOTVS
    const dadosMarcaTotvs = [
        { label: "RH - CORE", value: 2300, fullLabel: "RH - CORE" },
        { label: "DISTRIBUICAO & ...", value: 1900, fullLabel: "DISTRIBUICAO & LOGISTICA" },
        { label: "BACKOFFICE - C...", value: 700, fullLabel: "BACKOFFICE - CONTABILIDADE" },
        { label: "CROSS - TRADICI...", value: 700, fullLabel: "CROSS - TRADICIONAL" },
        { label: "HOSPITALIDADE ...", value: 600, fullLabel: "HOSPITALIDADE E TURISMO" },
        { label: "FEEDZ", value: 400, fullLabel: "FEEDZ" },
        { label: "TECNOLOGIA", value: 400, fullLabel: "TECNOLOGIA" },
        { label: "MICRO E PEQUE...", value: 400, fullLabel: "MICRO E PEQUENAS EMPRESAS" },
        { label: "SUPERMERCADO...", value: 300, fullLabel: "SUPERMERCADOS E VAREJO" },
        { label: "CLOUD", value: 300, fullLabel: "CLOUD" }
    ];

    // Dados TOP 5 - Por UF
    const dadosUF = [
        { label: "SP", value: 3900 },
        { label: "MG", value: 1000 },
        { label: "SC", value: 700 },
        { label: "RJ", value: 700 },
        { label: "PR", value: 600 }
    ];

    // Dados de clientes (exemplo)
    const clientesData = [
        { cd_cliente: "001", uf: "SP", cidade: "São Paulo", segmento: "Varejo", subsegmento: "Eletrônicos", faixa_faturamento: "Faixa 05", marca_totvs: "Datasul", inicio_relacionamento: "2020-01-15" },
        { cd_cliente: "002", uf: "RJ", cidade: "Rio de Janeiro", segmento: "Manufatura", subsegmento: "Automotivo", faixa_faturamento: "Faixa 08", marca_totvs: "RM", inicio_relacionamento: "2019-03-22" },
        { cd_cliente: "003", uf: "MG", cidade: "Belo Horizonte", segmento: "Serviços", subsegmento: "Consultoria", faixa_faturamento: "Faixa 03", marca_totvs: "Datasul", inicio_relacionamento: "2021-07-10" },
        { cd_cliente: "004", uf: "RS", cidade: "Porto Alegre", segmento: "Distribuição", subsegmento: "Alimentício", faixa_faturamento: "Faixa 06", marca_totvs: "RM", inicio_relacionamento: "2018-11-05" },
        { cd_cliente: "005", uf: "PR", cidade: "Curitiba", segmento: "Construção", subsegmento: "Residencial", faixa_faturamento: "Faixa 04", marca_totvs: "Datasul", inicio_relacionamento: "2020-09-18" },
        { cd_cliente: "006", uf: "SC", cidade: "Florianópolis", segmento: "Logística", subsegmento: "Transporte", faixa_faturamento: "Faixa 02", marca_totvs: "RM", inicio_relacionamento: "2022-02-14" },
        { cd_cliente: "007", uf: "BA", cidade: "Salvador", segmento: "Hospitality", subsegmento: "Hotéis", faixa_faturamento: "Faixa 07", marca_totvs: "Datasul", inicio_relacionamento: "2019-12-03" },
        { cd_cliente: "008", uf: "GO", cidade: "Goiânia", segmento: "Educacional", subsegmento: "Universidades", faixa_faturamento: "Faixa 01", marca_totvs: "RM", inicio_relacionamento: "2021-05-20" },
        { cd_cliente: "009", uf: "PE", cidade: "Recife", segmento: "Saúde", subsegmento: "Hospitais", faixa_faturamento: "Faixa 09", marca_totvs: "Datasul", inicio_relacionamento: "2018-08-12" },
        { cd_cliente: "010", uf: "CE", cidade: "Fortaleza", segmento: "Agroindústria", subsegmento: "Agricultura", faixa_faturamento: "Faixa 03", marca_totvs: "RM", inicio_relacionamento: "2020-04-25" },
        { cd_cliente: "011", uf: "DF", cidade: "Brasília", segmento: "Jurídico", subsegmento: "Advocacia", faixa_faturamento: "Faixa 00", marca_totvs: "Datasul", inicio_relacionamento: "2022-01-08" },
        { cd_cliente: "012", uf: "MT", cidade: "Cuiabá", segmento: "Financial Services", subsegmento: "Bancos", faixa_faturamento: "Faixa 10", marca_totvs: "RM", inicio_relacionamento: "2019-06-30" },
        { cd_cliente: "013", uf: "MS", cidade: "Campo Grande", segmento: "Supermercados", subsegmento: "Varejo", faixa_faturamento: "Faixa 05", marca_totvs: "Datasul", inicio_relacionamento: "2021-10-15" },
        { cd_cliente: "014", uf: "AL", cidade: "Maceió", segmento: "TOTVS", subsegmento: "Tecnologia", faixa_faturamento: "Faixa 11", marca_totvs: "RM", inicio_relacionamento: "2018-02-28" },
        { cd_cliente: "015", uf: "SE", cidade: "Aracaju", segmento: "Varejo", subsegmento: "Moda", faixa_faturamento: "Faixa 02", marca_totvs: "Datasul", inicio_relacionamento: "2020-12-10" }
    ];

    // Configuração das colunas da tabela
    const clientesColumns = [
        { key: "cd_cliente" as const, label: "CD_CLIENTE", sortable: true },
        { key: "uf" as const, label: "UF", sortable: true },
        { key: "cidade" as const, label: "CIDADE", sortable: true, highlighted: true },
        { key: "segmento" as const, label: "SEGMENTO", sortable: true },
        { key: "subsegmento" as const, label: "SUBSEGMENTO", sortable: true },
        { key: "faixa_faturamento" as const, label: "FAIXA_FATURAMENTO", sortable: true },
        { key: "marca_totvs" as const, label: "MARCA_TOTVS", sortable: true },
        { key: "inicio_relacionamento" as const, label: "INICIO_RELACIONAMENTO", sortable: true }
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

    // Calcular larguras responsivas
    const isMobile = windowWidth < 1024;
    const top10Width = isMobile ? Math.min(windowWidth - 100, 800) : 1000;
    const top5Width = isMobile ? Math.min(windowWidth - 100, 500) : 600;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
                <p className="mt-2 text-gray-600">Gestão e análise completa dos clientes</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Clientes Totais Distintos</p>
                            <p className="text-2xl font-semibold text-gray-900">10,62 Mil</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Segmentos Comerciais</p>
                            <p className="text-2xl font-semibold text-gray-900">14</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Subsegmentos Comerciais</p>
                            <p className="text-2xl font-semibold text-gray-900">66</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Marca TOTVS</p>
                            <p className="text-2xl font-semibold text-gray-900">86</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Estados Alcançados</p>
                            <p className="text-2xl font-semibold text-gray-900">39</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="p-2 bg-pink-100 rounded-lg">
                            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Cidades Alcançadas</p>
                            <p className="text-2xl font-semibold text-gray-900">1.249</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabela de Clientes */}
            <div className="mt-6 mb-6">
                <DataTable
                    data={clientesData}
                    columns={clientesColumns}
                    title="Lista de clientes"
                    searchPlaceholder="Pesquisar clientes..."
                    itemsPerPage={10}
                    height="500px"
                />
            </div>



            {/* Novos Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
                {/* TOP 10 - Marca TOTVS */}
                <div className="bg-white shadow rounded-lg overflow-hidden h-[450px] lg:h-[450px] flex flex-col lg:col-span-3">
                    <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3 className="text-base lg:text-lg font-medium text-gray-900">TOP 10 quantidade de clientes - por marca TOTVS</h3>
                        </div>
                    </div>
                    <div className="flex-1 p-1 lg:p-2">
                        <Top10BarChart
                            data={dadosMarcaTotvs}
                            width={top10Width}
                            height={580}
                            color="#8b5cf6"
                            showValues={false}
                        />
                    </div>
                </div>

                {/* TOP 5 - Por UF */}
                <div className="bg-white shadow rounded-lg overflow-hidden h-[450px] lg:h-[450px] flex flex-col lg:col-span-2">
                    <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3 className="text-base lg:text-lg font-medium text-gray-900">TOP 5 quantidade de clientes - por UF</h3>
                        </div>
                    </div>
                    <div className="flex-1 p-2 lg:p-4">
                        <Top5HorizontalBarChart
                            data={dadosUF}
                            width={top5Width}
                            height={480}
                            showValues={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
