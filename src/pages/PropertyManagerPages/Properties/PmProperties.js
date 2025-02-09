import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../../stylesheets/PropertyManager/PmProperties.css";
import DummyPmProperty from "../../../datasets/DummyPmProperty";

const PmProperties = () => {
  const [activeSubTab, setActiveSubTab] = useState("Listing Requests");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { listingRequests, currentManaging } = DummyPmProperty;

  // Filter properties based on search input and status filter
  const filteredProperties =
    activeSubTab === "Listing Requests"
      ? listingRequests.filter(
          (property) =>
            (property.name && property.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (property.ownerName && property.ownerName.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : currentManaging.filter((property) => {
          const matchesSearch =
            (property.name && property.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (property.ownerName && property.ownerName.toLowerCase().includes(searchTerm.toLowerCase()));

          const matchesStatus =
            statusFilter === "All" ||
            (statusFilter === "Active" && property.status === "Active") ||
            (statusFilter === "Vacant" && property.status.includes("Vacant"));

          return matchesSearch && matchesStatus;
        });

  return (
    <div className="PM_properties">
      {/* Sub-Navigation for Properties */}
      <div className="PM_sub-nav">
        <button
          className={activeSubTab === "Listing Requests" ? "PM_sub-active" : ""}
          onClick={() => setActiveSubTab("Listing Requests")}
        >
          Listing Requests
        </button>
        <button
          className={activeSubTab === "Current Managing" ? "PM_sub-active" : ""}
          onClick={() => setActiveSubTab("Current Managing")}
        >
          Current Properties
        </button>
      </div>

      {/* Search Bar and Filter Dropdown */}
      <div className="PM_search-container">
        <div className="PM_search-wrapper">
          <FaSearch className="PM_search-icon" />
          <input
            type="text"
            placeholder="Search by property or owner name..."
            className="PM_search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Status Filter Dropdown */}
        {activeSubTab === "Current Managing" && (
          <select
            className="PM_status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Vacant">Vacant</option>
          </select>
        )}
      </div>

      {/* Listing Requests Section */}
      {activeSubTab === "Listing Requests" && (
        <div className="PM_listing-requests">
          {/* Updated Heading with Total Count */}
          <h2>Listing Requests : {filteredProperties.length}</h2>
          {filteredProperties.map((property) => (
            <div className="PM_property-card" key={property.id}>
              <img src={property.image} alt={property.name} className="PM_property-img" />
              <div className="PM_property-info">
                <h3>{property.name}</h3>
                <p><strong>Rent Rate:</strong> {property.rentRate}</p>
                <p><strong>Address:</strong> {property.address}</p>
                <p><strong>Owner:</strong> {property.ownerName}</p>
                <div className="PM_status">{property.status}</div>
                <Link to="/review-property" state={{ propertyData: property }} className="PM_review-button">
                  Review Request
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Managing Section */}
      {activeSubTab === "Current Managing" && (
        <div className="PM_current-managing">
          {/* Updated Heading with Total Count */}
          <h2>Current Properties : {filteredProperties.length}</h2>
          {filteredProperties.map((property) => (
            <div className="PM_property-card" key={property.id}>
              <img src={property.image} alt={property.name} className="PM_property-img" />
              <div className="PM_property-info">
                <h3>{property.name}</h3>
                <p><strong>Rent Rate:</strong> {property.rentRate}</p>
                <p><strong>Address:</strong> {property.address}</p>
                <p><strong>Owner:</strong> {property.ownerName}</p>

                {property.status === "Active" && (
                  <>
                    <p><strong>Renter:</strong> {property.renterName}</p>
                    <div className={`PM_rent-status ${property.rentStatus === "Paid" ? "PM_rent-status-paid" : "PM_rent-status-pending"}`}>
                      Rent Status: {property.rentStatus}
                    </div>
                  </>
                )}

                <div className={`PM_status ${property.status.includes("Vacant") ? "PM_status-vacant" : ""}`}>
                  {property.status}
                </div>

                {/* Contact Buttons */}
                <div className="PM_contact-buttons">
                  {property.status === "Active" && (
                    <button className="PM_contact-renter">Contact Renter</button>
                  )}
                  <button className="PM_contact-owner">Contact Owner</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PmProperties;