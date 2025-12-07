import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image/Brand */}
            <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black/60 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"
                    alt="Login Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">ShoeShop</h1>
                        <p className="mt-2 text-indigo-200">Step into style.</p>
                    </div>
                    <div>
                        <blockquote className="text-xl font-medium leading-relaxed">
                            "The right pair of shoes can change your life. Just ask Cinderella."
                        </blockquote>
                        <p className="mt-4 text-sm text-indigo-200">— Christian Louboutin</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
                <div className="w-full max-w-md space-y-8">
                    <Head title="Log in" />

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div className="space-y-5">
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-medium" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Enter your email"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <PrimaryButton
                            className="w-full justify-center py-3.5 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                            disabled={processing}
                        >
                            Sign in
                        </PrimaryButton>

                        <div className="text-center text-sm">
                            <span className="text-gray-600">Don't have an account?</span>{' '}
                            <Link
                                href={route('register')}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Sign up for free
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
