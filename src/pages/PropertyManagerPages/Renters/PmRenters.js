import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../../stylesheets/PropertyManager/PmRenters.css";

const PmRenters = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Sample data (Replace with actual API data)
  const renterRequests = [
    { id: 1, name: "John Doe", contact: "123-456-7890", status: "pending" },
    { id: 2, name: "Jane Smith", contact: "987-654-3210", status: "pending" },
  ];

  const currentRenters = [
    { id: 1, name: "Alice Brown", property: "Apartment A-12", renting: true },
    { id: 2, name: "Bob Wilson", property: "None", renting: false },
  ];

  // Filter renters based on search term
  const filteredRenterRequests = renterRequests.filter((renter) =>
    renter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCurrentRenters = currentRenters.filter(
    (renter) =>
      renter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (renter.property.toLowerCase() !== "none" &&
        renter.property.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="PmRenterContainer">
      {/* Sub-Navigation */}
      <div className="PmRenterSubNav">
        <button
          className={`PmRenterTab ${activeTab === "requests" ? "PmRenterActive" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          Applications
        </button>
        <button
          className={`PmRenterTab ${activeTab === "current" ? "PmRenterActive" : ""}`}
          onClick={() => setActiveTab("current")}
        >
          Current Renters
        </button>
      </div>

      {/* Search Bar with Icon */}
      <div className="PmRenterSearchContainer">
        <div className="PmRenterSearchWrapper">
          <FaSearch className="PmRenterSearchIcon" />
          <input
            type="text"
            placeholder="Search by renter name or property name..."
            className="PmRenterSearchBar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Requests Section */}
      {activeTab === "requests" && (
        <div className="PmRenterSection">
          {/* Updated Heading with Total Count */}
          <h2>Renter Applications : {filteredRenterRequests.length}</h2>
          {filteredRenterRequests.length > 0 ? (
            filteredRenterRequests.map((renter) => (
              <div key={renter.id} className="PmRenterCard">
                <p><strong>Name:</strong> {renter.name}</p>
                <p><strong>Contact:</strong> {renter.contact}</p>
                <Link
                  to="/PmRenterForm"
                  state={{ renterData: renter }} // Pass renter data
                  className="PM_review-button"
                >
                  Review
                </Link>
              </div>
            ))
          ) : (
            <p>No renter requests available.</p>
          )}
        </div>
      )}

      {/* Current Renters Section */}
      {activeTab === "current" && (
        <div className="PmRenterSection">
          {/* Updated Heading with Total Count */}
          <h2>Current Renters : {filteredCurrentRenters.length}</h2>
          {filteredCurrentRenters.length > 0 ? (
            filteredCurrentRenters.map((renter) => (
              <div key={renter.id} className="PmRenterCard">
                <p><strong>Name:</strong> {renter.name}</p>
                <p><strong>Property:</strong> {renter.property}</p>
                <button
                  className="PmRenterButton PmRenterContactButton"
                  onClick={() => navigate(`/chat/${renter.id}`)}
                  disabled={!renter.renting}
                >
                  Contact Renter
                </button>
              </div>
            ))
          ) : (
            <p>No current renters available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PmRenters;