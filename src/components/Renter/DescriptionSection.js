import React from 'react';
import '../../stylesheets/Renter/Profile Tab/descriptionsection.css';

const DescriptionSection = () => {
  return (
    <div className="form-group">
      <label htmlFor="description">Add Description:</label>
      <textarea id="description" name="description" rows="4" required></textarea>
    </div>
  );
};

export default DescriptionSection;