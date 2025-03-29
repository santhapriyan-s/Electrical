import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>SR ELECTRICALS</h3>
          <p>&copy; 2025 SR ELECTRICALS. All rights reserved.</p>
          <p>Email: info@srelectricals.com | Phone: (555) 123-4567</p>
        </div>
        <div className="footer-section">
          <h4>Navigate</h4>
          <ul>
            <li><a href="/main">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;