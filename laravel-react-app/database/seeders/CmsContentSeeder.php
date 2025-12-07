<?php

namespace Database\Seeders;

use App\Models\CmsContent;
use Illuminate\Database\Seeder;

class CmsContentSeeder extends Seeder
{
    public function run(): void
    {
        $contents = [
            [
                'key' => 'homepage_hero_title',
                'title' => 'Homepage Hero Title',
                'content' => 'Step Into Style',
                'type' => 'text',
            ],
            [
                'key' => 'homepage_hero_subtitle',
                'title' => 'Homepage Hero Subtitle',
                'content' => 'Discover the perfect pair for every occasion',
                'type' => 'text',
            ],
            [
                'key' => 'about_intro',
                'title' => 'About Page Introduction',
                'content' => 'Welcome to ShoeShop, your premier destination for quality footwear. Since our founding, we\'ve been committed to providing our customers with the finest selection of shoes for every occasion.',
                'type' => 'html',
            ],
            [
                'key' => 'contact_email',
                'title' => 'Contact Email',
                'content' => 'info@shoeshop.com',
                'type' => 'text',
            ],
            [
                'key' => 'contact_phone',
                'title' => 'Contact Phone',
                'content' => '(555) 123-4567',
                'type' => 'text',
            ],
            [
                'key' => 'contact_address',
                'title' => 'Contact Address',
                'content' => '123 Fashion Street, New York, NY 10001',
                'type' => 'text',
            ],
            [
                'key' => 'footer_about',
                'title' => 'Footer About Text',
                'content' => 'Your destination for the finest footwear. Quality, style, and comfort in every step.',
                'type' => 'text',
            ],
        ];

        foreach ($contents as $content) {
            CmsContent::updateOrCreate(
                ['key' => $content['key']],
                $content
            );
        }
    }
}
