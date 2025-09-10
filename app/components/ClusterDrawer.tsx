import { useEffect } from 'react';

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

interface ClusterDrawerProps {
    cluster: Cluster | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ClusterDrawer({ cluster, isOpen, onClose }: ClusterDrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!cluster || !isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'bg-opacity-20' : 'bg-opacity-0'}`} />

            {/* Drawer */}
            <div
                className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="text-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div
                                className="w-4 h-4 rounded-full mr-3"
                                style={{ backgroundColor: cluster.color }}
                            />
                            <h2 className="text-2xl font-bold">{cluster.name}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-purple-100 mt-2">{cluster.description}</p>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto h-[calc(100vh-120px)]">
                    {/* Métricas Principais */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">{cluster.metrics.totalClients}</div>
                            <div className="text-sm text-gray-600">Total de Clientes</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">{cluster.metrics.avgTicket}</div>
                            <div className="text-sm text-gray-600">Ticket Médio</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{cluster.metrics.frequency}</div>
                            <div className="text-sm text-gray-600">Frequência</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600">{cluster.metrics.lastOrder}</div>
                            <div className="text-sm text-gray-600">Último Pedido</div>
                        </div>
                    </div>

                    {/* Ações Estratégicas */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Estratégicas Recomendadas</h3>
                        <div className="space-y-3">
                            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Programa de fidelidade com cashback ou pontos extras para clientes frequentes
                                </p>
                            </div>
                            <div className="flex items-start p-3 bg-green-50 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Ofertas exclusivas de pré-lançamento de produtos
                                </p>
                            </div>
                            <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Convite para eventos VIP ou experiências personalizadas
                                </p>
                            </div>
                            <div className="flex items-start p-3 bg-orange-50 rounded-lg">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Envio de cupons personalizados baseados no histórico de compras
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Comportamento do Cluster */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Análise Comportamental</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Este cluster representa um grupo de clientes com características similares de consumo.
                                Eles demonstram um padrão consistente de compras e respondem bem a ofertas direcionadas.
                                A estratégia de marketing deve focar em personalização e criação de experiências únicas
                                para maximizar o valor do cliente ao longo do tempo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
