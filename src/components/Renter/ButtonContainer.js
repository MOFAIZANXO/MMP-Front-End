import React from 'react';
import '../../stylesheets/Renter/Profile Tab/buttoncontainer.css';

const ButtonContainer = ({ onCancel }) => {
  return (
    <div className="button-container">
      <button type="button" onClick={onCancel} className="cancelButton">Cancel</button>
      <button type="submit" className="submitButton">Send</button>
    </div>
  );
};

export default ButtonContainer;