# Solução para Problema de Redirecionamento 307 (HTTPS → HTTP)

## Problema Identificado

Os endpoints `/clusters` e `/leads` estavam retornando status 307 (Temporary Redirect) redirecionando de HTTPS para HTTP, causando erro de CORS. Isso acontece quando:

1. O servidor não está configurado corretamente para HTTPS
2. Há um proxy ou load balancer que está fazendo redirecionamento incorreto
3. O servidor está configurado para redirecionar HTTPS para HTTP (configuração incorreta)

## Sintomas

- ✅ Endpoints de dashboard funcionam normalmente
- ❌ Endpoints `/clusters` e `/leads` retornam 307
- ❌ Erro de CORS após redirecionamento
- ❌ Requisições falham com "Mixed Content" ou "CORS" errors

## Solução Implementada

### 1. Função de Fetch Personalizada

Criada uma função `customFetch` que:
- Intercepta requisições para endpoints problemáticos
- Desabilita redirecionamento automático (`redirect: 'manual'`)
- Detecta redirecionamentos 307 de HTTPS para HTTP
- Faz requisição direta para HTTPS ao invés de seguir o redirecionamento

```typescript
const customFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    // Verificar se é endpoint problemático
    const isProblematicEndpoint = ENDPOINT_CONFIG.problematicEndpoints.some(endpoint => 
        url.includes(endpoint)
    );
    
    // Para endpoints problemáticos, usar configuração especial
    const fetchOptions = isProblematicEndpoint ? {
        ...init,
        redirect: 'manual' as RequestRedirect,
        headers: {
            ...init?.headers,
            'X-Requested-With': 'XMLHttpRequest',
        }
    } : init;
    
    const response = await fetch(input, fetchOptions);
    
    // Interceptar redirecionamento 307
    if (response.status === 307) {
        const location = response.headers.get('location');
        
        if (location && location.startsWith('http://')) {
            // Fazer requisição direta para HTTPS
            const httpsUrl = location.replace('http://', 'https://');
            return fetch(httpsUrl, init);
        }
    }
    
    return response;
};
```

### 2. Configuração de Endpoints Problemáticos

Adicionado no `config.ts`:

```typescript
export const ENDPOINT_CONFIG = {
    // Endpoints que podem ter problemas de redirecionamento 307
    problematicEndpoints: ['/clusters', '/leads', '/leads/simular'],
    // Configurações específicas para lidar com redirecionamentos
    handleRedirects: true,
    forceHttps: true,
} as const;
```

### 3. Integração com RTK Query

A função personalizada é integrada ao `fetchBaseQuery`:

```typescript
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_CONFIG.baseUrl,
        timeout: API_CONFIG.timeout,
        fetchFn: customFetch, // Usar função personalizada
        prepareHeaders: (headers) => {
            // ... configuração de headers
        },
    }),
    // ... endpoints
});
```

## Como Funciona

1. **Detecção**: A função verifica se a URL contém endpoints problemáticos
2. **Interceptação**: Para endpoints problemáticos, usa `redirect: 'manual'`
3. **Análise**: Verifica se a resposta é um 307 redirecionando para HTTP
4. **Correção**: Se sim, faz requisição direta para a versão HTTPS
5. **Logs**: Em desenvolvimento, mostra logs detalhados do processo

## Logs de Debug

Em desenvolvimento, você verá logs como:

```
Making request to: https://weedle-gja8huezc8fwf2gg.eastus2-01.azurewebsites.net/clusters
⚠️ Problematic endpoint detected, using custom handling
🚨 Intercepted 307 redirect from HTTPS to HTTP: http://weedle-gja8huezc8fwf2gg.eastus2-01.azurewebsites.net/clusters
✅ Making direct request to HTTPS instead: https://weedle-gja8huezc8fwf2gg.eastus2-01.azurewebsites.net/clusters
```

## Benefícios da Solução

1. **Transparente**: Não afeta endpoints que funcionam corretamente
2. **Específica**: Apenas endpoints problemáticos são tratados
3. **Robusta**: Lida com diferentes tipos de redirecionamento
4. **Debugável**: Logs claros para identificar problemas
5. **Flexível**: Fácil de configurar novos endpoints problemáticos

## Endpoints Cobertos

- `/clusters` - Lista de clusters
- `/leads` - Lista de leads
- `/leads/simular` - Simulação de leads

## Adicionando Novos Endpoints

Para adicionar novos endpoints problemáticos, edite o array `problematicEndpoints` em `config.ts`:

```typescript
export const ENDPOINT_CONFIG = {
    problematicEndpoints: [
        '/clusters', 
        '/leads', 
        '/leads/simular',
        '/novo-endpoint' // Adicionar aqui
    ],
    // ...
} as const;
```

## Monitoramento

A solução inclui logs automáticos que ajudam a monitorar:
- Requisições para endpoints problemáticos
- Redirecionamentos 307 interceptados
- Conversões de HTTP para HTTPS
- Erros de requisição

## Limitações

- Funciona apenas para redirecionamentos 307 de HTTPS para HTTP
- Não resolve problemas de configuração do servidor
- Requer que o servidor responda corretamente à versão HTTPS

## Próximos Passos

1. **Testar**: Verificar se os endpoints `/clusters` e `/leads` funcionam
2. **Monitorar**: Acompanhar logs para identificar outros problemas
3. **Configurar Servidor**: Considerar corrigir a configuração do servidor para evitar redirecionamentos incorretos
