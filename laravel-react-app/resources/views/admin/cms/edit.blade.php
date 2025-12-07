@extends('layouts.admin')

@section('title', 'Edit Content')

@section('content')
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Edit Content</h1>
        <a href="{{ route('admin.cms.index') }}" class="text-gray-600 hover:text-gray-900">Back to CMS</a>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <form action="{{ route('admin.cms.update', $content) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Key</label>
                <input type="text" value="{{ $content->key }}"
                    class="w-full border-gray-300 bg-gray-100 rounded-md font-mono text-sm" disabled>
            </div>

            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input type="text" name="title" value="{{ old('title', $content->title) }}"
                    class="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                @error('title') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>

            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea name="content" rows="10"
                    class="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required>{{ old('content', $content->content) }}</textarea>
                @error('content') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>

            <div class="mb-6">
                <label class="flex items-center">
                    <input type="checkbox" name="is_active" value="1" {{ old('is_active', $content->is_active) ? 'checked' : '' }} class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <span class="ml-2 text-sm text-gray-700">Active</span>
                </label>
            </div>

            <div class="flex justify-end">
                <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Update
                    Content</button>
            </div>
        </form>
    </div>
@endsection