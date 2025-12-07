<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LargeScaleSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks for faster truncation
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        ProductImage::truncate();
        Product::truncate();
        Category::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->info('Creating 10 Categories...');

        $categories = Category::factory()->count(10)->create();

        $this->command->info('Creating 10,000 Products...');

        // Create products in chunks to avoid memory issues
        $chunkSize = 500;
        $totalProducts = 10000;
        $chunks = $totalProducts / $chunkSize;

        for ($i = 0; $i < $chunks; $i++) {
            $products = Product::factory()->count($chunkSize)->make()->each(function ($product) use ($categories) {
                $product->category_id = $categories->random()->id;
            });

            // Bulk insert products
            Product::insert($products->toArray());

            $this->command->info("Created chunk " . ($i + 1) . " of " . $chunks);
        }

        $this->command->info('Attaching images to products...');

        // We need IDs to attach images, so we fetch them back. 
        // For performance in a real massive seeder we might do this differently, 
        // but for 10k this is acceptable if we chunk it.

        Product::chunk(1000, function ($products) {
            $images = [];
            foreach ($products as $product) {
                $images[] = [
                    'product_id' => $product->id,
                    'image_path' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
                    'is_primary' => true,
                    'sort_order' => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            ProductImage::insert($images);
        });

        $this->command->info('Large Scale Seeding Complete!');
    }
}
