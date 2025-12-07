import { Head, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Shop/Navbar';
import Footer from '@/Components/Shop/Footer';
import ProductCard from '@/Components/Shop/ProductCard';
import ImageGallery from '@/Components/Shop/ImageGallery';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ProductShow({ auth, product, relatedProducts }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [expandedSection, setExpandedSection] = useState(null);

    const { post, processing } = useForm({
        product_id: product.id,
        variant_id: null,
        quantity: 1,
    });

    const handleAddToCart = () => {
        post('/cart', {
            onSuccess: () => {
                toast.success('Added to cart!');
            },
        });
    };

    // Get unique colors from variants
    const colors = [...new Set(product.variants?.map(v => v.color) || [])];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <>
            <Head title={`${product.name} - ShoeShop`} />
            <Navbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-6">
                    <ol className="flex items-center space-x-2 text-gray-500">
                        <li><a href="/" className="hover:text-gray-900">Shop</a></li>
                        <li>/</li>
                        <li><a href="/products" className="hover:text-gray-900">{product.category?.name}</a></li>
                        <li>/</li>
                        <li className="text-gray-900 font-medium">{product.name.split(' ')[0]}</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Image Gallery - 60% */}
                    <div className="lg:col-span-3">
                        <ImageGallery images={product.images || []} />
                    </div>

                    {/* Product Info - 40% */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {product.description || 'Perfect for the player looking for comfort and versatility. This product features premium materials and exceptional quality.'}
                        </p>

                        <div className="mb-6">
                            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
                            {product.compare_price && (
                                <p className="text-lg text-gray-500 line-through">${product.compare_price}</p>
                            )}
                        </div>

                        {/* Color Selector */}
                        {colors.length > 0 && (
                            <div className="mb-6">
                                <p className="text-sm font-medium text-gray-900 mb-3">
                                    Color: <span className="font-normal">{selectedVariant?.color || colors[0]}</span>
                                </p>
                                <div className="flex gap-2">
                                    {colors.map((color, index) => {
                                        const variant = product.variants?.find(v => v.color === color);
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${selectedVariant?.color === color
                                                    ? 'border-black ring-2 ring-offset-2 ring-gray-300'
                                                    : 'border-gray-200 hover:border-gray-400'
                                                    } transition`}
                                            >
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                    <span className="text-xs font-medium">{color}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-900 mb-3">
                                Size: <span className="font-normal">{selectedSize || 'S'}</span>
                            </p>
                            <div className="flex gap-2">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-md border-2 font-medium transition ${selectedSize === size
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-200 hover:border-gray-400 bg-white text-gray-900'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={processing || product.stock_quantity === 0}
                            className={`w-full py-4 rounded-md font-semibold text-lg transition ${product.stock_quantity > 0
                                ? 'bg-black text-white hover:bg-gray-800'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {product.stock_quantity > 0 ? 'Add to Cart' : 'Sold out'}
                        </button>

                        {/* Payment Info */}
                        <p className="text-sm text-gray-600 mt-4 text-center">
                            4 payments of <span className="font-semibold">${(product.price / 4).toFixed(2)}</span> at 0% interest with Klarna
                        </p>

                        {/* Stock Status */}
                        {product.stock_quantity > 0 && (
                            <p className="text-sm text-green-600 mt-2">
                                ✓ In Stock ({product.stock_quantity} available)
                            </p>
                        )}

                        {/* Collapsible Sections */}
                        <div className="mt-8 border-t border-gray-200">
                            {/* Details & Care */}
                            <div className="border-b border-gray-200">
                                <button
                                    onClick={() => toggleSection('details')}
                                    className="w-full flex justify-between items-center py-4 text-left"
                                >
                                    <span className="font-medium text-gray-900">Details & Care Instructions</span>
                                    <svg
                                        className={`w-5 h-5 transform transition-transform ${expandedSection === 'details' ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {expandedSection === 'details' && (
                                    <div className="pb-4 text-sm text-gray-600">
                                        <ul className="space-y-2 list-disc list-inside">
                                            <li>Premium quality materials</li>
                                            <li>Comfortable fit for all-day wear</li>
                                            <li>Machine washable (cold water)</li>
                                            <li>Air dry recommended</li>
                                            <li>Do not bleach or iron</li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Composition */}
                            <div className="border-b border-gray-200">
                                <button
                                    onClick={() => toggleSection('composition')}
                                    className="w-full flex justify-between items-center py-4 text-left"
                                >
                                    <span className="font-medium text-gray-900">Composition</span>
                                    <svg
                                        className={`w-5 h-5 transform transition-transform ${expandedSection === 'composition' ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {expandedSection === 'composition' && (
                                    <div className="pb-4 text-sm text-gray-600">
                                        <p>Upper: 100% Premium Leather</p>
                                        <p>Lining: 80% Cotton, 20% Polyester</p>
                                        <p>Sole: 100% Rubber</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}
