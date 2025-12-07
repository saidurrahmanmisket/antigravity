import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Navbar({ auth, cartItemCount = 0 }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-indigo-600">ShoeShop</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                            Products
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                            Contact
                        </Link>
                        <Link href="/faq" className="text-gray-700 hover:text-indigo-600 font-medium transition">
                            FAQ
                        </Link>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Cart */}
                        <Link href="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {auth.user ? (
                            <div className="flex items-center space-x-3">
                                {auth.user.role === 'admin' && (
                                    <a
                                        href="/admin/dashboard"
                                        data-external
                                        className="text-gray-700 hover:text-indigo-600 font-medium transition"
                                    >
                                        Admin Panel
                                    </a>
                                )}
                                <Link
                                    href="/profile"
                                    className="text-gray-700 hover:text-indigo-600 font-medium transition"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="text-gray-700 hover:text-indigo-600 font-medium transition"
                                >
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-indigo-600 font-medium transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link href="/" className="block py-2 text-gray-700 hover:text-indigo-600">
                            Home
                        </Link>
                        <Link href="/products" className="block py-2 text-gray-700 hover:text-indigo-600">
                            Products
                        </Link>
                        <Link href="/about" className="block py-2 text-gray-700 hover:text-indigo-600">
                            About
                        </Link>
                        <Link href="/contact" className="block py-2 text-gray-700 hover:text-indigo-600">
                            Contact
                        </Link>
                        <Link href="/faq" className="block py-2 text-gray-700 hover:text-indigo-600">
                            FAQ
                        </Link>
                        {auth.user && auth.user.role === 'admin' && (
                            <a
                                href="/admin/dashboard"
                                data-external
                                className="block py-2 text-gray-700 hover:text-indigo-600 font-medium"
                            >
                                Admin Panel
                            </a>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
