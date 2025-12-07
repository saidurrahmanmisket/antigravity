<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => "Men's Shoes",
                'slug' => 'mens-shoes',
                'description' => 'Stylish and comfortable shoes for men',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => "Women's Shoes",
                'slug' => 'womens-shoes',
                'description' => 'Fashionable and elegant shoes for women',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => "Kids' Shoes",
                'slug' => 'kids-shoes',
                'description' => 'Fun and comfortable shoes for children',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Running Shoes',
                'slug' => 'running-shoes',
                'description' => 'Performance shoes for runners',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Sports Shoes',
                'slug' => 'sports-shoes',
                'description' => 'Athletic shoes for various sports',
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($categories as $categoryData) {
            // Remove subcategories if any exist in the array definition (though we removed them above)
            if (isset($categoryData['subcategories'])) {
                unset($categoryData['subcategories']);
            }

            Category::create($categoryData);
        }
    }
}
