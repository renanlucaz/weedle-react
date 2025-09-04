import { useEffect, useState } from "react";

interface LoadingScreenProps {
    progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center z-50">
            <div className="text-center">
                {/* Logo */}
                <div className="mb-8">
                    <img
                        src="/weedle.svg"
                        alt="Weedle"
                        className="w-32 h-16 mx-auto filter brightness-0 invert"
                    />
                </div>

                {/* Progress Percentage */}
                <div className="text-white text-sm mb-4">
                    {Math.round(progress)}%
                </div>

                {/* Progress Bar */}
                <div className="w-48 bg-white bg-opacity-20 rounded-full h-2 mx-auto overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
