<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Admin Dashboard') - ShoeShop Admin</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="//unpkg.com/alpinejs" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- DataTables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>

    <style>
        [x-cloak] {
            display: none !important;
        }

        .dataTables_wrapper .dataTables_length select {
            padding-right: 2rem;
        }
    </style>
</head>

<body class="font-sans antialiased bg-gray-100">
    <div class="min-h-screen flex" x-data="{ sidebarOpen: true }">
        <!-- Sidebar -->
        <aside
            class="bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0"
            :class="sidebarOpen ? 'w-64' : 'w-20'">

            <!-- Logo -->
            <div class="h-16 flex items-center justify-center border-b border-gray-800">
                <span class="text-xl font-bold" x-show="sidebarOpen">ShoeShop Admin</span>
                <span class="text-xl font-bold" x-show="!sidebarOpen">SS</span>
            </div>

            <!-- Nav Links -->
            <nav class="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                <x-admin-nav-link href="{{ route('admin.dashboard') }}" :active="request()->routeIs('admin.dashboard')"
                    icon="home">
                    Dashboard
                </x-admin-nav-link>

                <x-admin-nav-link href="{{ route('admin.products.index') }}"
                    :active="request()->routeIs('admin.products.*')" icon="box">
                    Products
                </x-admin-nav-link>

                <x-admin-nav-link href="{{ route('admin.orders.index') }}"
                    :active="request()->routeIs('admin.orders.*')" icon="shopping-cart">
                    Orders
                </x-admin-nav-link>

                <x-admin-nav-link href="{{ route('admin.categories.index') }}"
                    :active="request()->routeIs('admin.categories.*')" icon="tag">
                    Categories
                </x-admin-nav-link>

                <x-admin-nav-link href="{{ route('admin.users.index') }}" :active="request()->routeIs('admin.users.*')"
                    icon="users">
                    Users
                </x-admin-nav-link>

                <x-admin-nav-link href="{{ route('admin.sliders.index') }}"
                    :active="request()->routeIs('admin.sliders.*')" icon="photograph">
                    Sliders
                </x-admin-nav-link>

                <x-admin-nav-link href="{{ route('admin.cms.index') }}" :active="request()->routeIs('admin.cms.*')"
                    icon="document-text">
                    CMS Content
                </x-admin-nav-link>

                <x-admin-nav-link href="{{ route('admin.contacts.index') }}"
                    :active="request()->routeIs('admin.contacts.*')" icon="mail">
                    Messages
                </x-admin-nav-link>

                <x-admin-nav-link href="{{ route('admin.settings.index') }}"
                    :active="request()->routeIs('admin.settings.*')" icon="cog">
                    Settings
                </x-admin-nav-link>
            </nav>

            <!-- User Profile -->
            <div class="p-4 border-t border-gray-800">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        {{ substr(auth()->user()->name, 0, 1) }}
                    </div>
                    <div x-show="sidebarOpen">
                        <p class="text-sm font-medium">{{ auth()->user()->name }}</p>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="text-xs text-gray-400 hover:text-white">Logout</button>
                        </form>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top Header -->
            <header class="bg-white shadow-sm h-16 flex items-center justify-between px-6">
                <button @click="sidebarOpen = !sidebarOpen"
                    class="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16">
                        </path>
                    </svg>
                </button>

                <div class="flex items-center gap-4">
                    <a href="/" target="_blank" class="text-sm text-gray-600 hover:text-gray-900">View Website</a>
                </div>
            </header>

            <!-- Page Content -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                @if(session('success'))
                    <div class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert">
                        <span class="block sm:inline">{{ session('success') }}</span>
                    </div>
                @endif

                @if(session('error'))
                    <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span class="block sm:inline">{{ session('error') }}</span>
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>
</body>

</html>