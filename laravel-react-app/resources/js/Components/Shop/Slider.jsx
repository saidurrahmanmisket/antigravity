import { useState, useEffect } from 'react';

export default function Slider({ sliders = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (sliders.length === 0) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliders.length);
        }, 5000); // Auto-rotate every 5 seconds

        return () => clearInterval(timer);
    }, [sliders.length]);

    if (!sliders || sliders.length === 0) {
        return null;
    }

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
    };

    return (
        <div className="relative w-full h-[500px] bg-gray-900 overflow-hidden">
            {/* Slides */}
            {sliders.map((slider, index) => (
                <div
                    key={slider.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slider.image})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-center justify-center text-center px-4">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
                                {slider.title}
                            </h2>
                            {slider.subtitle && (
                                <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-delay">
                                    {slider.subtitle}
                                </p>
                            )}
                            {slider.link && slider.button_text && (
                                <a
                                    href={slider.link}
                                    className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-500 transition shadow-lg animate-fade-in-delay-2"
                                >
                                    {slider.button_text}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {sliders.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {sliders.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                    {sliders.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition ${index === currentSlide
                                    ? 'bg-white w-8'
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
