import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import type { Product } from "../types/product";

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  items: OrderItem[];
  total_amount: string;
  status: string;
  address: string;
  created_at: string;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchOrders = () => {
    api
      .get<Order[]>("/orders/")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);

        alert(
          error.response?.data?.detail ||
            error.response?.data?.error ||
            "Failed to fetch orders."
        );
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = (orderId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    api
      .patch(`/orders/${orderId}/cancel/`)
      .then(() => {
        alert("Order cancelled successfully.");

        fetchOrders();
      })
      .catch((error) => {
        console.error("Failed to cancel order:", error);

        alert(
          error.response?.data?.error ||
            "Failed to cancel order."
        );
      });
  };

  return (
    <main className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <h2>Order #{order.id}</h2>

                <span>{order.status}</span>
              </div>

              <p>
                <strong>Address:</strong>{" "}
                {order.address}
              </p>

              <div className="order-items">
                {order.items.map((item) => (
                  <div
                    className="order-item"
                    key={item.id}
                  >
                    <span>
                      {item.product.name}
                    </span>

                    <span>
                      {item.quantity} × ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>

              <h3>
                Total: ₹{order.total_amount}
              </h3>

              {order.status === "pending" && (
                <button
                  className="cancel-order-btn"
                  onClick={() =>
                    cancelOrder(order.id)
                  }
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Orders;