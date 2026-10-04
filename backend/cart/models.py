from django.db import models
from django.contrib.auth.models import User
from products.models import Product
# Create your models here.


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE , related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s cart"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart , related_name='items', on_delete=models.CASCADE )
    product = models.ForeignKey(Product , on_delete=models.CASCADE )
    quantity = models.IntegerField(default=1)


    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
