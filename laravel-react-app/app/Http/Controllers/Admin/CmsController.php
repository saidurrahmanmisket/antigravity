<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CmsContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CmsController extends Controller
{
    public function index()
    {
        $contents = CmsContent::all();

        return view('admin.cms.index', compact('contents'));
    }

    public function edit(CmsContent $cm)
    {
        return view('admin.cms.edit', ['content' => $cm]);
    }

    public function update(Request $request, CmsContent $cm)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $cm->update($validated);

        return redirect()->route('admin.cms.index')
            ->with('success', 'Content updated successfully!');
    }
}
