import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaSave, FaTimesCircle, FaSignOutAlt } from 'react-icons/fa';
import '../../stylesheets/Renter/Profile Tab/personalinfo.css';

const PersonalInfo = () => {
  const navigate = useNavigate(); 
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [profilePicture, setProfilePicture] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s'
  );

  const handleSaveChanges = () => {
    // Save changes logic
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Cancel logic
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="section">
      <h2>Personal Information</h2>
      <div className="personal-info">
        <p className="profile-picture-text">Profile Picture</p>
        <div className="profile-picture">
          {isEditing && (
            <>
              <label htmlFor="profile-picture-upload" className="profile-edit-overlay">
                Edit
              </label>
              <input
                id="profile-picture-upload"
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleProfilePictureChange}
                className="profile-picture-upload"
                style={{ display: 'none' }}
              />
            </>
          )}
          <img src={profilePicture} alt="Profile-Picture" className="profile-img" />
        </div>
        <div className="input-group">
          <label>First Name</label>
          {isEditing ? (
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="edit-input"
            />
          ) : (
            <div className="detail-value">{firstName}</div>
          )}
        </div>
        <div className="input-group">
          <label>Last Name</label>
          {isEditing ? (
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="edit-input"
            />
          ) : (
            <div className="detail-value">{lastName}</div>
          )}
        </div>
        <div className="input-group">
          <label>Email Address</label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="edit-input"
            />
          ) : (
            <div className="detail-value">{email}</div>
          )}
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          {isEditing ? (
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="edit-input"
            />
          ) : (
            <div className="detail-value">{phoneNumber}</div>
          )}
        </div>
      </div>
      <div className="edit-buttons">
        {isEditing ? (
          <>
            <button className="save-button" onClick={handleSaveChanges}>
              <FaSave className="icon" /> Save Changes
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              <FaTimesCircle className="icon" /> Cancel
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            <FaEdit className="icon" /> Edit
          </button>
        )}
      </div>
      <div className="logout-container">
        <button className="logout-button" onClick={() => navigate('/')}>
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;