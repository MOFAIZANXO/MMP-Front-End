import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../../../stylesheets/PropertyManager/PmVendors.css";
import PmVendorDummy from "../../../datasets/PmVendorDummy";

const PmVendors = () => {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState("Applications");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const { vendorApplications, currentVendors } = PmVendorDummy;
  const vendors = activeSubTab === "Applications" ? vendorApplications : currentVendors;

  // Filtering logic
  const filteredVendors = vendors.filter((vendor) => {
    const nameMatch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedType === "All" || vendor.services.includes(selectedType);
    const statusMatch = activeSubTab === "Applications" || selectedStatus === "All" || vendor.status === selectedStatus;
    return nameMatch && typeMatch && statusMatch;
  });

  return (
    <div className="PmVendors">
      <div className="PmVendors_sub-nav">
        <button className={activeSubTab === "Applications" ? "PmVendors_sub-active" : ""} onClick={() => setActiveSubTab("Applications")}>
          Applications
        </button>
        <button className={activeSubTab === "Current" ? "PmVendors_sub-active" : ""} onClick={() => setActiveSubTab("Current")}>
          Current Vendors
        </button>
      </div>

      {/* Search & Filters */}
      <div className="PmVendors_filters">
        <div className="PmVendors_search-wrapper">
          <FaSearch className="PmVendors_search-icon" />
          <input type="text" placeholder="Search by vendor name..." className="PmVendors_search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <select className="PmVendors_filter" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Painter">Painter</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Carpenter">Carpenter</option>
        </select>

        {activeSubTab === "Current" && (
          <select className="PmVendors_filter" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        )}
      </div>

      {/* Vendor List */}
      <div className={activeSubTab === "Applications" ? "PmVendors_applications" : "PmVendors_current-vendors"}>
        <h2>{activeSubTab === "Applications" ? "Vendor Applications" : "Current Vendors"} : {filteredVendors.length}</h2>
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <div className="PmVendors_card" key={vendor.id}>
              <img src={vendor.image} alt={vendor.name} className="PmVendors_img" />
              <div className="PmVendors_info">
                <h3>{vendor.name}</h3>
                <p><strong>Services:</strong> {vendor.services.join(", ")}</p>
                <p><strong>Location:</strong> {vendor.city}, {vendor.province}</p>
                <div className={vendor.status === "Active" ? "PmVendors_status PmVendors_status-active" : "PmVendors_status PmVendors_status-inactive"}>{vendor.status}</div>
                
                {/* Updated Button to Navigate to Vendor Review Form */}
                <button 
                  className="PmVendors_contact-button" 
                  onClick={() => navigate(`/pm-vendor-form/${vendor.id}`)}
                >
                  {activeSubTab === "Applications" ? "Review" : "Contact Vendor"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="PmVendors_no-vendors">No vendors found.</p>
        )}
      </div>
    </div>
  );
};

export default PmVendors;
