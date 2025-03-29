import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product, totalAmount } = location.state || {}; // Handle both product and totalAmount
    const [step, setStep] = useState(1);
    const [loginInfo, setLoginInfo] = useState({ name: "", phone: "" });
    const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "" });
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [quantity, setQuantity] = useState(1);
  
    // Use product if available, otherwise use totalAmount as fallback
    const orderDetails = product || { name: "Cart Items", price: totalAmount ? totalAmount / quantity : 0 };
    const totalPrice = totalAmount || orderDetails.price * quantity; // Prioritize totalAmount from Cart
  const handleLoginSubmit = () => {
    if (loginInfo.name && loginInfo.phone) {
      setStep(2); // Move to Delivery Address step
    } else {
      alert("Please fill in your login details.");
    }
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.phone && newAddress.address) {
      setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
      setNewAddress({ name: "", phone: "", address: "" }); // Clear the form
    } else {
      alert("Please fill all address fields.");
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleNextStep = () => {
    if (step === 2 && addresses.length === 0) {
      alert("Please add a delivery address.");
      return;
    }
    if (step === 3 && !selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    setStep(step + 1); // Move to the next step
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1); // Go back to the previous step
    }
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_pYO1RxhwzDCppY", // Replace this with your Razorpay API key
      amount: totalPrice * 100, // Convert to paise
      currency: "INR",
      name: orderDetails.name,
      description: "Order Payment",
      image: "/logo.png",
      handler: function (response) {
        console.log(response);
        alert("Payment Successful!");
        navigate("/success");
      },
      prefill: {
        name: loginInfo.name,
        email: "", // Optional
        contact: loginInfo.phone,
      },
      notes: {
        address: selectedAddress ? selectedAddress.address : "Not provided",
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("Razorpay SDK not loaded correctly.");
    }
  };

  // Load Razorpay script dynamically
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="checkout-container flex flex-col lg:flex-row gap-y-4 lg:gap-x-8 p-4 max-w-6xl mx-auto">
      {/* Left Section */}
      <div className="left-section w-full lg:w-2/3">
        {/* Step 1: Login */}
        {step === 1 && (
          <div className="step border rounded p-4 shadow mb-6">
            <h3 className="text-lg font-bold mb-4">1. LOGIN</h3>
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                className="block border rounded p-2 mb-4 w-full"
                value={loginInfo.name}
                onChange={(e) => setLoginInfo({ ...loginInfo, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter your phone number"
                className="block border rounded p-2 mb-4 w-full"
                value={loginInfo.phone}
                onChange={(e) => setLoginInfo({ ...loginInfo, phone: e.target.value })}
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLoginSubmit}>
                SAVE
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Delivery Address */}
        {step === 2 && (
          <div className="step border rounded p-4 shadow mb-6">
            <h3 className="text-lg font-bold mb-4">2. DELIVERY ADDRESS</h3>
            {/* Display the list of addresses */}
            {addresses.length > 0 && (
              <div className="address-list mb-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`address-item p-4 border rounded mb-4 ${selectedAddress === address ? "border-blue-500" : "border-gray-300"}`}
                  >
                    <label className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address}
                        onChange={() => handleSelectAddress(address)}
                      />
                      <div>
                        <p className="font-bold">{address.name} {address.phone}</p>
                        <p>{address.address}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            )}
            {/* Form to add a new address */}
            <h4 className="font-semibold mb-2">Add a new address:</h4>
            <input
              type="text"
              placeholder="Name"
              className="block border rounded p-2 mb-2 w-full"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="block border rounded p-2 mb-2 w-full"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
            />
            <textarea
              placeholder="Address"
              className="block border rounded p-2 mb-2 w-full"
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded mb-4" onClick={handleAddAddress}>
              ADD ADDRESS
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextStep}>
              CONTINUE
            </button>
          </div>
        )}

        {/* Step 3: Order Summary */}
        {step === 3 && (
          <div className="step border rounded p-4 shadow mb-6">
            <h3 className="text-lg font-bold mb-4">3. ORDER SUMMARY</h3>
            <p>Product: {orderDetails.name}</p>
            <p className="mt-4">Total Price: ₹{totalPrice}</p>
            <p>Delivery Address: {selectedAddress ? selectedAddress.address : "Not provided"}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleNextStep}>
              CONTINUE TO PAYMENT
            </button>
            <div className="quantity-section mt-4">
              <label htmlFor="quantity" className="block mb-2 font-bold">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded p-2 w-20"
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

        {/* Step 4: Payment Options */}
        {step === 4 && (
          <div className="step border rounded p-4 shadow mb-6">
            <h3 className="text-lg font-bold mb-4">4. PAYMENT OPTIONS</h3>
            <p>Total Payable: ₹{totalPrice}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={handlePayment}>
              COMPLETE PAYMENT
            </button>
          </div>
        )}
      </div>

      {/* Right Section: Price Details */}
      <div className="right-section w-full lg:w-1/3 bg-gray-100 p-4 rounded shadow mt-4 lg:mt-0">
        <h3 className="font-bold text-lg mb-4">PRICE DETAILS</h3>
        <div className="price-item flex justify-between">
          <p>Price (1 item)</p>
          <p>₹{orderDetails.price}</p>
        </div>
        <div className="price-item flex justify-between">
          <p>Quantity</p>
          <p>{quantity}</p>
        </div>
        <div className="price-item flex justify-between">
          <p>Delivery Charges</p>
          <p className="text-green-500">FREE</p>
        </div>
        <hr className="my-2" />
        <div className="price-item flex justify-between font-bold">
          <p>Total Payable</p>
          <p>₹{totalPrice}</p>
        </div>
      </div>

      {/* Back Button */}
      {step > 1 && (
        <div className="back-button mt-4 lg:mt-0">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleBackStep}>
            BACK
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;