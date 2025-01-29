import React, { useState, useCallback } from 'react';
import '../stylesheets/Owner/OwnerForm.css';
import logo from '../assets/images/logo.png';

const OwnerForm = () => {
  const [page, setPage] = useState(1);
  const [ownerName, setOwnerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [cnic, setCnic] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [province, setProvince] = useState('');
  const [address, setAddress] = useState('');
  const [expectedRent, setExpectedRent] = useState('');
  const [includedUtilities, setIncludedUtilities] = useState({
    gas: false,
    electricity: false
  });
  const [rooms, setRooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [kitchens, setKitchens] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleBack = () => page > 1 && setPage(prev => prev - 1);

  const handleCNICChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 13) value = value.substr(0, 13);
    let formatted = value.replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3');
    setCnic(formatted.slice(0, 15));
  };

  const handleContactChange = (e) => {
    setContactNumber(e.target.value.replace(/[^0-9+-]/g, ''));
  };

  const handleUtilityChange = (utility) => {
    setIncludedUtilities(prev => ({ ...prev, [utility]: !prev[utility] }));
  };

  const isValidFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024;
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
      .filter(file => isValidFile(file))
      .map(file => ({ file, preview: URL.createObjectURL(file) }));
      
    setFiles(prev => [...prev, ...newFiles]);
    if (newFiles.length < e.target.files.length) {
      setError('Some files were invalid (JPEG, PNG, PDF under 50MB only)');
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files)
      .filter(file => isValidFile(file))
      .map(file => ({ file, preview: URL.createObjectURL(file) }));
      
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = (index) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const ProgressSteps = () => {
    const progressWidth = ((page - 1) * 50) + '%'; 

    return (
      <div className="progress-container">
        <div className="step-numbers">
          <div className={`step ${page >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step ${page >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step ${page >= 3 ? 'active' : ''}`}>3</div>
        </div>
        
        <div className="progress-bar-container">
          <div 
            className="progress-fill" 
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
    );
  };

  const handleNumberChange = (setter) => (e) => {
    const value = Math.max(0, e.target.value);  // Ensure the value is not negative
    setter(value);
  };

  return (
    <div className="owner-form">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <h1 className="form-title">
        {page === 1 ? 'Owner Details' : 
          page === 2 ? 'Property Details' : 'Review Information'}
      </h1>
      {page === 1 && <p className="encouragement-text">Let's get started! Just a few basic details about yourself</p>}
      {page === 2 && <p className="encouragement-text">Almost there! Tell us more about your property</p>}
      {page === 3 && <p className="encouragement-text">One last check! Review your information before submitting</p>}

      <ProgressSteps />

      {page === 1 && (
        <div className="form-page">
          <div className="form-group">
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Owner Name"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              value={contactNumber}
              onChange={handleContactChange}
              placeholder="Contact Number"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              value={cnic}
              onChange={handleCNICChange}
              placeholder="XXXXX-XXXXXXX-X"
              maxLength={15}
            />
          </div>
          
          <div className="form-actions">
            <button className="next-button" onClick={() => setPage(2)}>
              Next
            </button>
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="form-page">
          <div className="form-group">
            <h3>Property Name</h3>
            <input
              type="text"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              placeholder="Property Name"
            />
          </div>

          <div className="form-group">
            <h3>Location</h3>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="province-select"
            >
              <option value="">Select Province</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="KPK">KPK</option>
              <option value="Balochistan">Balochistan</option>
            </select>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Property Address"
            />
          </div>

          <div className="form-group">
            <h3>Rent Details</h3>
            <input
              type="number"
              value={expectedRent}
              onChange={handleNumberChange(setExpectedRent)}
              placeholder="Expected Rent"
            />
            <div className="utilities-group">
              <div className="is-included">Included in rent:</div>
              <div className="checkboxes">
                <label>
                  <input
                    type="checkbox"
                    checked={includedUtilities.gas}
                    onChange={() => handleUtilityChange('gas')}
                  />
                  Gas
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={includedUtilities.electricity}
                    onChange={() => handleUtilityChange('electricity')}
                  />
                  Electricity
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h3>Property Details</h3>
            <div className="number-inputs">
              <input
                type="number"
                value={rooms}
                onChange={handleNumberChange(setRooms)}
                placeholder="Rooms"
              />
              <input
                type="number"
                value={bathrooms}
                onChange={handleNumberChange(setBathrooms)}
                placeholder="Bathrooms"
              />
              <input
                type="number"
                value={kitchens}
                onChange={handleNumberChange(setKitchens)}
                placeholder="Kitchens"
              />
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional Description"
            />
          </div>

          <div className="form-group">
            <h3>Upload Photos</h3>
            <div
              className="file-drop-area"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <p>Drag & drop files or click to upload</p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".jpeg,.jpg,.png,.pdf"
                multiple
              />
            </div>

            <div className="file-previews">
              {files.map((fileObj, index) => (
                <div className="file-preview" key={index}>
                  <button className="remove-file" onClick={() => removeFile(index)}>
                    ×
                  </button>
                  {fileObj.file.type.startsWith('image') ? (
                    <img src={fileObj.preview} alt="Preview" />
                  ) : (
                    <div className="file-icon">📄</div>
                  )}
                  <span>{fileObj.file.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            <button className="next-button" onClick={() => setPage(3)}>
              Next
            </button>
          </div>
        </div>
      )}

      {page === 3 && (
        <div className="form-page">
          <div className="review-section">
            <h3>Owner Details</h3>
            <p>Name: {ownerName}</p>
            <p>Contact: {contactNumber}</p>
            <p>CNIC: {cnic}</p>

            <h3>Property Information</h3>
            <p>Name: {propertyName}</p>
            <p>Location: {province}, {address}</p>
            <p>Expected Rent: {expectedRent}</p>
            <p>Included Utilities: {Object.keys(includedUtilities)
              .filter(k => includedUtilities[k]).join(', ') || 'None'}</p>
            <p>Rooms: {rooms}</p>
            <p>Bathrooms: {bathrooms}</p>
            <p>Kitchens: {kitchens}</p>
            <p>Description: {description || 'None'}</p>

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
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            <button className="submit-button" onClick={() => console.log('Submitted!')}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerForm;
