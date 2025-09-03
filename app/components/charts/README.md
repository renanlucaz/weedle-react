# Componentes de Gráficos D3.js

Este diretório contém componentes de gráficos interativos construídos com D3.js para a aplicação Weedle.

## Componentes Disponíveis

### 1. PurchaseEvolutionChart
Gráfico de linha com área para mostrar a evolução de compras ao longo do tempo.

**Props:**
- `data`: Array de objetos com `{ month: string, value: number }`
- `width`: Largura do gráfico (padrão: 500)
- `height`: Altura do gráfico (padrão: 300)

**Características:**
- Linha suave com curva monotônica
- Área preenchida com gradiente
- Pontos interativos com tooltips
- Eixos rotulados e escalados automaticamente
- Responsivo e interativo

### 2. TicketDistributionChart
Gráfico combinado de barras e linha para mostrar distribuição de ticket médio.

**Props:**
- `data`: Array de objetos com `{ month: string, barValue: number, lineValue: number }`
- `width`: Largura do gráfico (padrão: 500)
- `height`: Altura do gráfico (padrão: 300)

**Características:**
- Barras roxas com cantos arredondados
- Linha teal sobreposta
- Grid horizontal para melhor leitura
- Tooltips informativos
- Legenda integrada
- Hover effects nas barras e pontos

## Uso

```tsx
import { PurchaseEvolutionChart, TicketDistributionChart } from '../components/charts';

// Dados para evolução de compras
const purchaseData = [
    { month: "Jan", value: 20 },
    { month: "Fev", value: 40 },
    // ... mais dados
];

// Dados para distribuição de ticket
const ticketData = [
    { month: "Jan", barValue: 30, lineValue: 50 },
    { month: "Fev", barValue: 45, lineValue: 40 },
    // ... mais dados
];

// Uso nos componentes
<PurchaseEvolutionChart data={purchaseData} />
<TicketDistributionChart data={ticketData} />
```

## Dependências

- **D3.js v7.9.0**: Biblioteca principal para visualização de dados
- **React**: Para integração com componentes
- **TypeScript**: Para tipagem estática

## Características Técnicas

- **SVG-based**: Renderização vetorial escalável
- **Responsivo**: Adapta-se ao tamanho do container
- **Interativo**: Tooltips e hover effects
- **Acessível**: Eixos bem definidos e legendas
- **Performance**: Otimizado com useRef e useEffect
- **Customizável**: Cores, tamanhos e estilos configuráveis

## Personalização

Os gráficos podem ser personalizados modificando:
- Cores (atualmente roxo #8b5cf6 e teal #14b8a6)
- Tamanhos e margens
- Estilos de eixos e grid
- Comportamento de tooltips
- Curvas de interpolação

## Exemplo de Dados

```tsx
// Formato para PurchaseEvolutionChart
const purchaseData = [
    { month: "Jan", value: 20 },
    { month: "Fev", value: 40 },
    { month: "Mar", value: -60 },
    { month: "Abr", value: 80 }
];

// Formato para TicketDistributionChart
const ticketData = [
    { month: "Jan", barValue: 30, lineValue: 50 },
    { month: "Fev", barValue: 45, lineValue: 40 },
    { month: "Mar", barValue: 60, lineValue: 70 }
];
```
