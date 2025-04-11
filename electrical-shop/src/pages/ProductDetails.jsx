import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import './ProductDetails.css';

const products = [
  {
    id: 1,
    name: "LED Bulb",
    price: 10,
    category: "Lighting",
    description: "Energy-efficient LED bulb designed to reduce power consumption.",
    image: "/a.jpg",
    features: [
      "10W power consumption",
      "Warm white light (3000K)",
      "Up to 25,000 hours lifespan",
      "Flicker-free operation"
    ],
    stock: 50,
    rating: 4.5,
    reviewCount: 120
  },
  {
    id: 2,
    name: "Extension Cord",
    price: 15,
    category: "Wiring",
    description: "5-meter extension cord with surge protection for safe power distribution.",
    image: "/b.jpg",
    features: [
      "5 meters length",
      "3 power outlets",
      "Surge protection up to 500J",
      "Fire-resistant casing"
    ],
    stock: 30,
    rating: 4.2,
    reviewCount: 85
  },
  {
    id: 3,
    name: "Smart Plug",
    price: 25,
    category: "Switches",
    description: "Wi-Fi-enabled smart plug for home automation and remote control.",
    image: "/c.jpg",
    features: [
      "Wi-Fi connectivity (2.4GHz)",
      "Compatible with Alexa and Google Home",
      "Energy monitoring",
      "Timer and schedule settings"
    ],
    stock: 20,
    rating: 4.7,
    reviewCount: 200
  },
  {
    id: 4,
    name: "Circuit Breaker",
    price: 30,
    category: "Safety",
    description: "High-quality circuit breaker for enhanced electrical safety.",
    image: "/d.jpg",
    features: [
      "10kA breaking capacity",
      "Quick-trip mechanism",
      "DIN rail mountable",
      "Overload and short-circuit protection"
    ],
    stock: 15,
    rating: 4.4,
    reviewCount: 95
  },
  {
    id: 5,
    name: "Solar Panel",
    price: 200,
    category: "Solar",
    description: "Eco-friendly solar panel for renewable energy generation.",
    image: "/e.jpg",
    features: [
      "100W power output",
      "Monocrystalline cells",
      "Weather-resistant design",
      "25-year performance warranty"
    ],
    stock: 8,
    rating: 4.8,
    reviewCount: 150
  },
  {
    id: 6,
    name: "Battery Backup",
    price: 150,
    category: "Safety",
    description: "Reliable battery backup for uninterrupted power during outages.",
    image: "/f.jpg",
    features: [
      "1000VA capacity",
      "6-hour backup time",
      "Automatic voltage regulation",
      "LCD status display"
    ],
    stock: 12,
    rating: 4.6,
    reviewCount: 110
  },
  {
    id: 7,
    name: "Voltage Stabilizer",
    price: 80,
    category: "Safety",
    description: "Stabilizes voltage to protect appliances from fluctuations.",
    image: "/g.jpg",
    features: [
      "5kVA capacity",
      "Wide input voltage range (140-260V)",
      "Over-voltage protection",
      "Compact design"
    ],
    stock: 25,
    rating: 4.3,
    reviewCount: 70
  },
  {
    id: 8,
    name: "Electric Drill",
    price: 50,
    category: "Tools",
    description: "Powerful electric drill for DIY projects and professional use.",
    image: "/h.jpg",
    features: [
      "500W motor",
      "Variable speed control",
      "Keyless chuck",
      "Ergonomic grip"
    ],
    stock: 18,
    rating: 4.5,
    reviewCount: 130
  },
  {
    id: 9,
    name: "Cable Tester",
    price: 40,
    category: "Tools",
    description: "Tests electrical cables for faults and connectivity issues.",
    image: "/i.jpg",
    features: [
      "Tests RJ45, RJ11, and coaxial cables",
      "LED fault indicators",
      "Portable design",
      "Battery-powered (9V)"
    ],
    stock: 22,
    rating: 4.1,
    reviewCount: 60
  },
  {
    id: 10,
    name: "LED Strip Lights",
    price: 20,
    category: "Lighting",
    description: "Flexible LED strip lights for decoration and ambiance.",
    image: "/j.jpg",
    features: [
      "5-meter length",
      "RGB color options",
      "Adhesive backing",
      "Remote control included"
    ],
    stock: 35,
    rating: 4.6,
    reviewCount: 180
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
      document.title = "SR Electricals";
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
      <p className="product-category">Category: {product.category}</p>
      <p className="product-description">{product.description}</p>
      <div className="product-features">
        <h3>Features</h3>
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="product-stock">
        <span>Availability: </span>
        <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>
      
      <button onClick={handleBuyNow} className="buy-now-btn">
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetails;