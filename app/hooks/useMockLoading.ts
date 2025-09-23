import { useState, useEffect } from 'react';

// Armazenar globalmente quais páginas já foram carregadas
const loadedPages = new Set<string>();

export const useMockLoading = (delay: number = 2000, pageKey?: string) => {
    // Usar a chave da página ou um identificador único
    const currentPageKey = pageKey || window.location.pathname;
    const [isLoading, setIsLoading] = useState(!loadedPages.has(currentPageKey));
    const [hasLoaded, setHasLoaded] = useState(loadedPages.has(currentPageKey));

    useEffect(() => {
        // Se a página já foi carregada antes, não mostrar loading
        if (loadedPages.has(currentPageKey)) {
            setIsLoading(false);
            setHasLoaded(true);
            return;
        }

        // Simular carregamento apenas na primeira vez
        const timer = setTimeout(() => {
            setIsLoading(false);
            setHasLoaded(true);
            // Marcar a página como carregada
            loadedPages.add(currentPageKey);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, currentPageKey]);

    return { isLoading, hasLoaded };
};
