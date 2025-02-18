import React from 'react';
import '../../stylesheets/Renter/Profile Tab/fileuploadsection.css';

const FileUploadSection = ({ files, error, handleFileChange, handleRemoveImage }) => {
  return (
    <div className="form-group">
      <label htmlFor="file">Problem Image:</label>
      <div className="file-drop-area" onClick={() => document.getElementById('file').click()}>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files))}
          accept=".jpeg,.png,.jpg"
          multiple
          required
          style={{ display: 'none' }}
        />
        <p>Drag & drop images or click to upload (JPEG, PNG, max 2 images)</p>
      </div>
      {error && <p className="error-message">{error}</p>}
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
    </div>
  );
};

export default FileUploadSection;