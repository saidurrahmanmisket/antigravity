import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2012&auto=format&fit=crop"
                    alt="Register Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-lg text-gray-300">Create an account to unlock exclusive offers, faster checkout, and personalized recommendations.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
                <div className="w-full max-w-md">
                    <Head title="Register" />

                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                        <p className="mt-2 text-gray-600">
                            Already have an account?{' '}
                            <Link href={route('login')} className="text-indigo-600 hover:text-indigo-500 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" className="text-gray-700" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-gray-700" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-gray-700" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-700" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <PrimaryButton className="w-full justify-center py-3 bg-black hover:bg-gray-800" disabled={processing}>
                            Create Account
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
