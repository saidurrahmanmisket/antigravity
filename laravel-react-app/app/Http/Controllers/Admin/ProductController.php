<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{Product, Category, ProductImage, ProductVariant};
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $query = Product::with('category')->select('products.*');

            return \Yajra\DataTables\Facades\DataTables::of($query)
                ->editColumn('primary_image', function ($product) {
                    $img = $product->primary_image ?? 'https://via.placeholder.com/40';
                    return '<img src="' . $img . '" class="h-10 w-10 rounded-full object-cover">';
                })
                ->editColumn('price', function ($product) {
                    return '$' . number_format($product->price, 2);
                })
                ->editColumn('status', function ($product) {
                    $color = match ($product->status) {
                        'active' => 'green',
                        'draft' => 'yellow',
                        default => 'gray'
                    };
                    return '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-' . $color . '-100 text-' . $color . '-800">' . ucfirst($product->status) . '</span>';
                })
                ->addColumn('action', function ($product) {
                    $editUrl = route('admin.products.edit', $product);
                    $deleteUrl = route('admin.products.destroy', $product);
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
                ->rawColumns(['primary_image', 'status', 'action'])
                ->make(true);
        }

        $categories = Category::all();
        return view('admin.products.index', compact('categories'));
    }

    public function create()
    {
        $categories = Category::all();
        return view('admin.products.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'is_featured' => 'boolean',
            'is_new' => 'boolean',
            'status' => 'required|in:draft,active,archived',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['sku'] = 'SKU-' . strtoupper(Str::random(8));

        $product = Product::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully!');
    }

    public function edit(Product $product)
    {
        $product->load(['category', 'images', 'variants']);
        $categories = Category::all();

        return view('admin.products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'is_featured' => 'boolean',
            'is_new' => 'boolean',
            'status' => 'required|in:draft,active,archived',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully!');
    }
}
