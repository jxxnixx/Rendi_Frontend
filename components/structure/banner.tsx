import React from "react";
import { Carousel } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function Banner() {
  return (
    <div className="w-[1040px] h-[362px] ">
      {/* <img src="banner.png" className="w-[1040px] h-[362px] object-cover" /> */}
      <Carousel
        autoplay
        draggable
        nextArrow={<RightOutlined className="carousel-arrow" />}
        prevArrow={<LeftOutlined className="carousel-arrow" />}
      >
        <div>
          <img src="banner.png" className="w-[1040px] h-[362px] object-cover" />
        </div>
        <div>
          <div className="flex justify-center items-center w-[1040px] h-[362px] relative overflow-hidden bg-[#ffe9ec]/90">
            <div className="flex justify-center items-center w-[1000px] h-[287px] ">
              <div className="flex h-[186px]  flex-col">
                <p className="text-[18px] text-[#666666] font-medium">
                  Rendi에 처음 오셨나요?
                </p>
                <p className="text-[45px] font-bold  text-shadow-[0px 4px 4px rgba(0,0,0,0.25)">
                  test page
                </p>
              </div>
              <div className="flex-1 h-[186px] bg-black"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-[1040px] h-[362px] relative overflow-hidden bg-orange-200">
          <h1 className="color-white line-height-[362px]">slide1</h1>
        </div>
      </Carousel>
    </div>
  );
}
