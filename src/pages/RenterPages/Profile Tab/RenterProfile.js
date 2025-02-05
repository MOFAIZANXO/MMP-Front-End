import React, { useState } from 'react';
import RenterNavbar from "../../../components/Renter/RenterNavbar";
import "../../../stylesheets/Renter/Profile Tab/renterprofile.css";
import { FaBell, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import rentRequests from "../../../datasets/rentrequests"; // Import rentRequests

const RenterProfile = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="section">
            <h2>Personal Information</h2>
            <div className="personal-info">
              <div className="input-group">
                <label>Full Name</label>
                <div className="detail-value">John Doe</div>
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <div className="detail-value">john@example.com</div>
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <div className="detail-value">+1234567890</div>
              </div>
            </div>
            <div className="logout-container">
              <button className="logout-button">
                <FaSignOutAlt className="icon" /> Logout
              </button>
            </div>
          </div>
        );

      case 'properties':
        return (
          <div className="section">
            <h2>My Properties</h2>
            <div className="properties-list">
              {/* Example of a rented property */}
              <div className="property-card">
                <h3>Bahria Apartments</h3>
                <div className="property-details">
                  <span className="status rented">Rented</span>
                  <div className="rent-rate">60k/month</div>
                  <div className="address">Islamabad, Main Boulevard Bahria Town</div>
                  <div className="property-area">Area: 1200 sqft</div>
                </div>
              </div>
              {/* Example of a pending property */}
              <div className="property-card">
                <h3>Rayan Resort</h3>
                <div className="property-details">
                  <span className="status pending">Pending</span>
                  <div className="rent-rate">90k/month</div>
                  <div className="address">Islamabad, Near Faisal Mosque</div>
                  <div className="property-area">Area: 2500 sqft</div>
                </div>
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
              <button className="pay-rent-button">Pay Rent</button>
            </div>
          </div>
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
    </div>
  );
};

export default RenterProfile;