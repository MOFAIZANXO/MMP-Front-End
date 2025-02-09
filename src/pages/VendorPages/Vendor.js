import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/Vendor/VendorForm.css';
import logo from '../../assets/images/logo.png';
import { FaTools, FaBroom, FaPaintRoller, FaWrench, FaHammer, FaCheckCircle } from 'react-icons/fa';

function Vendor() {
  const navigate = useNavigate();
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [services, setServices] = useState({
    electrician: false,
    cleaner: false,
    painter: false,
    plumber: false,
    carpenter: false, // Added carpenter
  });
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const provinces = [
    { name: 'Punjab', cities: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan'] },
    { name: 'Sindh', cities: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana'] },
    { name: 'Khyber Pakhtunkhwa', cities: ['Peshawar', 'Abbottabad', 'Mardan', 'Swat'] },
    { name: 'Balochistan', cities: ['Quetta', 'Gwadar', 'Turbat', 'Khuzdar'] },
    { name: 'Gilgit-Baltistan', cities: ['Gilgit', 'Skardu', 'Hunza', 'Astore'] },
    { name: 'Azad Kashmir', cities: ['Muzaffarabad', 'Mirpur', 'Kotli', 'Rawalakot'] },
  ];

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setProvince(selectedProvince);
    const selectedProvinceData = provinces.find((p) => p.name === selectedProvince);
    setCities(selectedProvinceData ? selectedProvinceData.cities : []);
    setCity('');
  };

  const handleServiceChange = (service) => {
    setServices((prev) => ({ ...prev, [service]: !prev[service] }));
  };

  const handleCnicFrontChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCnicFront(file);
    }
  };

  const handleCnicBackChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCnicBack(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!province) newErrors.province = 'Province is required';
    if (!city) newErrors.city = 'City is required';
    if (!cnicFront) newErrors.cnicFront = 'CNIC Front is required';
    if (!cnicBack) newErrors.cnicBack = 'CNIC Back is required';
    if (Object.values(services).every((val) => !val)) {
      newErrors.services = 'At least one service must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitted(true);
  };

  const handleBack = () => navigate('/');
  const handleSuccessContinue = () => navigate('/');

  return (
    <div className="vendor-portal">
      {!isSubmitted ? (
        <>
          <div className="header-center">
            <img src={logo} alt="Logo" className="logo-image" />
            <h2>Welcome Vendor!</h2>
            <p>Before we begin, help us know about you & your work.</p>
          </div>

          <form className="vendor-form" onSubmit={handleSubmit}>
            {/* Vendor Name */}
            <div className="form-group">
              <label htmlFor="vendorName">Vendor Name</label>
              <input type="text" id="vendorName" name="vendorName" required />
            </div>

            {/* Province */}
            <div className="form-group">
              <label htmlFor="province">Province</label>
              <select
                id="province"
                name="province"
                value={province}
                onChange={handleProvinceChange}
                required
              >
                <option value="">Select Province</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
              {errors.province && <p className="error-message">{errors.province}</p>}
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city">City</label>
              <select
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>

            {/* Services */}
            <div className="form-group">
              <label>Services</label>
              <div className="services-horizontal">
                {Object.entries(services).map(([service, checked]) => (
                  <label
                    key={service}
                    className={`service-item ${checked ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleServiceChange(service)}
                    />
                    {service === 'electrician' && <FaTools className="service-icon" />}
                    {service === 'cleaner' && <FaBroom className="service-icon" />}
                    {service === 'painter' && <FaPaintRoller className="service-icon" />}
                    {service === 'plumber' && <FaWrench className="service-icon" />}
                    {service === 'carpenter' && <FaHammer className="service-icon" />} {/* Added carpenter icon */}
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </label>
                ))}
              </div>
              {errors.services && <p className="error-message">{errors.services}</p>}
            </div>

            {/* CNIC Upload */}
            <div className="form-group">
              <label>Upload CNIC:</label>
              <div className="file-upload-group">
                <div className="file-upload">
                  <label>FRONT</label>
                  <div
                    className="file-drop-area"
                    onClick={() => document.getElementById('cnicFront').click()}
                  >
                    <input
                      type="file"
                      id="cnicFront"
                      onChange={handleCnicFrontChange}
                      accept=".jpeg,.png,.jpg"
                      required
                      hidden
                    />
                    <p>Drag & drop or click to upload (JPEG, PNG, max 50MB)</p>
                  </div>
                  {cnicFront && (
                    <div className="file-preview">
                      <img
                        src={URL.createObjectURL(cnicFront)}
                        alt="CNIC Front Preview"
                        className="preview-image"
                      />
                      <p>{cnicFront.name}</p>
                    </div>
                  )}
                  {errors.cnicFront && <p className="error-message">{errors.cnicFront}</p>}
                </div>

                <div className="file-upload">
                  <label>BACK</label>
                  <div
                    className="file-drop-area"
                    onClick={() => document.getElementById('cnicBack').click()}
                  >
                    <input
                      type="file"
                      id="cnicBack"
                      onChange={handleCnicBackChange}
                      accept=".jpeg,.png,.jpg"
                      required
                      hidden
                    />
                    <p>Drag & drop or click to upload (JPEG, PNG, max 50MB)</p>
                  </div>
                  {cnicBack && (
                    <div className="file-preview">
                      <img
                        src={URL.createObjectURL(cnicBack)}
                        alt="CNIC Back Preview"
                        className="preview-image"
                      />
                      <p>{cnicBack.name}</p>
                    </div>
                  )}
                  {errors.cnicBack && <p className="error-message">{errors.cnicBack}</p>}
                </div>
              </div>
            </div>

            {/* Description (Optional) */}
            <div className="form-group">
              <label htmlFor="description">Add Description (optional)</label>
              <textarea id="description" name="description"></textarea>
            </div>

            {/* Buttons */}
            <div className="form-group button-group">
              <button type="button" className="back-button" onClick={handleBack}>
                BACK
              </button>
              <button type="submit" className="confirm-button">
                Confirm
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="success-screen">
          <FaCheckCircle className="success-icon" />
          <h2>CONGRATULATIONS!!!</h2>
          <p>We welcome you on joining MMP!</p>
          <p>You will now receive work orders from now on.</p>

          <div className="success-footer">
            <button className="success-button" onClick={handleSuccessContinue}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vendor;