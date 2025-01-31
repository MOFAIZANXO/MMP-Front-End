import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../../../stylesheets/Renter/Home Tab/Home.css"
import RenterNavbar from "../../../components/Renter/RenterNavbar";
import Footer from "../../../components/Footer";
import properties from "../../../datasets/newProperties"; // Import the properties data

function Renter() {
  return (
    <div className="renter-portal">
      {/* Navbar Component */}
      <RenterNavbar />

      {/* Hero Section */}
      <div className="hero-section-renter">
        <div className="hero-overlay"></div>
        <h2>Your Dream Property, Just a Click Away!</h2>
      </div>

      {/* Search Bar */}
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

      {/* Property List */}
      <section className="property-list">
        {properties.map((property, index) => (
          <div className="property-card" key={index}>
            <img
              src={property.propertyImages[0]} // Use the first image from the propertyImages array
              alt="Property"
              className="property-image"
            />
            <div className="property-info">
              <h3 className="property-title">{property.propertyTitle}</h3>
              <p className="property-location">{property.propertyLocation}</p>
              <p><b>Owner:</b> {property.propertyOwner}</p>
              <p><b>Price:</b> {property.propertyRent.toLocaleString()} per month</p>
              <div className="property-details">
                <span>🛏️ {property.roomDetail.bedroom}</span>
                <span>🚽 {property.roomDetail.bathroom}</span>
              </div>
            </div>
            <Link to={`/property/${index}`} className="details-button-link"> {/* Wrap only the button in a Link */}
              <button className="details-button">Check Details</button>
            </Link>
          </div>
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Renter;