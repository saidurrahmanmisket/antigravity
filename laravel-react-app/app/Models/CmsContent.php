<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsContent extends Model
{
    protected $fillable = [
        'key',
        'title',
        'content',
        'type',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByKey($query, $key)
    {
        return $query->where('key', $key);
    }

    public static function getValue($key, $default = null)
    {
        $content = static::where('key', $key)->where('is_active', true)->first();
        return $content ? $content->content : $default;
    }
}
