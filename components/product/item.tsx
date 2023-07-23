import React, { useState, useRef, useEffect, memo } from "react";
import { HeartIcon } from "../icons";

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
}

// brandId가 1인 경우 "CIDER"로 변경하는 함수
const updateBrandId = (item: ItemProps["item"]) => {
  if (item.brandId === 1) {
    return { ...item, brandId: "CIDER" };
  }
  return item;
};

const Item = ({ item }: ItemProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isCenterHeartShown, setIsCenterHeartShown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

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

  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    if (!isLiked) {
      setIsCenterHeartShown(true);
    }
  };

  // brandId가 1인 경우 "CIDER"로 변경된 item 사용
  const updatedItem = updateBrandId(item);

  return (
    <div className="relative mb-[10px] w-[222px] h-[361px]">
      {/* 상품 이미지 */}
      <a href="/404" className="relative  w-[222px] h-[278px] inline-block">
        {updatedItem.imgUrls && updatedItem.imgUrls.length > 0 && (
          <img
            className="w-56 h-69 rounded-lg border-2 border-gray-100 shadow-md"
            src={updatedItem.imgUrls[0]}
            alt={updatedItem.title}
          />
        )}
      </a>
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

      <div className="mt-[22px] w-[222px] h-5 relative">
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
