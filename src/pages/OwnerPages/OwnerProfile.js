import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../../stylesheets/Owner/OwnerProfile.css';
import logo from "../../assets/images/logo.png";
import { getProperties } from '../../datasets/ownerproperties';

const OwnerProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [properties, setProperties] = useState(getProperties());
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('rented');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    planetNumber: ''
  });

  const revenueData = [
    { month: 'Jan', revenue: 65 },
    { month: 'Feb', revenue: 78 },
    { month: 'Mar', revenue: 90 },
    { month: 'Apr', revenue: 85 },
    { month: 'May', revenue: 72 },
  ];

  const agents = ['Agent 1', 'Agent 2', 'Agent 3'];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  useEffect(() => {
    setProperties(getProperties());
  }, [activeTab]);

  const renderSection = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <>
            <div className="header">
              <h1>Profile Overview</h1>
              <div className="header-buttons">
                <button onClick={() => {navigate("/")}} className="logout-btn">Logout</button>
              </div>
            </div>
            
            <div className="property-stats">
              <div className="stat-card">
                <h3>Property Statistics</h3>
                <div className="stat-items">
                  <div className="stat-item rented">
                    <span>{properties.rented.length}</span>
                    <p>Rented Properties</p>
                  </div>
                  <div className="stat-item pending">
                    <span>{properties.pending.length}</span>
                    <p>Pending Properties</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="revenue-chart">
              <h2>Monthly Revenue</h2>
              <LineChart width={600} height={300} data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#db3434" 
                  strokeWidth={2}
                  dot={{ fill: '#db3434' }}
                />
              </LineChart>
            </div>
          </>
        );

      case 'agents':
        return (
          <div className="section-owner">
            <h2>Chat with Agents</h2>
            <div className="chat-container">
              <div className="agents-list">
                {agents.map((agent, index) => (
                  <div 
                    className={`agent-item ${selectedAgent === index ? 'active' : ''}`}
                    key={index}
                    onClick={() => setSelectedAgent(index)}
                  >
                    {agent}
                  </div>
                ))}
              </div>
              <div className="chat-window">
                <div className="chat-messages">
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..." 
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage}>Send</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="section-owner">
            <h2>Personal Details</h2>
            <div className="personalInfo">
              <p className="profilePicture-text">Profile Picture</p>
                {/* Profile Picture */}
              <div className="profilePicture">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s"
                  alt="Profile-Picture"
                  className="profileImg"
                />
              </div>

              <div className="inputGroup">
                <label>Full Name</label>
                {editMode ? (
                  <input 
                    type="text" 
                    value={personalDetails.name}
                    onChange={(e) => setPersonalDetails({...personalDetails, name: e.target.value})}
                  />
                ) : <div className="detailValue">{personalDetails.name}</div>}
              </div>
              
              <div className="inputGroup">
                <label>Email Address</label>
                {editMode ? (
                  <input 
                    type="email" 
                    value={personalDetails.email}
                    onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}
                  />
                ) : <div className="detailValue">{personalDetails.email}</div>}
              </div>

              <div className="inputGroup">
                <label>Phone Number</label>
                {editMode ? (
                  <input 
                    type="tel" 
                    value={personalDetails.phone}
                    onChange={(e) => setPersonalDetails({...personalDetails, phone: e.target.value})}
                  />
                ) : <div className="detailValue">{personalDetails.phone}</div>}
              </div>

              <div className="editButtons">
                {editMode ? (
                  <>
                    <button 
                      className="cancel-btn"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button className="save-btn">Save Changes</button>
                  </>
                ) : (
                  <button 
                    className="edit-btn"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Details
                  </button>
                )}
              </div>
            </div>
          </div>
        );

        case 'properties':
          return (
            <div className="section-owner">
              <div className="properties-header">
                <h2>Property Management</h2>
                <button onClick={() => navigate("/ownerform")} className="add-property-btn">+ Add New Property</button>
              </div>
              <div className="property-tabs">
                <button className="rented-tab-btn" onClick={() => setActiveTab('rented')}>Rented ({properties.rented.length})</button>
                <button className="pending-tab-btn" onClick={() => setActiveTab('pending')}>Pending ({properties.pending.length})</button>
              </div>
              <div className="propertiesList">
                {properties[activeTab].map((property, index) => (
                  <div key={index} className="propertyCard">
                    <img className="propertyCard-img" src={property.images[0]} alt="" />
                    <div className="propertyDetail-content">
                      <div className="propertyCard-headings">
                        <h3>{property.name}</h3>
                        {property.status === 'Pending' && (
                          // <button onClick={() => markAsRented(index)}>Mark as Rented</button>
                          <button className="delete-btn">Delete</button>
                        )}
                      </div>
                      <span className={`status-owner ${property.status.toLowerCase()}`}>
                        {property.status}
                      </span>
                      <p className="rentRate">Rent: Rs. {property.rent}/month</p>
                      <p className="propertyOwner">Owner: {property.ownerName}</p>
                      <p className="address-owner">Address: {property.address}</p>
                      <div className="propertyCard-buttons">
                        {/* <button onClick={() => navigate(`/property/${index}`)}>View Details</button> */}
                        <button className="viewDetails-btn">View Details</button>
                        {property.status === 'Pending' && (
                          // <button onClick={() => markAsRented(index)}>Mark as Rented</button>
                          <button className="markAsRented-btn">Mark as Rented</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="profileContainer">
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

      <div className="mainContent">
        {renderSection()}
      </div>
    </div>
  );
};

export default OwnerProfile;