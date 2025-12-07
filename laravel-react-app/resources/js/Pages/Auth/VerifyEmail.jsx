import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2012&auto=format&fit=crop"
                    alt="Verify Email Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <h2 className="text-4xl font-bold mb-4">Verify Your Email</h2>
                    <p className="text-lg text-gray-300">We've sent a verification link to your email address.</p>
                </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
                <div className="w-full max-w-md">
                    <Head title="Email Verification" />

                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">Verify Email</h1>
                        <p className="mt-2 text-gray-600">
                            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            A new verification link has been sent to the email address you provided during registration.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <PrimaryButton className="w-full justify-center py-3 bg-black hover:bg-gray-800" disabled={processing}>
                            Resend Verification Email
                        </PrimaryButton>

                        <div className="flex items-center justify-between mt-4">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
