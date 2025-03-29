// src/pages/PanCard.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./PanCard.css";

const PanCard = ({ user, setUser }) => {
  const [panData, setPanData] = useState({
    panNumber: "",
    fullName: "",
    panImage: null,
    fileName: "No file chosen"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    // Load saved data if available
    const savedPanData = JSON.parse(localStorage.getItem('panData'));
    if (savedPanData) {
      setPanData(savedPanData);
      setIsUploaded(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPanData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setPanData(prev => ({
        ...prev,
        panImage: file,
        fileName: file.name
      }));
    } else {
      alert('Please upload a JPEG file only');
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate PAN format (5 letters, 4 numbers, 1 letter)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panData.panNumber.toUpperCase())) {
      alert('Please enter a valid PAN number (format: ABCDE1234F)');
      return;
    }

    if (!panData.fullName || !panData.panImage) {
      alert('Please fill all fields and upload PAN image');
      return;
    }

    // Save to localStorage (in a real app, you would send to backend)
    localStorage.setItem('panData', JSON.stringify(panData));
    setIsUploaded(true);
    setIsEditing(false);
    alert('PAN details saved successfully!');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const isFormValid = () => {
    return panData.panNumber && panData.fullName && panData.panImage;
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>PAN Card Information</h3>
        {isUploaded && !isEditing && (
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>

      {(!isUploaded || isEditing) ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>PAN Card Number</label>
            <input
              type="text"
              name="panNumber"
              value={panData.panNumber}
              onChange={handleInputChange}
              placeholder="ABCDE1234F"
              pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"
              maxLength="10"
              required
              disabled={isUploaded && !isEditing}
            />
          </div>
          <div className="form-group">
            <label>Full Name (as per PAN)</label>
            <input
              type="text"
              name="fullName"
              value={panData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
              disabled={isUploaded && !isEditing}
            />
          </div>
          <div className="form-group file-upload">
            <label>Upload PAN Card (JPEG only)</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="panUpload"
                accept="image/jpeg"
                onChange={handleFileChange}
                required={!isUploaded}
                disabled={isUploaded && !isEditing}
              />
              <label htmlFor="panUpload" className="file-upload-btn">
                Choose File
              </label>
              <span className="file-name">{panData.fileName}</span>
            </div>
          </div>
          <p className="disclaimer">
            I hereby declare that PAN furnished/stated above is correct and belongs to me, 
            registered as an account holder with flipkart.com. I further declare that I shall 
            be held responsible for the consequences of any false PAN declaration.
          </p>
          <div className="form-actions">
            <button 
              type="submit" 
              className="upload-btn"
              disabled={!isFormValid()}
            >
              {isUploaded ? "Update" : "Upload"}
            </button>
            {isUploaded && isEditing && (
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="pan-details-view">
          <div className="detail-row">
            <span className="detail-label">PAN Number:</span>
            <span className="detail-value">{panData.panNumber}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Full Name:</span>
            <span className="detail-value">{panData.fullName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">PAN Image:</span>
            <span className="detail-value">{panData.fileName}</span>
          </div>
        </div>
      )}
      
      <NavLink to="#" className="terms-link">
        Read Terms & Conditions of PAN Card Information
      </NavLink>
    </div>
  );
};

export default PanCard;