import { useState } from 'react';

export default function ImageGallery({ images = [] }) {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image</span>
            </div>
        );
    }

    const currentImage = images[selectedImage]?.image_path || images[0]?.image_path || '/images/placeholder.jpg';

    return (
        <div className="flex gap-4">
            {/* Thumbnail Gallery */}
            <div className="flex flex-col gap-2 w-20">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition ${selectedImage === index
                                ? 'border-black'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                    >
                        <img
                            src={image.image_path}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={currentImage}
                        alt="Product"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setSelectedImage(prev => (prev - 1 + images.length) % images.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setSelectedImage(prev => (prev + 1) % images.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
