<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Yajra\DataTables\Facades\DataTables;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $query = Category::with('parent')->select('categories.*');

            return DataTables::of($query)
                ->editColumn('image', function ($category) {
                    $img = $category->image ?? 'https://via.placeholder.com/40';
                    return '<img src="' . $img . '" class="h-10 w-10 rounded-full object-cover">';
                })
                ->editColumn('is_active', function ($category) {
                    $color = $category->is_active ? 'green' : 'red';
                    $text = $category->is_active ? 'Active' : 'Inactive';
                    return '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-' . $color . '-100 text-' . $color . '-800">' . $text . '</span>';
                })
                ->addColumn('action', function ($category) {
                    $editUrl = route('admin.categories.edit', $category);
                    $deleteUrl = route('admin.categories.destroy', $category);
                    $csrf = csrf_field();
                    $method = method_field('DELETE');

                    return '
                        <div class="flex items-center justify-end gap-2">
                            <a href="' . $editUrl . '" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                            <form action="' . $deleteUrl . '" method="POST" onsubmit="return confirm(\'Are you sure?\');" class="inline">
                                ' . $csrf . $method . '
                                <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                            </form>
                        </div>
                    ';
                })
                ->rawColumns(['image', 'is_active', 'action'])
                ->make(true);
        }

        $categories = Category::whereNull('parent_id')->with('children')->get();
        return view('admin.categories.index', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['is_active'] = true;

        Category::create($validated);

        return back()->with('success', 'Category created!');
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $category->update($validated);

        return back()->with('success', 'Category updated!');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return back()->with('success', 'Category deleted!');
    }
}
