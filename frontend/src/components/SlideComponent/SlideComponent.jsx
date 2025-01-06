import React from "react";
import { WrapperSliderStyle } from "./style";
import { Image } from "antd";
import Slider from "react-slick";

const SlideComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
  };
  return (
    <WrapperSliderStyle {...settings}>
      {arrImages.map((image) => {
        return (
          <Image
            key={image}
            src={image}
            alt="slider"
            preview={false}
            width="100%"
            height="374px"
          />
        );
      })}
    </WrapperSliderStyle>
  );
};

export default SlideComponent;
