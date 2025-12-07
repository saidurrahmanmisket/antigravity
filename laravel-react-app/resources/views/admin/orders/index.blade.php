@extends('layouts.admin')

@section('title', 'Orders')

@section('content')
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Orders</h1>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden p-6">
        <table id="orders-table" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- DataTables will populate this -->
            </tbody>
        </table>
    </div>

    <script>
        $(document).ready(function () {
            $('#orders-table').DataTable({
                processing: true,
                serverSide: true,
                ajax: "{{ route('admin.orders.index') }}",
                columns: [
                    { data: 'order_number', name: 'order_number' },
                    { data: 'user.name', name: 'user.name', defaultContent: 'Guest' },
                    { data: 'total_price', name: 'total_price' },
                    { data: 'status', name: 'status' },
                    { data: 'created_at', name: 'created_at' },
                    { data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-right' }
                ]
            });
        });
    </script>
@endsection