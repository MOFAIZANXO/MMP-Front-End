import "../../../stylesheets/PropertyManager/ReviewVendor.css";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVendorContext } from "../../../context/VendorContext";
import logo from "../../../assets/images/logo.png";

const PmVendorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { vendorApplications, currentVendors, approveVendor, rejectVendor } = useVendorContext();

  // Find the vendor in applications or current vendors
  const vendorData = [...vendorApplications, ...currentVendors].find(
    (vendor) => vendor.id === parseInt(id)
  );

  // Handle approval
  const handleApprove = () => {
    approveVendor(parseInt(id));
    navigate("/pm-vendors");
  };

  // Handle rejection
  const handleReject = () => {
    rejectVendor(parseInt(id));
    navigate("/pm-vendors");
  };

  if (!vendorData) {
    return <p>Vendor not found.</p>;
  }

  const { name, province, city, services, cnicFront, cnicBack, description, status } = vendorData;

  return (
    <div className="PmVendorForm_Container">
      <button className="PmVendorForm_CloseButton" onClick={() => navigate(-1)}>❌</button>
      
      <div className="PmVendorForm_LogoContainer">
        <img src={logo} alt="Company Logo" className="PmVendorForm_Logo" />
      </div>

      <h1>Vendor Application Details</h1>

      <div className="PmVendorForm_Section">
        <div className="PmVendorForm_Group">
          <h2>Personal Information</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Province:</strong> {province}</p>
          <p><strong>City:</strong> {city}</p>
        </div>

        <div className="PmVendorForm_Group">
          <h2>Services</h2>
          <p><strong>Services:</strong> {services.join(", ")}</p>
        </div>

        <div className="PmVendorForm_Group">
          <h2>CNIC</h2>
          <div className="PmVendorForm_CNICImages">
            <img src={cnicFront} alt="CNIC Front" className="PmVendorForm_CNICImage" />
            <img src={cnicBack} alt="CNIC Back" className="PmVendorForm_CNICImage" />
          </div>
        </div>

        <div className="PmVendorForm_Group">
          <h2>Description</h2>
          <p>{description}</p>
        </div>

        <div className="PmVendorForm_Group">
          <h2>Status</h2>
          <p><strong>Status:</strong> {status}</p>
        </div>
      </div>

      <div className="PmVendorForm_Actions">
        <button className="PmVendorForm_RejectButton" onClick={handleReject}>Reject</button>
        <button className="PmVendorForm_ApproveButton" onClick={handleApprove}>Approve</button>
        <button className="PmVendorForm_ContactButton" onClick={() => navigate("/chat")}>
          Contact Vendor
        </button>
      </div>
    </div>
  );
};

export default PmVendorForm;