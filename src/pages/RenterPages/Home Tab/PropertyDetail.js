import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../../stylesheets/Renter/Home Tab/propertydetail.css";
import properties from "../../../datasets/newProperties";
import RenterNavbar from "../../../components/Renter/RenterNavbar";
import Footer from "../../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouseChimney, faBed, faToilet } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import room from "../../../assets/images/room.png"; // Adjust the path as needed
import rent from "../../../assets/images/rent.png";
import location from "../../../assets/images/location.png";

function PropertyDetail() {
  const { index } = useParams();
  const property = properties[parseInt(index)];
  const [thumbsSwiper, setThumbsSwiper] = useState(null); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);

  if (!property) {
    return <div>Property not found!</div>;
  }

  const handleBackClick = () => {
    window.history.back();
  };

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
            <div className="property-slider">
                {/* Main Swiper */}
                <Swiper
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                    return `<span class="${className}"></span>`;
                    },
                }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Pagination, Thumbs]}
                className="main-swiper"
                >
                {property.propertyImages.map((image, i) => (
                    <SwiperSlide key={i}>
                    <img src={image} alt={`Property ${i + 1}`} className="property-slider-image" />
                    </SwiperSlide>
                ))}
                {/* Custom Navigation Arrows */}
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
                </Swiper>

                <Swiper
                    onSwiper={setThumbsSwiper} 
                    spaceBetween={10} 
                    slidesPerView="auto" 
                    freeMode={true} 
                    watchSlidesProgress={true} 
                    modules={[Thumbs, FreeMode, Scrollbar]} 
                    className="thumbnail-swiper"
                    scrollbar={{ draggable: true }} 
                >
                {property.propertyImages.map((image, i) => (
                    <SwiperSlide key={i}>
                    <img
                        src={image}
                        alt={`Thumbnail ${i + 1}`}
                        className="thumbnail-image"
                    />
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>

            {/* General Information */}
            <div className="general-info">
                {/* General Information Heading */}
                <h3 className="general-info-heading">General Information</h3>

                {/* Cards Container */}
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
                        <div className="unit">
                            <FontAwesomeIcon icon={faHouseChimney} className="unitIcon" />
                            <p><b>Unit Size:</b> {property.roomDetail.unit}</p>
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
                <p>
                    <b>{review.username}</b> - {review.stars}⭐
                </p>
                <p>{review.userReview}</p>
                </div>
            ))}
            </div>
        </div>

      <Footer />
    </div>
  );
}

export default PropertyDetail;