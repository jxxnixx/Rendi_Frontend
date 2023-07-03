// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { memo } from "react";

// interface ItemProps {
//   item: string;
// }

// const Item = ({ item }: ItemProps) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isCenterHeartShown, setIsCenterHeartShown] = useState(false);
//   const timeoutRef = useRef<NodeJS.Timeout>();

//   useEffect(() => {
//     if (isCenterHeartShown) {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }

//       timeoutRef.current = setTimeout(() => {
//         setIsCenterHeartShown(false);
//       }, 1000);

//       return () => {
//         if (timeoutRef.current) {
//           clearTimeout(timeoutRef.current);
//         }
//       };
//     }
//   }, [isCenterHeartShown]);

//   const handleLike = () => {
//     setIsLiked((prevIsLiked) => !prevIsLiked);
//     if (!isLiked) {
//       setIsCenterHeartShown(true);
//     }
//   };

//   return (
//     <div className="relative mb-20 w-56 h-70 bg-white">
//       <a href="/login" className="relative w-56 h-69 inline-block">
//         <img
//           className="w-56 h-69 rounded-lg border-2 border-gray-100 shadow-md"
//           src="https://img1.shopcider.com/product/1679737221000-h2RfX5.jpg?x-oss-process=image/resize,w_700,m_lfit/quality,Q_80/format,webp"
//           alt="Item"
//         />
//       </a>
//       <button
//         className="absolute top-2 right-3 w-7 h-7 z-10"
//         onClick={handleLike}
//       >
//         <svg
//           className={`w-7 h-7 transition duration-200 ${
//             isLiked ? "text-red-500" : ""
//           }`}
//           viewBox="0 0 30 30"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M15.775 26.0125C15.35 26.1625 14.65 26.1625 14.225 26.0125C10.6 24.775 2.5 19.6125 2.5 10.8625C2.5 7 5.6125 3.875 9.45 3.875C11.725 3.875 13.7375 4.975 15 6.675C16.2625 4.975 18.2875 3.875 20.55 3.875C24.3875 3.875 27.5 7 27.5 10.8625C27.5 19.6125 19.4 24.775 15.775 26.0125Z"
//             fill={isLiked ? "#FC435A" : "none"}
//             stroke={isLiked ? "none" : "#666666"}
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             fillRule="evenodd"
//           />
//         </svg>
//       </button>
//       <svg
//         className={`absolute ${
//           isCenterHeartShown ? "opacity-100 scale-100" : "opacity-0 scale-50"
//         } text-red-500 transform translate-x-[-50%] -translate-y-1/2 transition-all duration-200 ease-in`}
//         style={{ left: "50%", top: "40%" }}
//         width="60"
//         height="60"
//         viewBox="0 0 30 30"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M15.775 26.0125C15.35 26.1625 14.65 26.1625 14.225 26.0125C10.6 24.775 2.5 19.6125 2.5 10.8625C2.5 7 5.6125 3.875 9.45 3.875C11.725 3.875 13.7375 4.975 15 6.675C16.2625 4.975 18.2875 3.875 20.55 3.875C24.3875 3.875 27.5 7 27.5 10.8625C27.5 19.6125 19.4 24.775 15.775 26.0125Z"
//           fill="#FC435A"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           fillRule="evenodd"
//         />
//       </svg>
//       <div className="w-56 h-15 relative">
//         <p className="relative h-5 text-lg font-bold text-left text-black">
//           {item} 56,500
//         </p>
//         <p className="relative h-5 text-base text-left text-gray-600">
//           {item} 히니크
//         </p>
//         <p className="relative h-5 text-lg text-left text-black">
//           {item} 브라운 항공점퍼
//         </p>
//       </div>
//     </div>
//   );
// };

// export default memo(Item);

import React, { useState, useRef, useEffect, memo } from "react";
import { HeartIcon } from "../icons";

interface ItemProps {
  item: string;
}

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

  return (
    <div className="relative mb-[10px] w-[222px] h-[361px]">
      {/* 상품 이미지 */}
      <a href="/404" className="relative  w-[222px] h-[278px] inline-block">
        <img
          className="w-56 h-69 rounded-lg border-2 border-gray-100 shadow-md"
          src="https://img1.shopcider.com/product/1679737221000-h2RfX5.jpg?x-oss-process=image/resize,w_700,m_lfit/quality,Q_80/format,webp"
          alt="Item"
        />
      </a>
      {/* 좋아요 버튼 */}
      <button
        className="absolute top-2 right-3 w-7 h-7 z-10"
        onClick={handleLike}
      >
        <HeartIcon
<<<<<<< HEAD
          className={`w-7 h-7 transition duration-200 z-10 ${
=======
          className={`w-7 h-7 transition duration-200 z-10${
>>>>>>> main
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
          브라운 항공점퍼
        </p>
        <p className="w-[222px] h-5  left-[25px] top-[304px] text-[13px] text-left text-[#666]">
          히니크
        </p>
        <p className="w-[222px] h-5  left-[25px] top-[284px] text-[15px] font-bold text-left text-black">
          56,500
        </p>
      </div>
    </div>
  );
};

export default memo(Item);
