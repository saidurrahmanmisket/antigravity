import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Shop/Navbar';
import Footer from '@/Components/Shop/Footer';
import ProductCard from '@/Components/Shop/ProductCard';
import Slider from '@/Components/Shop/Slider';

export default function Welcome({ auth, sliders, featuredProducts, newArrivals, categories }) {
    return (
        <>
            <Head title="Home - ShoeShop" />
            <Navbar auth={auth} />

            {/* Slider Section */}
            <Slider sliders={sliders} />

            {/* Hero Section - Show if no sliders */}
            {(!sliders || sliders.length === 0) && (
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Step Into Style
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
                                Discover the perfect pair for every occasion
                            </p>
                            <a
                                href="/products"
                                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((category) => (
                        <a
                            key={category.id}
                            href={`/products?category=${category.slug}`}
                            className="group relative bg-gray-100 rounded-lg p-6 hover:bg-indigo-50 transition text-center"
                        >
                            <div className="text-4xl mb-2">👟</div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                                {category.name}
                            </h3>
                        </a>
                    ))}
                </div>
            </div >

            {/* Featured Products */}
            < div className="bg-gray-50 py-16" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <a href="/products" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                            View All →
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div >

            {/* New Arrivals */}
            < div className="py-16" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
                        <a href="/products?sort=newest" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                            See More →
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {newArrivals.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div >

            {/* Features */}
            < div className="bg-gray-900 text-white py-16" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl mb-4">🚚</div>
                            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                            <p className="text-gray-400">On orders over $50</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-4">↩️</div>
                            <h3 className="text-xl font-semibold mb-2">30-Day Returns</h3>
                            <p className="text-gray-400">Hassle-free returns</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                            <p className="text-gray-400">Only the best materials</p>
                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    );
}
