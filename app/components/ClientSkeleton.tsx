interface ClientSkeletonProps {
    className?: string;
}

export function ClientStatsSkeleton({ className = "" }: ClientSkeletonProps) {
    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm ${className}`}>
            <div className="flex items-center">
                <div className="p-2 bg-gray-200 rounded-lg animate-pulse">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="ml-4 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}

export function ClientChartSkeleton({ className = "" }: ClientSkeletonProps) {
    return (
        <div className={`bg-white shadow rounded-lg overflow-hidden h-[450px] flex flex-col ${className}`}>
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
            </div>
            <div className="flex-1 p-1 lg:p-2">
                <div className="w-full h-full bg-gray-100 rounded animate-pulse flex items-center justify-center">
                    <div className="text-gray-400 text-sm">Carregando gráfico...</div>
                </div>
            </div>
        </div>
    );
}

export function ClientTableSkeleton({ className = "" }: ClientSkeletonProps) {
    return (
        <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
            <div className="px-4 py-4 border-b border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="p-4">
                {/* Header da tabela */}
                <div className="grid grid-cols-8 gap-4 mb-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                </div>

                {/* Linhas da tabela */}
                {Array.from({ length: 10 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-8 gap-4 mb-3">
                        {Array.from({ length: 8 }).map((_, colIndex) => (
                            <div key={colIndex} className="h-3 bg-gray-100 rounded animate-pulse"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
