import {
    useGetLtvMedioQuery,
    useGetTicketMedioQuery,
    useGetTaxaCrossSellQuery,
    useGetNpsQuery,
    useGetTempoMedioResolucaoQuery,
} from '../store/api/api';

export const useDashboardMetrics = (clusterId: string) => {
    console.log('useDashboardMetrics - clusterId:', clusterId);

    // Always fetch data, regardless of cluster selection
    const { data: ltvMedioData, isLoading: isLoadingLtv, isError: isErrorLtv, isFetching: isFetchingLtv } = useGetLtvMedioQuery(clusterId);
    const { data: ticketMedioData, isLoading: isLoadingTicket, isError: isErrorTicket, isFetching: isFetchingTicket } = useGetTicketMedioQuery(clusterId);
    const { data: taxaCrossSellData, isLoading: isLoadingCrossSell, isError: isErrorCrossSell, isFetching: isFetchingCrossSell } = useGetTaxaCrossSellQuery(clusterId);
    const { data: npsData, isLoading: isLoadingNps, isError: isErrorNps, isFetching: isFetchingNps } = useGetNpsQuery(clusterId);
    const { data: tempoMedioResolucaoData, isLoading: isLoadingTmr, isError: isErrorTmr, isFetching: isFetchingTmr } = useGetTempoMedioResolucaoQuery(clusterId);

    console.log('API Data:', { ltvMedioData, ticketMedioData, taxaCrossSellData, npsData, tempoMedioResolucaoData });

    // isLoading: primeira vez carregando, isFetching: carregando novamente (incluindo mudança de cluster)
    const isLoading = isLoadingLtv || isLoadingTicket || isLoadingCrossSell || isLoadingNps || isLoadingTmr;
    const isFetching = isFetchingLtv || isFetchingTicket || isFetchingCrossSell || isFetchingNps || isFetchingTmr;
    const hasError = isErrorLtv || isErrorTicket || isErrorCrossSell || isErrorNps || isErrorTmr;

    const metrics = {
        ltvMedio: ltvMedioData?.valor ?? 0,
        ticketMedio: ticketMedioData?.valor ?? 0,
        taxaCrossSell: taxaCrossSellData?.valor ?? 0,
        nps: {
            geral: npsData?.valores?.media_nps_geral ?? 0,
            relacional: npsData?.valores?.media_nps_relacional ?? 0,
            suporte: npsData?.valores?.media_nps_suporte ?? 0,
        },
        tempoMedioResolucao: {
            valor: tempoMedioResolucaoData?.valor ?? 0,
            unidade: tempoMedioResolucaoData?.unidade ?? 'dias',
            descricao: tempoMedioResolucaoData?.descricao ?? '',
            detalhes: {
                totalTickets: tempoMedioResolucaoData?.detalhes?.total_tickets ?? 0,
                menorTempo: tempoMedioResolucaoData?.detalhes?.menor_tempo ?? 0,
                maiorTempo: tempoMedioResolucaoData?.detalhes?.maior_tempo ?? 0,
            }
        },
    };



    return { metrics, isLoading, isFetching, hasError };
};
