<?php

namespace App\Http\Controllers;

use App\Models\{Category, Product, Slider};
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $sliders = Slider::active()->ordered()->get();

        $featuredProducts = Product::with(['category', 'images'])
            ->featured()
            ->active()
            ->take(8)
            ->get();

        $newArrivals = Product::with(['category', 'images'])
            ->new()
            ->active()
            ->take(8)
            ->get();

        $categories = Category::active()
            ->parent()
            ->with('children')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Welcome', [
            'sliders' => $sliders,
            'featuredProducts' => $featuredProducts,
            'newArrivals' => $newArrivals,
            'categories' => $categories,
        ]);
    }
}
