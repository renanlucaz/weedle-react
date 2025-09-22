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

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.baseUrl,
        timeout: API_CONFIG.timeout,
        prepareHeaders: (headers) => {
            Object.entries(API_CONFIG.headers).forEach(([key, value]) => {
                headers.set(key, value);
            });
            return headers;
        },
    }),
    tagTypes: Object.values(CACHE_TAGS),
    endpoints: (builder) => ({
        getLtvMedio: builder.query<{ valor: number }, string>({
            query: (clusterId) => `/dashboard/ltv-medio${clusterId !== 'all' ? `?cluster_id=${clusterId}` : ''}`,
            providesTags: [CACHE_TAGS.Dashboard],
        }),

        getTicketMedio: builder.query<{ valor: number }, string>({
            query: (clusterId) => `/dashboard/ticket-medio${clusterId !== 'all' ? `?cluster_id=${clusterId}` : ''}`,
            providesTags: [CACHE_TAGS.Dashboard],
        }),

        getTaxaCrossSell: builder.query<{ valor: number }, string>({
            query: (clusterId) => `/dashboard/taxa-cross-sell${clusterId !== 'all' ? `?cluster_id=${clusterId}` : ''}`,
            providesTags: [CACHE_TAGS.Dashboard],
        }),

        getNps: builder.query<{
            kpi: string;
            valores: {
                media_nps_relacional: number;
                media_nps_suporte: number;
                media_nps_geral: number;
            };
        }, string>({
            query: (clusterId) => `/dashboard/nps${clusterId !== 'all' ? `?cluster_id=${clusterId}` : ''}`,
            providesTags: [CACHE_TAGS.Dashboard],
        }),

        getTempoMedioResolucao: builder.query<{
            kpi: string;
            valor: number;
            unidade: string;
            descricao: string;
            detalhes: {
                total_tickets: number;
                menor_tempo: number;
                maior_tempo: number;
            };
            filtros: {
                cluster_id: string | null;
                data_inicio: string | null;
                data_fim: string | null;
            };
        }, string>({
            query: (clusterId) => `/dashboard/tempo-medio-resolucao${clusterId !== 'all' ? `?cluster_id=${clusterId}` : ''}`,
            providesTags: [CACHE_TAGS.Dashboard],
        }),
    }),
});

// Exportar hooks gerados automaticamente
export const {
    useGetLtvMedioQuery,
    useGetTicketMedioQuery,
    useGetTaxaCrossSellQuery,
    useGetNpsQuery,
    useGetTempoMedioResolucaoQuery,
} = api;