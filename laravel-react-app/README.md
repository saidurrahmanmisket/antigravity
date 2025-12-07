# Laravel React E-commerce

A modern e-commerce application built with Laravel and React.

## Features

- **Product Management**: Create, update, and manage products with ease.
- **Variant Handling**: Robust SKU generation logic ensuring uniqueness across variants (`SKU-{PRODUCT_ID}-{RANDOM}-{SIZE}-{COLOR}`).
- **Admin Interface**: Intuitive dashboard for managing the store.
- **Modern UI**: Built with React and Tailwind CSS for a responsive and beautiful user experience.

## Tech Stack

- **Backend**: [Laravel](https://laravel.com)
- **Frontend**: [React](https://reactjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Database**: MySQL

## Getting Started

### Prerequisites

- PHP 8.1+
- Composer
- Node.js & NPM
- MySQL

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel-react-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   Copy the example env file and configure your database credentials:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database Setup**
   Run migrations and seed the database (includes 200k+ products test):
   ```bash
   php artisan migrate --seed
   # Or specifically for products:
   php artisan db:seed --class=ProductSeeder
   ```

6. **Run the Application**
   Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   In a separate terminal, start the Vite development server:
   ```bash
   npm run dev
   ```
