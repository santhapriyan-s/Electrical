import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = ({ user, setUser, favourites, setFavourites }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user.username || "",
    email: user.email || "",
    mobile: user.mobile || "",
    gender: user.gender || "",
  });

  useEffect(() => {
    console.log("Profile component mounted");
    return () => {
      console.log("Profile component unmounted");
    };
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser((prev) => ({ ...prev, ...editForm }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      username: user.username || "",
      email: user.email || "",
      mobile: user.mobile || "",
      gender: user.gender || "",
    });
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>Personal Information</h3>
        {!isEditing && (
          <button className="edit-all-btn" onClick={handleEditClick}>
            Edit Profile
          </button>
        )}
      </div>
      
      <div className="info-details">
        {/* Username Field */}
        <div className="info-item">
          <label>Username</label>
          {isEditing ? (
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={editForm.username}
                onChange={handleEditChange}
                placeholder="Your Username"
              />
            </div>
          ) : (
            <p>{user.username || "N/A"}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="info-item">
          <label>Email Address</label>
          {isEditing ? (
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                placeholder="Your Email"
              />
            </div>
          ) : (
            <p>{user.email || "N/A"}</p>
          )}
        </div>

        {/* Mobile Field */}
        <div className="info-item">
          <label>Mobile Number</label>
          {isEditing ? (
            <div className="form-group">
              <input
                type="text"
                name="mobile"
                value={editForm.mobile}
                onChange={handleEditChange}
                placeholder="Your Mobile Number"
              />
            </div>
          ) : (
            <p>{user.mobile || "N/A"}</p>
          )}
        </div>

        {/* Gender Field */}
        <div className="info-item">
          <label>Gender</label>
          {isEditing ? (
            <div className="form-group">
              <select
                name="gender"
                value={editForm.gender}
                onChange={handleEditChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          ) : (
            <p>{user.gender || "Not specified"}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="form-action-buttons">
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

      <div className="faq-section">
        <h4>FAQs</h4>
        <div className="faq-item">
          <p>What happens when I update my profile information?</p>
          <p>Your account details will be updated immediately after saving. You'll receive all communications using your updated information.</p>
        </div>
        <div className="faq-item">
          <p>When will my changes take effect?</p>
          <p>Changes take effect immediately after you click "Save Changes".</p>
        </div>
        <div className="faq-item">
          <p>What happens to my existing account information?</p>
          <p>Your previous information will be replaced with the new details you provide.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;