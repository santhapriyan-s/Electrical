import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Update cart item quantity
  const updateQuantity = (index, newQuantity) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCart(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  // Calculate total price
  const calculateTotal = () => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const discount = totalPrice * 0.2; // 20% discount
    const finalPrice = totalPrice - discount;
    return { totalPrice, discount, finalPrice };
  };

  const { totalPrice, discount, finalPrice } = calculateTotal();

  // Filter cart items based on search term
  const filteredCart = cart.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to Checkout with total amount
  const handleBuyNow = () => {
    navigate("/checkout", { state: { totalAmount: finalPrice } });
  };

  return (
    <div className="cart-page">
      {/* Left Section: Cart Items */}
      <div className="cart-items">
        <h2>Your Cart</h2>
        <div className="cart-search">
          <input
            type="text"
            placeholder="Search cart items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        {filteredCart.length === 0 ? (
          <p>
            {searchTerm
              ? "No items match your search."
              : "Your cart is empty. Start shopping!"}
          </p>
        ) : (
          filteredCart.map((item, index) => (
            
            <div key={index} className="cart-item-card">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              
              <p>Rs.{item.price}</p>
              <div className="cart-item-actions flex items-center justify-between mt-4">
                <div className="quantity-selector flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(cart.indexOf(item), (item.quantity || 1) - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(cart.indexOf(item), (item.quantity || 1) + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(cart.indexOf(item))}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Right Section: Price Details */}
      <div className="price-details">
        <h2>Price Details</h2>
        <div className="space-y-4">
          <div className="flex">
            <span>Price ({cart.length} items)</span>
            <span>Rs.{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex">
            <span>Discount</span>
            <span className="text-green-600">- Rs.{discount.toFixed(2)}</span>
          </div>
          <div className="flex">
            <span>Delivery Charges</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="border-t flex">
            <span>Total Amount</span>
            <span>Rs.{finalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button onClick={handleBuyNow}>Place Order</button>
      </div>
    </div>
  );
};

export default Cart;