
from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'quantity', 'price')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_amount', 'status', 'event_date', 'created_at')
    list_filter = ('status', 'event_date', 'created_at')
    search_fields = ('user__username', 'phone', 'address')
    readonly_fields = ('user', 'total_amount', 'created_at')
    inlines = [OrderItemInline]
