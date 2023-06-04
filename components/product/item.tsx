import Link from "next/link";
import { useState } from "react";
import { memo } from "react";

interface ItemProps {
  item: string;
}

const Item = ({ item }: ItemProps) => {
  const [isLiked, setIsLiked] = useState<{ [key: string]: boolean }>({});

  const handleLike = () => {
    setIsLiked((prevIsLiked) => ({
      ...prevIsLiked,
      [item]: !prevIsLiked[item],
    }));
  };
  console.log(
    `isLiked ${item}:`,
    isLiked[item] !== undefined ? isLiked[item] : false
  );

  return (
    <>
      <div className="relative mb-[80px] w-[222px] h-[280px] bg-white ">
        <button className="flex items-center justify-center">
          {/* 링크 목적지 변경 필수 */}
          <Link href="/login" legacyBehavior>
            <img
              className="relative w-[222px] h-[278px] rounded-lg border-2 border-gray-100 shadow-md"
              src="https://img1.shopcider.com/product/1679737221000-h2RfX5.jpg?x-oss-process=image/resize,w_700,m_lfit/quality,Q_80/format,webp"
            />
          </Link>
          <svg // heart icon
            onClick={handleLike}
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill={isLiked[item] ? "#FC435A" : "none"}
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 30, height: 30 }}
            preserveAspectRatio="none"
            className="absolute right-[12px] top-[10px] "
          >
            <path
              d="M15.775 26.0125C15.35 26.1625 14.65 26.1625 14.225 26.0125C10.6 24.775 2.5 19.6125 2.5 10.8625C2.5 7 5.6125 3.875 9.45 3.875C11.725 3.875 13.7375 4.975 15 6.675C16.2625 4.975 18.2875 3.875 20.55 3.875C24.3875 3.875 27.5 7 27.5 10.8625C27.5 19.6125 19.4 24.775 15.775 26.0125Z"
              stroke={isLiked[item] ? "none" : "#666666"} // 테두리(border) 없음: "none", 테두리(border) 있음: "#666666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <div className="w-[222px] h-[60px] relative ">
          <p className="relative h-[20px] text-[15px] font-bold text-left text-[#000]">
            {item} 56,500
          </p>
          <p className="relative h-[20px] text-[13px] text-left text-[#666]">
            {item} 히니크
          </p>
          <p className="relative h-[20px] text-[15px] text-left text-[#000]">
            {item} 브라운 항공점퍼
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(Item);
