from django.urls import path
from .views import ProductListView, CategoryListView , ProductDetailView

urlpatterns = [
    path('' , ProductListView.as_view() , name = 'product_list'),
    path('categories/' , CategoryListView.as_view() , name = 'category_list'),
    path('<int:pk>/' , ProductDetailView.as_view() , name = 'product_detail'),

]