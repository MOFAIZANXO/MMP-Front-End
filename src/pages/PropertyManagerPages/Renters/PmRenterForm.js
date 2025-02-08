import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../../../stylesheets/PropertyManager/ReviewRenter.css"; // CSS file
import dummyRenterData from "../../../datasets/dummyRenterFormData"; // Import dummy renter data
import logo from "../../../assets/images/logo.png"; // Import logo

const PmRenterForm = ({ renterData = dummyRenterData }) => {
  const navigate = useNavigate(); // Hook for navigation

  const {
    fullName,
    contactNumber,
    cnic,
    email,
    dateOfBirth,
    address,
    employmentStatus,
    monthlyIncome,
    familyMembers,
    additionalDetails,
    cnicFiles,
  } = renterData;

  return (
    <div className="PmRenterForm_Container">
      {/* Close Button */}
      <button className="PmRenterForm_CloseButton" onClick={() => navigate(-1)}>❌</button>



      {/* Logo */}
      <div className="PmRenterForm_LogoContainer">
        <img src={logo} alt="Company Logo" className="PmRenterForm_Logo" />
      </div>

      <h1>Renter Application Details</h1>

      <div className="PmRenterForm_Section">
        {/* Renter Details */}
        <div className="PmRenterForm_Group">
          <h2>Personal Information</h2>
          <p><strong>Full Name:</strong> {fullName}</p>
          <p><strong>Contact Number:</strong> {contactNumber}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>CNIC:</strong> {cnic}</p>
          <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
          <p><strong>Address:</strong> {address}</p>
        </div>

        {/* Employment & Financial Details */}
        <div className="PmRenterForm_Group">
          <h2>Employment & Financial Details</h2>
          <p><strong>Employment Status:</strong> {employmentStatus}</p>
          <p><strong>Monthly Income:</strong> {monthlyIncome}</p>
          <p><strong>Family Members:</strong> {familyMembers}</p>
          <p><strong>Additional Details:</strong> {additionalDetails || "None"}</p>
        </div>

        {/* Uploaded CNIC Files */}
        <div className="PmRenterForm_Group">
          <h2>Uploaded CNIC</h2>
          <div className="PmRenterForm_FilePreviews">
            {cnicFiles.map((file, index) => (
              <div key={index} className="PmRenterForm_FilePreview">
                {file.file.type.startsWith("image") ? (
                  <img src={file.preview} alt={`CNIC ${index + 1}`} />
                ) : (
                  <div className="PmRenterForm_FileIcon">📄</div>
                )}
                <span>{file.file.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="PmRenterForm_Actions">
        <button className="PmRenterForm_RejectButton">Reject</button>
        <button className="PmRenterForm_ApproveButton">Approve</button>
        <button className="PmRenterForm_ContactButton" onClick={() => navigate("/chat")}>Contact Renter</button>
      </div>
    </div>
  );
};

export default PmRenterForm;
