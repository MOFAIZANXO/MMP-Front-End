import React, { useState } from "react";
import "../../stylesheets/Renter/Home Tab/propertyimageslider.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const PropertyImageSlider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
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
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img src={image} alt={`Property ${i + 1}`} className="property-slider-image" />
          </SwiperSlide>
        ))}
        {/* Custom Navigation Arrows */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>

      {/* Thumbnail Swiper */}
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
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img src={image} alt={`Thumbnail ${i + 1}`} className="thumbnail-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PropertyImageSlider;