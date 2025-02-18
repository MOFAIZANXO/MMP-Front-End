// We have 3 components here

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../stylesheets/Renter/WorkOrderForm.css';
import logo from '../../../assets/images/logo.png';
import DescriptionSection from '../../../components/Renter/DescriptionSection';
import FileUploadSection from '../../../components/Renter/FileUploadSection';
import ButtonContainer from '../../../components/Renter/ButtonContainer';

const RepairRequestForm = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (selectedFiles) => {
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
    navigate('/renterprofile', { state: { activeSection: 'properties' } });
  };

  return (
    <div className="vendor-request-form">
      <img src={logo} alt="Logo" className="logo-image" />
      <h2>Work Order Form</h2>
      <form onSubmit={handleSubmit}>
        <DescriptionSection />
        <FileUploadSection
          files={files}
          error={error}
          handleFileChange={handleFileChange}
          handleRemoveImage={handleRemoveImage}
        />
        <ButtonContainer onCancel={handleCancel} />
      </form>
    </div>
  );
};

export default RepairRequestForm;