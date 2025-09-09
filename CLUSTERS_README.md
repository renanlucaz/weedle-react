# Interface de Clusters Interativa

## Visão Geral

A página de clusters foi completamente redesenhada para oferecer uma experiência interativa similar ao mapa de carreiras do VAGAS.com. A interface permite visualizar e explorar diferentes grupos de clientes através de um gráfico de rede interativo.

## Funcionalidades Implementadas

### 1. Gráfico de Rede Interativo (ClusterNetworkChart)
- **Visualização em círculos**: Cada cluster é representado por um círculo colorido
- **Tamanho proporcional**: O tamanho do círculo é baseado no número de clientes
- **Layout orgânico**: Posicionamento automático usando simulação de forças do D3.js
- **Interatividade**: Hover effects e seleção visual
- **Animações**: Transições suaves e animações de entrada

### 2. Drawer de Detalhes (ClusterDrawer)
- **Modal responsivo**: Exibe informações detalhadas do cluster selecionado
- **Métricas principais**: Total de clientes, ticket médio, frequência, último pedido
- **Palavras-chave**: Tags coloridas com características do cluster
- **Ações estratégicas**: Recomendações personalizadas para cada grupo
- **Análise comportamental**: Descrição detalhada do perfil do cluster

### 3. Funcionalidades de Busca
- **Busca em tempo real**: Filtra clusters por nome, descrição ou palavras-chave
- **Atualização dinâmica**: Estatísticas se atualizam conforme a busca
- **Interface intuitiva**: Campo de busca com ícone e placeholder

### 4. Dashboard de Estatísticas
- **Cards informativos**: Total de clientes, clusters ativos, ticket médio, crescimento
- **Design responsivo**: Adapta-se a diferentes tamanhos de tela
- **Ícones visuais**: Representação gráfica para cada métrica

## Estrutura dos Dados

### Interface Cluster
```typescript
interface Cluster {
    id: string;
    name: string;
    size: number;
    color: string;
    x: number;
    y: number;
    description: string;
    metrics: {
        totalClients: number;
        avgTicket: string;
        frequency: string;
        lastOrder: string;
    };
    keywords: string[];
}
```

### Clusters Disponíveis
1. **Clientes Premium** - Alto valor, alta frequência
2. **Clientes Regulares** - Base sólida, padrão consistente
3. **Clientes Ocasionais** - Baixa frequência, potencial de crescimento
4. **Novos Clientes** - Recém-cadastrados, processo de onboarding
5. **Clientes Corporativos** - Volume alto, contratos especiais
6. **Clientes Sazonais** - Compras em períodos específicos

## Tecnologias Utilizadas

- **React 19** - Framework principal
- **D3.js v7** - Visualização de dados e simulação de forças
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização responsiva
- **React Router v7** - Roteamento

## Como Usar

1. **Navegação**: Acesse a página através do menu lateral "Clusters"
2. **Exploração**: Visualize os clusters no gráfico de rede
3. **Busca**: Use o campo de busca para filtrar clusters específicos
4. **Detalhes**: Clique em qualquer círculo para abrir o drawer com informações
5. **Fechamento**: Clique no "X" ou fora do modal para fechar

## Características Técnicas

### Performance
- **Simulação otimizada**: Forças calculadas apenas quando necessário
- **Renderização eficiente**: Uso de D3.js para manipulação DOM
- **Responsividade**: Adaptação automática a diferentes tamanhos de tela

### Acessibilidade
- **Navegação por teclado**: Suporte a interações via teclado
- **Contraste adequado**: Cores que atendem padrões de acessibilidade
- **Textos alternativos**: Descrições para elementos visuais

### Manutenibilidade
- **Componentes modulares**: Separação clara de responsabilidades
- **Tipagem forte**: Interfaces TypeScript bem definidas
- **Código limpo**: Estrutura organizada e comentada

## Próximos Passos

- [ ] Integração com API real para dados dinâmicos
- [ ] Filtros avançados (por período, região, etc.)
- [ ] Exportação de relatórios
- [ ] Comparação entre clusters
- [ ] Histórico de evolução dos clusters
- [ ] Notificações de mudanças significativas

## Arquivos Criados/Modificados

- `app/components/charts/ClusterNetworkChart.tsx` - Componente do gráfico de rede
- `app/components/ClusterDrawer.tsx` - Componente do drawer de detalhes
- `app/routes/clusters.tsx` - Página principal de clusters
- `app/components/charts/index.ts` - Exportações atualizadas
- `app/components/index.ts` - Exportações atualizadas
