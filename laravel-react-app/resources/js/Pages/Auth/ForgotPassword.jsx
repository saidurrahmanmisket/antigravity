import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=2012&auto=format&fit=crop"
                    alt="Forgot Password Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <h2 className="text-4xl font-bold mb-4">Reset Your Password</h2>
                    <p className="text-lg text-gray-300">Don't worry, we'll help you get back into your account in no time.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
                <div className="w-full max-w-md">
                    <Head title="Forgot Password" />

                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
                        <p className="mt-2 text-gray-600">
                            No problem. Just let us know your email address and we will email you a password reset link.
                        </p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email address"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <PrimaryButton className="w-full justify-center py-3 bg-black hover:bg-gray-800" disabled={processing}>
                            Email Password Reset Link
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
