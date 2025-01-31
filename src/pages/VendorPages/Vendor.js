import React from 'react';
import '../../stylesheets/Vendor/VendorForm.css';
function Vendor() {
  return (
    <div className="vendor-portal">
      <h2>Vendor Portal</h2>
      <p>Welcome to the Vendor Portal. Manage your services and interactions with properties.</p>
      <form className="vendor-form">
        <div className="form-group">
          <label htmlFor="websiteName">Website Name</label>
          <input type="text" id="websiteName" name="websiteName" />
        </div>
        <div className="form-group">
          <label htmlFor="propertyProvince">Property Province</label>
          <input type="text" id="propertyProvince" name="propertyProvince" />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" />
        </div>
        <div className="form-group">
          <label>Services</label>
          <div className="services">
            <label><input type="checkbox" name="electrician" /> Electrician</label>
            <label><input type="checkbox" name="cleaner" /> Cleaner</label>
            <label><input type="checkbox" name="painter" /> Painter</label>
            <label><input type="checkbox" name="plumber" /> Plumber</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Add Description</label>
          <textarea id="description" name="description"></textarea>
        </div>
        <div className="form-group">
          <label>License</label>
          <div className="license">
            <label><input type="radio" name="license" value="5MB" /> JSC, TRC, SCA and WF license, use 5MB</label>
            <label><input type="radio" name="license" value="50M" /> JSC, TRC, SCA and WF license, use 50M</label>
          </div>
        </div>
        <div className="form-group">
          <button type="button" className="back-button">BACK</button>
          <button type="submit" className="confirm-button">Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default Vendor;