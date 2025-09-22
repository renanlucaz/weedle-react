# API Slices - Estrutura Modular

## 📁 Nova Estrutura da API

A API foi refatorada para usar slices separados, cada um com sua responsabilidade específica:

```
app/store/api/
├── api.ts                    # API combinada (combineSlices)
├── companiesApi.ts           # Slice para empresas
├── clustersApi.ts            # Slice para clusters
├── dashboardApi.ts           # Slice para dashboard
├── simulationApi.ts          # Slice para simulação
├── statisticsApi.ts          # Slice para estatísticas
├── config.ts                 # Configurações da API
├── types.ts                  # Tipos TypeScript adicionais
└── README.md                 # Esta documentação
```

## 🎯 Benefícios da Nova Estrutura

- **🔧 Modularidade**: Cada slice tem responsabilidade única
- **📦 Tree Shaking**: Melhor otimização de bundle
- **👥 Colaboração**: Menos conflitos em equipe
- **🧪 Testes**: Mais fácil testar slices individualmente
- **📚 Manutenção**: Mais fácil encontrar e editar código específico
- **🔄 Reutilização**: Slices podem ser reutilizados em outros projetos

## 📋 Slices Disponíveis

### 🏢 companiesApi.ts
**Responsabilidade:** Gerenciar todas as operações relacionadas a empresas

**Endpoints:**
- `getCompanies` - Listar todas as empresas
- `getCompanyById` - Buscar empresa por ID
- `createCompany` - Criar nova empresa
- `updateCompany` - Atualizar empresa
- `deleteCompany` - Deletar empresa
- `getCompaniesByCluster` - Empresas por cluster

**Hooks:**
```tsx
import {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompaniesByClusterQuery,
} from '~/store/api/api';
```

### 🎯 clustersApi.ts
**Responsabilidade:** Gerenciar todas as operações relacionadas a clusters

**Endpoints:**
- `getClusters` - Listar todos os clusters
- `getClusterById` - Buscar cluster por ID
- `createCluster` - Criar novo cluster
- `updateCluster` - Atualizar cluster
- `deleteCluster` - Deletar cluster

**Hooks:**
```tsx
import {
  useGetClustersQuery,
  useGetClusterByIdQuery,
  useCreateClusterMutation,
  useUpdateClusterMutation,
  useDeleteClusterMutation,
} from '~/store/api/api';
```

### 📊 dashboardApi.ts
**Responsabilidade:** Dados do dashboard

**Endpoints:**
- `getDashboardData` - Dados do dashboard

**Hooks:**
```tsx
import { useGetDashboardDataQuery } from '~/store/api/api';
```

### 🎲 simulationApi.ts
**Responsabilidade:** Simulação de leads

**Endpoints:**
- `simulateLeads` - Simular leads

**Hooks:**
```tsx
import { useSimulateLeadsMutation } from '~/store/api/api';
```

### 📈 statisticsApi.ts
**Responsabilidade:** Estatísticas gerais

**Endpoints:**
- `getStatistics` - Estatísticas gerais

**Hooks:**
```tsx
import { useGetStatisticsQuery } from '~/store/api/api';
```

## 🔧 Como Usar

### Importação Individual
```tsx
// Importar hooks específicos
import { useGetCompaniesQuery } from '~/store/api/companiesApi';
import { useGetClustersQuery } from '~/store/api/clustersApi';
```

### Importação Centralizada (Recomendado)
```tsx
// Importar do arquivo api.ts (recomendado)
import { 
  useGetCompaniesQuery,
  useGetClustersQuery,
  useGetDashboardDataQuery 
} from '~/store/api/api';
```

### Usando Hooks Customizados
```tsx
// Usar hooks customizados (mais fácil)
import { useCompanies, useClusters, useDashboard } from '~/hooks';
```

## 🏗️ Estrutura Interna

### api.ts - API Combinada
```typescript
export const api = {
  reducer: {
    [companiesApi.reducerPath]: companiesApi.reducer,
    [clustersApi.reducerPath]: clustersApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [simulationApi.reducerPath]: simulationApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
  },
  middleware: [
    companiesApi.middleware,
    clustersApi.middleware,
    dashboardApi.middleware,
    simulationApi.middleware,
    statisticsApi.middleware,
  ],
};
```

### Exemplo de Slice Individual
```typescript
export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.baseUrl,
    // ... configurações
  }),
  tagTypes: [CACHE_TAGS.Company],
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => '/empresas',
      providesTags: [CACHE_TAGS.Company],
    }),
    // ... outros endpoints
  }),
});
```

## 🔄 Cache e Invalidação

Cada slice gerencia seu próprio cache:

- **companiesApi**: Cache de empresas
- **clustersApi**: Cache de clusters
- **dashboardApi**: Cache do dashboard
- **simulationApi**: Invalida cache de empresas e dashboard
- **statisticsApi**: Cache de estatísticas

## 🎨 Tipos TypeScript

Todos os tipos estão exportados do arquivo `api.ts`:

```typescript
import type { Company, Cluster, DashboardData } from '~/store/api/api';
```

## 🚀 Adicionando Novos Slices

Para adicionar um novo slice:

1. **Criar o arquivo do slice:**
```typescript
// novoSliceApi.ts
export const novoSliceApi = createApi({
  reducerPath: 'novoSliceApi',
  // ... configurações
});
```

2. **Adicionar ao api.ts:**
```typescript
import { novoSliceApi } from './novoSliceApi';

export const api = {
  reducer: {
    // ... outros reducers
    [novoSliceApi.reducerPath]: novoSliceApi.reducer,
  },
  middleware: [
    // ... outros middlewares
    novoSliceApi.middleware,
  ],
};
```

3. **Exportar hooks:**
```typescript
export {
  useGetNovoQuery,
  useCreateNovoMutation,
} from './novoSliceApi';
```

## ✅ Compatibilidade

A estrutura é totalmente compatível com o código existente:

```tsx
// Continua funcionando exatamente igual
import { useCompanies, useDashboard } from '~/hooks';
```

A única diferença é que agora cada slice está em seu próprio arquivo, mas a API pública permanece a mesma.
