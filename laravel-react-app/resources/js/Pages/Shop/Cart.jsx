import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Shop/Navbar';
import Footer from '@/Components/Shop/Footer';

export default function Cart({ auth, cart }) {
    const cartItems = cart?.items || [];
    const total = cart?.total || 0;

    return (
        <>
            <Head title="Shopping Cart - ShoeShop" />
            <Navbar auth={auth} cartItemCount={cartItems.length} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
                        <a
                            href="/products"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-500 transition"
                        >
                            Continue Shopping
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                                    <img
                                        src={item.product?.images?.[0]?.image_path || '/images/placeholder.jpg'}
                                        alt={item.product?.name}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                                        {item.variant && (
                                            <p className="text-sm text-gray-600">
                                                {item.variant.formatted_details}
                                            </p>
                                        )}
                                        <p className="text-indigo-600 font-semibold">${item.price}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            className="w-16 border-gray-300 rounded-md"
                                            onChange={(e) => {
                                                // Update quantity logic
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                if (confirm('Remove this item?')) {
                                                    // Delete logic
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-500 transition">
                                    Proceed to Checkout
                                </button>

                                <a
                                    href="/products"
                                    className="block text-center mt-4 text-indigo-600 hover:text-indigo-500"
                                >
                                    Continue Shopping
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}
