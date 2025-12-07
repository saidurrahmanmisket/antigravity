<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{Order, Product, User};

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_sales' => Order::where('status', '!=', 'cancelled')->sum('total'),
            'total_orders' => Order::count(),
            'total_customers' => User::where('role', 'customer')->count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
        ];

        $recentOrders = Order::with('user')->latest()->take(5)->get();
        $topProducts = Product::with('category')->take(5)->get(); // Simplified for now

        return view('admin.dashboard', compact('stats', 'recentOrders', 'topProducts'));
    }
}
