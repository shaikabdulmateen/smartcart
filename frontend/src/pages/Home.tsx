import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Product } from "../types/product";

function Home() {

    const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  api.get<Product[]>("/products/")
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error("Failed to fetch products:", error);
    });
}, []);

  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small-text">WELCOME TO SMARTCART</p>

          <h1>
            Shop Smart.
            <br />
            Shop Better.
          </h1>

          <p className="hero-description">
            Discover quality products at great prices.
            Everything you need, all in one place.
          </p>

          <Link to="/products" className="shop-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="categories-section">
  <h2>Shop by Category</h2>

  <div className="category-grid">
    <div className="category-card">
      <h3>Electronics</h3>
      <p>Latest gadgets & devices</p>
      <Link to="/products">Explore</Link>
    </div>

    <div className="category-card">
      <h3>Clothing</h3>
      <p>Style for every occasion</p>
      <Link to="/products">Explore</Link>
    </div>

    <div className="category-card">
      <h3>Books</h3>
      <p>Discover your next read</p>
      <Link to="/products">Explore</Link>
    </div>
  </div>
</section>


        <section className="featured-section">
  <h2>Featured Products</h2>

  <div className="product-grid">
    {products.slice(0, 4).map((product) => (
      <div className="product-card" key={product.id}>
        {product.image && (
          <img src={product.image} alt={product.name} />
        )}

        <div className="product-card-content">
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <strong>₹{product.price}</strong>

          <Link to={`/products/${product.id}`}>
            View Product
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>
    </main>
  );
}

export default Home;