import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const [name, setName] = useState("Loading..."); // Dynamic Name
  const [email, setEmail] = useState("user@example.com");
  const [phoneNumber, setPhoneNumber] = useState("7017642414");
  const [studentId, setStudentId] = useState("Loading..."); // Dynamic Student ID
  const [currentPassword, setCurrentPassword] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "email", "phone", or "password"
  const [errorInModal, setErrorInModal] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);

  const DUMMY_PASSWORD = "password123"; // Dummy current password
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            name: "John Doe",
            studentId: "12345678",
            email: "user@example.com",
            phoneNumber: "1234567891",
          });
        }, 1000)
      );
      setName(response.name);
      setStudentId(response.studentId);
      setEmail(response.email);
      setPhoneNumber(response.phoneNumber);
    };

    fetchUserData();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setShowSaveButton(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    setSuccessMessage("Profile picture updated successfully!");
    setShowSaveButton(false);
    setTimeout(() => setSuccessMessage(""), 3000);
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

  const validatePassword = (password) => {
    return password.length >= 6; // Password must be at least 6 characters
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
    } else if (modalType === "password") {
      if (!validatePassword(newPassword)) {
        setErrorInModal("Password must be at least 6 characters.");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setErrorInModal("New passwords do not match.");
        return;
      }
      setSuccessMessage("Password updated successfully!");
    }

    setModalVisible(false);
    setNewInfo("");
    setNewPassword("");
    setConfirmNewPassword("");
    setCurrentPassword("");
    setErrorInModal("");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setErrorInModal("");
    setNewInfo("");
    setNewPassword("");
    setConfirmNewPassword("");
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
            src={profileImage || "/static/icons/userSymbol.png"}
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

      {/* Name Section */}
      <div className="settings-section">
        <label>Name:</label>
        <div className="field-container">
          <span className="non-editable-field">{name}</span>
        </div>
      </div>

      {/* Student ID Section */}
      <div className="settings-section">
        <label>Student ID:</label>
        <div className="field-container">
          <span className="non-editable-field">{studentId}</span>
        </div>
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

      {/* Password Section */}
      <div className="settings-section">
        <label>Password:</label>
        <div className="field-container">
          <span>********</span>
          <button className="action-button" onClick={() => handleChange("password")}>
            Change Password
          </button>
        </div>
      </div>

      {/* Modal for Changes */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              Change {modalType === "email" ? "Email" : modalType === "phone" ? "Phone Number" : "Password"}
            </h2>
            <div className="modal-content">
              {modalType !== "password" ? (
                <>
                  <label>New {modalType === "email" ? "Email" : "Phone Number"}:</label>
                  <input
                    type="text"
                    value={newInfo}
                    onChange={(e) => setNewInfo(e.target.value)}
                    placeholder={`Enter new ${modalType}`}
                  />
                </>
              ) : (
                <>
                  <label>New Password:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <label>Confirm New Password:</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </>
              )}
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
