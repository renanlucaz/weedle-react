# Sistema de Retry Avançado - Versão 2.0

## Visão Geral

Sistema de retry robusto implementado para a API usando RTK Query, com configurações específicas por endpoint e backoff exponencial inteligente.

## Características Principais

### ✅ **Retry Inteligente**
- 3 tentativas por padrão (configurável por endpoint)
- Backoff exponencial: 1s, 2s, 4s...
- Configurações específicas por tipo de endpoint

### ✅ **Configurações por Endpoint**
- **Críticos**: `/clusters`, `/leads`, `/dashboard` - 5 tentativas, 2s delay
- **Normais**: `/empresas`, `/reports` - 3 tentativas, 1s delay  
- **Leves**: `/simular-leads` - 2 tentativas, 0.5s delay

### ✅ **Logs Detalhados**
- Logs em desenvolvimento para debug
- Informações sobre tentativas e delays
- Identificação de endpoints problemáticos

## Configuração

### 1. Configurações Gerais (`config.ts`)

```typescript
export const ERROR_CONFIG = {
    retryDelay: 1000, // 1 segundo base
    maxRetries: 3, // 3 tentativas adicionais
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
    nonRetryableStatusCodes: [400, 401, 403, 404, 422],
} as const;
```

### 2. Configurações por Endpoint

```typescript
export const ENDPOINT_RETRY_CONFIG = {
    critical: {
        endpoints: ['/clusters', '/leads', '/dashboard'],
        maxRetries: 5,
        retryDelay: 2000, // 2 segundos
    },
    normal: {
        endpoints: ['/empresas', '/reports'],
        maxRetries: 3,
        retryDelay: 1000, // 1 segundo
    },
    light: {
        endpoints: ['/simular-leads'],
        maxRetries: 2,
        retryDelay: 500, // 0.5 segundos
    },
} as const;
```

## Implementação

### 1. Base Query com Retry

```typescript
const baseQueryWithRetry = retry(
    fetchBaseQuery({
        baseUrl: API_CONFIG.baseUrl,
        timeout: API_CONFIG.timeout,
        prepareHeaders: (headers) => {
            // Configuração de headers
        },
    }),
    {
        maxRetries: ERROR_CONFIG.maxRetries,
        backoff: async (attempt: number, maxRetries: number) => {
            const delay = ERROR_CONFIG.retryDelay * Math.pow(2, attempt - 1);
            
            if (process.env.NODE_ENV === 'development') {
                console.log(`🔄 Tentativa ${attempt}/${maxRetries} falhou, tentando novamente em ${delay}ms...`);
            }
            
            await new Promise(resolve => setTimeout(resolve, delay));
        },
    }
);
```

### 2. Função para Configuração por Endpoint

```typescript
const getRetryConfig = (url: string) => {
    // Verificar se é um endpoint crítico
    for (const endpoint of ENDPOINT_RETRY_CONFIG.critical.endpoints) {
        if (url.includes(endpoint)) {
            return ENDPOINT_RETRY_CONFIG.critical;
        }
    }
    
    // Verificar se é um endpoint leve
    for (const endpoint of ENDPOINT_RETRY_CONFIG.light.endpoints) {
        if (url.includes(endpoint)) {
            return ENDPOINT_RETRY_CONFIG.light;
        }
    }
    
    // Padrão: endpoint normal
    return ENDPOINT_RETRY_CONFIG.normal;
};
```

## Como Funciona

### 1. **Detecção de Endpoint**
- A função `getRetryConfig()` analisa a URL da requisição
- Determina qual configuração usar baseada no endpoint

### 2. **Aplicação de Retry**
- RTK Query aplica o retry automaticamente
- Usa backoff exponencial para evitar sobrecarga
- Logs detalhados em desenvolvimento

### 3. **Configuração Dinâmica**
- Diferentes endpoints têm diferentes configurações
- Endpoints críticos têm mais tentativas
- Endpoints leves têm menos tentativas

## Logs de Debug

Em desenvolvimento, você verá logs como:

```
🔄 Tentativa 1/3 falhou, tentando novamente em 1000ms...
🔄 Tentativa 2/3 falhou, tentando novamente em 2000ms...
🔄 Tentativa 3/3 falhou, tentando novamente em 4000ms...
```

Para endpoints específicos:
```
🔄 [/clusters] Tentativa 1/5 falhou, tentando novamente em 2000ms...
🔄 [/leads] Tentativa 2/5 falhou, tentando novamente em 4000ms...
```

## Status Codes

### ✅ **Retentados**
- `408` - Request Timeout
- `429` - Too Many Requests
- `500` - Internal Server Error
- `502` - Bad Gateway
- `503` - Service Unavailable
- `504` - Gateway Timeout

### ❌ **NÃO Retentados**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity

## Benefícios

1. **Resiliente**: Lida com falhas temporárias de rede
2. **Inteligente**: Configurações específicas por endpoint
3. **Eficiente**: Backoff exponencial evita sobrecarga
4. **Transparente**: Funciona automaticamente
5. **Debugável**: Logs claros para monitoramento

## Adicionando Novos Endpoints

Para adicionar novos endpoints, edite as configurações em `config.ts`:

```typescript
export const ENDPOINT_RETRY_CONFIG = {
    critical: {
        endpoints: ['/clusters', '/leads', '/dashboard', '/novo-endpoint-critico'],
        maxRetries: 5,
        retryDelay: 2000,
    },
    // ... outras configurações
} as const;
```

## Monitoramento

### Logs em Desenvolvimento
- Tentativas de retry
- Delays aplicados
- Endpoints problemáticos
- Status codes de erro

### Métricas Importantes
- Taxa de sucesso após retry
- Tempo médio de recuperação
- Endpoints com mais falhas
- Padrões de erro

## Limitações

- Funciona apenas com RTK Query
- Não resolve problemas de configuração do servidor
- Requer que o servidor responda corretamente após retry
- Logs apenas em desenvolvimento

## Próximos Passos

1. **Monitorar**: Acompanhar logs para identificar padrões
2. **Ajustar**: Modificar configurações baseado no comportamento real
3. **Expandir**: Adicionar novos endpoints conforme necessário
4. **Otimizar**: Ajustar delays baseado na performance do servidor
