@extends('layouts.admin')

@section('title', 'Edit Product')

@section('content')
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Edit Product</h1>
        <a href="{{ route('admin.products.index') }}" class="text-gray-600 hover:text-gray-900">Back to Products</a>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <form action="{{ route('admin.products.update', $product) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input type="text" name="name" value="{{ old('name', $product->name) }}"
                        class="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                    @error('name') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Category -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select name="category_id"
                        class="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                        <option value="">Select Category</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}" {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                        @endforeach
                    </select>
                    @error('category_id') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Price -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input type="number" step="0.01" name="price" value="{{ old('price', $product->price) }}"
                        class="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                    @error('price') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Compare Price -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Compare Price ($)</label>
                    <input type="number" step="0.01" name="compare_price"
                        value="{{ old('compare_price', $product->compare_price) }}"
                        class="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                </div>

                <!-- Stock -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                    <input type="number" name="stock_quantity" value="{{ old('stock_quantity', $product->stock_quantity) }}"
                        class="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                    @error('stock_quantity') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>

                <!-- Status -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select name="status"
                        class="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                        <option value="draft" {{ old('status', $product->status) == 'draft' ? 'selected' : '' }}>Draft
                        </option>
                        <option value="active" {{ old('status', $product->status) == 'active' ? 'selected' : '' }}>Active
                        </option>
                        <option value="archived" {{ old('status', $product->status) == 'archived' ? 'selected' : '' }}>
                            Archived</option>
                    </select>
                    @error('status') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                </div>
            </div>

            <!-- Description -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="description" rows="4"
                    class="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">{{ old('description', $product->description) }}</textarea>
                @error('description') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>

            <!-- Toggles -->
            <div class="flex gap-6 mb-6">
                <label class="flex items-center">
                    <input type="checkbox" name="is_featured" value="1" {{ old('is_featured', $product->is_featured) ? 'checked' : '' }} class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <span class="ml-2 text-sm text-gray-700">Featured Product</span>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" name="is_new" value="1" {{ old('is_new', $product->is_new) ? 'checked' : '' }}
                        class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <span class="ml-2 text-sm text-gray-700">New Arrival</span>
                </label>
            </div>

            <div class="flex justify-end">
                <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Update
                    Product</button>
            </div>
        </form>
    </div>
@endsection