import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useScreenSize } from "@/libs/client/useScreen";

export default function Banner() {
  const screen = useScreenSize();

  return (
    <div className="w-[1040px] h-[362px] mobile:w-full mobile:h-[226px] ">
      {/* <img src="banner.png" className="w-[1040px] h-[362px] object-cover" /> */}
      <Carousel
        autoplay
        draggable
        nextArrow={<RightOutlined className="carousel-arrow" />}
        prevArrow={<LeftOutlined className="carousel-arrow" />}
      >
        <div className="flex justify-center items-center">
          <img
            src="banner1.png"
            // src={screen === "mobile" ? "banner_mobile.png" : "banner.png"}
            className="w-[1040px] h-[362px] mobile:w-full mobile:h-[226px] object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            // src={screen === "mobile" ? "banner_mobile.png" : "banner.png"}
            src="banner2.png"
            className="w-[1040px] h-[362px] mobile:w-full mobile:h-[226px] object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
}
