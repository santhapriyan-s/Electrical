import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, totalAmount } = location.state || {};
  const [step, setStep] = useState(1);
  const [loginInfo, setLoginInfo] = useState({ name: "", phone: "" });
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  const orderDetails = product || { name: "Cart Items", price: totalAmount ? totalAmount / quantity : 0 };
  const totalPrice = totalAmount || orderDetails.price * quantity;

  const handleLoginSubmit = () => {
    if (loginInfo.name && loginInfo.phone) setStep(2);
    else alert("Please fill in your login details.");
  };

  const handleAddAddress = () => {
    const { name, phone, street, city, state, zip } = newAddress;
    if (name && phone && street && city && state && zip) {
      const newEntry = { ...newAddress, id: addresses.length + 1 };
      setAddresses([...addresses, newEntry]);
      setNewAddress({ name: "", phone: "", street: "", city: "", state: "", zip: "" });
    } else alert("Please fill in all address fields.");
  };

  const handleSelectAddress = (address) => setSelectedAddress(address);

  const handleNextStep = () => {
    if (step === 2 && addresses.length === 0) {
      alert("Please add a delivery address.");
      return;
    }
    if (step === 3 && !selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    setStep(step + 1);
  };

  const handleBackStep = () => step > 1 && setStep(step - 1);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_pYO1RxhwzDCppY",
      amount: totalPrice * 100,
      currency: "INR",
      name: orderDetails.name,
      description: "Order Payment",
      image: "/logo.png",
      handler: function (response) {
        alert("Payment Successful!");
        navigate("/success");
      },
      prefill: { name: loginInfo.name, contact: loginInfo.phone },
      notes: { address: selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}` : "Not provided" },
    };
    if (window.Razorpay) new window.Razorpay(options).open();
  };

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="checkout-container">
      <div className="left-section">
        {step === 1 && (
          <div className="step">
            <h3 className="step-title">1. LOGIN</h3>
            <input
              type="text"
              placeholder="Enter your name"
              className="form-input"
              value={loginInfo.name}
              onChange={(e) => setLoginInfo({ ...loginInfo, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter your phone number"
              className="form-input"
              value={loginInfo.phone}
              onChange={(e) => setLoginInfo({ ...loginInfo, phone: e.target.value })}
            />
            <button className="btn-blue" onClick={handleLoginSubmit}>
              SAVE
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h3 className="step-title">2. DELIVERY ADDRESS</h3>
            {addresses.length > 0 && (
              <div className="address-list">
                {addresses.map((address) => (
                  <div key={address.id} className={`address-item ${selectedAddress === address ? "selected" : ""}`}>
                    <label className="address-label">
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address}
                        onChange={() => handleSelectAddress(address)}
                      />
                      <div>
                        <p className="address-name">{address.name} - {address.phone}</p>
                        <p className="address-text">{address.street}, {address.city}, {address.state} {address.zip}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            )}
            <h4 className="form-title">Add a new address:</h4>
            <input
              type="text"
              placeholder="Name"
              className="form-input"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="form-input"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Street Address"
              className="form-input"
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="form-input"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <select
              className="form-input custom-select"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Pin Code"
              className="form-input"
              value={newAddress.zip}
              onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
            />
            <button className="btn-orange" onClick={handleAddAddress}>
              ADD ADDRESS
            </button>
            <button className="btn-blue" onClick={handleNextStep}>
              CONTINUE
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h3 className="step-title">3. ORDER SUMMARY</h3>
            <p>Product: {orderDetails.name}</p>
            <p className="price-text">Total Price: ₹{totalPrice}</p>
            <p>Delivery Address: {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}` : "Not provided"}</p>
            <button className="btn-blue" onClick={handleNextStep}>
              CONTINUE TO PAYMENT
            </button>
            <div className="quantity-section">
              <label htmlFor="quantity" className="quantity-label">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-input custom-select w-20"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step">
            <h3 className="step-title">4. PAYMENT OPTIONS</h3>
            <p className="price-text">Total Payable: ₹{totalPrice}</p>
            <button className="btn-green" onClick={handlePayment}>
              COMPLETE PAYMENT
            </button>
          </div>
        )}
      </div>

      <div className="right-section">
        <h3 className="price-title">PRICE DETAILS</h3>
        <div className="price-item">
          <p>Price (1 item)</p>
          <p>₹{orderDetails.price}</p>
        </div>
        <div className="price-item">
          <p>Quantity</p>
          <p>{quantity}</p>
        </div>
        <div className="price-item">
          <p>Delivery Charges</p>
          <p className="text-green-500">FREE</p>
        </div>
        <hr className="divider" />
        <div className="price-item total">
          <p>Total Payable</p>
          <p>₹{totalPrice}</p>
        </div>
      </div>

      {step > 1 && (
        <div className="back-button">
          <button className="btn-gray" onClick={handleBackStep}>
            BACK
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;