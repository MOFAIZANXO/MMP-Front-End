import React from 'react';
import '../../stylesheets/Owner/OwnerProfile.css';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmationPopupOverlay">
      <div className="confirmationPopup">
        <p>{message}</p>
        <div className="confirmationButtons">
          <button onClick={onCancel} className="cancel-btn">Cancel</button>
          <button onClick={onConfirm} className="confirm-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;