from django.urls import path
from .views import (
    CartDetailView,
    AddToCartView,
    UpdateCartItemView,
    RemoveCartItemView
)

urlpatterns = [
    path('', CartDetailView.as_view(), name='cart-detail'),
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path(
        'items/<int:pk>/',
        UpdateCartItemView.as_view(),
        name='update-cart-item'
    ),
    path(
        'items/<int:pk>/remove/',
        RemoveCartItemView.as_view(),
        name='remove-cart-item'
    ),
]