import React from "react";
import { Link } from "react-router-dom";
import "../../../stylesheets/Renter/Home Tab/Home.css";
import RenterNavbar from "../../../components/Renter/RenterNavbar";
import Footer from "../../../components/Footer";
import properties from "../../../datasets/newProperties";

function Renter() {
  return (
    <div className="home-renter-portal">
      <div className="renter-home">
        <RenterNavbar />

        <div className="home-hero-section-renter">
          <div className="home-hero-overlay"></div>
          <h2>Your Dream Property, Just a Click Away!</h2>
        </div>

        <div className="home-search-bar">
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

        <section className="home-property-list">
          {properties.map((property, index) => (
            <div className="home-property-card" key={index}>
              <img
                src={property.propertyImages[0]}
                alt="Property"
                className="home-property-image"
              />
              <div className="home-property-info">
                <h3 className="home-property-title">{property.propertyTitle}</h3>
                <p className="home-property-location">{property.propertyLocation}</p>
                <p><b>Owner:</b> {property.propertyOwner}</p>
                <p><b>Price:</b> Rs. {property.propertyRent} per month</p>
                <div className="home-property-details">
                  <span>🛏️ {property.roomDetail.bedroom}</span>
                  <span>🚽 {property.roomDetail.bathroom}</span>
                </div>
              </div>
              <Link to={`/property/${index}`} className="home-details-button-link">
                <button className="home-details-button">Check Details</button>
              </Link>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Renter;