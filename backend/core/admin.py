
from django.contrib import admin
from products.models import Category, Product, ProductImage
from orders.models import Order, OrderItem
from gallery.models import GalleryImage

# Register Product related models
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)

# Register Order related models
admin.site.register(Order)
admin.site.register(OrderItem)

# Register Gallery models
admin.site.register(GalleryImage)
