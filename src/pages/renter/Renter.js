import React from "react";
import "../../stylesheets/Renter/Home.css";
import RenterNavbar from "../../components/Renter/RenterNavbar";
import Footer from "../../components/Footer"; 

function Renter() {
  return (
    <div className="renter-portal">
      {/* Navbar Component */}
      <RenterNavbar /> 

      {/* Hero/search Section */}
      <div className="hero-section-renter">
        <div className="hero-overlay"></div>
        <h2>Your Dream Property, Just a Click Away!</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search Location" />
          <select>
            <option>Location</option>
          </select>
          <select>
            <option>Type</option>
          </select>
          <select>
            <option>Price</option>
          </select>
          <button>Search🔍</button>
        </div>
      </div>

      {/* Property List */}
      <section className="property-list">
      {[...Array(5)].map((_, index) => (
      <div className="property-card" key={index}>
        <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Property"
        className="property-image"
      />
      <div className="property-info">
        <h3 className="property-title">Bahria Departments</h3>
        <p className="property-location">Lahore, Main Boulevard Bahria Town, Block A</p>
        <p><b>Owner:</b> Muhammad Faizan</p>
        <p><b>Price:</b> 80k per month</p>
        <div className="property-details">
          <span>🛏️ 10</span>
          <span>🚽 5</span>
        </div>
      </div>
      <button className="details-button">Check Details</button>
    </div>
  ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Renter;
