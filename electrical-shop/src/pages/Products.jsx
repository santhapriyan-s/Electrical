import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import './Products.css';

const Products = ({ addToCart, addToFavourites }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "LED Bulb",
      price: 10,
      description: "Energy-efficient LED bulb.",
      image: "/a.jpg",
      isFavorite: false, // Added for favorite functionality
    },
    {
      id: 2,
      name: "Extension Cord",
      price: 15,
      description: "5-meter extension cord with surge protection.",
      image: "/b.jpg",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Smart Plug",
      price: 25,
      description: "Wi-Fi-enabled smart plug for home automation.",
      image: "/c.jpg",
      isFavorite: false,
    },
    {
      id: 4,
      name: "Circuit Breaker",
      price: 30,
      description: "High-quality circuit breaker for safety.",
      image: "/d.jpg",
      isFavorite: false,
    },
    {
      id: 5,
      name: "Solar Panel",
      price: 200,
      description: "Eco-friendly solar panel for renewable energy.",
      image: "/e.jpg",
      isFavorite: false,
    },
    {
      id: 6,
      name: "Battery Backup",
      price: 150,
      description: "Reliable battery backup for power outages.",
      image: "/f.jpg",
      isFavorite: false,
    },
    {
      id: 7,
      name: "Voltage Stabilizer",
      price: 80,
      description: "Stabilizes voltage to protect appliances.",
      image: "/g.jpg",
      isFavorite: false,
    },
    {
      id: 8,
      name: "Electric Drill",
      price: 50,
      description: "Powerful electric drill for DIY projects.",
      image: "/h.jpg",
      isFavorite: false,
    },
    {
      id: 9,
      name: "Cable Tester",
      price: 40,
      description: "Tests electrical cables for faults.",
      image: "/i.jpg",
      isFavorite: false,
    },
    {
      id: 10,
      name: "LED Strip Lights",
      price: 20,
      description: "Flexible LED strip lights for decoration.",
      image: "/j.jpg",
      isFavorite: false,
    },
  ]);

  const navigate = useNavigate();

  const toggleFavorite = (product) => {
    addToFavourites(product);
    const updatedProducts = products.map((item) =>
      item.id === product.id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setProducts(updatedProducts);
  };

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } }); // Pass the selected product to the Checkout page
  };

  return (
    <div className="product-list-container">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p>Rs.{product.price}</p>
            <p>{product.description}</p>
            <div className="button-container">
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button className="favorite-btn" onClick={() => toggleFavorite(product)}>
                {product.isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
              </button>
              <button onClick={() => handleBuyNow(product)}>Buy Now</button>
            </div>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;