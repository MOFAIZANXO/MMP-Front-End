import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../../../stylesheets/PropertyManager/ReviewProperty.css";
import dummyPropertyData from "../../../datasets/dummyPropertyData"; // Import dummy data
import logo from "../../../assets/images/logo.png"; // Import logo

const ReviewProperty = ({ propertyData = dummyPropertyData }) => {
  const navigate = useNavigate(); // Hook for navigation

  const {
    ownerName,
    contactNumber,
    cnic,
    propertyName,
    province,
    address,
    expectedRent,
    includedUtilities,
    rooms,
    bathrooms,
    kitchens,
    description,
    files,
  } = propertyData;

  return (
    <div className="PM_review-property">
      {/* Close Button */}
      <button className="PM_close-button" onClick={() => navigate(-1)}>❌</button>

      {/* Logo */}
      <div className="PM_logo-container">
        <img src={logo} alt="Company Logo" className="PM_logo" />
      </div>

      <h1>Review Listing Property Request</h1>

      <div className="PM_review-section">
        {/* Owner Details */}
        <div className="PM_review-group">
          <h2>Owner Details</h2>
          <p><strong>Name:</strong> {ownerName}</p>
          <p><strong>Contact Number:</strong> {contactNumber}</p>
          <p><strong>CNIC:</strong> {cnic}</p>
        </div>

        {/* Property Details */}
        <div className="PM_review-group">
          <h2>Property Details</h2>
          <p><strong>Property Name:</strong> {propertyName}</p>
          <p><strong>Location:</strong> {province}, {address}</p>
          <p><strong>Expected Rent:</strong> {expectedRent}</p>
          <p>
            <strong>Included Utilities:</strong>{" "}
            {Object.keys(includedUtilities)
              .filter((key) => includedUtilities[key])
              .join(", ") || "None"}
          </p>
          <p><strong>Rooms:</strong> {rooms}</p>
          <p><strong>Bathrooms:</strong> {bathrooms}</p>
          <p><strong>Kitchens:</strong> {kitchens}</p>
          <p><strong>Description:</strong> {description || "None"}</p>
        </div>

        {/* Uploaded Files */}
        <div className="PM_review-group">
          <h2>Uploaded Files</h2>
          <div className="PM_file-previews">
            {files.map((file, index) => (
              <div key={index} className="PM_file-preview">
                {file.file.type.startsWith("image") ? (
                  <img src={file.preview} alt={`Preview ${index + 1}`} />
                ) : (
                  <div className="PM_file-icon">📄</div>
                )}
                <span>{file.file.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="PM_review-actions">
        <button className="PM_reject-button">Reject</button>
        <button className="PM_approve-button">Approve</button>
        <button className="PM_contact-button" onClick={() => navigate("/chat")}>Contact Owner</button> {/* New Button */}
      </div>
    </div>
  );
};

export default ReviewProperty;
