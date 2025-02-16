import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../stylesheets/PropertyManager/ReviewVendor.css";
import dummyVendorData from "../../../datasets/dummyVendorFormData"; // Replace with your dataset
import logo from "../../../assets/images/logo.png"; // Replace with your logo path

const PmVendorForm = ({ vendorData = dummyVendorData }) => {
  const navigate = useNavigate(); // Hook for navigation

  const {
    fullName,
    contactNumber,
    cnic,
    email,
    dateOfBirth,
    address,
    businessName,
    businessType,
    servicesProvided,
    yearsOfExperience,
    additionalDetails,
    cnicFiles,
    businessLicenseFiles,
  } = vendorData;

  return (
    <div className="PmVendorForm_Container">
      {/* Close Button */}
      <button className="PmVendorForm_CloseButton" onClick={() => navigate(-1)}>
        ❌
      </button>

      {/* Logo */}
      <div className="PmVendorForm_LogoContainer">
        <img src={logo} alt="Company Logo" className="PmVendorForm_Logo" />
      </div>

      <h1>Vendor Application Details</h1>

      <div className="PmVendorForm_Section">
        {/* Vendor Details */}
        <div className="PmVendorForm_Group">
          <h2>Personal Information</h2>
          <p>
            <strong>Full Name:</strong> {fullName}
          </p>
          <p>
            <strong>Contact Number:</strong> {contactNumber}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>CNIC:</strong> {cnic}
          </p>
          <p>
            <strong>Date of Birth:</strong> {dateOfBirth}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
        </div>

        {/* Business Details */}
        <div className="PmVendorForm_Group">
          <h2>Business Information</h2>
          <p>
            <strong>Business Name:</strong> {businessName}
          </p>
          <p>
            <strong>Business Type:</strong> {businessType}
          </p>
          <p>
            <strong>Services Provided:</strong> {servicesProvided}
          </p>
          <p>
            <strong>Years of Experience:</strong> {yearsOfExperience}
          </p>
          <p>
            <strong>Additional Details:</strong>{" "}
            {additionalDetails || "None"}
          </p>
        </div>

        {/* Uploaded CNIC Files */}
        <div className="PmVendorForm_Group">
          <h2>Uploaded CNIC</h2>
          <div className="PmVendorForm_FilePreviews">
            {cnicFiles.map((file, index) => (
              <div key={index} className="PmVendorForm_FilePreview">
                {file.file.type.startsWith("image") ? (
                  <img src={file.preview} alt={`CNIC ${index + 1}`} />
                ) : (
                  <div className="PmVendorForm_FileIcon">📄</div>
                )}
                <span>{file.file.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Business License Files */}
        <div className="PmVendorForm_Group">
          <h2>Uploaded Business License</h2>
          <div className="PmVendorForm_FilePreviews">
            {businessLicenseFiles.map((file, index) => (
              <div key={index} className="PmVendorForm_FilePreview">
                {file.file.type.startsWith("image") ? (
                  <img src={file.preview} alt={`License ${index + 1}`} />
                ) : (
                  <div className="PmVendorForm_FileIcon">📄</div>
                )}
                <span>{file.file.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="PmVendorForm_Actions">
        <button className="PmVendorForm_RejectButton">Reject</button>
        <button className="PmVendorForm_ApproveButton">Approve</button>
        <button
          className="PmVendorForm_ContactButton"
          onClick={() => navigate("/chat")}
        >
          Contact Vendor
        </button>
        <button
          className="PmVendorForm_ReviewButton"
          onClick={() => navigate(`/pm-vendor-form/${vendorData.id}`)}
        >
          Review
        </button>
      </div>
    </div>
  );
};

export default PmVendorForm;
