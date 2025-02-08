import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon
import { Link } from "react-router-dom";
import "../../../stylesheets/PropertyManager/PmProperties.css";
import dummyPropertyData from "../../../datasets/DummyPmProperty"; // Import dummy data

const PmProperties = () => {
  const [activeSubTab, setActiveSubTab] = useState("Listing Requests");
  const [searchTerm, setSearchTerm] = useState("");

  // Use imported dummy data
  const { listingRequests, currentManaging } = dummyPropertyData;

  // Filter properties based on search input
  const filteredProperties =
    activeSubTab === "Listing Requests"
      ? listingRequests.filter(
          (property) =>
            (property.name && property.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (property.ownerName && property.ownerName.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : currentManaging.filter(
          (property) =>
            (property.name && property.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (property.ownerName && property.ownerName.toLowerCase().includes(searchTerm.toLowerCase()))
        );

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

      {/* Search Bar with Icon */}
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
      </div>

      {/* Listing Requests Section */}
      {activeSubTab === "Listing Requests" && (
        <div className="PM_listing-requests">
          <h2>Listing Requests</h2>
          {filteredProperties.map((property) => (
            <div className="PM_property-card" key={property.id}>
              <img
                src='https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb3BlcnR5fGVufDB8fDB8fHww'
                alt={property.name || "Property Image"}
                className="PM_property-img"
              />
              <div className="PM_property-info">
                <h3>{property.name || "Unnamed Property"}</h3>
                <p>
                  <strong>Rent Rate:</strong> {property.rentRate || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {property.address || "No Address"}
                </p>
                <div className="PM_status">{property.status || "Pending"}</div>
                <Link
                  to="/review-property"
                  state={{ propertyData: property }}
                  className="PM_review-button"
                >
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
          <h2>Current Properties</h2>
          {filteredProperties.map((property) => (
            <div className="PM_property-card" key={property.id}>
              <img
                src='https://media.istockphoto.com/id/2155879454/photo/this-is-an-exterior-photo-of-a-home-for-sale-in-beverly-hills-ca.webp?a=1&b=1&s=612x612&w=0&k=20&c=GvT1GQsxPREVk5rWMjlZaZHJH8TSpBDagNgZDg1NxyE='
                alt={property.name || "Property Image"}
                className="PM_property-img"
              />
              <div className="PM_property-info">
                <h3>{property.name || "Unnamed Property"}</h3>
                <p>
                  <strong>Rent Rate:</strong> {property.rentRate || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {property.address || "No Address"}
                </p>
                <p>
                  <strong>Owner:</strong> {property.ownerName || "Unknown"}
                </p>
                {/* Apply .PM_status-vacant if the property is Vacant */}
                <div className={`PM_status ${property.status.includes("Vacant") ? "PM_status-vacant" : ""}`}>
                  {property.status || "Active"}
                </div>
                <button className="PM_contact-owner">Contact Owner</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PmProperties;
