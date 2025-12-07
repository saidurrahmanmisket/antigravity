<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    public function run(): void
    {
        $sliders = [
            [
                'title' => 'Summer Collection 2024',
                'subtitle' => 'Fresh styles for the season',
                'image' => 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop',
                'link' => '/products?category=new',
                'button_text' => 'Shop Now',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Premium Leather Boots',
                'subtitle' => 'Handcrafted quality',
                'image' => 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=2069&auto=format&fit=crop',
                'link' => '/products?category=mens-boots',
                'button_text' => 'Explore Collection',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Athletic Performance',
                'subtitle' => 'Engineered for winners',
                'image' => 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop',
                'link' => '/products?category=running-shoes',
                'button_text' => 'Discover More',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($sliders as $slider) {
            Slider::create($slider);
        }
    }
}
