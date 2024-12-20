import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const [email, setEmail] = useState("user@example.com");
  const [phoneNumber, setPhoneNumber] = useState("7017642414");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "email", "phone", or "password"
  const [errorInModal, setErrorInModal] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);

  const DUMMY_PASSWORD = "password123"; // Dummy current password
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setShowSaveButton(true); // Show the save button
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    setSuccessMessage("Profile picture updated successfully!");
    setShowSaveButton(false); // Hide the save button after saving
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
  };

  const handleChange = (type) => {
    setModalType(type);
    setModalVisible(true);
    setErrorInModal("");
    setSuccessMessage("");
  };

  const validateEmail = (emailInput) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  };

  const validatePhoneNumber = (phoneInput) => {
    return /^\d{10}$/.test(phoneInput);
  };

  const handleConfirm = () => {
    if (currentPassword !== DUMMY_PASSWORD) {
      setErrorInModal("Current password is incorrect.");
      return;
    }

    if (modalType === "email") {
      if (!validateEmail(newInfo)) {
        setErrorInModal("Please enter a valid email address.");
        return;
      }
      setEmail(newInfo);
      setSuccessMessage("Email updated successfully!");
    } else if (modalType === "phone") {
      if (!validatePhoneNumber(newInfo)) {
        setErrorInModal("Phone number must be exactly 10 digits.");
        return;
      }
      setPhoneNumber(newInfo);
      setSuccessMessage("Phone number updated successfully!");
    }

    // Close the modal and reset fields
    setModalVisible(false);
    setNewInfo("");
    setCurrentPassword("");
    setErrorInModal("");

    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
  };

  const handleCancel = () => {
    setModalVisible(false);
    setErrorInModal("");
    setNewInfo("");
    setCurrentPassword("");
    setSuccessMessage("");
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {/* Profile Picture Section */}
      <div className="profile-section">
        <label>Profile Picture:</label>
        <div className="profile-image-container">
          <img
            src={
              profileImage || "/static/icons/userSymbol.png"
            }
            alt="Profile"
            className="profile-image"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="upload-button"
          />
          {showSaveButton && (
            <button className="save-button" onClick={handleSaveImage}>
              Save
            </button>
          )}
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      {/* Email Section */}
      <div className="settings-section">
        <label>Email ID:</label>
        <div className="field-container">
          <span>{email}</span>
          <button className="action-button" onClick={() => handleChange("email")}>
            Change Email
          </button>
        </div>
      </div>

      {/* Phone Section */}
      <div className="settings-section">
        <label>Phone Number:</label>
        <div className="field-container">
          <span>{phoneNumber}</span>
          <button className="action-button" onClick={() => handleChange("phone")}>
            Change Phone
          </button>
        </div>
      </div>

      {/* Modal for Changes */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Change {modalType === "email" ? "Email" : "Phone Number"}</h2>
            <div className="modal-content">
              <label>New {modalType === "email" ? "Email" : "Phone Number"}:</label>
              <input
                type="text"
                value={newInfo}
                onChange={(e) => setNewInfo(e.target.value)}
                placeholder={`Enter new ${modalType}`}
              />
              <label>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
              {errorInModal && <p className="error-message">{errorInModal}</p>}
            </div>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default Settings;
