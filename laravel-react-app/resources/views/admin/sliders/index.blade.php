@extends('layouts.admin')

@section('title', 'Sliders')

@section('content')
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Homepage Sliders</h1>
        <a href="{{ route('admin.sliders.create') }}"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Add Slider
        </a>
    </div>

    <div class="space-y-4">
        @foreach($sliders as $slider)
            <div class="bg-white rounded-lg shadow p-4 flex items-center gap-6">
                <div class="w-48 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img src="{{ $slider->image }}" alt="{{ $slider->title }}" class="w-full h-full object-cover">
                </div>

                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">{{ $slider->title }}</h3>
                    <p class="text-sm text-gray-500">{{ $slider->subtitle }}</p>
                    <div class="flex items-center gap-4 mt-2">
                        <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Order: {{ $slider->sort_order }}</span>
                        <span
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {{ $slider->is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800' }}">
                            {{ $slider->is_active ? 'Active' : 'Inactive' }}
                        </span>
                    </div>
                </div>

                <div class="flex gap-2">
                    <a href="{{ route('admin.sliders.edit', $slider) }}"
                        class="text-indigo-600 hover:text-indigo-900 px-3 py-1 border border-indigo-200 rounded hover:bg-indigo-50">Edit</a>
                    <form action="{{ route('admin.sliders.destroy', $slider) }}" method="POST"
                        onsubmit="return confirm('Are you sure?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit"
                            class="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 rounded hover:bg-red-50">Delete</button>
                    </form>
                </div>
            </div>
        @endforeach
    </div>
@endsection