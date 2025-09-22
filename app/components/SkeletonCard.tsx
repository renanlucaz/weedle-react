interface SkeletonCardProps {
    className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
    return (
        <div className={`bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    {/* Título do card */}
                    <div className="h-4 bg-purple-200 rounded w-32 mb-2 animate-pulse"></div>

                    {/* Valor principal */}
                    <div className="h-8 bg-purple-200 rounded w-24 mb-2 animate-pulse"></div>

                    {/* Descrição */}
                    <div className="h-3 bg-purple-200 rounded w-20 animate-pulse"></div>
                </div>

                {/* Ícone */}
                <div className="w-12 h-12 bg-purple-200 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
}

export function SkeletonTicketsCard({ className = "" }: SkeletonCardProps) {
    return (
        <div className={`bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    {/* Título do card */}
                    <div className="h-4 bg-purple-200 rounded w-32 mb-2 animate-pulse"></div>

                    {/* Total de tickets */}
                    <div className="h-6 bg-purple-200 rounded w-20 mb-1 animate-pulse"></div>

                    {/* Menor tempo */}
                    <div className="h-3 bg-purple-200 rounded w-24 mb-1 animate-pulse"></div>

                    {/* Maior tempo */}
                    <div className="h-3 bg-purple-200 rounded w-24 animate-pulse"></div>
                </div>

                {/* Ícone */}
                <div className="w-12 h-12 bg-purple-200 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
}
