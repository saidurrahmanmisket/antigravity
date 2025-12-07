import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Shop/Navbar';
import Footer from '@/Components/Shop/Footer';

export default function About({ auth }) {
    return (
        <>
            <Head title="About Us - ShoeShop" />
            <Navbar auth={auth} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About ShoeShop</h1>

                <div className="prose prose-lg">
                    <p className="text-lg text-gray-700 mb-4">
                        Welcome to ShoeShop, your premier destination for quality footwear. Since our founding,
                        we've been committed to providing our customers with the finest selection of shoes for every occasion.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
                    <p className="text-gray-700 mb-4">
                        Our mission is to offer stylish, comfortable, and high-quality shoes that enhance your lifestyle.
                        We believe that the right pair of shoes can boost your confidence and complement your unique style.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Quality craftsmanship in every pair</li>
                        <li>Customer satisfaction above all</li>
                        <li>Sustainable and ethical sourcing</li>
                        <li>Innovation in design and comfort</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Us?</h2>
                    <p className="text-gray-700">
                        With years of experience in the footwear industry, we curate only the best brands and designs.
                        Our team personally tests each product to ensure it meets our high standards before it reaches your doorstep.
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
}
