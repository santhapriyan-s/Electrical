import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import './ProductList.css';

const ProductList = ({ addToCart, addToFavourites, user }) => {
  const [products, setProducts] = useState([
    { id: 1, name: "LED Bulb", price: 10, category: "lighting", description: "Energy-efficient LED bulb.", image: "/a.jpg", isFavorite: false, reviews: [] },
    { id: 2, name: "Extension Cord", price: 15, category: "wiring", description: "5-meter extension cord.", image: "/b.jpg", isFavorite: false, reviews: [] },
    { id: 3, name: "Smart Plug", price: 25, category: "switches", description: "Wi-Fi-enabled smart plug.", image: "/c.jpg", isFavorite: false, reviews: [] },
    { id: 4, name: "Circuit Breaker", price: 30, category: "safety", description: "High-quality circuit breaker for safety.", image: "/d.jpg", isFavorite: false, reviews: [] },
    { id: 5, name: "Solar Panel", price: 200, category: "solar", description: "Eco-friendly solar panel for renewable energy.", image: "/e.jpg", isFavorite: false, reviews: [] },
    { id: 6, name: "Battery Backup", price: 150, category: "safety", description: "Reliable battery backup for power outages.", image: "/f.jpg", isFavorite: false, reviews: [] },
    { id: 7, name: "Voltage Stabilizer", price: 80, category: "safety", description: "Stabilizes voltage to protect appliances.", image: "/g.jpg", isFavorite: false, reviews: [] },
    { id: 8, name: "Electric Drill", price: 50, category: "tools", description: "Powerful electric drill for DIY projects.", image: "/h.jpg", isFavorite: false, reviews: [] },
    { id: 9, name: "Cable Tester", price: 40, category: "tools", description: "Tests electrical cables for faults.", image: "/i.jpg", isFavorite: false, reviews: [] },
    { id: 10, name: "LED Strip Lights", price: 20, category: "lighting", description: "Flexible LED strip lights for decoration.", image: "/j.jpg", isFavorite: false, reviews: [] },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newReview, setNewReview] = useState({ productId: null, rating: 0, comment: "" });
  const [editReview, setEditReview] = useState({ productId: null, index: null, rating: 0, comment: "" });
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [productToBuy, setProductToBuy] = useState(null);
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  // Simplified notification handler
  const showNotification = (message) => {
    console.log("Setting notification:", message); // Debug
    setNotification(message);
    setTimeout(() => {
      console.log("Clearing notification"); // Debug
      setNotification("");
    }, 3000);
  };

  const handleAddToCart = (product) => {
    console.log("Add to Cart clicked for:", product.name); // Debug
    addToCart(product);
    showNotification("Your product is added to the cart");
  };

  const handleToggleFavorite = (product) => {
    console.log("Toggle Favorite clicked for:", product.name); // Debug
    const newFavoriteState = !product.isFavorite;
    setProducts(prevProducts =>
      prevProducts.map(item =>
        item.id === product.id ? { ...item, isFavorite: newFavoriteState } : item
      )
    );
    const message = newFavoriteState
      ? "Your product is added to the favorites"
      : "Your product is removed from the favorites";
    showNotification(message);
    if (addToFavourites) {
      try {
        addToFavourites({ ...product, isFavorite: newFavoriteState });
      } catch (e) {
        console.error("Error in addToFavourites:", e);
      }
    }
  };

  const handleBuyNow = (product) => {
    console.log("Buy Now clicked for:", product.name, "User:", user); // Debug
    if (!user) {
      console.log("Showing login modal"); // Debug
      setProductToBuy(product);
      setShowLoginModal(true);
    } else {
      navigate("/checkout", { state: { product } });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || product.category === filterCategory;
      
      let matchesPriceRange = true;
      if (priceRange === "under50") matchesPriceRange = product.price < 50;
      else if (priceRange === "50to100") matchesPriceRange = product.price >= 50 && product.price <= 100;
      else if (priceRange === "over100") matchesPriceRange = product.price > 100;
      
      let matchesRatingFilter = true;
      if (ratingFilter !== "all" && product.reviews.length > 0) {
        const avgRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;
        matchesRatingFilter = avgRating >= parseInt(ratingFilter);
      }
      
      return matchesSearch && matchesCategory && matchesPriceRange && matchesRatingFilter;
    })
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  const handleReviewSubmit = (productId) => {
    if (!newReview.rating || !newReview.comment) {
      alert("Please provide a rating and comment.");
      return;
    }
    const reviewWithTimestamp = {
      user: user ? user.username : "You",
      rating: newReview.rating,
      comment: newReview.comment,
      timestamp: Date.now()
    };
    setProducts(prevProducts =>
      prevProducts.map(item =>
        item.id === productId
          ? { ...item, reviews: [reviewWithTimestamp, ...item.reviews] }
          : item
      )
    );
    setNewReview({ productId: null, rating: 0, comment: "" });
  };

  const handleEditReview = (productId, index) => {
    if (!editReview.rating || !editReview.comment) {
      alert("Please provide a rating and comment.");
      return;
    }
    setProducts(prevProducts =>
      prevProducts.map(item =>
        item.id === productId
          ? {
              ...item,
              reviews: item.reviews.map((review, i) =>
                i === index
                  ? { ...review, rating: editReview.rating, comment: editReview.comment }
                  : review
              ),
            }
          : item
      )
    );
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
      
      <div className="search-container">
        <div className="search-bar">
          <div className="input-wrapper">
            <input
              id="productSearch"
              type="text"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="product-list-layout">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Filters</h3>
            <div className="filter-group">
              <label>Categories</label>
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-dropdown"
              >
                <option value="all">All Categories</option>
                <option value="lighting">Lighting</option>
                <option value="wiring">Wiring</option>
                <option value="switches">Switches</option>
                <option value="safety">Safety Gear</option>
                <option value="tools">Tools</option>
                <option value="solar">Solar Products</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Price Range</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="filter-dropdown"
              >
                <option value="all">All Prices</option>
                <option value="under50">Under ₹50</option>
                <option value="50to100">₹50 - ₹100</option>
                <option value="over100">Over ₹100</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-dropdown"
              >
                <option value="default">Default</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Customer Rating</label>
              <select 
                className="filter-dropdown"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="4">4 Stars & Up</option>
                <option value="3">3 Stars & Up</option>
                <option value="2">2 Stars & Up</option>
                <option value="1">1 Star & Up</option>
              </select>
            </div>
          </div>
        </div>

        <div className="products-container">
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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
                                  {review.user === (user ? user.username : "You") && (
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
                        <div className="add-review-form">
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
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <button 
                      className={`favorite-btn ${product.isFavorite ? 'favorited' : ''}`} 
                      onClick={() => handleToggleFavorite(product)}
                    >
                      {product.isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                    </button>
                    <button onClick={() => handleBuyNow(product)}>Buy Now</button>
                  </div>
                  <Link to={`/products/${product.id}`}>View Details</Link>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {notification && (
        <div className="notification">
          <span>{notification}</span>
        </div>
      )}

      {showLoginModal && (
        <div className="login-modal">
          <div className="modal-content">
            <h3>Login Required</h3>
            <p>You need to login to complete your purchase</p>
            <div className="modal-buttons">
              <button onClick={() => {
                console.log("Navigating to login with product:", productToBuy); // Debug
                sessionStorage.setItem('pendingPurchase', JSON.stringify(productToBuy));
                navigate("/login", { state: { from: "product", product: productToBuy } });
                setShowLoginModal(false);
              }}>
                Login Now
              </button>
              <button onClick={() => {
                console.log("Closing login modal"); // Debug
                setShowLoginModal(false);
              }}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;