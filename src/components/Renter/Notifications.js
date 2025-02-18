import React from 'react';
import { FaTimes } from 'react-icons/fa';
import rentRequests from '../../datasets/rentrequests';
import '../../stylesheets/Renter/Profile Tab/notifications.css';

const Notifications = ({ onClose }) => {
  return (
    <div className="notifications-popup">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <FaTimes className="close-icon" onClick={onClose} />
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
                  <p><strong>Type:</strong> {request.type === 'rent' ? 'Rent Request' : 'Repair Request'}</p>
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

export default Notifications;