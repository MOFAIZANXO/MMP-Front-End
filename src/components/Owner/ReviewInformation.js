import React from 'react';
import '../../stylesheets/Owner/reviewinformation.css';

const ReviewInformation = ({
  ownerName,
  contactNumber,
  cnic,
  propertyName,
  address,
  city,
  province,
  expectedRent,
  includedUtilities,
  rooms,
  bathrooms,
  kitchens,
  propertyNeighborhood,
  files,
  handleBack,
  handleSubmit,
}) => {
  return (
    <div className="form-page">
      <div className="review-section">
        <h3>Owner Details</h3>
        <p>Name: {ownerName}</p>
        <p>Contact: {contactNumber}</p>
        <p>CNIC: {cnic}</p>
        <h3>Property Information</h3>
        <p>Name: {propertyName}</p>
        <p>Location: {address}, {city}, {province}</p>
        <p>Expected Rent: {expectedRent}</p>
        <p>Included Utilities: {Object.keys(includedUtilities)
          .filter((k) => includedUtilities[k])
          .join(', ') || 'None'}</p>
        <p>Rooms: {rooms}</p>
        <p>Bathrooms: {bathrooms}</p>
        <p>Kitchens: {kitchens}</p>
        <p>Description: {propertyNeighborhood}</p>
        <h3>Attachments ({files.length})</h3>
        <div className="file-list">
          {files.map((fileObj, index) => (
            <div key={index} className="file-item">
              📄 {fileObj.file.name}
            </div>
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button className="BackButton" onClick={handleBack}>
          Back
        </button>
        <button className="SubmitButton" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewInformation;