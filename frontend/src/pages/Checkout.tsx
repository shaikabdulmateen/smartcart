import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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

function Checkout() {
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("access");

  if (!token) {
    navigate("/login");
  }
}, [navigate]);

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<CartData | null>(null);

  useEffect(() => {
    api
      .get<CartData>("/cart/")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch cart:", error);
      });
  }, []);

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();

    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }

    setLoading(true);

    api
      .post("/orders/create/", {
        address,
      })
      .then(() => {
        alert("Order placed successfully!");

        navigate("/orders");
      })
      .catch((error) => {
        console.error("Failed to place order:", error);

        alert(
          error.response?.data?.error ||
            "Failed to place order."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!cart) {
    return <p>Loading checkout...</p>;
  }

  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <h1>Checkout</h1>
        <div className="checkout-summary">
  <h2>Order Summary</h2>

  {cart.items.map((item) => (
    <div className="checkout-item" key={item.id}>
      <span>
        {item.product.name} × {item.quantity}
      </span>

      <span>
        ₹{Number(item.product.price) * item.quantity}
      </span>
    </div>
  ))}

  <h3>
    Total: ₹
    {cart.items.reduce(
      (total, item) =>
        total +
        Number(item.product.price) * item.quantity,
      0
    )}
  </h3>
</div>

        <form onSubmit={handlePlaceOrder}>
          <label htmlFor="address">
            Delivery Address
          </label>

          <textarea
            id="address"
            placeholder="Enter your full delivery address"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            rows={5}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Checkout;