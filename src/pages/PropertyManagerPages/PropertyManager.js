import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/PropertyManager/PropertyManager.css";
import logo from "../../assets/images/logo.png";
import PmProperties from "../PropertyManagerPages/Properties/PmProperties";
import PmRenters from "../PropertyManagerPages/Renters/PmRenters";
import PmVendors from "../PropertyManagerPages/Vendors/PmVendors";
import PmWorkorders from "../PropertyManagerPages/WorkOrders/PmWorkorders"; 
import PmProfile from "../PropertyManagerPages/Profile/PmProfile";

const PropertyManager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Properties");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="PM_property-manager">
      {/* Header */}
      <header className="PM_header">
        <div className="PM_logo">
          <img src={logo} alt="Logo" className="PM_logo-img" /> Manage My Property
        </div>
        <div className="PM_profile">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s"
            alt="Profile"
            className="PM_profile-pic"
          />
        </div>
      </header>

      {/* Navigation */}
      <nav className="PM_nav-bar">
        <button
          className={activeTab === "Properties" ? "PM_active" : ""}
          onClick={() => setActiveTab("Properties")}
        >
          Properties
        </button>
        <button
          className={activeTab === "Renters" ? "PM_active" : ""}
          onClick={() => setActiveTab("Renters")}
        >
          Renters
        </button>
        <button
          className={activeTab === "Vendors" ? "PM_active" : ""}
          onClick={() => setActiveTab("Vendors")}
        >
          Vendor
        </button>
        <button
          className={activeTab === "Workorders" ? "PM_active" : ""}
          onClick={() => setActiveTab("Workorders")}
        >
          Workorders
        </button>
        <button
          className={activeTab === "Profile" ? "PM_active" : ""}
          onClick={() => setActiveTab("Profile")}
        >
          Profile
        </button>
        <button onClick={navigate("/")} className="PM_logout">Logout</button>
      </nav>

      {/* Content Section */}
      <div className="PM_content">
        {activeTab === "Properties" && <PmProperties />}
        {activeTab === "Renters" && <PmRenters />}
        {activeTab === "Vendors" && <PmVendors />} 
        {activeTab === "Workorders" && <PmWorkorders />}
        {activeTab === "Profile" && <PmProfile />}
      </div>
    </div>
  );
};

export default PropertyManager;