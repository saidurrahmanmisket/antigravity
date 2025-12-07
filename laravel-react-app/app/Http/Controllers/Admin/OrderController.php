<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\{Order, User};
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $query = Order::with('user')->select('orders.*');

            return \Yajra\DataTables\Facades\DataTables::of($query)
                ->editColumn('total_price', function ($order) {
                    return '$' . number_format($order->total_price, 2);
                })
                ->editColumn('status', function ($order) {
                    $color = match ($order->status) {
                        'completed' => 'green',
                        'pending' => 'yellow',
                        'cancelled' => 'red',
                        default => 'gray'
                    };
                    return '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-' . $color . '-100 text-' . $color . '-800">' . ucfirst($order->status) . '</span>';
                })
                ->editColumn('created_at', function ($order) {
                    return $order->created_at->format('M d, Y');
                })
                ->addColumn('action', function ($order) {
                    $showUrl = route('admin.orders.show', $order);
                    return '
                        <a href="' . $showUrl . '" class="text-indigo-600 hover:text-indigo-900">View</a>
                    ';
                })
                ->rawColumns(['status', 'action'])
                ->make(true);
        }

        return view('admin.orders.index');
    }

    public function show(Order $order)
    {
        $order->load(['user', 'items.product']);

        return view('admin.orders.show', compact('order'));
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update($validated);

        return back()->with('success', 'Order status updated!');
    }
}
