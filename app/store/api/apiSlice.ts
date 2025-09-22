import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG, CACHE_TAGS } from './config';

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

export interface DashboardData {
    totalEmpresas: number;
    totalContratos: number;
    valorTotalContratos: number;
    clusters: Cluster[];
}

// Configuração da API base
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.baseUrl,
        timeout: API_CONFIG.timeout,
        prepareHeaders: (headers) => {
            // Adicionar headers de autenticação se necessário
            Object.entries(API_CONFIG.headers).forEach(([key, value]) => {
                headers.set(key, value);
            });
            return headers;
        },
    }),
    tagTypes: Object.values(CACHE_TAGS),
    endpoints: (builder) => ({
        // Endpoints para empresas
        getCompanies: builder.query<Company[], void>({
            query: () => '/empresas',
            providesTags: [CACHE_TAGS.Company],
        }),

        getCompanyById: builder.query<Company, string>({
            query: (id) => `/empresas/${id}`,
            providesTags: (result, error, id) => [{ type: CACHE_TAGS.Company, id }],
        }),

        createCompany: builder.mutation<Company, Partial<Company>>({
            query: (company) => ({
                url: '/empresas',
                method: 'POST',
                body: company,
            }),
            invalidatesTags: [CACHE_TAGS.Company],
        }),

        updateCompany: builder.mutation<Company, { id: string; updates: Partial<Company> }>({
            query: ({ id, updates }) => ({
                url: `/empresas/${id}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: CACHE_TAGS.Company, id }],
        }),

        deleteCompany: builder.mutation<void, string>({
            query: (id) => ({
                url: `/empresas/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [CACHE_TAGS.Company],
        }),

        // Endpoints para clusters
        getClusters: builder.query<Cluster[], void>({
            query: () => '/clusters',
            providesTags: [CACHE_TAGS.Cluster],
        }),

        getClusterById: builder.query<Cluster, string>({
            query: (id) => `/clusters/${id}`,
            providesTags: (result, error, id) => [{ type: CACHE_TAGS.Cluster, id }],
        }),

        createCluster: builder.mutation<Cluster, Partial<Cluster>>({
            query: (cluster) => ({
                url: '/clusters',
                method: 'POST',
                body: cluster,
            }),
            invalidatesTags: [CACHE_TAGS.Cluster],
        }),

        updateCluster: builder.mutation<Cluster, { id: string; updates: Partial<Cluster> }>({
            query: ({ id, updates }) => ({
                url: `/clusters/${id}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: CACHE_TAGS.Cluster, id }],
        }),

        deleteCluster: builder.mutation<void, string>({
            query: (id) => ({
                url: `/clusters/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [CACHE_TAGS.Cluster],
        }),

        // Endpoints para dashboard
        getDashboardData: builder.query<DashboardData, void>({
            query: () => '/dashboard',
            providesTags: [CACHE_TAGS.Dashboard],
        }),

        // Endpoints para simulação de leads
        simulateLeads: builder.mutation<Company[], { quantidade: number; parametros?: any }>({
            query: ({ quantidade, parametros }) => ({
                url: '/simular-leads',
                method: 'POST',
                body: { quantidade, parametros },
            }),
            invalidatesTags: [CACHE_TAGS.Company, CACHE_TAGS.Dashboard],
        }),

        // Endpoint para buscar empresas por cluster
        getCompaniesByCluster: builder.query<Company[], string>({
            query: (clusterId) => `/clusters/${clusterId}/empresas`,
            providesTags: (result, error, clusterId) => [
                { type: CACHE_TAGS.Company, id: 'LIST' },
                { type: CACHE_TAGS.Cluster, id: clusterId }
            ],
        }),

        // Endpoint para estatísticas
        getStatistics: builder.query<{
            totalEmpresas: number;
            totalContratos: number;
            valorMedioContrato: number;
            empresasPorCluster: Record<string, number>;
        }, void>({
            query: () => '/statistics',
            providesTags: [CACHE_TAGS.Dashboard],
        }),
    }),
});

// Exportar hooks gerados automaticamente
export const {
    useGetCompaniesQuery,
    useGetCompanyByIdQuery,
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation,
    useGetClustersQuery,
    useGetClusterByIdQuery,
    useCreateClusterMutation,
    useUpdateClusterMutation,
    useDeleteClusterMutation,
    useGetDashboardDataQuery,
    useSimulateLeadsMutation,
    useGetCompaniesByClusterQuery,
    useGetStatisticsQuery,
} = apiSlice;
