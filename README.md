# Weedle - Sistema de Gestão de Leads

O Weedle é uma aplicação web moderna e inteligente para segmentação de clientes e gestão de leads, desenvolvida com tecnologias de ponta. O sistema oferece uma plataforma completa para análise de dados, simulação de cenários e tomada de decisões estratégicas baseadas em clusters de clientes.

## 🚀 Link de Produção

**Site em Produção:** [https://www.weedle.com.br/](https://www.weedle.com.br/)

## 🚀 Funcionalidades

### 📊 Dashboard (Página Inicial)
- Visão geral das métricas e performance do sistema
- Cards com estatísticas principais (Total de Leads, Leads Convertidos, Taxa de Conversão, Clusters Ativos)
- Gráficos de performance (Leads por Mês, Performance por Cluster)
- Feed de atividade recente

### 🎯 Clusters
- Gerenciamento completo de clusters de leads
- Visualização de estatísticas por cluster
- Lista detalhada com informações de cada cluster
- Ações rápidas (Importar Leads, Gerar Relatório, Configurações)
- Controles de edição, visualização e exclusão

### 🔬 Simular Leads
- Simulação de cenários de leads com parâmetros configuráveis
- Formulário com opções de segmentação (mercado, faixa etária, localização)
- Critérios de qualificação personalizáveis
- Seleção de algoritmos de clustering (K-Means, Hierárquico, DBSCAN, Gaussian Mixture)
- Visualização de resultados com distribuição dos clusters
- Métricas de performance e ROI estimado
- Recomendações de ações baseadas nos resultados

## 🏗️ Estrutura do Projeto

```
app/
├── components/
│   └── Layout.tsx          # Layout principal com navegação
├── routes/
│   ├── dashboard.tsx       # Dashboard principal (página inicial)
│   ├── clusters.tsx        # Gerenciamento de clusters
│   └── simular-leads.tsx   # Simulação de leads
├── root.tsx                # Componente raiz da aplicação
└── routes.ts               # Configuração de rotas
```

## 🛠️ Tecnologias Utilizadas

- **React Router v7** - Roteamento e navegação
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização e design system
- **Vite** - Build tool e servidor de desenvolvimento

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Build para produção:**
   ```bash
   npm run build
   ```

4. **Verificar tipos TypeScript:**
   ```bash
   npm run typecheck
   ```

## 📱 Rotas Disponíveis

- `/` - Dashboard principal com métricas e análises (página inicial)
- `/clusters` - Gerenciamento de clusters de leads
- `/simular-leads` - Simulação de cenários de leads

## 🎨 Design System

O projeto utiliza Tailwind CSS com um design system consistente:

- **Cores principais:** Azul (#3B82F6), Verde (#10B981), Amarelo (#F59E0B), Roxo (#8B5CF6)
- **Tipografia:** Inter (Google Fonts)
- **Componentes:** Cards, botões, formulários, tabelas e navegação padronizados
- **Responsividade:** Layout adaptável para desktop, tablet e mobile

## 🔧 Configuração de Rotas

As rotas são configuradas no arquivo `app/routes.ts` usando a API do React Router v7:

```typescript
export default [
  route("", "components/Layout.tsx", [
    index("routes/dashboard.tsx"),        // Rota raiz (/) - Dashboard
    route("clusters", "routes/clusters.tsx"),
    route("simular-leads", "routes/simular-leads.tsx"),
  ]),
] satisfies RouteConfig;
```

## 📊 Componentes Principais

### Layout
- Header com navegação principal
- Logo clicável que leva ao dashboard
- Navegação ativa com indicadores visuais
- Container responsivo para conteúdo

### Dashboard (Página Inicial)
- Cards de métricas com ícones e valores
- Seções de gráficos (placeholders para integração futura)
- Feed de atividades recentes

### Clusters
- Lista de clusters com informações detalhadas
- Estatísticas de performance
- Ações de gerenciamento

### Simular Leads
- Formulário de configuração de simulação
- Visualização de resultados
- Gráficos de distribuição
- Recomendações de ações

## 🚀 Próximos Passos

- [ ] Integração com bibliotecas de gráficos (Chart.js, Recharts)
- [ ] Implementação de funcionalidades de CRUD para clusters
- [ ] Sistema de autenticação e autorização
- [ ] API backend para persistência de dados
- [ ] Testes automatizados
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n)

## 📝 Licença

Este projeto é privado e proprietário.
