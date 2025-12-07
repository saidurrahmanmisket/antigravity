@extends('layouts.admin')

@section('title', 'Categories')

@section('content')
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Categories</h1>

        <!-- Add Category Form (Inline or Modal could be better, but keeping simple for now) -->
        <div class="bg-white p-4 rounded-lg shadow w-full max-w-2xl">
            <h2 class="text-lg font-semibold mb-4">Add New Category</h2>
            <form action="{{ route('admin.categories.store') }}" method="POST" enctype="multipart/form-data"
                class="grid grid-cols-1 md:grid-cols-2 gap-4">
                @csrf
                <div>
                    <input type="text" name="name" placeholder="Category Name" class="w-full border-gray-300 rounded-md"
                        required>
                </div>
                <div>
                    <select name="parent_id" class="w-full border-gray-300 rounded-md">
                        <option value="">No Parent (Top Level)</option>
                        @foreach($categories as $cat)
                            <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="md:col-span-2">
                    <textarea name="description" placeholder="Description" class="w-full border-gray-300 rounded-md"
                        rows="2"></textarea>
                </div>
                <div>
                    <input type="file" name="image"
                        class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                </div>
                <div class="flex items-center">
                    <button type="submit"
                        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full">Add
                        Category</button>
                </div>
            </form>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden p-6 mt-6">
        <table id="categories-table" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- DataTables will populate this -->
            </tbody>
        </table>
    </div>

    <script>
        $(document).ready(function () {
            $('#categories-table').DataTable({
                processing: true,
                serverSide: true,
                ajax: "{{ route('admin.categories.index') }}",
                columns: [
                    { data: 'image', name: 'image', orderable: false, searchable: false },
                    { data: 'name', name: 'name' },
                    { data: 'slug', name: 'slug' },
                    { data: 'parent.name', name: 'parent.name', defaultContent: '-' },
                    { data: 'is_active', name: 'is_active' },
                    { data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-right' }
                ]
            });
        });
    </script>
@endsection