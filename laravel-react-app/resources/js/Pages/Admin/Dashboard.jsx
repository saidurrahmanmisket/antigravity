import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ auth, stats, recentOrders, topProducts }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Admin Dashboard" />

            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
                    <p className="text-3xl font-bold text-gray-900">${stats.total_sales?.toFixed(2) || '0.00'}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Orders</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.total_orders || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Customers</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.total_customers || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.pending_orders || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                    <div className="space-y-3">
                        {recentOrders.map(order => (
                            <Link
                                key={order.id}
                                href={`/admin/orders/${order.id}`}
                                className="flex justify-between items-center border-b pb-2 hover:bg-gray-50 px-2 py-1 rounded"
                            >
                                <div>
                                    <p className="font-semibold">{order.order_number}</p>
                                    <p className="text-sm text-gray-600">{order.user?.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">${order.total}</p>
                                    <p className="text-sm text-gray-600">{order.status}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Top Products</h2>
                    <div className="space-y-3">
                        {topProducts.map(product => (
                            <Link
                                key={product.id}
                                href={`/admin/products/${product.id}/edit`}
                                className="flex justify-between items-center border-b pb-2 hover:bg-gray-50 px-2 py-1 rounded"
                            >
                                <div>
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-gray-600">{product.category?.name}</p>
                                </div>
                                <p className="text-indigo-600 font-semibold">${product.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
