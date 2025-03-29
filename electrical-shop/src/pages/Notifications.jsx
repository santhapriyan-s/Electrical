// src/pages/Notifications.jsx
import React, { useEffect } from "react";
import "./Notifications.css"; // Import the new Notifications.css

const Notifications = ({ user, setUser }) => {
  useEffect(() => {
    console.log("Notifications component mounted");
    return () => {
      console.log("Notifications component unmounted");
    };
  }, []);

  return (
    <div className="profile-section empty-section">
      <h3>All caught up!</h3>
      <p>There are no new notifications for you.</p>
    </div>
  );
};

export default Notifications;