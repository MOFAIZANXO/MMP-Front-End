import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../../stylesheets/Owner/OwnerProfile.css';

const OwnerProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');
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
  
  const properties = {
    rented: [
      {
        name: 'Bahria Departments',
        status: 'Rented',
        rent: '60k/month',
        address: 'Islamabad, Main Bulliward Bahria Town Block A',
        area: '1200 sqft'
      },
      {
        name: 'Rayan Resort',
        status: 'Rented',
        rent: '90k/month',
        address: 'Islamabad, Near Faisal Mosque',
        area: '2500 sqft'
      }
    ],
    pending: [
      {
        name: 'Kashmir Lodges',
        status: 'Pending',
        rent: '50k/month',
        address: 'Islamabad, Main Bulliward Bahria Town Block A',
        area: '1800 sqft'
      }
    ]
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <>
            <div className="header">
              <h1>Profile Overview</h1>
              <div className="header-buttons">
                <button className="logout-btn">Logout</button>
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
          <div className="section">
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
          <div className="section">
            <h2>Personal Details</h2>
            <div className="personal-info">
              <div className="input-group">
                <label>Full Name</label>
                {editMode ? (
                  <input 
                    type="text" 
                    value={personalDetails.name}
                    onChange={(e) => setPersonalDetails({...personalDetails, name: e.target.value})}
                  />
                ) : <div className="detail-value">{personalDetails.name}</div>}
              </div>
              
              <div className="input-group">
                <label>Email Address</label>
                {editMode ? (
                  <input 
                    type="email" 
                    value={personalDetails.email}
                    onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}
                  />
                ) : <div className="detail-value">{personalDetails.email}</div>}
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                {editMode ? (
                  <input 
                    type="tel" 
                    value={personalDetails.phone}
                    onChange={(e) => setPersonalDetails({...personalDetails, phone: e.target.value})}
                  />
                ) : <div className="detail-value">{personalDetails.phone}</div>}
              </div>

              <div className="input-group">
                <label>Planet Number</label>
                <div className="detail-value">
                  {personalDetails.planetNumber || 'Not provided'}
                </div>
              </div>

              <div className="edit-buttons">
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
          <div className="section">
            <div className="properties-header">
              <h2>Property Management</h2>
              <button className="add-property-btn">+ Add New Property</button>
            </div>
            
            <div className="property-tabs">
              <button 
                className={`tab-btn ${activeTab === 'rented' ? 'active' : ''}`}
                onClick={() => setActiveTab('rented')}
              >
                Rented ({properties.rented.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending ({properties.pending.length})
              </button>
            </div>

            <div className="properties-list">
              {properties[activeTab].map((property, index) => (
                <div className="property-card" key={index}>
                  <h3>{property.name}</h3>
                  <div className="property-details">
                    <span className={`status ${property.status.toLowerCase()}`}>
                      {property.status}
                    </span>
                    <div className="rent-rate">{property.rent}</div>
                    <div className="address">{property.address}</div>
                    <div className="property-area">Area: {property.area}</div>
                  </div>
                  <div className="property-actions">
                    <button className="list-btn">View Details</button>
                    {property.status === 'Pending' && 
                      <button className="pending-btn">Mark as Rented</button>}
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
    <div className="profile-container">
      <div className="sidebar">
        <div className="profile-pic-section">
          <div className="profile-pic-upload">
            <span>Upload New Photo</span>
          </div>
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

      <div className="main-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default OwnerProfile;