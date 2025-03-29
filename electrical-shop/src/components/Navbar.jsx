import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaInfoCircle, FaBoxOpen, FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { FiLogIn, FiLogOut, FiUser, FiShoppingBag, FiHeart, FiGift, FiCreditCard } from 'react-icons/fi'; // Added icons for dropdown
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">SR ELECTRICALS</span>
        <div className="navbar-links">
          <Link to="/main" className="navbar-link">
            <AiFillHome className="navbar-icon" /> <span>Home</span>
          </Link>
          <Link to="/about" className="navbar-link">
            <FaInfoCircle className="navbar-icon" /> <span>About</span>
          </Link>
          <Link to="/products" className="navbar-link">
            <FaBoxOpen className="navbar-icon" /> <span>Products</span>
          </Link>
          <Link to="/cart" className="navbar-link">
            <FaShoppingCart className="navbar-icon" /> <span>Cart</span>
          </Link>
          <div className="navbar-login-container">
            <button onClick={toggleDropdown} className="navbar-login-btn">
              <FaUserAlt className="navbar-icon" />
              <span>{user ? user.username : "Login"}</span>
            </button>
            {isDropdownOpen && (
              <div className="login-dropdown">
                {user ? (
                  <>
                    <div className="dropdown-header">
                      <p>Hello, {user.username}</p>
                    </div>
                    <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiUser /> My Profile
                    </Link>
                    <Link to="/profile/orders" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiShoppingBag /> Orders
                    </Link>
                    <Link to="/profile/wishlist" state={{ activeSection: "favorites" }} className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiHeart /> Wishlist
                    </Link>
                    <Link to="/profile/gift-cards" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FiCreditCard /> Gift Cards
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      <FiLogOut /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="dropdown-header">
                      <p>New customer?</p>
                      <Link to="/signup" className="signup-link" onClick={() => setIsDropdownOpen(false)}>
                        Sign Up
                      </Link>
                    </div>
                    <Link to="/login" className="dropdown-item login-action" onClick={() => setIsDropdownOpen(false)}>
                      <FiLogIn /> Login
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;