import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToilet, faBed, faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import room from "../../assets/images/room.png";
import rent from "../../assets/images/rent.png";
import location from "../../assets/images/location.png";
import "../../stylesheets/Renter/Home Tab/propertygeneralinfo.css";

function PropertyGeneralInfo({ property }) {
  return (
    <div className="general-info">
      <h3 className="general-info-heading">General Information</h3>
      <div className="cards-container">
        {/* Room Details Card */}
        <div className="info-card">
          <img src={room} alt="" className="roomImg" />
          <h4>Room Details</h4>
          <div className="bath">
            <FontAwesomeIcon icon={faToilet} className="bathIcon" />
            <p><b>Bathroom:</b> {property.roomDetail.bathroom}</p>
          </div>
          <div className="bed">
            <FontAwesomeIcon icon={faBed} className="bedIcon" />
            <p><b>Bedroom:</b> {property.roomDetail.bedroom}</p>
          </div>
          <div className="kitchen">
            <FontAwesomeIcon icon={faKitchenSet} className="kitchenIcon" />
            <p><b>Kitchen:</b> {property.roomDetail.kitchen}</p>
          </div>
        </div>

        {/* Rent Include/Exclude Card */}
        <div className="info-card rent">
          <img src={rent} alt="" className="rentImg" />
          <h4>Rs {property.propertyRent}/month</h4>
          <p>
            <b>Included:</b>{" "}
            {property.rentIncludeExclude.included
              ? property.rentIncludeExclude.included.join(", ")
              : "None"}
          </p>
          <p>
            <b>Excluded:</b>{" "}
            {property.rentIncludeExclude.excluded
              ? property.rentIncludeExclude.excluded.join(", ")
              : "None"}
          </p>
        </div>

        {/* Location Card */}
        <div className="info-card">
          <img src={location} alt="" className="locationImg" />
          <h4>Location</h4>
          <p>{property.propertyLocation}</p>
          <button
            className="copy-location-button"
            onClick={() => {
              navigator.clipboard.writeText(property.propertyLocation);
              alert("Location copied to clipboard!");
            }}
          >
            Copy Location
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyGeneralInfo;