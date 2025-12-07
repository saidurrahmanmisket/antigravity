import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Shop/Navbar';
import Footer from '@/Components/Shop/Footer';

export default function Contact({ auth }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user ? auth.user.name : '',
        email: auth.user ? auth.user.email : '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => reset('subject', 'message'),
        });
    };

    return (
        <>
            <Head title="Contact Us - ShoeShop" />
            <Navbar auth={auth} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4">Send us a message</h2>

                        {flash.success && (
                            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                                {flash.success}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={e => setData('subject', e.target.value)}
                                    className="w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.subject && <div className="text-red-500 text-sm mt-1">{errors.subject}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    rows="4"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                                ></textarea>
                                {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition disabled:opacity-50"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <div className="bg-white p-6 rounded-lg shadow mb-6">
                            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-700">info@shoeshop.com</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-700">(555) 123-4567</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p className="text-gray-700">123 Fashion Street<br />New York, NY 10001</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-bold mb-4">Business Hours</h2>
                            <div className="space-y-2 text-gray-700">
                                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                                <p>Saturday: 10:00 AM - 6:00 PM</p>
                                <p>Sunday: 12:00 PM - 5:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
