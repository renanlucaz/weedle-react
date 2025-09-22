import { useCallback } from 'react';
import {
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
    Company,
    Cluster,
    DashboardData,
} from '../store/api/apiSlice';

// Hook customizado para gerenciar empresas
export const useCompanies = () => {
    const {
        data: companies,
        error: companiesError,
        isLoading: isLoadingCompanies,
        refetch: refetchCompanies,
    } = useGetCompaniesQuery();

    const [createCompany, { isLoading: isCreatingCompany }] = useCreateCompanyMutation();
    const [updateCompany, { isLoading: isUpdatingCompany }] = useUpdateCompanyMutation();
    const [deleteCompany, { isLoading: isDeletingCompany }] = useDeleteCompanyMutation();

    const handleCreateCompany = useCallback(
        async (companyData: Partial<Company>) => {
            try {
                const result = await createCompany(companyData).unwrap();
                return { success: true, data: result };
            } catch (error) {
                return { success: false, error };
            }
        },
        [createCompany]
    );

    const handleUpdateCompany = useCallback(
        async (id: string, updates: Partial<Company>) => {
            try {
                const result = await updateCompany({ id, updates }).unwrap();
                return { success: true, data: result };
            } catch (error) {
                return { success: false, error };
            }
        },
        [updateCompany]
    );

    const handleDeleteCompany = useCallback(
        async (id: string) => {
            try {
                await deleteCompany(id).unwrap();
                return { success: true };
            } catch (error) {
                return { success: false, error };
            }
        },
        [deleteCompany]
    );

    return {
        companies,
        companiesError,
        isLoadingCompanies,
        refetchCompanies,
        createCompany: handleCreateCompany,
        updateCompany: handleUpdateCompany,
        deleteCompany: handleDeleteCompany,
        isCreatingCompany,
        isUpdatingCompany,
        isDeletingCompany,
    };
};

// Hook customizado para gerenciar uma empresa específica
export const useCompany = (id: string) => {
    const {
        data: company,
        error: companyError,
        isLoading: isLoadingCompany,
        refetch: refetchCompany,
    } = useGetCompanyByIdQuery(id);

    return {
        company,
        companyError,
        isLoadingCompany,
        refetchCompany,
    };
};

// Hook customizado para gerenciar clusters
export const useClusters = () => {
    const {
        data: clusters,
        error: clustersError,
        isLoading: isLoadingClusters,
        refetch: refetchClusters,
    } = useGetClustersQuery();

    const [createCluster, { isLoading: isCreatingCluster }] = useCreateClusterMutation();
    const [updateCluster, { isLoading: isUpdatingCluster }] = useUpdateClusterMutation();
    const [deleteCluster, { isLoading: isDeletingCluster }] = useDeleteClusterMutation();

    const handleCreateCluster = useCallback(
        async (clusterData: Partial<Cluster>) => {
            try {
                const result = await createCluster(clusterData).unwrap();
                return { success: true, data: result };
            } catch (error) {
                return { success: false, error };
            }
        },
        [createCluster]
    );

    const handleUpdateCluster = useCallback(
        async (id: string, updates: Partial<Cluster>) => {
            try {
                const result = await updateCluster({ id, updates }).unwrap();
                return { success: true, data: result };
            } catch (error) {
                return { success: false, error };
            }
        },
        [updateCluster]
    );

    const handleDeleteCluster = useCallback(
        async (id: string) => {
            try {
                await deleteCluster(id).unwrap();
                return { success: true };
            } catch (error) {
                return { success: false, error };
            }
        },
        [deleteCluster]
    );

    return {
        clusters,
        clustersError,
        isLoadingClusters,
        refetchClusters,
        createCluster: handleCreateCluster,
        updateCluster: handleUpdateCluster,
        deleteCluster: handleDeleteCluster,
        isCreatingCluster,
        isUpdatingCluster,
        isDeletingCluster,
    };
};

// Hook customizado para gerenciar um cluster específico
export const useCluster = (id: string) => {
    const {
        data: cluster,
        error: clusterError,
        isLoading: isLoadingCluster,
        refetch: refetchCluster,
    } = useGetClusterByIdQuery(id);

    return {
        cluster,
        clusterError,
        isLoadingCluster,
        refetchCluster,
    };
};

// Hook customizado para dashboard
export const useDashboard = () => {
    const {
        data: dashboardData,
        error: dashboardError,
        isLoading: isLoadingDashboard,
        refetch: refetchDashboard,
    } = useGetDashboardDataQuery();

    return {
        dashboardData,
        dashboardError,
        isLoadingDashboard,
        refetchDashboard,
    };
};

// Hook customizado para simulação de leads
export const useSimulateLeads = () => {
    const [simulateLeads, { isLoading: isSimulatingLeads }] = useSimulateLeadsMutation();

    const handleSimulateLeads = useCallback(
        async (quantidade: number, parametros?: any) => {
            try {
                const result = await simulateLeads({ quantidade, parametros }).unwrap();
                return { success: true, data: result };
            } catch (error) {
                return { success: false, error };
            }
        },
        [simulateLeads]
    );

    return {
        simulateLeads: handleSimulateLeads,
        isSimulatingLeads,
    };
};

// Hook customizado para empresas por cluster
export const useCompaniesByCluster = (clusterId: string) => {
    const {
        data: companies,
        error: companiesError,
        isLoading: isLoadingCompanies,
        refetch: refetchCompanies,
    } = useGetCompaniesByClusterQuery(clusterId);

    return {
        companies,
        companiesError,
        isLoadingCompanies,
        refetchCompanies,
    };
};

// Hook customizado para estatísticas
export const useStatistics = () => {
    const {
        data: statistics,
        error: statisticsError,
        isLoading: isLoadingStatistics,
        refetch: refetchStatistics,
    } = useGetStatisticsQuery();

    return {
        statistics,
        statisticsError,
        isLoadingStatistics,
        refetchStatistics,
    };
};
