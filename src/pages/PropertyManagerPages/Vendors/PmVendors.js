import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../../stylesheets/PropertyManager/PmVendors.css";
import PmVendorDummy from "../../../datasets/PmVendorDummy";

const PmVendors = () => {
  const [activeSubTab, setActiveSubTab] = useState("Applications");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const { vendorApplications, currentVendors } = PmVendorDummy;

  // Get vendors based on active tab
  const vendors = activeSubTab === "Applications" ? vendorApplications : currentVendors;

  // Filtering logic
  const filteredVendors = vendors.filter((vendor) => {
    const nameMatch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedType === "All" || vendor.services.includes(selectedType);
    const statusMatch = activeSubTab === "Applications" || selectedStatus === "All" || vendor.status === selectedStatus;
    return nameMatch && typeMatch && statusMatch;
  });

  // Calculate total for filtered vendors
  const totalFilteredVendors = filteredVendors.length;

  return (
    <div className="PmVendors">
      {/* Sub-Navigation */}
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
        {/* Search Bar */}
        <div className="PmVendors_search-wrapper">
          <FaSearch className="PmVendors_search-icon" />
          <input type="text" placeholder="Search by vendor name..." className="PmVendors_search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Vendor Type Filter */}
        <select className="PmVendors_filter" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Painter">Painter</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Carpenter">Carpenter</option>
        </select>

        {/* Availability Status Filter (Only for Current Vendors) */}
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
        {/* Updated Heading with Total Count */}
        <h2>
          {activeSubTab === "Applications" ? "Vendor Applications" : "Current Vendors"} : {totalFilteredVendors}
        </h2>
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <div className="PmVendors_card" key={vendor.id}>
              <img src={vendor.image} alt={vendor.name} className="PmVendors_img" />
              <div className="PmVendors_info">
                <h3>{vendor.name}</h3>
                <p><strong>Services:</strong> {vendor.services.join(", ")}</p>
                <p><strong>Location:</strong> {vendor.city}, {vendor.province}</p>
                <div className={vendor.status === "Active" ? "PmVendors_status PmVendors_status-active" : "PmVendors_status PmVendors_status-inactive"}>{vendor.status}</div>
                <button className="PmVendors_contact-button">{activeSubTab === "Applications" ? "Review Application" : "Contact Vendor"}</button>
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