import React, { useState } from 'react';
import '../../../stylesheets/Renter/WorkOrderForm.css';
import logo from '../../../assets/images/logo.png'; // Adjust the path to your logo

const VendorRequestForm = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (files.length + selectedFiles.length > 2) {
      setError('You can only upload a maximum of 2 images.');
      return;
    }
    setFiles([...files, ...selectedFiles]);
    setError('');
  };

  const handleRemoveImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (files.length === 0) {
      setError('Please upload at least one image.');
      return;
    }
    console.log("Form submitted with files:", files);
    // Handle form submission logic here
  };

  const handleCancel = () => {
    setFiles([]);
    setError('');
    console.log("Form canceled");
  };

  return (
    <div className="vendor-request-form">
      <img src={logo} alt="Logo" className="logo-image" />
      <h2>Work Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Add Description:</label>
          <textarea id="description" name="description" rows="4" required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file">Problem Image:</label>
          <div className="file-drop-area" onClick={() => document.getElementById('file').click()}>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept=".jpeg,.png,.jpg"
              multiple
              required
              style={{ display: 'none' }}
            />
            <p>Drag & drop images or click to upload (JPEG, PNG, max 2 images)</p>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="image-preview-container">
          {files.map((file, index) => (
            <div key={index} className="image-preview">
              <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="review-image" />
              <button type="button" onClick={() => handleRemoveImage(index)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
          <button type="submit" className="submit-button">Send</button>
        </div>
      </form>
    </div>
  );
};

export default VendorRequestForm;