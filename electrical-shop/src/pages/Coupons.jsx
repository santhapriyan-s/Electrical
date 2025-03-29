import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Coupons.css";

const Coupons = ({ user, setUser }) => {
  const coupons = [
    { code: "Mantra L1FPO @ 2699", discount: "Extra ₹100 OFF", validTill: "11:59 PM, 31 Mar, 2025" },
    { code: "Extra ₹100 OFF", discount: "Extra ₹100 OFF", validTill: "11:59 PM, 31 Mar, 2025" },
    { code: "Extra ₹150 OFF", discount: "Extra ₹150 OFF", validTill: "11:59 PM, 31 Mar, 2025" },
    { code: "Extra ₹500 OFF", discount: "Extra ₹500 OFF", validTill: "11:59 PM, 31 Mar, 2025" },
    { code: "Extra ₹300 OFF", discount: "Extra ₹300 OFF", validTill: "11:59 PM, 31 Mar, 2025" },
    { code: "Extra ₹150 OFF", discount: "Extra ₹150 OFF", validTill: "11:59 PM, 31 Mar, 2025" },
    { code: "Extra ₹250 OFF", discount: "Extra ₹250 OFF", validTill: "11:59 PM, 31 Mar, 2025" },
  ];

  useEffect(() => {
    console.log("Coupons component mounted");
    return () => {
      console.log("Coupons component unmounted");
    };
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-section">
            <h3>Available Coupons</h3>
            {coupons.map((coupon, index) => (
              <div key={index} className="coupon-item">
                <p><strong>{coupon.code}</strong></p>
                <p>{coupon.discount} (Valid till: {coupon.validTill})</p>
                <NavLink to="#" className="view-tc-link">View T&C</NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;