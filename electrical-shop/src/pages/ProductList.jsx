import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import './ProductList.css';

const ProductList = ({ addToCart, addToFavourites }) => {
  const [products, setProducts] = useState([
    { id: 1, name: "LED Bulb", price: 10, category: "lighting", description: "Energy-efficient LED bulb.", image: "/a.jpg", isFavorite: false, reviews: [] },
    { id: 2, name: "Extension Cord", price: 15, category: "wiring", description: "5-meter extension cord.", image: "/b.jpg", isFavorite: false, reviews: [] },
    { id: 3, name: "Smart Plug", price: 25, category: "switches", description: "Wi-Fi-enabled smart plug.", image: "/c.jpg", isFavorite: false, reviews: [] },
    { id: 4, name: "Circuit Breaker", price: 30, description: "High-quality circuit breaker for safety.", image: "/d.jpg", isFavorite: false, reviews: [] },
    { id: 5, name: "Solar Panel", price: 200, description: "Eco-friendly solar panel for renewable energy.", image: "/e.jpg", isFavorite: false, reviews: [] },
    { id: 6, name: "Battery Backup", price: 150, description: "Reliable battery backup for power outages.", image: "/f.jpg", isFavorite: false, reviews: [] },
    { id: 7, name: "Voltage Stabilizer", price: 80, description: "Stabilizes voltage to protect appliances.", image: "/g.jpg", isFavorite: false, reviews: [] },
    { id: 8, name: "Electric Drill", price: 50, description: "Powerful electric drill for DIY projects.", image: "/h.jpg", isFavorite: false, reviews: [] },
    { id: 9, name: "Cable Tester", price: 40, description: "Tests electrical cables for faults.", image: "/i.jpg", isFavorite: false, reviews: [] },
    { id: 10, name: "LED Strip Lights", price: 20, description: "Flexible LED strip lights for decoration.", image: "/j.jpg", isFavorite: false, reviews: [] },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newReview, setNewReview] = useState({ productId: null, rating: 0, comment: "" });
  const [editReview, setEditReview] = useState({ productId: null, index: null, rating: 0, comment: "" });
  const [filterCategory, setFilterCategory] = useState("all"); // New filter state
  const [sortBy, setSortBy] = useState("default"); // New sort state

  const navigate = useNavigate();

  const toggleFavorite = (product) => {
    setProducts(prevProducts => 
      prevProducts.map(item =>
        item.id === product.id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    addToFavourites(product);
  };
  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "all" || product.category === filterCategory)
    )
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0; // Default: no sorting
    });

  const handleReviewSubmit = (productId) => {
    if (!newReview.rating || !newReview.comment) {
      alert("Please provide a rating and comment.");
      return;
    }
    const updatedProducts = products.map((item) =>
      item.id === productId
        ? { ...item, reviews: [...item.reviews, { user: "You", rating: newReview.rating, comment: newReview.comment }] }
        : item
    );
    setProducts(updatedProducts);
    setNewReview({ productId: null, rating: 0, comment: "" });
  };

  const handleEditReview = (productId, index) => {
    if (!editReview.rating || !editReview.comment) {
      alert("Please provide a rating and comment.");
      return;
    }
    const updatedProducts = products.map((item) =>
      item.id === productId
        ? {
            ...item,
            reviews: item.reviews.map((review, i) =>
              i === index ? { ...review, rating: editReview.rating, comment: editReview.comment } : review
            ),
          }
        : item
    );
    setProducts(updatedProducts);
    setEditReview({ productId: null, index: null, rating: 0, comment: "" });
  };

  const startEditingReview = (productId, index, review) => {
    setEditReview({ productId, index, rating: review.rating, comment: review.comment });
  };

  const getAverageRating = (reviews) => {
    if (!reviews.length) return "No reviews";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="product-list-container">
      <h2>Our Products</h2>

      {/* Filters and Sorting */}
      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="category-filters">
          <button
            className={filterCategory === "all" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilterCategory("all")}
          >
            All
          </button>
          <button
            className={filterCategory === "lighting" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilterCategory("lighting")}
          >
            Lighting
          </button>
          <button
            className={filterCategory === "wiring" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilterCategory("wiring")}
          >
            Wiring
          </button>
          <button
            className={filterCategory === "switches" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilterCategory("switches")}
          >
            Switches
          </button>
        </div>
        <div className="sort-options">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="default">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p>Rs.{product.price}</p>
            <p>{product.description}</p>

            <div className="review-section">
              <div className="average-rating">
                <FaStar color="#facc15" /> {getAverageRating(product.reviews)} ({product.reviews.length})
              </div>
              {product.reviews.length > 0 && (
                <div className="reviews">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="review">
                      {editReview.productId === product.id && editReview.index === index ? (
                        <div>
                          <select
                            value={editReview.rating}
                            onChange={(e) => setEditReview({ ...editReview, rating: Number(e.target.value) })}
                          >
                            <option value={0}>Rate (1-5)</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                          <textarea
                            value={editReview.comment}
                            onChange={(e) => setEditReview({ ...editReview, comment: e.target.value })}
                            placeholder="Edit your review..."
                          />
                          <div className="review-buttons">
                            <button onClick={() => handleEditReview(product.id, index)}>Save</button>
                            <button onClick={() => setEditReview({ productId: null, index: null, rating: 0, comment: "" })}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p>
                            <strong>{review.user}</strong>: {Array(review.rating).fill(<FaStar color="#facc15" />)}
                            {review.user === "You" && (
                              <button
                                className="edit-review-btn"
                                onClick={() => startEditingReview(product.id, index, review)}
                              >
                                Edit
                              </button>
                            )}
                          </p>
                          <p>{review.comment}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="add-review">
                {newReview.productId === product.id ? (
                  <div>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    >
                      <option value={0}>Rate (1-5)</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Write your review..."
                    />
                    <div className="review-buttons">
                      <button onClick={() => handleReviewSubmit(product.id)}>Submit</button>
                      <button onClick={() => setNewReview({ productId: null, rating: 0, comment: "" })}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setNewReview({ productId: product.id, rating: 0, comment: "" })}>
                    Add Review
                  </button>
                )}
              </div>
            </div>

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

export default ProductList;