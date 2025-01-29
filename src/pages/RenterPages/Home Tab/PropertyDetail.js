import React from "react";
import { useParams } from "react-router-dom"; // To access URL parameters
import "../../../stylesheets/Renter/Home Tab/propertydetail.css"
import properties from "../../../datasets/newProperties"; // Import the properties data
import RenterNavbar from "../../../components/Renter/RenterNavbar";

function PropertyDetail() {
  const { index } = useParams(); // Get the index from the URL
  const property = properties[parseInt(index)]; // Find the property using the index

  if (!property) {
    return <div>Property not found!</div>; // Handle invalid index
  }

  return (
    <div className="property-detail-page">
        <RenterNavbar />
        {/* Breadcrumb */}
        <div className="breadcrumb">
            <span>Home</span> &gt;&gt; <span>View Details</span>
        </div>

        {/* Property Title and Rating */}
        <h1>{property.propertyTitle}</h1>
        <p className="property-location">{property.propertyLocation}</p>
        <p className="property-rating">⭐ {property.propertyRating} ({property.reviews.length} reviews)</p>

        {/* Owned By */}
        <div className="owned-by">
            <h3>Owned By:</h3>
            <p>{property.propertyOwner}</p>
        </div>

        {/* General Information */}
        <div className="general-info">
            <h3>General Information</h3>
            <p><b>Bathroom:</b> {property.roomDetail.bathroom}</p>
            <p><b>Bedroom:</b> {property.roomDetail.bedroom}</p>
            <p><b>Unit Size:</b> {property.roomDetail.unit}</p>
        </div>

        {/* Apply For Rent Button */}
        <button className="apply-for-rent-button">Apply For Rent</button>

        {/* About Location's Neighborhood */}
        <div className="neighborhood-info">
            <h3>About Location's Neighborhood</h3>
            <p>{property.propertyNeighborhood}</p>
        </div>

        {/* Reviews */}
        <div className="reviews">
            <h3>Reviews</h3>
            {property.reviews.map((review, i) => (
            <div key={i} className="review">
                <p><b>{review.username}</b> - {review.stars}⭐</p>
                <p>{review.userReview}</p>
            </div>
            ))}
        </div>
        </div>
  );
}

export default PropertyDetail;