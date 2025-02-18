import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentProperties, previouslyRentedProperties } from '../../datasets/rentedproperties';
import '../../stylesheets/Renter/Profile Tab/propertiessection.css';

const PropertiesSection = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="section">
      <h2>My Properties</h2>
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
                <div className="address">{property.address}</div>
                <div className="propertyOwner">Owner: {property.owner}</div>
              </div>
              <div className="property-buttons">
                <button className="payRent-button" onClick={() => navigate('/rentpayment')}>
                  Pay Rent
                </button>
                <button className="home-service-button" onClick={() => navigate('/repairform')}>
                  Home Service Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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
      {selectedProperty && (
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
      )}
    </div>
  );
};

export default PropertiesSection;