import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import type { Product, Category } from "../types/product";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    api
      .get<Product[]>("/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });

    api
      .get<Category[]>("/products/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }

    if (category) {
      params.append("category", category);
    }

    api
      .get<Product[]>(`/products/?${params.toString()}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Failed to filter products:", error);
      });
  }, [search, category]);

  return (
    <main className="products-page">
      <h1>All Products</h1>

      <div className="product-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
              />
            )}

            <div className="product-card-content">
              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <strong>₹{product.price}</strong>
              <p
  className={
    product.stock > 0
      ? "product-stock available"
      : "product-stock out-of-stock"
  }
>
  {product.stock > 0
    ? `${product.stock} items available`
    : "Out of Stock"}
</p>

              <Link
                to={`/products/${product.id}`}
                className="view-product-btn"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Products;