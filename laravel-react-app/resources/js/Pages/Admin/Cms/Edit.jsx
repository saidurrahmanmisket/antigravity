import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CmsEdit({ auth, content }) {
    const { data, setData, put, processing } = useForm({
        title: content.title,
        content: content.content,
        is_active: content.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/cms/${content.id}`);
    };

    return (
        <AdminLayout auth={auth}>
            <Head title={`Edit ${content.title} - Admin`} />

            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Content</h1>

            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Key</label>
                        <input
                            type="text"
                            value={content.key}
                            disabled
                            className="w-full border-gray-300 bg-gray-100 rounded-md font-mono text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="w-full border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            rows="8"
                            className="w-full border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={e => setData('is_active', e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        <label className="ml-2 text-sm text-gray-700">Active</label>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <a
                            href="/admin/cms"
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
