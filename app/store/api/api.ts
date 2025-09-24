import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { API_CONFIG, CACHE_TAGS, ERROR_CONFIG, ENDPOINT_RETRY_CONFIG } from './config';
import type { LeadsResponse, SimulateLeadRequest, SimulateLeadResponse, Company, Cluster } from './types';

export interface DashboardData {
    totalEmpresas: number;
    totalContratos: number;
    valorTotalContratos: number;
    clusters: Cluster[];
}

// Interface para a resposta da API de clusters
export interface ClusterApiResponse {
    clusters: {
        cluster_id: number;
        descricao: string;
        comportamento: string;
        total_tickets_abertos: number;
        total_desconto_concedido: number;
        media_nps: number;
        qtd_avaliacoes_nps: number;
        qtd_contratos: number;
        valor_total_contratado: number;
        media_dias_resolucao_ticket: number;
        n_clients: number;
        acoes: {
            acao: string;
        }[];
    }[];
}

// Base query com retry personalizado
const baseQueryWithRetry = retry(
    fetchBaseQuery({
        baseUrl: API_CONFIG.baseUrl,
        timeout: API_CONFIG.timeout,
        prepareHeaders: (headers) => {
            Object.entries(API_CONFIG.headers).forEach(([key, value]) => {
                headers.set(key, value);
            });
            return headers;
        },
    }),
    {
        maxRetries: ERROR_CONFIG.maxRetries,
        backoff: async (attempt: number, maxRetries: number) => {
            // Delay exponencial: 1s, 2s, 4s...
            const delay = ERROR_CONFIG.retryDelay * Math.pow(2, attempt - 1);

            // Log para debug (apenas em desenvolvimento)
            if (process.env.NODE_ENV === 'development') {
                console.log(`🔄 Tentativa ${attempt}/${maxRetries} falhou, tentando novamente em ${delay}ms...`);
            }

            await new Promise(resolve => setTimeout(resolve, delay));
        },
    }
);

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithRetry,
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

        getClusters: builder.query<ClusterApiResponse, void>({
            query: () => '/clusters',
            providesTags: [CACHE_TAGS.Dashboard],
        }),

        getLeads: builder.query<LeadsResponse, void>({
            query: () => '/leads',
            providesTags: [CACHE_TAGS.Dashboard],
        }),

        simulateLead: builder.mutation<SimulateLeadResponse, SimulateLeadRequest>({
            query: (leadData) => ({
                url: '/leads/simular',
                method: 'POST',
                body: leadData,
            }),
            invalidatesTags: [CACHE_TAGS.Dashboard],
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
    useGetClustersQuery,
    useGetLeadsQuery,
    useSimulateLeadMutation,
} = api;