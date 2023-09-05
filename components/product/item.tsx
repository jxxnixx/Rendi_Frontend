import React, { useState, useRef, useEffect, memo } from "react";
import { HeartIcon } from "../icons";
import { Carousel } from "antd";
import router from "next/router";
import { itemsApi } from "@/libs/api";
import { useScreenSize } from "@/libs/client/useScreen";
import { useRecoilState } from "recoil";
import { recentViewedItemsState } from "@/libs/client/atom";

interface ItemProps {
  item: {
    productId: number;
    price: string;
    brandId: number;
    title: string;
    wishYN: string;
    imgUrls: string[];
    href: string;
  };
  updateClickCount: (productId: number, clickCount: number) => void;
  lastClickTime: number | null; // 클릭 시간 정보 전달
  updateLastClickTime: (productId: number, clickTime: number | null) => void; // 클릭 시간 업데이트 함수
}

// brandId가 1인 경우 "CIDER"로 변경하는 함수
const updateBrandId = (item: ItemProps["item"]) => {
  if (item.brandId === 1) {
    return { ...item, brandId: "CIDER" };
  }
  return item;
};

const Item = ({
  item,
  updateClickCount,
  lastClickTime,
  updateLastClickTime,
}: ItemProps) => {
  // 이전에 좋아요를 눌렀는지 여부를 상태로 관리
  const [isLiked, setIsLiked] = useState(item.wishYN === "Y");
  const [isCenterHeartShown, setIsCenterHeartShown] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [recentViewedItems, setRecentViewedItems] = useRecoilState(
    recentViewedItemsState
  );

  const timeoutRef = useRef<NodeJS.Timeout>();
  const screen = useScreenSize();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccessToken: string | null =
        localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    }
  }, []);

  useEffect(() => {
    if (isCenterHeartShown) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsCenterHeartShown(false);
      }, 1000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isCenterHeartShown]);

  const handleLike = async () => {
    if (accessToken) {
      setIsCenterHeartShown(true);
      try {
        // 좋아요를 토글하여 업데이트
        const updatedWishYN = isLiked ? "N" : "Y";
        const updatedItem = { ...item, wishYN: updatedWishYN };

        console.log(updatedItem);

        // 서버에 업데이트된 정보를 저장하는 로직
        const likedResponse = await itemsApi.toggleWish(
          updatedItem.productId,
          accessToken
        );
        console.log(likedResponse);

        setIsLiked(updatedWishYN === "Y"); // 상태를 업데이트
        console.log(updatedItem);
      } catch (error) {
        console.log("찜하기 업데이트 에러", error);
      }
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  // brandId가 1인 경우 "CIDER"로 변경된 item 사용
  const updatedItem = updateBrandId(item);

  const handleItemClick = () => {
    console.log("클릭했넹?");
    const currentTime = Date.now();
    setClickCount(clickCount + 1);
    updateClickCount(item.productId, clickCount + 1); // 클릭 정보 업데이트
    updateLastClickTime(item.productId, currentTime); // 클릭 시간 업데이트
    console.log("마지막 클릭 시간 : " + lastClickTime);

    // 이미 포함된 productId가 있으면 해당 기록 삭제
    const updatedRecentViewedItems = recentViewedItems.filter(
      (productId) => productId !== item.productId
    );
    // 가장 최근 순으로 추가
    setRecentViewedItems([item.productId, ...updatedRecentViewedItems]);
    console.log("최근 본 상품 아톰에 추가했어~");

    router.push(item.href);
  };

  return (
    <div
      className={`relative mb-[10px] ${
        screen === "mobile" ? "w-[162px] h-[271px]" : "w-[222px] h-[361px]"
      }`}
    >
      {/* 상품 이미지 */}
      {/* 이미지 슬라이드 자동으로 넘기는거 싫으면 autoplay삭제*/}
      <div
        onClick={handleItemClick}
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
      {/* 좋아요 버튼 */}
      <button
        className="absolute top-2 right-3 w-7 h-7 z-10"
        onClick={handleLike}
      >
        <HeartIcon
          className={`w-7 h-7 transition duration-200 z-10${
            isLiked ? "text-red-500" : ""
          }`}
          fill={isLiked ? "#FC435A" : "none"}
          stroke={isLiked ? "none" : "#666666"}
        />
      </button>

      {/* 좋아요 클릭 시 */}
      <HeartIcon
        className={`absolute left-1/2 top-[calc(50%-2.5rem)] z-10 ${
          isCenterHeartShown ? "opacity-100 scale-100" : "opacity-0 scale-50"
        } w-[60px] h-[60px] text-red-500 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in`}
        fill="#FC435A"
      />

      <div
        className="mt-[10px] w-[222px] h-5 relative cursor-pointer"
        onClick={handleItemClick}
      >
        <p className="w-[222px] h-5  left-[25px] top-[321px] text-[15px] text-left text-black">
          {updatedItem.title}
        </p>
        <p className="w-[222px] h-5  left-[25px] top-[304px] text-[13px] text-left text-[#666]">
          {updatedItem.brandId}
        </p>
        <p className="w-[222px] h-5  left-[25px] top-[284px] text-[15px] font-bold text-left text-black">
          {parseInt(updatedItem.price).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default memo(Item);
