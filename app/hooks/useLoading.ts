import { useState, useEffect } from "react";

export function useLoading() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let progressInterval: NodeJS.Timeout;

        // Função para verificar se todas as imagens estão carregadas
        const checkImagesLoaded = () => {
            const images = document.querySelectorAll('img');
            const totalImages = images.length;
            let loadedImages = 0;

            if (totalImages === 0) {
                return Promise.resolve();
            }

            return new Promise<void>((resolve) => {
                const checkImage = (img: HTMLImageElement) => {
                    if (img.complete) {
                        loadedImages++;
                        setProgress((loadedImages / totalImages) * 80);
                        if (loadedImages === totalImages) {
                            resolve();
                        }
                    } else {
                        img.addEventListener('load', () => {
                            loadedImages++;
                            setProgress((loadedImages / totalImages) * 80);
                            if (loadedImages === totalImages) {
                                resolve();
                            }
                        });
                        img.addEventListener('error', () => {
                            loadedImages++;
                            setProgress((loadedImages / totalImages) * 80);
                            if (loadedImages === totalImages) {
                                resolve();
                            }
                        });
                    }
                };

                images.forEach(checkImage);
            });
        };

        // Função para verificar se o DOM está pronto
        const checkDOMReady = () => {
            return new Promise<void>((resolve) => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', () => resolve());
                }
            });
        };

        // Simular progresso inicial
        const simulateInitialProgress = () => {
            let currentProgress = 0;
            progressInterval = setInterval(() => {
                currentProgress += Math.random() * 10;
                if (currentProgress >= 20) {
                    currentProgress = 20;
                    clearInterval(progressInterval);
                }
                setProgress(Math.min(currentProgress, 20));
            }, 100);
        };

        // Processo principal de carregamento
        const loadApp = async () => {
            simulateInitialProgress();

            try {
                // Aguardar DOM estar pronto
                await checkDOMReady();
                setProgress(40);

                // Aguardar imagens carregarem
                await checkImagesLoaded();
                setProgress(90);

                // Tempo mínimo para evitar flash
                await new Promise(resolve => setTimeout(resolve, 500));
                setProgress(100);

                // Aguardar um pouco mais para transição suave
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);

            } catch (error) {
                console.error('Erro durante carregamento:', error);
                setProgress(100);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };

        loadApp();

        return () => {
            if (progressInterval) clearInterval(progressInterval);
        };
    }, []);

    return { isLoading, progress };
}
