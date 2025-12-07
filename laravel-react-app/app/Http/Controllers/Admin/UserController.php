<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $query = User::query();

            return DataTables::of($query)
                ->editColumn('role', function ($user) {
                    $color = $user->role === 'admin' ? 'purple' : 'blue';
                    return '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-' . $color . '-100 text-' . $color . '-800">' . ucfirst($user->role) . '</span>';
                })
                ->editColumn('created_at', function ($user) {
                    return $user->created_at->format('M d, Y');
                })
                ->addColumn('action', function ($user) {
                    // Add actions if needed, e.g., edit/delete
                    return '';
                })
                ->rawColumns(['role'])
                ->make(true);
        }

        return view('admin.users.index');
    }
}
