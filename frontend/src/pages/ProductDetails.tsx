import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";
import type { Product } from "../types/product";

function ProductDetails() {
  const navigate = useNavigate();
  if (!localStorage.getItem("access")) {
  navigate("/login");
  return;
}
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    api
      .get<Product>(`/products/${id}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
      });
  }, [id]);

  const addToCart = () => {
    api
      .post("/cart/add/", {
        product_id: product?.id,
        quantity: 1,
      })
      .then(() => {
        alert("Product added to cart!");
      })
      .catch((error) => {
        console.error("Failed to add product to cart:", error);

        if (error.response?.status === 401) {
          alert("Please login first.");
        } else {
          alert(
            error.response?.data?.error ||
              "Failed to add product to cart."
          );
        }
      });
  };

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <main className="product-details-page">
      <div className="product-details-card">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
          />
        )}

        <div className="product-details-content">
          <p className="product-category">
            {product.category.name}
          </p>

          <h1>{product.name}</h1>

          <p className="product-description">
            {product.description}
          </p>

          <h2>₹{product.price}</h2>

          <p>
            Stock available: <strong>{product.stock}</strong>
          </p>

          <button
  className="add-cart-btn"
  onClick={addToCart}
  disabled={product.stock === 0}
>
  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
</button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;