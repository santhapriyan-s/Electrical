import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ProductDetails.css';

const products = [
  {
    id: 1,
    name: "LED Bulb",
    price: 10,
    description: "Energy-efficient LED bulb.",
    image: "/a.jpg",
  },
  {
    id: 2,
    name: "Extension Cord",
    price: 15,
    description: "5-meter extension cord with surge protection.",
    image: "/b.jpg",
  },
  {
    id: 3,
    name: "Smart Plug",
    price: 25,
    description: "Wi-Fi-enabled smart plug for home automation.",
    image: "/c.jpg",
  },
  {
    id: 4,
    name: "Circuit Breaker",
    price: 30,
    description: "High-quality circuit breaker for safety.",
    image: "/d.jpg",
  },
  {
    id: 5,
    name: "Solar Panel",
    price: 200,
    description: "Eco-friendly solar panel for renewable energy.",
    image: "/e.jpg",
  },
  {
    id: 6,
    name: "Battery Backup",
    price: 150,
    description: "Reliable battery backup for power outages.",
    image: "/f.jpg",
  },
  {
    id: 7,
    name: "Voltage Stabilizer",
    price: 80,
    description: "Stabilizes voltage to protect appliances.",
    image: "/g.jpg",
  },
  {
    id: 8,
    name: "Electric Drill",
    price: 50,
    description: "Powerful electric drill for DIY projects.",
    image: "/h.jpg",
  },
  {
    id: 9,
    name: "Cable Tester",
    price: 40,
    description: "Tests electrical cables for faults.",
    image: "/i.jpg",
  },
  {
    id: 10,
    name: "LED Strip Lights",
    price: 20,
    description: "Flexible LED strip lights for decoration.",
    image: "/j.jpg",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Product Details`;
    } else {
      document.title = "Product Not Found";
    }

    return () => {
      document.title = "SR Electricals"; // Updated to match app name
    };
  }, [product]);

  if (!product) {
    return <div className="not-found">Product not found!</div>;
  }

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product } });
  };

  return (
    <div className="product-details-container">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} className="product-image" />
      <p className="product-price">Price: Rs.{product.price}</p>
      <p className="product-description">{product.description}</p>
      <button onClick={handleBuyNow} className="buy-now-btn">
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetails;