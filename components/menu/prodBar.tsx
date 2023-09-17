import React, { useState, useLayoutEffect } from "react";

interface Category {
  cate: string;
}

interface ProdBarProps {
  category: "default" | Category[];
  setActiveCate: (cate: string) => void;
  activeCate: string;
}

export default function ProdBar({
  category,
  setActiveCate,
  activeCate,
}: ProdBarProps) {
  const categoriesDefault: Category[] = [
    { cate: "전체" },
    { cate: "상의" },
    { cate: "아우터" },
    { cate: "원피스/세트" },
    { cate: "바지" },
    { cate: "스커트" },
    { cate: "트레이닝" },
    { cate: "이너웨어" },
    { cate: "수영복" },
    { cate: "가방" },
    { cate: "패션잡화" },
  ];

  const handleButtonClick = (cate: string) => {
    setActiveCate(cate);
  };

  let categories: Category[];

  if (category === "default") {
    categories = categoriesDefault;
  } else {
    categories = category as Category[];
  }

  return (
    <nav className="relative h-[60px] mobile:h-[40px] text-[#666] bg-white py-[11px] flex shadow-md space-x-[60px] mobile:space-x-[10px] items-center justify-center mobile:justify-start mobile:pl-4 mobile:overflow-scroll mobile:scrollbar-hide">
      {categories.map(({ cate }) => (
        <button
          key={cate}
          onClick={() => handleButtonClick(cate)}
          className={` ${
            activeCate === cate ? "text-black" : ""
          } hover:text-black`}
        >
          <p className="mobile:text-[9pt] mobile:m-1 overflow-x-auto whitespace-nowrap">
            {cate}
          </p>
        </button>
      ))}
    </nav>
  );
}
