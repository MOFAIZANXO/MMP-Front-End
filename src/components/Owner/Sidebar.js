import React from 'react';
import logo from "../../assets/images/logo.png";
import '../../stylesheets/Owner/sidebar.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="sidebar">
      <div className="profile-menu-logo">
        <img className="menu-logo" src={logo} alt="" />
      </div>

      <div
        className={`menu-item ${activeSection === 'profile' ? 'active' : ''}`}
        onClick={() => setActiveSection('profile')}
      >
        Dashboard
      </div>
      <div
        className={`menu-item ${activeSection === 'agents' ? 'active' : ''}`}
        onClick={() => setActiveSection('agents')}
      >
        Agent Network
      </div>
      <div
        className={`menu-item ${activeSection === 'personal' ? 'active' : ''}`}
        onClick={() => setActiveSection('personal')}
      >
        Personal Info
      </div>
      <div
        className={`menu-item ${activeSection === 'properties' ? 'active' : ''}`}
        onClick={() => setActiveSection('properties')}
      >
        My Properties
      </div>
    </div>
  );
};

export default Sidebar;