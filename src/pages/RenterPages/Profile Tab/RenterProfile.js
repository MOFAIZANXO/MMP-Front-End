// We have 4 components

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; 
import RenterNavbar from '../../../components/Renter/RenterNavbar';
import PersonalInfo from '../../../components/Renter/PersonalInfo';
import PropertiesSection from '../../../components/Renter/PropertiesSection';
import Notifications from '../../../components/Renter/Notifications'; 
import '../../../stylesheets/Renter/Profile Tab/renterprofile.css';

const RenterProfile = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('personal');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);

  return (
    <div className="renter-profile">
      <RenterNavbar />
      <div className="profile-head">
        <div className="menu-options">
          <div
            className={`menuItem ${activeSection === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveSection('personal')}
          >
            Personal
          </div>
          <div
            className={`menuItem ${activeSection === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveSection('properties')}
          >
            Properties
          </div>
        </div>
        <div className="notifications-icon" onClick={() => setShowNotifications(!showNotifications)}>
          <FaBell className="icon" />
          {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
        </div>
      </div>
      <div className="profile-container">
        <div className="main-content">
          {activeSection === 'personal' ? <PersonalInfo /> : <PropertiesSection />}
        </div>
      </div>
    </div>
  );
};

export default RenterProfile;