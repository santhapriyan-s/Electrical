// src/pages/Reviews.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Reviews.css"; // Import the new Reviews.css

const Reviews = ({ user, setUser }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-section empty-section">
      <h3>No Reviews & Ratings</h3>
      <p>You haven't rated or reviewed any product yet!</p>
    </div>
  );
};

export default Reviews;