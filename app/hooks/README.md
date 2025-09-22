# Hooks Customizados - Estrutura Organizada

## 📁 Estrutura dos Hooks

Cada hook foi separado em seu próprio arquivo para melhor organização e manutenibilidade:

```
app/hooks/
├── index.ts                    # Exportações centralizadas
├── useLoading.ts              # Hook existente
├── useCompanies.ts            # Gerenciar lista de empresas
├── useCompany.ts              # Gerenciar empresa específica
├── useClusters.ts             # Gerenciar lista de clusters
├── useCluster.ts              # Gerenciar cluster específico
├── useDashboard.ts            # Dados do dashboard
├── useSimulateLeads.ts        # Simulação de leads
├── useCompaniesByCluster.ts   # Empresas por cluster
├── useStatistics.ts           # Estatísticas gerais
└── README.md                  # Esta documentação
```

## 🚀 Como Usar

### Importação Individual
```tsx
import { useCompanies } from '~/hooks/useCompanies';
import { useDashboard } from '~/hooks/useDashboard';
```

### Importação Centralizada (Recomendado)
```tsx
import { useCompanies, useDashboard, useSimulateLeads } from '~/hooks';
```

## 📋 Hooks Disponíveis

### 🏢 useCompanies()
**Arquivo:** `useCompanies.ts`
**Função:** Gerenciar lista de empresas

```tsx
const {
  companies,              // Lista de empresas
  companiesError,         // Erro se houver
  isLoadingCompanies,     // Estado de carregamento
  refetchCompanies,       // Função para recarregar
  createCompany,          // Função para criar empresa
  updateCompany,          // Função para atualizar empresa
  deleteCompany,          // Função para deletar empresa
  isCreatingCompany,      // Estado de criação
  isUpdatingCompany,      // Estado de atualização
  isDeletingCompany,      // Estado de exclusão
} = useCompanies();
```

### 🏢 useCompany(id)
**Arquivo:** `useCompany.ts`
**Função:** Gerenciar empresa específica

```tsx
const {
  company,                // Dados da empresa
  companyError,           // Erro se houver
  isLoadingCompany,       // Estado de carregamento
  refetchCompany,         // Função para recarregar
} = useCompany('empresa-id');
```

### 🎯 useClusters()
**Arquivo:** `useClusters.ts`
**Função:** Gerenciar lista de clusters

```tsx
const {
  clusters,               // Lista de clusters
  clustersError,          // Erro se houver
  isLoadingClusters,      // Estado de carregamento
  refetchClusters,        // Função para recarregar
  createCluster,          // Função para criar cluster
  updateCluster,          // Função para atualizar cluster
  deleteCluster,          // Função para deletar cluster
  isCreatingCluster,      // Estado de criação
  isUpdatingCluster,      // Estado de atualização
  isDeletingCluster,      // Estado de exclusão
} = useClusters();
```

### 🎯 useCluster(id)
**Arquivo:** `useCluster.ts`
**Função:** Gerenciar cluster específico

```tsx
const {
  cluster,                // Dados do cluster
  clusterError,           // Erro se houver
  isLoadingCluster,       // Estado de carregamento
  refetchCluster,         // Função para recarregar
} = useCluster('cluster-id');
```

### 📊 useDashboard()
**Arquivo:** `useDashboard.ts`
**Função:** Dados do dashboard

```tsx
const {
  dashboardData,          // Dados do dashboard
  dashboardError,         // Erro se houver
  isLoadingDashboard,     // Estado de carregamento
  refetchDashboard,       // Função para recarregar
} = useDashboard();
```

### 🎲 useSimulateLeads()
**Arquivo:** `useSimulateLeads.ts`
**Função:** Simulação de leads

```tsx
const {
  simulateLeads,          // Função para simular leads
  isSimulatingLeads,      // Estado de simulação
} = useSimulateLeads();

// Uso
const result = await simulateLeads(10, { segmento: 'Tecnologia' });
```

### 🏢 useCompaniesByCluster(clusterId)
**Arquivo:** `useCompaniesByCluster.ts`
**Função:** Empresas por cluster

```tsx
const {
  companies,              // Lista de empresas do cluster
  companiesError,         // Erro se houver
  isLoadingCompanies,     // Estado de carregamento
  refetchCompanies,       // Função para recarregar
} = useCompaniesByCluster('cluster-id');
```

### 📈 useStatistics()
**Arquivo:** `useStatistics.ts`
**Função:** Estatísticas gerais

```tsx
const {
  statistics,             // Dados estatísticos
  statisticsError,        // Erro se houver
  isLoadingStatistics,    // Estado de carregamento
  refetchStatistics,      // Função para recarregar
} = useStatistics();
```

## 💡 Exemplos de Uso

### Exemplo 1: Lista de Empresas
```tsx
import { useCompanies } from '~/hooks';

function CompaniesList() {
  const { companies, isLoadingCompanies, createCompany } = useCompanies();

  const handleCreate = async () => {
    const result = await createCompany({
      cnpj: '12345678000199',
      nomeEmpresa: 'Nova Empresa',
      segmento: 'Tecnologia',
      // ... outros campos
    });

    if (result.success) {
      console.log('Empresa criada:', result.data);
    }
  };

  if (isLoadingCompanies) return <div>Carregando...</div>;

  return (
    <div>
      <button onClick={handleCreate}>Criar Empresa</button>
      {companies?.map(company => (
        <div key={company.id}>{company.nomeEmpresa}</div>
      ))}
    </div>
  );
}
```

### Exemplo 2: Dashboard
```tsx
import { useDashboard, useStatistics } from '~/hooks';

function Dashboard() {
  const { dashboardData, isLoadingDashboard } = useDashboard();
  const { statistics, isLoadingStatistics } = useStatistics();

  if (isLoadingDashboard || isLoadingStatistics) {
    return <div>Carregando dashboard...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total de Empresas: {statistics?.totalEmpresas}</p>
      <p>Total de Contratos: {statistics?.totalContratos}</p>
    </div>
  );
}
```

### Exemplo 3: Simulação de Leads
```tsx
import { useSimulateLeads } from '~/hooks';

function SimulateLeads() {
  const { simulateLeads, isSimulatingLeads } = useSimulateLeads();

  const handleSimulate = async () => {
    const result = await simulateLeads(10, {
      segmento: 'Tecnologia',
      valorMinimo: 10000,
      valorMaximo: 100000,
    });

    if (result.success) {
      console.log('Leads simulados:', result.data);
    }
  };

  return (
    <button 
      onClick={handleSimulate} 
      disabled={isSimulatingLeads}
    >
      {isSimulatingLeads ? 'Simulando...' : 'Simular Leads'}
    </button>
  );
}
```

## ✅ Benefícios da Nova Estrutura

- **🎯 Organização**: Cada hook em seu próprio arquivo
- **🔍 Facilidade de Manutenção**: Mais fácil encontrar e editar hooks específicos
- **📦 Tree Shaking**: Melhor otimização de bundle
- **👥 Colaboração**: Menos conflitos em equipe
- **🧪 Testes**: Mais fácil testar hooks individualmente
- **📚 Documentação**: Documentação específica por hook

## 🔄 Migração

Se você estava usando o arquivo `useApi.ts` anteriormente, não precisa alterar nada no seu código. As importações continuam funcionando da mesma forma:

```tsx
// Continua funcionando
import { useCompanies, useDashboard } from '~/hooks';
```

A única diferença é que agora cada hook está em seu próprio arquivo, mas a API pública permanece a mesma.
