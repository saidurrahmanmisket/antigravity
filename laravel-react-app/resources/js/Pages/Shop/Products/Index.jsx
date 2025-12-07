import { Head, router } from '@inertiajs/react';
import Navbar from '@/Components/Shop/Navbar';
import Footer from '@/Components/Shop/Footer';
import ProductCard from '@/Components/Shop/ProductCard';
import FilterSection from '@/Components/Shop/FilterSection';
import ColorSwatch from '@/Components/Shop/ColorSwatch';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function ProductsIndex({ auth, products, categories, filters }) {
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [priceRange, setPriceRange] = useState([0, 500]);

    // Infinite Scroll State
    const [allProducts, setAllProducts] = useState(products.data);
    const [page, setPage] = useState(products.current_page);
    const [hasMore, setHasMore] = useState(!!products.next_page_url);
    const [loading, setLoading] = useState(false);
    const observerTarget = useRef(null);

    // Reset local state when filters change (new initial load)
    useEffect(() => {
        setAllProducts(products.data);
        setPage(products.current_page);
        setHasMore(!!products.next_page_url);
    }, [products.data, products.current_page, products.next_page_url]);

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextPage = page + 1;

        router.visit(window.location.pathname + window.location.search, {
            data: { page: nextPage },
            preserveState: true,
            preserveScroll: true,
            only: ['products'],
            onSuccess: (page) => {
                const newProducts = page.props.products.data;
                setAllProducts(prev => [...prev, ...newProducts]);
                setPage(page.props.products.current_page);
                setHasMore(!!page.props.products.next_page_url);
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            }
        });
    }, [page, loading, hasMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loadMore, hasMore]);

    const sizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
    const colors = ['Black', 'White', 'Brown', 'Navy', 'Grey', 'Red', 'Blue'];
    const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance'];
    const genders = ['Men', 'Women', 'Unisex'];

    return (
        <>
            <Head title="Products - ShoeShop" />
            <Navbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
                        <p className="text-sm text-gray-600">{products.total || 0} Products</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filters
                        </button>

                        {/* View Toggle */}
                        <div className="hidden md:flex border border-gray-300 rounded-md overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            className="border-gray-300 rounded-md text-sm"
                            defaultValue={filters.sort || 'newest'}
                            onChange={(e) => window.location.href = `/products?sort=${e.target.value}`}
                        >
                            <option value="newest">New Arrivals</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="popular">Popular</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h3 className="text-lg font-semibold mb-4">Filters</h3>

                            {/* Size Filter */}
                            <FilterSection title="Size">
                                <div className="grid grid-cols-4 gap-2">
                                    {sizes.slice(0, 8).map(size => (
                                        <label key={size} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-black focus:ring-black"
                                            />
                                            <span className="ml-2 text-sm">{size}</span>
                                        </label>
                                    ))}
                                </div>
                                <button className="text-sm text-gray-600 mt-2 hover:underline">
                                    Show more
                                </button>
                            </FilterSection>

                            {/* Color Filter */}
                            <FilterSection title="Color">
                                <div className="space-y-2">
                                    {colors.map(color => (
                                        <label key={color} className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-black focus:ring-black"
                                            />
                                            <ColorSwatch color={color} />
                                            <span className="text-sm">{color}</span>
                                        </label>
                                    ))}
                                </div>
                                <button className="text-sm text-gray-600 mt-2 hover:underline">
                                    Show more
                                </button>
                            </FilterSection>

                            {/* Brand Filter */}
                            <FilterSection title="Brand">
                                <div className="space-y-2">
                                    {brands.map(brand => (
                                        <label key={brand} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-black focus:ring-black"
                                            />
                                            <span className="ml-2 text-sm">{brand}</span>
                                        </label>
                                    ))}
                                </div>
                                <button className="text-sm text-gray-600 mt-2 hover:underline">
                                    Show more
                                </button>
                            </FilterSection>

                            {/* Gender Filter */}
                            <FilterSection title="Gender">
                                <div className="space-y-2">
                                    {genders.map(gender => (
                                        <label key={gender} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                className="border-gray-300 text-black focus:ring-black"
                                            />
                                            <span className="ml-2 text-sm">{gender}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            {/* Price Range Filter */}
                            <FilterSection title="Shop by price">
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="500"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>
                            </FilterSection>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="md:col-span-3">
                        <div className={`grid gap-6 ${viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1'
                            }`}>
                            {allProducts.map(product => (
                                <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition group">
                                    <a href={`/products/${product.slug}`}>
                                        <div className="aspect-square bg-gray-100 overflow-hidden">
                                            <img
                                                src={product.primary_image || '/images/placeholder.jpg'}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-2">{product.category?.name}</p>
                                            <p className="font-semibold text-gray-900">${product.price}</p>

                                            {/* Color Variants */}
                                            {product.variants && product.variants.length > 0 && (
                                                <div className="flex gap-1 mt-2">
                                                    {[...new Set(product.variants.map(v => v.color))].slice(0, 4).map((color, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-4 h-4 rounded-full border border-gray-300"
                                                            style={{ backgroundColor: color.toLowerCase() }}
                                                            title={color}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Infinite Scroll Sentinel */}
                        <div ref={observerTarget} className="h-10 mt-8 flex justify-center items-center">
                            {loading && (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            )}
                            {!hasMore && allProducts.length > 0 && (
                                <p className="text-gray-500 text-sm">No more products to load.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
