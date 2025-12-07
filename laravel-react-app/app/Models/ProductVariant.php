<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'size',
        'color',
        'stock_quantity',
        'sku',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getFormattedDetailsAttribute(): string
    {
        $details = [];
        if ($this->size)
            $details[] = "Size: {$this->size}";
        if ($this->color)
            $details[] = "Color: {$this->color}";
        return implode(', ', $details);
    }
}
