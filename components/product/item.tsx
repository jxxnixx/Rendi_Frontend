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

// import React, { useState, useRef, useEffect, memo } from "react";
// import { HeartIcon } from "../icons";

// interface ItemProps {
//   item: {
//     productId: number;
//     price: string;
//     brandId: number;
//     title: string;
//     wishYN: string;
//     imgUrls: string[];
//     href: string;
//   };
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
//     <div className="relative mb-[10px] w-[222px] h-[361px]">
//       {/* 상품 이미지 */}
//       <a href={item.href} className="relative w-[222px] h-[278px] inline-block">
//         <img
//           className="w-56 h-69 rounded-lg border-2 border-gray-100 shadow-md"
//           src={item.imgUrls[0]}
//           alt={item.title}
//         />
//       </a>
//       {/* 좋아요 버튼 */}
//       <button
//         className="absolute top-2 right-3 w-7 h-7 z-10"
//         onClick={handleLike}
//       >
//         <HeartIcon
//           className={`w-7 h-7 transition duration-200 z-10${
//             isLiked ? "text-red-500" : ""
//           }`}
//           fill={isLiked ? "#FC435A" : "none"}
//           stroke={isLiked ? "none" : "#666666"}
//         />
//       </button>

//       {/* 좋아요 클릭 시 */}
//       <HeartIcon
//         className={`absolute left-1/2 top-[calc(50%-2.5rem)] z-10 ${
//           isCenterHeartShown ? "opacity-100 scale-100" : "opacity-0 scale-50"
//         } w-[60px] h-[60px] text-red-500 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in`}
//         fill="#FC435A"
//       />

//       <div className="mt-[22px] w-[222px] h-5 relative">
//         <p className="w-[222px] h-5  left-[25px] top-[321px] text-[15px] text-left text-black">
//           {item.title}
//         </p>
//         <p className="w-[222px] h-5  left-[25px] top-[304px] text-[13px] text-left text-[#666]">
//           {item.brandId}
//         </p>
//         <p className="w-[222px] h-5  left-[25px] top-[284px] text-[15px] font-bold text-left text-black">
//           {item.price}
//         </p>
//       </div>
//     </div>
//   );
// };
