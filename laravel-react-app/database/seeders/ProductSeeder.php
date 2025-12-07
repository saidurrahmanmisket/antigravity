<?php

namespace Database\Seeders;

use App\Models\{Category, Product, ProductImage, ProductVariant};
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Men's Sneakers -> Men's Shoes
            ['name' => 'Classic White Sneakers', 'category' => 'mens-shoes', 'price' => 79.99, 'description' => 'Timeless white sneakers perfect for any casual occasion', 'is_featured' => true, 'is_new' => true, 'stock' => 50],
            ['name' => 'Performance Running Shoes', 'category' => 'mens-shoes', 'price' => 129.99, 'description' => 'High-performance sneakers designed for runners', 'is_featured' => true, 'stock' => 30],
            ['name' => 'Urban Street Sneakers', 'category' => 'mens-shoes', 'price' => 95.99, 'description' => 'Trendy urban-style sneakers', 'is_new' => true, 'stock' => 40],

            // Men's Formal -> Men's Shoes
            ['name' => 'Oxford Leather Shoes', 'category' => 'mens-shoes', 'price' => 149.99, 'description' => 'Premium leather Oxford shoes for formal occasions', 'is_featured' => true, 'stock' => 25],
            ['name' => 'Derby Dress Shoes', 'category' => 'mens-shoes', 'price' => 139.99, 'description' => 'Elegant Derby shoes in black leather', 'stock' => 20],

            // Men's Boots -> Men's Shoes
            ['name' => 'Chelsea Boots', 'category' => 'mens-shoes', 'price' => 169.99, 'description' => 'Classic Chelsea boots in suede', 'is_new' => true, 'stock' => 15],
            ['name' => 'Combat Boots', 'category' => 'mens-shoes', 'price' => 159.99, 'description' => 'Rugged combat-style boots', 'stock' => 18],

            // Women's Heels -> Women's Shoes
            ['name' => 'Elegant Stiletto Heels', 'category' => 'womens-shoes', 'price' => 119.99, 'description' => 'Sophisticated high heels for special occasions', 'is_featured' => true, 'stock' => 30],
            ['name' => 'Block Heel Pumps', 'category' => 'womens-shoes', 'price' => 89.99, 'description' => 'Comfortable block heel pumps', 'is_new' => true, 'stock' => 35],

            // Women's Flats -> Women's Shoes
            ['name' => 'Ballet Flats', 'category' => 'womens-shoes', 'price' => 69.99, 'description' => 'Classic ballet flats in soft leather', 'is_featured' => true, 'stock' => 45],
            ['name' => 'Pointed Flats', 'category' => 'womens-shoes', 'price' => 74.99, 'description' => 'Modern pointed-toe flats', 'stock' => 40],

            // Women's Sneakers -> Women's Shoes
            ['name' => 'Fashion Sneakers', 'category' => 'womens-shoes', 'price' => 99.99, 'description' => 'Trendy sneakers with platform sole', 'is_featured' => true, 'is_new' => true, 'stock' => 50],
            ['name' => 'Athletic Training Shoes', 'category' => 'womens-shoes', 'price' => 109.99, 'description' => 'Lightweight training sneakers', 'stock' => 40],

            // Women's Boots -> Women's Shoes
            ['name' => 'Ankle Boots', 'category' => 'womens-shoes', 'price' => 139.99, 'description' => 'Stylish ankle boots with heel', 'is_new' => true, 'stock' => 25],
            ['name' => 'Knee-High Boots', 'category' => 'womens-shoes', 'price' => 189.99, 'description' => 'Elegant knee-high leather boots', 'stock' => 15],

            // Running Shoes -> Running Shoes
            ['name' => 'Marathon Pro Shoes', 'category' => 'running-shoes', 'price' => 179.99, 'description' => 'Professional marathon running shoes', 'is_featured' => true, 'stock' => 30],
            ['name' => 'Trail Running Shoes', 'category' => 'running-shoes', 'price' => 149.99, 'description' => 'Durable trail running shoes', 'stock' => 25],

            // Kids' Shoes -> Kids' Shoes
            ['name' => 'Kids Sport Sneakers', 'category' => 'kids-shoes', 'price' => 59.99, 'description' => 'Durable sneakers for active boys', 'stock' => 40],
            ['name' => 'Girls Fashion Sneakers', 'category' => 'kids-shoes', 'price' => 64.99, 'description' => 'Cute and comfortable sneakers for girls', 'stock' => 35],
            ['name' => 'Toddler First Steps', 'category' => 'kids-shoes', 'price' => 49.99, 'description' => 'Soft shoes for first steps', 'stock' => 30],
        ];

        $colors = ['Black', 'White', 'Brown', 'Navy', 'Grey', 'Red', 'Blue'];
        $sizes = ['6', '7', '8', '9', '10', '11', '12'];

        // 1. Create Curated Products
        foreach ($products as $productData) {
            $categorySlug = $productData['category'];
            unset($productData['category']);

            $category = Category::where('slug', $categorySlug)->first();
            if (!$category)
                continue;

            $stock = $productData['stock'];
            unset($productData['stock']);

            // Use firstOrCreate to avoid duplicates if run multiple times without fresh
            $product = Product::firstOrCreate(
                ['slug' => Str::slug($productData['name'])],
                [
                    'category_id' => $category->id,
                    'name' => $productData['name'],
                    'description' => $productData['description'],
                    'price' => $productData['price'],
                    'compare_price' => $productData['price'] * 1.3,
                    'stock_quantity' => $stock,
                    'is_featured' => $productData['is_featured'] ?? false,
                    'is_new' => $productData['is_new'] ?? false,
                    'status' => 'active',
                    'sku' => 'SKU-' . strtoupper(Str::random(8)),
                ]
            );

            // Create product image if not exists
            if ($product->images()->count() === 0) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
                    'is_primary' => true,
                    'sort_order' => 0,
                ]);
            }

            // Create variants if not exists
            if ($product->variants()->count() === 0) {
                foreach (array_slice($sizes, 0, rand(3, 5)) as $size) {
                    foreach (array_slice($colors, 0, rand(2, 3)) as $color) {
                        ProductVariant::create([
                            'product_id' => $product->id,
                            'size' => $size,
                            'color' => $color,
                            'stock_quantity' => rand(5, 15),
                            'sku' => 'SKU-' . $product->id . '-' . strtoupper(Str::random(6)) . '-' . $size . '-' . substr($color, 0, 2),
                        ]);
                    }
                }
            }
        }

        // 2. Generate Random Products to reach 200
        $currentCount = Product::count();
        $targetCount = 200000;
        $needed = $targetCount - $currentCount;

        if ($needed > 0) {
            $categories = Category::all();

            if ($categories->count() > 0) {
                $this->command->info("Generating $needed random products...");

                for ($i = 0; $i < $needed; $i++) {
                    $product = Product::factory()->create([
                        'category_id' => $categories->random()->id
                    ]);

                    // Add image
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
                        'is_primary' => true,
                        'sort_order' => 0,
                    ]);

                    // Add random variants
                    foreach (array_slice($sizes, 0, rand(2, 4)) as $size) {
                        foreach (array_slice($colors, 0, rand(1, 2)) as $color) {
                            ProductVariant::create([
                                'product_id' => $product->id,
                                'size' => $size,
                                'color' => $color,
                                'stock_quantity' => rand(5, 15),
                                'sku' => 'SKU-' . $product->id . '-' . strtoupper(Str::random(6)) . '-' . $size . '-' . substr($color, 0, 2),
                            ]);
                        }
                    }
                }
            }
        }
    }
}
