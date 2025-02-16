import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "../../stylesheets/Owner/ownerpropertyimageslider.css";

const OwnerPropertyImageSlider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="owner-slider">
      {/* Main Swiper */}
      <Swiper
        navigation={{
          nextEl: ".owner-swiper-button-next",
          prevEl: ".owner-swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Pagination, Thumbs]}
        className="owner-main-swiper"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img src={image} alt={`Property ${i + 1}`} className="owner-slider-image" />
          </SwiperSlide>
        ))}
        {/* Custom Navigation Arrows */}
        <div className="owner-swiper-button-next">
          <span className="arrow-icon">&#8250;</span>
        </div>
        <div className="owner-swiper-button-prev">
          <span className="arrow-icon">&#8249;</span>
        </div>
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView="auto"
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Thumbs, FreeMode, Scrollbar]}
        className="owner-thumbnail-swiper"
        scrollbar={{ draggable: true }}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img src={image} alt={`Thumbnail ${i + 1}`} className="owner-thumbnail-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OwnerPropertyImageSlider;