import { Link, Outlet, useLocation } from "react-router";

export default function Layout() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                {/* Logo */}
                <div className="flex items-center px-6 py-2 border-b border-gray-200">
                    <img src="/weedle.svg" alt="Weedle" className="mr-3 w-30 h-15" />
                </div>

                {/* Navigation */}
                <nav className="mt-8 px-4">
                    <div className="space-y-2">
                        <Link
                            to="/"
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/")
                                ? "text-white bg-purple-500"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Dashboard
                        </Link>
                        <Link
                            to="/clusters"
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive("/clusters")
                                ? "text-white bg-purple-500"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Clusters
                        </Link>
                        <Link
                            to="/simular-leads"
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
                <Outlet />
            </div>
        </div>
    );
}
