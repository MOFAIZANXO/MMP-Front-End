import React from 'react';
import '../../stylesheets/Owner/progresssteps.css';

const ProgressSteps = ({ page }) => {
  const progressWidth = ((page - 1) * 50) + '%';
  return (
    <div className="progressContainer">
      <div className="step-numbers">
        <div className={`step ${page >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${page >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${page >= 3 ? 'active' : ''}`}>3</div>
      </div>
      <div className="progressBar-container">
        <div className="progressFill" style={{ width: progressWidth }}></div>
      </div>
    </div>
  );
};

export default ProgressSteps;