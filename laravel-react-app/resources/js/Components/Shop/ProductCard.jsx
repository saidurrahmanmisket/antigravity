export default function ProductCard({ product }) {
    return (
        <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-square w-full overflow-hidden bg-gray-200">
                <img
                    src={product.primary_image || '/images/placeholder.jpg'}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                {product.is_new && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        NEW
                </span>
                )}
                {product.is_featured && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        FEATURED
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                    {product.category?.name}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-gray-900">
                            ${product.price}
                        </p>
                        {product.compare_price && (
                            <p className="text-sm text-gray-500 line-through">
                                ${product.compare_price}
                            </p>
                        )}
                    </div>
                    <a
                        href={`/products/${product.slug}`}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                    >
                        View
                    </a>
                </div>
            </div>
        </div>
    );
}
