from django.urls import path
from .views import (
    CreateOrderView,
    MyOrdersView,
    CancelOrderView
)

urlpatterns = [
    path(
        'create/',
        CreateOrderView.as_view(),
        name='create-order'
    ),

    path(
        '',
        MyOrdersView.as_view(),
        name='my-orders'
    ),

    path(
        '<int:pk>/cancel/',
        CancelOrderView.as_view(),
        name='cancel-order'
    ),
]