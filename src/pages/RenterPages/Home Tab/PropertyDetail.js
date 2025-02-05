import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../../../stylesheets/Renter/Home Tab/propertydetail.css";
import properties from "../../../datasets/newProperties";
import RenterNavbar from "../../../components/Renter/RenterNavbar";
import Footer from "../../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import PropertyImageSlider from "../../../components/Renter/PropertyImageSlider";
import ReviewSlider from "../../../components/Renter/ReviewSlider";
import PropertyGeneralInfo from "../../../components/Renter/PropertyGeneralInfo"; // Import the new component

function PropertyDetail() {
  const { index } = useParams();
  const property = properties[parseInt(index)];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);

  if (!property) {
    return <div>Property not found!</div>;
  }

  const handleBackClick = () => {
    window.history.back();
  };

  // Determine if the slider should be clickable
  const shouldEnableSlider = property.reviews.length > 2;

  return (
    <div className="property-detail">
      <RenterNavbar />
      <div className="property-detail-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <div className="backBtn" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <Link to="/renter" className="breadcrumbHome">
            <span>Home</span>
          </Link>
          <span className="breadcrumbSymbol">&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;</span>
          <span className="breadcrumbSpan">View Details</span>
        </div>

        {/* Property Title and Rating */}
        <div className="detail-head-div">
          <FontAwesomeIcon icon={faHouseChimney} className="house-icon" />
          <div className="detail-div-1">
            <h1>{property.propertyTitle}</h1>
            <p className="property-location">{property.propertyLocation}</p>
            <p className="property-rating"> ⭐ {property.propertyRating} ({property.reviews.length} reviews)</p>
          </div>

          {/* Owned By */}
          <div className="owned-by">
            <h3>Owned By:</h3>
            <div className="owner-info">
              <img
                src={property.profilePicture}
                alt="Owner"
                className="owner-profile-picture"
              />
              <p>{property.propertyOwner}</p>
            </div>
          </div>
        </div>

        {/* Property Image Slider */}
        <PropertyImageSlider images={property.propertyImages} />

        {/* General Information */}
        <PropertyGeneralInfo property={property} />

        {/* Apply For Rent Button */}
        <Link to={`/renterform?propertyId=${index}`} className="applyButton">
          <button className="apply-for-rent-button">Apply For Rent</button>
        </Link>

        {/* About Location's Neighborhood */}
        <div className="neighborhood-info">
          <h3>About Location's Neighborhood</h3>
          <p>{property.propertyNeighborhood}</p>
        </div>

        {/* Reviews */}
        <ReviewSlider reviews={property.reviews} shouldEnableSlider={shouldEnableSlider} />
      </div>

      <Footer />
    </div>
  );
}

export default PropertyDetail;