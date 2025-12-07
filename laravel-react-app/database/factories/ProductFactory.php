<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->words(3, true);
        $price = $this->faker->randomFloat(2, 50, 300);

        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name) . '-' . Str::random(6),
            'description' => $this->faker->paragraph(),
            'price' => $price,
            'compare_price' => $this->faker->boolean(30) ? $price * 1.2 : null,
            'sku' => 'SKU-' . strtoupper(Str::random(8)),
            'stock_quantity' => $this->faker->numberBetween(0, 100),
            'is_featured' => $this->faker->boolean(10),
            'is_new' => $this->faker->boolean(20),
            'status' => 'active',
            'category_id' => Category::factory(),
        ];
    }
}
