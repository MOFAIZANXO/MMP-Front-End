import React, { useState } from "react";
import "../../stylesheets/Renter/Home Tab/reviewslider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ReviewSlider({ reviews, shouldEnableSlider }) {
  const [activeSlide, setActiveSlide] = useState(0); // Track active slide index

  // Function to render stars based on review.stars
  const renderStars = (stars) => {
    return "⭐".repeat(stars); // Repeat the star emoji based on the number of stars
  };

  // Slider settings
  const sliderSettings = {
    dots: true, // Show dots
    arrows: shouldEnableSlider, // Show arrows only if there are more than 2 reviews
    infinite: shouldEnableSlider, // Enable infinite scrolling only if there are more than 2 reviews
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    beforeChange: (current, next) => setActiveSlide(next), // Update active slide index immediately
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: i === activeSlide ? "#bc2d2d" : "#ccc", // Use activeSlide state
          transition: "background-color 0.3s ease",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`reviews ${!shouldEnableSlider ? "slider-disabled" : ""}`}>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <Slider {...sliderSettings}>
          {reviews.map((review, i) => (
            <div key={i} className="review-card">
              <div className="reviewer-info">
                <img
                  src={review.profilePicture}
                  alt={review.username}
                  className="reviewer-profile-picture"
                />
                <p>
                  <b>{review.username}</b> - {renderStars(review.stars)}
                </p>
              </div>
              <p>{review.userReview}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default ReviewSlider;