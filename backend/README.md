
# Vikash Vatika Decoration - Backend

This is the Django backend for the Vikash Vatika Decoration website.

## Setup Instructions

1. Install required packages:
   ```
   pip install -r requirements.txt
   ```

2. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

3. Create a superuser to access the admin panel:
   ```
   python manage.py createsuperuser
   ```

4. Run the development server:
   ```
   python manage.py runserver
   ```

5. Access the Django admin panel at:
   ```
   http://localhost:8000/admin/
   ```

## API Endpoints

### Authentication
- POST `/api/auth/token/` - Get JWT token (login)
- POST `/api/auth/token/refresh/` - Refresh JWT token
- POST `/api/auth/register/` - Register a new user
- GET/PUT `/api/auth/profile/` - Get or update user profile

### Products
- GET `/api/products/` - List all products
- POST `/api/products/` - Create a new product (admin only)
- GET `/api/products/{id}/` - Get product details
- PUT/PATCH `/api/products/{id}/` - Update product (admin only)
- DELETE `/api/products/{id}/` - Delete product (admin only)
- POST `/api/products/{id}/upload_images/` - Upload images for a product (admin only)
- GET `/api/products/featured/` - Get featured products

### Categories
- GET `/api/products/categories/` - List all categories
- POST `/api/products/categories/` - Create a new category (admin only)
- GET/PUT/DELETE `/api/products/categories/{slug}/` - Get, update, or delete a category (admin only)

### Orders
- GET `/api/orders/` - List user's orders (or all orders for admin)
- POST `/api/orders/` - Create a new order
- GET `/api/orders/{id}/` - Get order details
- PUT/PATCH `/api/orders/{id}/` - Update order (admin only)

### Gallery
- GET `/api/gallery/` - List all gallery images
- POST `/api/gallery/` - Add a new gallery image (admin only)
- GET `/api/gallery/{id}/` - Get image details
- PUT/PATCH `/api/gallery/{id}/` - Update image (admin only)
- DELETE `/api/gallery/{id}/` - Delete image (admin only)
- GET `/api/gallery/featured/` - Get featured gallery images
- GET `/api/gallery/by_category/?category_id={id}` - Get images by category
