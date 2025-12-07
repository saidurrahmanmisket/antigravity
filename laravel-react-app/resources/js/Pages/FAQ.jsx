import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Shop/Navbar';
import Footer from '@/Components/Shop/Footer';
import { useState } from 'react';

export default function FAQ({ auth, faqs }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <>
            <Head title="FAQ - ShoeShop" />
            <Navbar auth={auth} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                            >
                                <span className="font-semibold text-lg">{faq.question}</span>
                                <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4 text-gray-700">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}
