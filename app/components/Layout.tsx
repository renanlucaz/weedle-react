import { Link, Outlet, useLocation } from "react-router";

export function Layout() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                Weedle
                            </Link>
                        </div>
                        <nav className="flex space-x-8">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/")
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/clusters"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/clusters")
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Clusters
                            </Link>
                            <Link
                                to="/simular-leads"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/simular-leads")
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                Simular Leads
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}
