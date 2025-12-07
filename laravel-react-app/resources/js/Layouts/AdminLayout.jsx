import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ auth, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
        { name: 'Products', href: '/admin/products', icon: '👟' },
        { name: 'Categories', href: '/admin/categories', icon: '📁' },
        { name: 'Orders', href: '/admin/orders', icon: '🛒' },
        { name: 'Users', href: '/admin/users', icon: '👥' },
        { name: 'Sliders', href: '/admin/sliders', icon: '🖼️' },
        { name: 'CMS Content', href: '/admin/cms', icon: '📝' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-20">
                <div className="px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="mr-4 p-2 rounded hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link href="/admin/dashboard" className="text-2xl font-bold text-indigo-600">
                            Admin Panel
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a href="/" className="text-gray-600 hover:text-indigo-600">
                            View Store
                        </a>
                        <div className="border-l pl-4">
                            <span className="text-gray-700">{auth.user.name}</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 bottom-0 bg-white shadow-lg transition-all duration-300 z-10 ${sidebarOpen ? 'w-64' : 'w-0'
                    } overflow-hidden`}
            >
                <div className="p-4">
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                            >
                                <span className="text-2xl mr-3">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`transition-all duration-300 pt-16 ${sidebarOpen ? 'ml-64' : 'ml-0'
                    } p-8`}
            >
                {children}
            </main>
        </div>
    );
}
