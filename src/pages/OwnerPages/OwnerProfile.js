import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaCheckCircle } from 'react-icons/fa';
import '../../stylesheets/Owner/OwnerProfile.css';
import logo from "../../assets/images/logo.png";
import ownerwarning from "../../assets/images/ownerwarning.png";
import { getProperties } from '../../datasets/ownerproperties';

const OwnerProfile = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
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
  });
  const [profilePicture, setProfilePicture] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s'
  );
  const [selectedProperty, setSelectedProperty] = useState(null);

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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setProperties(getProperties());
  }, [activeTab]);

  const handleMarkAsRented = (property) => {
    console.log("Marking property as rented:", property);
    setProperties(prevProperties => {
      const updatedVacant = prevProperties.vacant.filter(p => p !== property);
      const updatedRented = [...prevProperties.rented, { ...property, status: 'Rented' }];
      
      console.log("Updated properties:", { vacant: updatedVacant, rented: updatedRented });
      return {
        ...prevProperties,
        vacant: updatedVacant,
        rented: updatedRented
      };
    });

    setShowDeletePopup(true);
    setDeleteSuccess(true);
    console.log("Success message triggered");

    setTimeout(() => {
      setShowDeletePopup(false);
      setDeleteSuccess(false);
      console.log("Success message hidden");
    }, 3000);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSaveChanges = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.email === personalDetails.email
        ? {
            ...user,
            name: personalDetails.name,
            email: personalDetails.email,
            phone: personalDetails.phone,
            profileImg: profilePicture, 
          }
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditMode(false);
  };

  const handleCancel = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find((user) => user.email === personalDetails.email);
    if (currentUser) {
      setPersonalDetails({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      });
      setProfilePicture(currentUser.profileImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s');
    }
    setEditMode(false);
  };

  const handleViewDetails = (property) => {
    if (property.status === 'Rented') {
      navigate(`/ownerpropertydetail/${property.name}`, { state: { property } });
    } else {
      setSelectedProperty(property);
    }
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  const DeleteConfirmationPopup = ({ onCancel, onDelete, deleteSuccess, successMessage }) => {
    return (
      <div className="deleteConfirmationPopup">
        <div className="deleteConfirmationContent">
          {deleteSuccess ? (
            <div className="SuccessMsg">
              <FaCheckCircle className="successIcon" />
              <p>{successMessage}</p>
              <button onClick={onCancel} className="CloseBtn">Close</button>
            </div>
          ) : (
            <>
              <img className="ownerwarning-img" src={ownerwarning} alt="" />
              <h3>Are you sure you want to delete this property?</h3>
              <div className="popup-buttons">
                <button onClick={onCancel} className="CancelBtn">Cancel</button>
                <button onClick={onDelete} className="DeleteBtn">Delete</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setShowDeletePopup(true);
    setDeleteSuccess(false);
  };
  
  const handleDeleteConfirm = () => {
    setProperties(prevProperties => ({
      ...prevProperties,
      [activeTab]: prevProperties[activeTab].filter(p => p !== propertyToDelete)
    }));
    setDeleteSuccess(true);
  };
  
  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setPropertyToDelete(null);
  };

  const PropertyDetailsModal = ({ property, onClose }) => {
    if (!property) return null;

    return (
      <div className="propertyDetailsPopup">
        <div className="propertyDetailsContent">
          <div className="closebutton-div">
            <FontAwesomeIcon onClick={onClose} className="CloseButton" icon={faXmark} />
          </div>
          <div className="propertyPictures">
            <img src={property.images[0]} alt="Property [0]" className="propertyPicture" />
          </div>
          <h3>{property.name}</h3>
          <div className="propertyInformation">
            <p><strong>Owner:</strong> {property.ownerName}</p>
            <p><strong>Phone:</strong> {property.ownerPhone}</p>
            <p><strong>CNIC:</strong> {property.CNIC}</p>
            <p><strong>Address:</strong> {property.address}</p>
            <p><strong>Rent:</strong> Rs. {property.rent} per month</p>
            <p><strong>Bedrooms:</strong> {property.roomDetail.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {property.roomDetail.bathrooms}</p>
            <p><strong>Kitchens:</strong> {property.roomDetail.kitchens}</p>
            <p><strong>Included in Rent:</strong> {property.included ? property.included.join(', ') : 'None'}</p>
            <p><strong>Description:</strong> {property.propertyNeighborhood}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <>
            <div className="Header">
              <h1>Profile Overview</h1>
              <div className="header-buttons">
                <button onClick={() => { navigate("/") }} className="logout-btn">Logout</button>
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
                  <div className="stat-item vacant">
                    <span>{properties.vacant.length}</span>
                    <p>Vacant Properties</p>
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
              <div className="profilePicture">
                <label htmlFor="profile-picture-upload">
                  <img
                    src={profilePicture}
                    alt="Profile-Picture"
                    className="profileImg"
                  />
                </label>
                {editMode && (
                  <input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    capture="user" 
                    onChange={handleProfilePictureChange}
                    className="profile-picture-upload"
                    style={{ display: 'none' }}
                  />
                )}
              </div>

              <div className="inputGroup">
                <label>Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    value={personalDetails.name}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                  />
                ) : <div className="detailValue">{personalDetails.name}</div>}
              </div>

              <div className="inputGroup">
                <label>Email Address</label>
                {editMode ? (
                  <input
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                  />
                ) : <div className="detailValue">{personalDetails.email}</div>}
              </div>

              <div className="inputGroup">
                <label>Phone Number</label>
                {editMode ? (
                  <input
                    type="tel"
                    value={personalDetails.phone}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                  />
                ) : <div className="detailValue">{personalDetails.phone}</div>}
              </div>

              <div className="editButtons">
                {editMode ? (
                  <>
                    <button
                      className="cancel-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
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
              <button
                className={`rented-tab-btn ${activeTab === 'rented' ? 'active' : ''}`}
                onClick={() => setActiveTab('rented')}
              >
                Rented ({properties.rented.length})
              </button>
              <button
                className={`vacant-tab-btn ${activeTab === 'vacant' ? 'active' : ''}`}
                onClick={() => setActiveTab('vacant')}
              >
                Vacant ({properties.vacant.length})
              </button>
            </div>
            <div className="propertiesList">
              {properties[activeTab].map((property, index) => (
                <div key={index} className="propertyCard">
                  <img className="propertyCard-img" src={property.images[0]} alt="" />
                  <div className="propertyDetail-content">
                    <div className="propertyCard-headings">
                      <h3>{property.name}</h3>
                      <div className="deleteBtnDiv">
                        {property.status === 'Vacant' && (
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteClick(property)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                    <span className={`status-owner ${property.status.toLowerCase()}`}>
                      {property.status}
                    </span>
                    <p className="rentRate">Rent: Rs. {property.rent} per month</p>
                    <p className="propertyOwner">Owner: {property.ownerName}</p>
                    <p className="address-owner">Address: {property.address}</p>
                    <div className="propertyCard-buttons">
                      <button
                        className="viewDetails-btn"
                        onClick={() => handleViewDetails(property)}
                      >
                        View Details
                      </button>
                      {property.status === 'Vacant' && (
                          <button 
                            className="markAsRented-btn" 
                            onClick={() => handleMarkAsRented(property)}
                          >
                            Mark as Rented
                          </button>
                        )
                      }
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

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={closePropertyDetails}
        />
      )}

      {showDeletePopup && (
        <DeleteConfirmationPopup
          onCancel={handleDeleteCancel}
          onDelete={handleDeleteConfirm}
          deleteSuccess={deleteSuccess}
          successMessage="Property marked as rented successfully!"
        />
      )}
    </div>
  );
};

export default OwnerProfile;