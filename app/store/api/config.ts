// Configurações da API

export const API_CONFIG = {
    baseUrl: 'http://localhost:8010/',
    timeout: 30000, // 30 segundos
    retries: 3,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
} as const;

// Configurações de cache
export const CACHE_CONFIG = {
    ttl: 5 * 60 * 1000, // 5 minutos em millisegundos
    maxSize: 100,
    strategy: 'lru' as const,
} as const;

// Endpoints da API
export const API_ENDPOINTS = {
    // Empresas
    companies: {
        list: '/empresas',
        detail: (id: string) => `/empresas/${id}`,
        create: '/empresas',
        update: (id: string) => `/empresas/${id}`,
        delete: (id: string) => `/empresas/${id}`,
        byCluster: (clusterId: string) => `/clusters/${clusterId}/empresas`,
    },

    // Clusters
    clusters: {
        list: '/clusters',
        detail: (id: string) => `/clusters/${id}`,
        create: '/clusters',
        update: (id: string) => `/clusters/${id}`,
        delete: (id: string) => `/clusters/${id}`,
    },

    // Dashboard
    dashboard: {
        data: '/dashboard',
        statistics: '/statistics',
    },

    // Simulação
    simulation: {
        leads: '/simular-leads',
    },

    // Relatórios
    reports: {
        companies: '/reports/companies',
        clusters: '/reports/clusters',
        dashboard: '/reports/dashboard',
    },
} as const;

// Tags para cache do RTK Query
export const CACHE_TAGS = {
    Company: 'Company',
    Cluster: 'Cluster',
    Dashboard: 'Dashboard',
    Statistics: 'Statistics',
    Report: 'Report',
} as const;

// Configurações de desenvolvimento
export const DEV_CONFIG = {
    enableLogging: process.env.NODE_ENV === 'development',
    enableDevTools: process.env.NODE_ENV === 'development',
    mockApi: false, // Set to true to use mock data
} as const;

// Configurações de erro
export const ERROR_CONFIG = {
    retryDelay: 1000, // 1 segundo
    maxRetries: 3,
    timeoutMessage: 'Request timeout. Please try again.',
    networkErrorMessage: 'Network error. Please check your connection.',
    serverErrorMessage: 'Server error. Please try again later.',
} as const;
