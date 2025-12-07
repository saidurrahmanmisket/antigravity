@extends('layouts.admin')

@section('title', 'View Message')

@section('content')
    <div class="container mx-auto px-6 py-8">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-gray-700 text-3xl font-medium">Message Details</h3>
            <a href="{{ route('admin.contacts.index') }}" class="text-indigo-600 hover:text-indigo-900">Back to List</a>
        </div>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ $contact->subject }}
                </h3>
                <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                    Received on {{ $contact->created_at->format('F d, Y \a\t h:i A') }}
                </p>
            </div>
            <div class="border-t border-gray-200">
                <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm leading-5 font-medium text-gray-500">
                            From
                        </dt>
                        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ $contact->name }} &lt;{{ $contact->email }}&gt;
                        </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm leading-5 font-medium text-gray-500">
                            Message
                        </dt>
                        <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
                            {{ $contact->message }}
                        </dd>
                    </div>
                </dl>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
                <form action="{{ route('admin.contacts.destroy', $contact) }}" method="POST"
                    onsubmit="return confirm('Are you sure you want to delete this message?')">
                    @csrf
                    @method('DELETE')
                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out">
                        Delete Message
                    </button>
                </form>
            </div>
        </div>
    </div>
@endsection