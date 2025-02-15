import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../stylesheets/Owner/ownerpropertydetail.css';

const OwnerPropertyDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Check if the property object is undefined
  if (!state?.property) {
    return (
      <div className="owner-property-detail">
        <h1>Property Not Found</h1>
        <p>The property details could not be loaded. Please try again.</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back to Properties
        </button>
      </div>
    );
  }

  const { property } = state;

  return (
    <div className="owner-property-detail">
      <h1>Property Details</h1>
      <div className="property-info">
        <h2>{property.name}</h2>
        <p><strong>Address:</strong> {property.address}</p>
        <p><strong>Rent:</strong> Rs. {property.rent} per month</p>
        <p><strong>Bedrooms:</strong> {property.roomDetail.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.roomDetail.bathrooms}</p>
        <p><strong>Kitchens:</strong> {property.roomDetail.kitchens}</p>
        <p><strong>Included in Rent:</strong> {property.included ? property.included.join(', ') : 'None'}</p>
        <p><strong>Description:</strong> {property.propertyNeighborhood}</p>
      </div>

      <div className="rentee-info">
        <h2>Rentee Details</h2>
        <p><strong>Name:</strong> {property.rentee.name}</p>
        <p><strong>Contact:</strong> {property.rentee.contact}</p>
        <p><strong>CNIC Front:</strong> <img src={property.rentee.cnicFront} alt="CNIC Front" /></p>
        <p><strong>CNIC Back:</strong> <img src={property.rentee.cnicBack} alt="CNIC Back" /></p>
      </div>

      <div className="rent-info">
        <h2>Rent Information</h2>
        <p><strong>Rent Due Date:</strong> {property.rentDueDate}</p>
        <p><strong>Payment Status:</strong> {property.rentPaid ? 'Paid' : 'Pending'}</p>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>Back to Properties</button>
    </div>
  );
};

export default OwnerPropertyDetail;