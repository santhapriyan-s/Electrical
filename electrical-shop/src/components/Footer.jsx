import React from 'react';
import './Footer.css'; // Make sure this CSS file is in the same folder

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-column">
          <h3>SR ELECTRICALS</h3>
          <p>© 2025 SR ELECTRICALS. All rights reserved.</p>
          <p>Email: info@sreelectricals.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
        <div className="footer-column">
          <h4>Navigate</h4>
          <ul>
             <li><a href='main'>Home</a></li>
             <li><a href='about'>About</a></li>
             <li><a href='products'>Products</a></li>
             <li><a href='cart'>Cart</a></li>
             <li><a href='profile'>Profile</a></li>
          </ul>
          
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
