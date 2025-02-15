// BACKEND WAALAY: READ COMMENTS AT THE END

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../../datasets/ownerproperties';
import { FaCheckCircle } from 'react-icons/fa';
import '../../stylesheets/Owner/OwnerForm.css';
import logo from '../../assets/images/logo.png';

const OwnerForm = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [ownerName, setOwnerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [cnic, setCnic] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [province, setProvince] = useState('');
  const [address, setAddress] = useState('');
  const [expectedRent, setExpectedRent] = useState('');
  const [includedUtilities, setIncludedUtilities] = useState({
    electricityBill: false,
    gasBill: false,
    waterSupply: false
  });
  const [rooms, setRooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [kitchens, setKitchens] = useState('');
  const [propertyNeighborhood, setPropertyNeighborhood] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({
    ownerName: false,
    contactNumber: false,
    cnic: false,
    propertyName: false,
    province: false,
    address: false,
    expectedRent: false,
    rooms: false,
    bathrooms: false,
    kitchens: false,
    propertyNeighborhood: false,
    files: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBack = () => page > 1 && setPage(prev => prev - 1);

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
      .map(file => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = () => resolve({ file, preview: reader.result });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
  
    Promise.all(newFiles).then(results => {
      setFiles(prev => [...prev, ...results]);
      setTouched({ ...touched, files: true });
    });
  
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
    setTouched({ ...touched, files: true });
  }, []);

  const removeFile = (index) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const ProgressSteps = () => {
    const progressWidth = ((page - 1) * 50) + '%';
    return (
      <div className="progressContainer">
        <div className="step-numbers">
          <div className={`step ${page >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step ${page >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step ${page >= 3 ? 'active' : ''}`}>3</div>
        </div>
        <div className="progressBar-container">
          <div
            className="progressFill"
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
    );
  };

  const handleNumberChange = (setter) => (e) => {
    const value = e.target.value.trim();
    if (value === '') {
      setter('');
    } else {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue >= 0) {
        setter(numericValue);
      }
    }
    setTouched({ ...touched, [setter.name]: true });
  };

  const cleanAddress = (address) => {
    return address.trim().replace(/[^\w\s]/g, '');
  };

  const handleAddressChange = (e) => {
    const cleanedAddress = cleanAddress(e.target.value);
    setAddress(cleanedAddress);
    setTouched({ ...touched, address: true });
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
      case 'propertyName':
        return propertyName.trim() === '' ? 'Property Name is required' : null;
      case 'province':
        return province === '' ? 'Province is required' : null;
      case 'address':
        return address.trim() === '' ? 'Address is required' : null;
      case 'expectedRent':
        return expectedRent === '' ? 'Expected Rent is required' : null;
      case 'rooms':
        return rooms === '' ? 'Rooms is required' : null;
      case 'bathrooms':
        return bathrooms === '' ? 'Bathrooms is required' : null;
      case 'kitchens':
        return kitchens === '' ? 'Kitchens is required' : null;
      case 'propertyNeighborhood':
        return propertyNeighborhood.trim() === '' ? 'Description is required' : null;
      case 'files':
        return files.length === 0 ? 'At least one file is required' : null;
      default:
        return null;
    }
  };

  const isPage1Valid = () => {
    return (
      ownerName.trim() !== '' &&
      contactNumber.length >= 10 &&
      cnic.length === 15
    );
  };

  const isPage2Valid = () => {
    return (
      propertyName.trim() !== '' &&
      province !== '' &&
      address.trim() !== '' &&
      expectedRent !== '' &&
      rooms !== '' &&
      bathrooms !== '' &&
      kitchens !== '' &&
      propertyNeighborhood.trim() !== '' &&
      files.length > 0
    );
  };

  const handleSubmit = () => {
    if (!isPage1Valid() || !isPage2Valid()) {
      alert("Please complete all steps correctly.");
      return;
    }
  
    const fullAddress = `${cleanAddress(address)}, ${province}`;
  
    const includedUtilitiesArray = Object.keys(includedUtilities)
      .filter(key => includedUtilities[key])
      .map(key => {
        switch (key) {
          case 'electricityBill':
            return 'Electricity bill';
          case 'gasBill':
            return 'Gas bill';
          case 'waterSupply':
            return 'Water supply bill';
          default:
            return '';
        }
      });
  
    const newProperty = {
      name: propertyName,
      ownerName: ownerName,
      ownerPhone: contactNumber,
      CNIC: cnic,
      status: 'Vacant',
      rent: expectedRent,
      address: fullAddress,
      roomDetail: {
        bedrooms: rooms,
        bathrooms: bathrooms,
        kitchens: kitchens,
      },
      included: includedUtilitiesArray, 
      excluded: Object.keys(includedUtilities)
        .filter(key => !includedUtilities[key])
        .map(key => {
          switch (key) {
            case 'electricityBill':
              return 'Electricity Bill';
            case 'gasBill':
              return 'Gas Bill';
            case 'waterSupply':
              return 'Water Supply';
            default:
              return '';
          }
        }),
      propertyNeighborhood: propertyNeighborhood,
      images: files.map(fileObj => fileObj.preview),
    };
  
    addProperty(newProperty);
    console.log("Form submitted with data:", newProperty);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="SuccessScreen">
        <FaCheckCircle className="successIcon" />
        <h2>Your property has been submitted successfully!</h2>
        <p>Thanks for listing your property with us!</p>
        <button onClick={() => navigate("/ownerprofile")}>Continue</button>
      </div>
    );
  }

  return (
    <div className="owner-form">
      <div className="logoDiv">
        <header className="Head">
          <img src={logo} alt="Logo" className="headLogo" />
        </header>
      </div>
      
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
      )}

      {page === 2 && (
        <div className="form-page">
          <div className={`FormGroup ${getFieldError('propertyName') ? 'error' : ''}`}>
            <h3>Property Name</h3>
            <input
              type="text"
              value={propertyName}
              onChange={(e) => {
                setPropertyName(e.target.value);
                setTouched({ ...touched, propertyName: true });
              }}
              placeholder="Property Name"
            />
            {getFieldError('propertyName') && <div className="error-message">{getFieldError('propertyName')}</div>}
          </div>

          <div className={`FormGroup ${getFieldError('province') ? 'error' : ''}`}>
            <h3>Location</h3>
            <select
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                setTouched({ ...touched, province: true });
              }}
              className="province-select"
            >
              <option value="">Select Province</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="KPK">KPK</option>
              <option value="Balochistan">Balochistan</option>
            </select>
            {getFieldError('province') && <div className="error-message">{getFieldError('province')}</div>}
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setTouched({ ...touched, address: true });
              }}
              placeholder="Property Address"
            />
            {getFieldError('address') && <div className="error-message">{getFieldError('address')}</div>}
          </div>

          <div className={`FormGroup ${getFieldError('expectedRent') ? 'error' : ''}`}>
            <h3>Rent Details</h3>
            <input
              type="number"
              value={expectedRent}
              onChange={handleNumberChange(setExpectedRent)}
              placeholder="Expected Rent"
            />
            {getFieldError('expectedRent') && <div className="error-message">{getFieldError('expectedRent')}</div>}
            <div className="utilities-group">
              <div className="is-included">Included in rent:</div>
              <div className="checkboxes">
                <label className="electricity">
                  <input
                    type="checkbox"
                    checked={includedUtilities.electricityBill}
                    onChange={() => handleUtilityChange('electricityBill')}
                  />
                  Electricity Bill
                </label>
                <label className="gas">
                  <input
                    type="checkbox"
                    checked={includedUtilities.gasBill}
                    onChange={() => handleUtilityChange('gasBill')}
                  />
                  Gas Bill
                </label>
                <label classNamr="water">
                  <input
                    type="checkbox"
                    checked={includedUtilities.waterSupply}
                    onChange={() => handleUtilityChange('waterSupply')}
                  />
                  Water Supply
                </label>
              </div>
            </div>
          </div>

          <div className="FormGroup">
            <h3>Property Details</h3>
            <div className="number-inputs">
              <input
                type="number"
                value={rooms}
                onChange={handleNumberChange(setRooms)}
                placeholder="Rooms"
              />
              {getFieldError('rooms') && <div className="error-message">{getFieldError('rooms')}</div>}
              <input
                type="number"
                value={bathrooms}
                onChange={handleNumberChange(setBathrooms)}
                placeholder="Bathrooms"
              />
              {getFieldError('bathrooms') && <div className="error-message">{getFieldError('bathrooms')}</div>}
              <input
                type="number"
                value={kitchens}
                onChange={handleNumberChange(setKitchens)}
                placeholder="Kitchens"
              />
              {getFieldError('kitchens') && <div className="error-message">{getFieldError('kitchens')}</div>}
            </div>
            <textarea
              value={propertyNeighborhood}
              onChange={(e) => {
                setPropertyNeighborhood(e.target.value);
                setTouched({ ...touched, propertyNeighborhood: true });
              }}
              placeholder="Additional Description"
            />
            {getFieldError('propertyNeighborhood') && <div className="error-message">{getFieldError('propertyNeighborhood')}</div>}
          </div>

          <div className={`FormGroup ${getFieldError('files') ? 'error' : ''}`}>
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
            {getFieldError('files') && <div className="error-message">{getFieldError('files')}</div>}
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
            <button className="BackButton" onClick={handleBack}>
              Back
            </button>
            <button className="NextButton" onClick={() => setPage(3)} disabled={!isPage2Valid()}>
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
      )}
    </div>
  );
};

export default OwnerForm;

/* 
    The properties entered idher are being saved in ownerproperties.js
    The picture files of the property are being saved in local storage from ownerproperties.js file
    jahan say wo fetch and display ho rahi hain in the owner's profile
    Inko backend mein isi format mein save kerna hai jis format mein wo enter ki jaa rahi hain
    Make sure to clear local storage before creating functions waghaira for saving data
    To clear local storage: 1. Go to the browser jahan yay site run ho rahi hai (Chrome)
                            2. Ctrl + Shift + J
                            3. Go to debug console
                            4. Enter command "localStorage.clear();"
*/