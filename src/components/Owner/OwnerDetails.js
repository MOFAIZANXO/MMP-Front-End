import React from 'react';
import '../../stylesheets/Owner/ownerdetails.css';

const OwnerDetails = ({
  ownerName,
  setOwnerName,
  contactNumber,
  setContactNumber,
  cnic,
  setCnic,
  touched,
  setTouched,
  isPage1Valid,
  setPage,
}) => {
  const handleCNICChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 13) value = value.substr(0, 13);
    let formatted = value.replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3');
    setCnic(formatted.slice(0, 15));
    setTouched({ ...touched, cnic: true });
  };

  const handleContactChange = (e) => {
    setContactNumber(e.target.value.replace(/[^0-9+-]/g, ''));
    setTouched({ ...touched, contactNumber: true });
  };

  const getFieldError = (field) => {
    if (!touched[field]) return null;
    switch (field) {
      case 'ownerName':
        return ownerName.trim() === '' ? 'Owner Name is required' : null;
      case 'contactNumber':
        return contactNumber.length < 10 ? 'Contact must be at least 10 digits' : null;
      case 'cnic':
        return cnic.length < 15 ? 'CNIC is required' : null;
      default:
        return null;
    }
  };

  return (
    <div className="form-page">
      <div className={`FormGroup ${getFieldError('ownerName') ? 'error' : ''}`}>
        <input
          type="text"
          value={ownerName}
          onChange={(e) => {
            setOwnerName(e.target.value);
            setTouched({ ...touched, ownerName: true });
          }}
          placeholder="Owner Name"
        />
        {getFieldError('ownerName') && <div className="error-message">{getFieldError('ownerName')}</div>}
      </div>

      <div className={`FormGroup ${getFieldError('contactNumber') ? 'error' : ''}`}>
        <input
          type="text"
          value={contactNumber}
          onChange={handleContactChange}
          placeholder="Contact Number"
        />
        {getFieldError('contactNumber') && <div className="error-message">{getFieldError('contactNumber')}</div>}
      </div>

      <div className={`FormGroup ${getFieldError('cnic') ? 'error' : ''}`}>
        <input
          type="text"
          value={cnic}
          onChange={handleCNICChange}
          placeholder="XXXXX-XXXXXXX-X"
          maxLength={15}
        />
        {getFieldError('cnic') && <div className="error-message">{getFieldError('cnic')}</div>}
      </div>

      <div className="form-actions">
        <button className="NextButton" onClick={() => setPage(2)} disabled={!isPage1Valid()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default OwnerDetails;