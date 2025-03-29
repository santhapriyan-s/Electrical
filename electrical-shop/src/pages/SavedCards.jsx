// src/pages/SavedCards.jsx
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./SavedCards.css"; // Import the SavedCards.css

const SavedCards = ({ user, setUser }) => {
  useEffect(() => {
    console.log("SavedCards component mounted");
    return () => {
      console.log("SavedCards component unmounted");
    };
  }, []);

  return (
    <div className="profile-section">
      <h3>Manage Saved Cards</h3>
      <div className="faq-section">
        <h4>FAQs</h4>
        <div className="faq-item">
          <p>Why is my card being tokenised?</p>
          <p>As per the new RBI guidelines to make card data more secure, merchants like Flipkart can’t store the card details of users. As an alternative, RBI has authorised card networks and card issuers to offer card tokenisation services, which means the replacement of actual credit and debit card details with an alternate code called ‘token’. The user can either choose to tokenise their card by giving consent for future transactions or choose to continue without tokenisation.</p>
        </div>
        <div className="faq-item">
          <p>What is a token?</p>
          <p>A token is generated when a user gives consent to Flipkart to tokenise their card. A token is a unique value for a combination of card, token requester (Flipkart is a token requester & accepts request from the customer for tokenisation of a card and passes it onto the card network to issue a corresponding token) and device. The token does not contain any personal information linked to your card and is generated only when a customer uses a new card for a successful transaction on Flipkart.</p>
        </div>
        <div className="faq-item">
          <p>Is it safe to tokenise my card?</p>
          <p>Yes. A tokenised card transaction is considered safer as the actual card details are not shared with the Flipkart during transaction processing. Card information is stored with the authorised card networks or card issuers only and Flipkart does not store your 16-digit card number.</p>
        </div>
        <div className="faq-item">
          <p>Is tokenisation of card mandatory?</p>
          <p>No, customer can choose whether or not to tokenise their card.</p>
        </div>
        <div className="faq-item">
          <p>What happens if I don’t give consent to secure my card?</p>
          <p>If you don’t give consent to tokenise your card, you need to enter your card details for every transaction as stipulated under the RBI guidelines.</p>
        </div>
        <NavLink to="#" className="view-faq-link">View all FAQs</NavLink>
      </div>
    </div>
  );
};

export default SavedCards;