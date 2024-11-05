import React from "react";
import "./AuthSlider.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const AuthSlider = () => {
  return (
    <>
      <img
        src="./assets/images/shape-1.png"
        alt="shape-1"
        className="img-fluid shape_1_img"
      />
      <img
        src="./assets/images/shape-2.png"
        alt="shape-2"
        className="img-fluid shape_2_img"
      />
      <img
        src="./assets/images/shape-3.png"
        alt="shape-3"
        className="img-fluid shape_3_img"
      />
      <div className="text-center logo_img">
        <img src="./assets/images/logo.png" alt="logo" className="img-fluid" />
      </div>
      <div className="auth-slider-area">
        <Swiper
          pagination={{
            clickable: true,
          }}
          spaceBetween={0}
          speed={1000}
          autoplay={{
            delay: 2000,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="slider-img-area">
              <img
                src="./assets/images/slider_img_1.png"
                className="img-fluid"
                alt="slider-img"
              />
            </div>
            <div className="text-center">
              <h1 className="auth-slider-heading">Hospital</h1>
              <h6 className="auth-sub-heading">
                You Can stay your Hospital and Contact With Your Facility
              </h6>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider-img-area">
              <img
                src="./assets/images/slider_img_2.png"
                className="img-fluid"
                alt="slider-img"
              />
            </div>
            <div className="text-center">
              <h1 className="auth-slider-heading">Hospital</h1>
              <h6 className="auth-sub-heading">
                You Can stay your Hospital and Contact With Your Facility
              </h6>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default AuthSlider;
