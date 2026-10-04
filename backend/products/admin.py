from django.contrib import admin
from .models import Category, Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'category',
        'price',
        'stock',
        'created_at',
    ]

    list_filter = ['category']
    search_fields = ['name']


admin.site.register(Category)