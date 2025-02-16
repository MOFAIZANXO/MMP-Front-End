// We have 2 components here and 1 data file is being used (look at it to see the necessary data to use)

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../stylesheets/Renter/Home Tab/Home.css";
import RenterNavbar from "../../../components/Renter/RenterNavbar";
import Footer from "../../../components/Footer";
import properties from "../../../datasets/newProperties";

function Renter() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        {properties?.length > 0 ? properties.map((property, index) => (
          <div className="home-property-card" key={index}>
            <img
              src={property?.propertyImages?.[0] || "default-image.jpg"} // Ensure a default image
              alt="Property"
              className="home-property-image"
            />
            <div className="home-property-info">
              <h3 className="home-property-title">{property?.propertyTitle || "No Title"}</h3>
              <p className="home-property-location">{property?.propertyLocation || "No Location"}</p>
              <p><b>Owner:</b> {property?.propertyOwner || "Unknown"}</p>
              <p><b>Price:</b> Rs. {property?.propertyRent || 0} per month</p>
              <div className="home-property-details">
                <span>🛏️ {property?.roomDetail?.bedroom || 0}</span>
                <span>🚽 {property?.roomDetail?.bathroom || 0}</span>
              </div>
            </div>
            <Link to={`/property/${index}`} className="home-details-button-link">
              <button className="home-details-button">Check Details</button>
            </Link>
          </div>
        )) : <p>No properties available</p>}
      </section>

      </div>

      <Footer />
    </div>
  );
}

export default Renter;