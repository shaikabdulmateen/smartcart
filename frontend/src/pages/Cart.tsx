import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Product } from "../types/product";

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartData {
  id: number;
  items: CartItem[];
  created_at: string;
}

function Cart() {
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("access");

  if (!token) {
    navigate("/login");
  }
}, [navigate]);
  const [cart, setCart] = useState<CartData | null>(null);

  const fetchCart = () => {
    api
      .get<CartData>("/cart/")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch cart:", error);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (
    itemId: number,
    quantity: number
  ) => {
    if (quantity < 1) {
      return;
    }

    api
      .patch(`/cart/items/${itemId}/`, {
        quantity,
      })
      .then(() => {
        fetchCart();
      })
      .catch((error) => {
        alert(
          error.response?.data?.error ||
            "Failed to update quantity."
        );
      });
  };

  const removeItem = (itemId: number) => {
    api
      .delete(`/cart/items/${itemId}/remove/`)
      .then(() => {
        fetchCart();
      })
      .catch((error) => {
        console.error("Failed to remove item:", error);
      });
  };

  const getTotal = () => {
    if (!cart) {
      return 0;
    }

    return cart.items.reduce(
      (total, item) =>
        total +
        Number(item.product.price) * item.quantity,
      0
    );
  };

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div className="cart-item" key={item.id}>
                {item.product.image && (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />
                )}

                <div className="cart-item-info">
                  <h2>{item.product.name}</h2>

                  <p>₹{item.product.price}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
<div className="cart-total">
  <h2>Total: ₹{getTotal()}</h2>

  <Link
    to="/checkout"
    className="checkout-btn"
  >
    Proceed to Checkout
  </Link>
</div>
        </>
      )}
    </main>
  );
}

export default Cart;