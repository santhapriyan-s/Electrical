// src/pages/SavedUPI.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SavedUPI.css"; // Import the new SavedUPI.css

const SavedUPI = ({ user, setUser }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-section">
      <h3>No UPAs saved to be shown</h3>
      <div className="faq-section">
        <h4>FAQs</h4>
        <div className="faq-item">
          <p>Why is my UPI being saved on Flipkart?</p>
          <p>It's quicker. You can save the hassle of typing in the complete UPI information every time you shop at Flipkart by saving your UPI details. You can make your payment by selecting the saved UPI ID of your choice at checkout. While this is obviously faster, it is also very secure.</p>
        </div>
        <div className="faq-item">
          <p>How to save my UPI on Flipkart?</p>
          <p>Fortunately, Your UPI ID information is 100 percent safe with us. UPI ID details are non PCI compliant and are non confidential data.</p>
        </div>
        <div className="faq-item">
          <p>What all UPI information does Flipkart store?</p>
          <p>Flipkart only stores UPI ID and payment provider details. We do not store PIN/MPIN.</p>
        </div>
        <div className="faq-item">
          <p>Can I delete my saved UPI?</p>
          <p>Yes, you can delete your UPI ID at any given time.</p>
        </div>
        <Link to="#" className="view-faq-link">View all FAQs</Link>
      </div>
    </div>
  );
};

export default SavedUPI;