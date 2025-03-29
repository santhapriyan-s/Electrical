// src/components/Sidebar.jsx
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiUser, FiShoppingBag, FiCreditCard, FiLogOut, FiMapPin, FiGift, FiStar, FiBell, FiTag } from "react-icons/fi"; // Replace FiGiftCard with FiGift
import "../pages/Profile.css";

const Sidebar = ({ user, setUser }) => {
  const location = useLocation();

  useEffect(() => {
    console.log("Sidebar: Current location:", location.pathname);
  }, [location]);

  const handleLogout = () => {
    console.log("Sidebar: Logging out");
    setUser(null);
  };

  return (
    <div className="profile-sidebar">
      <div className="profile-header">
        <div className="profile-avatar">
          <FiUser size={40} color="#fff" />
        </div>
        <p>Hello, {user.username}</p>
      </div>
      <nav className="profile-nav">
        <NavLink
          to="/profile/orders"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiShoppingBag /> My Orders
        </NavLink>
        <h4>Account Settings</h4>
        <NavLink
          to="/profile"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
          end
        >
          <FiUser /> Profile Information
        </NavLink>
        <NavLink
          to="/profile/manage-address"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiMapPin /> Manage Addresses
        </NavLink>
        <NavLink
          to="/profile/pan-card"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiCreditCard /> PAN Card Information
        </NavLink>
        <h4>Payments</h4>
        <NavLink
          to="/profile/gift-cards"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiGift /> Gift Cards <span className="balance">₹0</span> {/* Use FiGift instead of FiGiftCard */}
        </NavLink>
        <NavLink
          to="/profile/saved-upi"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiCreditCard /> Saved UPI
        </NavLink>
        <NavLink
          to="/profile/saved-cards"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiCreditCard /> Saved Cards
        </NavLink>
        <h4>My Stuff</h4>
        <NavLink
          to="/profile/coupons"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiTag /> My Coupons
        </NavLink>
        <NavLink
          to="/profile/reviews"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiStar /> My Reviews & Ratings
        </NavLink>
        <NavLink
          to="/profile/notifications"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiBell /> All Notifications
        </NavLink>
        <NavLink
          to="/profile/wishlist"
          className={({ isActive }) => `profile-nav-item ${isActive ? "active" : ""}`}
        >
          <FiCreditCard /> My Wishlist
        </NavLink>
        <NavLink
          to="/login"
          onClick={handleLogout}
          className="profile-nav-item logout-btn"
        >
          <FiLogOut /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;