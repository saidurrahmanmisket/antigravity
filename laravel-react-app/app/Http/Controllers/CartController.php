<?php

namespace App\Http\Controllers;

use App\Models\{Cart, CartItem, Product};
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = $this->getCart();
        $cart->load(['items.product.images', 'items.variant']);

        return Inertia::render('Shop/Cart', [
            'cart' => $cart,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = $this->getCart(true);

        $cartItem = $cart->items()
            ->where('product_id', $product->id)
            ->where('variant_id', $request->variant_id)
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->quantity);
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'variant_id' => $request->variant_id,
                'quantity' => $request->quantity,
                'price' => $product->price,
            ]);
        }

        return back()->with('success', 'Product added to cart!');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update(['quantity' => $request->quantity]);

        return back()->with('success', 'Cart updated!');
    }

    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();
        return back()->with('success', 'Item removed from cart!');
    }

    private function getCart($create = false)
    {
        if (auth()->check()) {
            $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);
        } else {
            $sessionId = session()->getId();
            $cart = Cart::where('session_id', $sessionId)->first();

            if (!$cart && $create) {
                $cart = Cart::create(['session_id' => $sessionId]);
            }
        }

        return $cart ?? new Cart();
    }
}
