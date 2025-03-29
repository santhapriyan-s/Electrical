// src/pages/Orders.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Orders.css"; // Import the new Orders.css

const Orders = ({ user, setUser }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-section empty-section">
      <h3>My Orders</h3>
      <p>You haven't placed any orders yet!</p>
      <Link to="/products" className="add-new-btn">
        Shop Now
      </Link>
    </div>
  );
};

export default Orders;