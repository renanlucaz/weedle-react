// Tipos adicionais para a API

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ApiError {
    message: string;
    code?: string;
    details?: any;
}

// Tipos para filtros e queries
export interface CompanyFilters {
    segmento?: string;
    cluster?: string;
    valorMinimo?: number;
    valorMaximo?: number;
    dataInicio?: string;
    dataFim?: string;
}

export interface ClusterFilters {
    nome?: string;
    descricao?: string;
}

export interface SimulationParams {
    quantidade: number;
    segmento?: string;
    valorMinimo?: number;
    valorMaximo?: number;
    cluster?: string;
    produto?: string;
}

// Tipos para estatísticas
export interface CompanyStatistics {
    totalEmpresas: number;
    totalContratos: number;
    valorMedioContrato: number;
    valorTotalContratos: number;
    empresasPorSegmento: Record<string, number>;
    empresasPorCluster: Record<string, number>;
    contratosPorMes: Array<{
        mes: string;
        quantidade: number;
        valor: number;
    }>;
}

export interface ClusterStatistics {
    totalClusters: number;
    empresasPorCluster: Record<string, number>;
    valorMedioPorCluster: Record<string, number>;
    clusterMaisAtivo: string;
    clusterMenosAtivo: string;
}

// Tipos para relatórios
export interface ReportData {
    periodo: {
        inicio: string;
        fim: string;
    };
    resumo: {
        totalEmpresas: number;
        totalContratos: number;
        valorTotal: number;
        crescimento: number;
    };
    detalhes: {
        empresas: Company[];
        clusters: Cluster[];
        estatisticas: CompanyStatistics;
    };
}

// Tipos base para as entidades
export interface Company {
    id: string;
    cnpj: string;
    nomeEmpresa: string;
    segmento: string;
    capitalSocial: number;
    email: string;
    produto: string;
    valorContrato: number;
    cluster: string;
    dataSimulacao: string;
}

export interface Cluster {
    id: string;
    nome: string;
    descricao?: string;
    empresas: Company[];
}

// Tipos para configurações da API
export interface ApiConfig {
    baseUrl: string;
    timeout: number;
    retries: number;
    headers: Record<string, string>;
}

// Tipos para cache
export interface CacheConfig {
    ttl: number; // Time to live in seconds
    maxSize: number;
    strategy: 'lru' | 'fifo' | 'lfu';
}

// Tipos para notificações
export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

// Tipos para logs
export interface ApiLog {
    id: string;
    method: string;
    url: string;
    status: number;
    duration: number;
    timestamp: string;
    request?: any;
    response?: any;
    error?: any;
}

// Tipos para leads simulados
export interface SimulatedLead {
    cnpj: string;
    nome_empresa: string;
    segmento: string;
    capital_social: number;
    email: string;
    produto: string;
    valor_contrato: number;
    cluster_name: string;
    data_simulacao: string;
}

export interface LeadsResponse {
    leads: SimulatedLead[];
    total: number;
    limit: number | null;
    offset: number;
    filtros: {
        segmento: string | null;
        cluster_name: string | null;
        produto: string | null;
    };
}

// Tipos para simulação de leads
export interface SimulateLeadRequest {
    cnpj: string;
    nome_empresa: string;
    segmento: string;
    capital_social: number | null;
    email: string;
    produto: string;
    valor_contrato: number | null;
}

export interface SimulateLeadResponse {
    success: boolean;
    message: string;
    lead_id: string;
    data: SimulatedLead;
}
