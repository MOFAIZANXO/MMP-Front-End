import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import RenterNavbar from "../../../components/Renter/RenterNavbar";
import "../../../stylesheets/Renter/Profile Tab/renterprofile.css";
import { FaBell, FaSignOutAlt, FaTimes, FaEdit, FaSave, FaTimesCircle } from 'react-icons/fa';
import rentRequests from '../../../datasets/rentrequests';
import { currentProperties, previouslyRentedProperties } from "../../../datasets/rentedproperties.js";
import { useLocation } from 'react-router-dom';

const RenterProfile = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('personal');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [profilePicture, setProfilePicture] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s'
  );
  const [selectedProperty, setSelectedProperty] = useState(null);
  const navigate = useNavigate();

  // Set the active section based on the state passed via navigation
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);

  // Load user data from localStorage
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find((user) => user.email === email);
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setEmail(currentUser.email);
      setPhoneNumber(currentUser.phoneNumber || '+1234567890');
      setProfilePicture(currentUser.profileImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s');
    }
  }, [email]);

  const handleSaveChanges = () => {
    // Update user data in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.email === email
        ? {
            ...user,
            firstName,
            lastName,
            email,
            phoneNumber,
            profileImg: profilePicture,
          }
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find((user) => user.email === email);
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setEmail(currentUser.email);
      setPhoneNumber(currentUser.phoneNumber || '+1234567890');
      setProfilePicture(currentUser.profileImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s');
    }
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Update the profile picture state
      };
      reader.readAsDataURL(file); // Convert the image to a base64 string
    }
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="section">
            <h2>Personal Information</h2>
            <div className="personal-info">
              <p className="profile-picture-text">Profile Picture</p>
              {/* Profile Picture */}
              <div className="profile-picture">
                <label htmlFor="profile-picture-upload">
                  <img
                    src={profilePicture}
                    alt="Profile-Picture"
                    className="profile-img"
                  />
                </label>
                {isEditing && (
                  <input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    capture="user" // Opens the camera on mobile devices
                    onChange={handleProfilePictureChange}
                    className="profile-picture-upload"
                    style={{ display: 'none' }} // Hide the input element
                  />
                )}
              </div>
              {/* First Name */}
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
              {/* Last Name */}
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
              {/* Email Address */}
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
              {/* Phone Number */}
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
            {/* Edit/Save/Cancel Buttons */}
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
            {/* Logout Button */}
            <div className="logout-container">
              <button className="logout-button" onClick={() => {navigate("/")}}>
                <FaSignOutAlt className="icon" /> Logout
              </button>
            </div>
          </div>
        );
  
      case 'properties':
        return (
          <div className="section">
            <h2>My Properties</h2>
            {/* Current Properties */}
            <div className="properties-section">
              <h3>Current Properties</h3>
              <div className="properties-list">
                {currentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="property-card"
                    onClick={() => handlePropertyClick(property)}
                  >
                    <div className="property-image">
                      <img src={property.img} alt={property.name} />
                    </div>
                    <h3>{property.name}</h3>
                    <div className="property-details">
                      <span className={`status ${property.status.toLowerCase().replace(' ', '-')}`}>
                        {property.status}
                      </span>
                      <div className="rent-rate">Rent: Rs. {property.rentRate} per month</div>
                      <div className="address">{property.address}
                      </div>
                      <div className="propertyOwner">Owner: {property.owner}</div>
                    </div>
                    {/* Add Pay Rent and Home Service Request Buttons */}
                    <div className="property-buttons">
                      <button className="payRent-button" onClick={() => {navigate("/rentpayment")}}>
                        Pay Rent
                      </button>
                      <button className="home-service-button" onClick={() => {navigate("/repairform")}}>
                        Home Service Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Previously Rented Properties */}
            <div className="properties-section">
              <h3>Previously Rented</h3>
              <div className="properties-list">
                {previouslyRentedProperties.map((property) => (
                  <div
                    key={property.id}
                    className="property-card"
                    onClick={() => handlePropertyClick(property)}
                  >
                    <div className="property-image">
                      <img src={property.img} alt={property.name} />
                    </div>
                    <h3>{property.name}</h3>
                    <div className="property-details">
                      <span className={`status ${property.status.toLowerCase().replace(' ', '-')}`}>
                        {property.status}
                      </span>
                      <div className="rent-rate">Rent: Rs. {property.rentRate} per month</div>
                      <div className="address">{property.address}</div>
                      <div className="propertyOwner">Owner: {property.owner}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
  
      default:
        return null;
    }
  };

  const renderNotifications = () => {
    return (
      <div className="notifications-popup">
        <div className="notifications-header">
          <h3>Notifications</h3>
          <FaTimes className="close-icon" onClick={() => setShowNotifications(false)} />
        </div>
        <div className="notifications-content">
          <div className="requests-section">
            <h4>Requests</h4>
            {rentRequests.length === 0 ? (
              <p className="no-requests">You have no pending requests.</p>
            ) : (
              <div className="requests-grid">
                {rentRequests.map((request, index) => (
                  <div key={index} className="request-card">
                    <p><strong>Property:</strong> {request.propertyId}</p>
                    <p><strong>Type:</strong> {request.type === "rent" ? "Rent Request" : "Repair Request"}</p>
                    <p><strong>Status:</strong> {request.status}</p>
                    <p><strong>Request Date:</strong> {request.requestDate}</p>
                    <button className="cancel-request-button">Cancel Request</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="rent-due-section">
            <h4>Rent Due</h4>
            <div className="rent-due-card">
              <p><strong>Property:</strong> Bahria Apartments</p>
              <p><strong>Owner:</strong> Muhammad Faizan</p>
              <p><strong>Amount Due:</strong> 60k</p>
              <p><strong>Due Date:</strong> 2023-10-15</p>
              <button className="pay-rent-button">Pay Rent</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPropertyDetails = () => {
    if (!selectedProperty) return null;
  
    return (
      <div className="property-details-popup">
        <div className="property-details-content">
          <div className="property-image">
            <img src={selectedProperty.img} alt={selectedProperty.name} />
          </div>
          <h3>{selectedProperty.name}</h3>
          <div className="property-info">
            <p><strong>Location:</strong> {selectedProperty.address}</p>
            <p><strong>Owner:</strong> {selectedProperty.owner}</p>
            <p><strong>Rented From:</strong> {selectedProperty.rentedFrom}</p>
            <p><strong>Rented To:</strong> {selectedProperty.rentedTo}</p>
            <p><strong>Monthly Rent:</strong> Rs. {selectedProperty.rentRate}</p>
          </div>
          <button className="close-button" onClick={closePropertyDetails}>
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="renter-profile">
      <RenterNavbar />
      <div className="profile-head">
        <div className="menu-options">
          <div
            className={`menuItem ${activeSection === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveSection('personal')}
          >
            Personal
          </div>
          <div
            className={`menuItem ${activeSection === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveSection('properties')}
          >
            Properties
          </div>
        </div>
        <div className="notifications-icon" onClick={() => setShowNotifications(!showNotifications)}>
          <FaBell className="icon" />
          {showNotifications && renderNotifications()}
        </div>
      </div>
      <div className="profile-container">
        <div className="main-content">
          {renderSection()}
        </div>
      </div>
      {selectedProperty && renderPropertyDetails()}
    </div>
  );
};

export default RenterProfile;