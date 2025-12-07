<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('About');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function faq()
    {
        $faqs = [
            [
                'question' => 'What is your return policy?',
                'answer' => 'We accept returns within 30 days of purchase. Items must be unworn and in original packaging.',
            ],
            [
                'question' => 'How long does shipping take?',
                'answer' => 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days.',
            ],
            [
                'question' => 'Do you ship internationally?',
                'answer' => 'Yes, we ship to most countries worldwide. Shipping costs and times vary by location.',
            ],
            [
                'question' => 'How do I find my shoe size?',
                'answer' => 'Please refer to our size guide on each product page. We provide measurements in US, UK, and EU sizes.',
            ],
            [
                'question' => 'What payment methods do you accept?',
                'answer' => 'We accept all major credit cards, PayPal, and other secure payment methods.',
            ],
        ];

        return Inertia::render('FAQ', ['faqs' => $faqs]);
    }
}
