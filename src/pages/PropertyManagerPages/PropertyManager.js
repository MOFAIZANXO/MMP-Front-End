import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "../../stylesheets/PropertyManager/PropertyManager.css";
import logo from "../../assets/images/logo.png";

const PropertyManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Properties");

  // Update activeTab based on the current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/pmProperties")) setActiveTab("Properties");
    else if (path.includes("/pmRenters")) setActiveTab("Renters");
    else if (path.includes("/pmVendors")) setActiveTab("Vendors");
    else if (path.includes("/pmWorkOrders")) setActiveTab("Workorders");
    else if (path.includes("/pmProfile")) setActiveTab("Profile");
  }, [location.pathname]);

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Properties") navigate("pmProperties");
    else if (tab === "Renters") navigate("pmRenters");
    else if (tab === "Vendors") navigate("pmVendors");
    else if (tab === "Workorders") navigate("pmWorkOrders");
    else if (tab === "Profile") navigate("pmProfile");
  };

  return (
    <div className="PM_property-manager">
      {/* Header */}
      <header className="PM_header">
        <div className="PM_logo">
          <img src={logo} alt="Logo" className="PM_logo-img" /> Manage My Property
        </div>
        <div className="PM_profile">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKzFv1Bi23dtQWZyLgtUERRdA&s"
            alt="Profile"
            className="PM_profile-pic"
          />
        </div>
      </header>

      {/* Navigation */}
      <nav className="PM_nav-bar">
        <button
          className={activeTab === "Properties" ? "PM_active" : ""}
          onClick={() => handleTabClick("Properties")}
        >
          Properties
        </button>
        <button
          className={activeTab === "Renters" ? "PM_active" : ""}
          onClick={() => handleTabClick("Renters")}
        >
          Renters
        </button>
        <button
          className={activeTab === "Vendors" ? "PM_active" : ""}
          onClick={() => handleTabClick("Vendors")}
        >
          Vendor
        </button>
        <button
          className={activeTab === "Workorders" ? "PM_active" : ""}
          onClick={() => handleTabClick("Workorders")}
        >
          Workorders
        </button>
        <button
          className={activeTab === "Profile" ? "PM_active" : ""}
          onClick={() => handleTabClick("Profile")}
        >
          Profile
        </button>
        <button onClick={() => navigate("/")} className="PM_logout">
          Logout
        </button>
      </nav>

      {/* Content Section */}
      <div className="PM_content">
        <Outlet /> {/* Render child components here */}
      </div>
    </div>
  );
};

export default PropertyManager;