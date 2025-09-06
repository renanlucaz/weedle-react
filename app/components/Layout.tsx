import { Link, Outlet, useLocation } from "react-router";
import { useState } from "react";
import { useLoading } from "../hooks/useLoading";
import LoadingScreen from "./LoadingScreen";

export default function Layout() {
    const location = useLocation();
    const [dashboardOpen, setDashboardOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isLoading, progress } = useLoading();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const isDashboardActive = () => {
        return location.pathname === "/" ||
            location.pathname.startsWith("/dashboard/");
    };

    // Mostrar loading screen enquanto carregando
    if (isLoading) {
        return <LoadingScreen progress={progress} />;
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Left Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {/* Logo */}
                <div className="flex items-center justify-between px-6 py-1 border-b border-gray-200">
                    <div className="flex items-center">
                        <img src="/weedle.svg" alt="Weedle" className="mr-3 w-30 h-15" />
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-8 px-4 pb-4 overflow-y-auto h-[calc(100vh-120px)]">
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <button
                                onClick={() => setDashboardOpen(!dashboardOpen)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isDashboardActive()
                                    ? "text-white bg-purple-500"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    Dashboard
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-transform ${dashboardOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Sub-menus do Dashboard */}
                            {dashboardOpen && (
                                <div className="ml-6 space-y-1">
                                    <Link
                                        to="/dashboard/clientes"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${isActive("/dashboard/clientes")
                                            ? "text-purple-600"
                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Clientes
                                    </Link>

                                    <Link
                                        to="/dashboard/nps"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${isActive("/dashboard/nps")
                                            ? "text-purple-600"
                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        NPS
                                    </Link>

                                    <Link
                                        to="/dashboard/tickets"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${isActive("/dashboard/tickets")
                                            ? "text-purple-600"
                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Tickets
                                    </Link>

                                    <Link
                                        to="/dashboard/contratos"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${isActive("/dashboard/contratos")
                                            ? "text-purple-600"
                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Contratos
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link
                            to="/clusters"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/clusters")
                                ? "text-white bg-purple-500"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Clusters
                        </Link>
                        <Link
                            to="/simular-leads"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/simular-leads")
                                ? "text-white bg-purple-500"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Simular leads
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex items-center">
                            <img src="/weedle.svg" alt="Weedle" className="h-8" />
                        </div>
                        <div className="w-10"></div> {/* Spacer for centering */}
                    </div>
                </div>

                <Outlet />
            </div>
        </div>
    );
}
