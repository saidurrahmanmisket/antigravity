import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function SlidersIndex({ auth, sliders }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Sliders - Admin" />

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Homepage Sliders</h1>
                <Link
                    href="/admin/sliders/create"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500"
                >
                    Add Slider
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {sliders.map(slider => (
                    <div key={slider.id} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
                        <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            <img src={slider.image} alt={slider.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-semibold text-lg">{slider.title}</h3>
                            <p className="text-sm text-gray-600">{slider.subtitle}</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs text-gray-500">Order: {slider.sort_order}</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${slider.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {slider.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Link
                                href={`/admin/sliders/${slider.id}/edit`}
                                className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded"
                            >
                                Edit
                            </Link>
                            <Link
                                href={`/admin/sliders/${slider.id}`}
                                method="delete"
                                as="button"
                                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
