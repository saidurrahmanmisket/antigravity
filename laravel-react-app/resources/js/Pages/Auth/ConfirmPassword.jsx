import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                    alt="Confirm Password Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <h2 className="text-4xl font-bold mb-4">Security Check</h2>
                    <p className="text-lg text-gray-300">Please confirm your password before continuing.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
                <div className="w-full max-w-md">
                    <Head title="Confirm Password" />

                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">Confirm Password</h1>
                        <p className="mt-2 text-gray-600">
                            This is a secure area of the application. Please confirm your password before continuing.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-gray-700" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <PrimaryButton className="w-full justify-center py-3 bg-black hover:bg-gray-800" disabled={processing}>
                            Confirm
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
