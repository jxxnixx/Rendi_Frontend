import React, { useState, useRef, useEffect, memo } from "react";
import { HeartIcon } from "../icons";
import { Carousel } from "antd";
import router from "next/router";
import { itemsApi } from "@/libs/api";
import { useScreenSize } from "@/libs/client/useScreen";
import { useRecoilState } from "recoil";
import { recentViewedItemsState } from "@/libs/client/atom";
import Link from "next/link";

interface ItemProps {
  item: {
    brandId: number;
    title: string;
    imgUrls: string[];
    href: string;
  };
}

const MarketItem = ({ item }: ItemProps) => {
  const screen = useScreenSize();
  const isMainPage = router.asPath.includes("/main"); // "main"이 포함되어 있는지 여부 확인

  const getPathname = () => {
    if (isMainPage) {
      return "/main/menus/marketList/[id]";
    } else {
      return "/menus/marketList/[id]";
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="mt-[5px] transition-transform transform hover:scale-105 focus:outline-none focus:ring-0 mobile:mt-1">
      <Link
        href={{
          pathname: getPathname(),
          query: { id: item.title },
        }}
      >
        <div
          className={` relative mb-[10px] ${
            screen === "mobile" ? "w-[162px] h-[251px]" : "w-[222px] h-[361px]"
          }`}
        >
          {/* 상품 이미지 */}
          {/* 이미지 슬라이드 자동으로 넘기는거 싫으면 autoplay삭제*/}
          <div
            // onClick={handleItemClick}
            className="cursor-pointer transition-shadow shadow-sm hover:shadow-md"
          >
            <Carousel autoplay>
              {item.imgUrls &&
                item.imgUrls.map((url, index) => (
                  <div key={index}>
                    <img
                      className={`${
                        screen === "mobile"
                          ? "w-[162px] h-[204px]"
                          : "w-[222px] h-[288px]"
                      } rounded-lg border-2 border-gray-100 shadow-md`}
                      src={url}
                      alt={item.title}
                    />
                  </div>
                ))}
            </Carousel>
          </div>
          {/* 
          <div
            className="flex mt-[10px] w-[222px] h-5 relative cursor-pointer"
            // onClick={handleItemClick}
          > */}
          <p className=" flex justify-center  font-bold font-[18pt] w-[222px] mobile:w-[160px] mobile:text-[14px] h-5  left-[25px] top-[321px] text-left text-black">
            {item.title}
          </p>
          {/* </div> */}
        </div>
      </Link>
    </div>
  );
};

export default memo(MarketItem);
