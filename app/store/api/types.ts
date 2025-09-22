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
