// src/pages/Wishlist.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Wishlist.css"; // Import the new Wishlist.css

const Wishlist = ({ user, setUser, favourites, setFavourites }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleRemoveFromWishlist = (id) => {
    setFavourites(favourites.filter((item) => item.id !== id));
  };

  return (
    <div className="profile-section">
      <h3>My Wishlist ({favourites.length})</h3>
      {favourites.length === 0 ? (
        <div className="empty-section">
          <h3>Your Wishlist is Empty</h3>
          <p>Add items to your wishlist to see them here!</p>
          <Link to="/products" className="add-new-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="wishlist-items">
          {favourites.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} className="wishlist-item-image" />
              <div className="wishlist-item-details">
                <h4>{item.name}</h4>
                <p>
                  ₹{item.price} <span className="original-price">₹{item.originalPrice}</span>{" "}
                  <span className="discount">
                    ({Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF)
                  </span>
                </p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;