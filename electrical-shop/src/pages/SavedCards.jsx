// src/pages/SavedCards.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SavedCards.css";

const SavedCards = ({ user, setUser }) => {
  const [cards, setCards] = useState([
    {
      id: 1,
      cardType: "VISA",
      lastFour: "1234",
      expiry: "12/25",
      isTokenized: true,
      name: "John Doe"
    },
    {
      id: 2,
      cardType: "Mastercard",
      lastFour: "5678",
      expiry: "06/24",
      isTokenized: false,
      name: "John Doe"
    }
  ]);

  const [editingCard, setEditingCard] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardType: "VISA",
    cardNumber: "",
    expiry: "",
    name: "",
    isTokenized: false
  });

  const handleEdit = (card) => {
    setEditingCard(card);
    setNewCard({
      cardType: card.cardType,
      cardNumber: `•••• •••• •••• ${card.lastFour}`,
      expiry: card.expiry,
      name: card.name,
      isTokenized: card.isTokenized
    });
  };

  const handleDelete = (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newCard.cardNumber || !newCard.expiry || !newCard.name) {
      alert("Please fill all required fields");
      return;
    }

    if (editingCard) {
      // Update existing card
      setCards(cards.map(card => 
        card.id === editingCard.id ? { 
          ...card, 
          cardType: newCard.cardType,
          lastFour: newCard.cardNumber.slice(-4),
          expiry: newCard.expiry,
          name: newCard.name,
          isTokenized: newCard.isTokenized
        } : card
      ));
      setEditingCard(null);
    } else {
      // Add new card
      const newId = Math.max(...cards.map(card => card.id), 0) + 1;
      setCards([
        ...cards,
        {
          id: newId,
          cardType: newCard.cardType,
          lastFour: newCard.cardNumber.slice(-4),
          expiry: newCard.expiry,
          name: newCard.name,
          isTokenized: newCard.isTokenized
        }
      ]);
    }

    // Reset form
    setNewCard({
      cardType: "VISA",
      cardNumber: "",
      expiry: "",
      name: "",
      isTokenized: false
    });
    setShowAddForm(false);
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>Manage Saved Cards</h3>
        <button 
          className="add-card-btn"
          onClick={() => {
            setShowAddForm(true);
            setEditingCard(null);
          }}
        >
          + Add New Card
        </button>
      </div>

      {(showAddForm || editingCard) && (
        <form className="card-form" onSubmit={handleSubmit}>
          <h4>{editingCard ? "Edit Card" : "Add New Card"}</h4>
          
          <div className="form-group">
            <label>Card Type *</label>
            <select
              name="cardType"
              value={newCard.cardType}
              onChange={handleInputChange}
              required
            >
              <option value="VISA">VISA</option>
              <option value="Mastercard">Mastercard</option>
              <option value="RuPay">RuPay</option>
              <option value="American Express">American Express</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={newCard.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              required
              pattern="[0-9\s]{16,19}"
              maxLength="19"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date *</label>
              <input
                type="text"
                name="expiry"
                value={newCard.expiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
                pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
              />
            </div>
            <div className="form-group">
              <label>Cardholder Name *</label>
              <input
                type="text"
                name="name"
                value={newCard.name}
                onChange={handleInputChange}
                placeholder="Name on card"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isTokenized"
                checked={newCard.isTokenized}
                onChange={(e) => setNewCard(prev => ({ ...prev, isTokenized: e.target.checked }))}
              />
              Tokenize this card for secure payments
            </label>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn">
              {editingCard ? "Update Card" : "Save Card"}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setShowAddForm(false);
                setEditingCard(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {cards.length > 0 ? (
        <div className="cards-list">
          {cards.map(card => (
            <div key={card.id} className="card-item">
              <div className="card-info">
                <div className="card-type">{card.cardType}</div>
                <div className="card-number">•••• •••• •••• {card.lastFour}</div>
                <div className="card-name">{card.name}</div>
                <div className="card-expiry">Expires {card.expiry}</div>
                <div className={`token-status ${card.isTokenized ? 'tokenized' : 'not-tokenized'}`}>
                  {card.isTokenized ? 'Tokenized' : 'Not Tokenized'}
                </div>
              </div>
              <div className="card-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(card)}
                >
                  Edit
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => handleDelete(card.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2874f0" strokeWidth="1.5">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          <h4>No Saved Cards</h4>
          <p>You haven't saved any payment cards yet.</p>
        </div>
      )}

      <div className="faq-section">
        <h4>FAQs</h4>
        {/* FAQ items remain the same */}
      </div>
    </div>
  );
};

export default SavedCards;