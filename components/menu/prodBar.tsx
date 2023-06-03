import React, { useState } from "react";

export default function ProdBar() {
  const [activeCate, setActiveCate] = useState("전체");
  const categories = [
    { cate: "전체" },
    { cate: "상의" },
    { cate: "아우터" },
    { cate: "원피스/세트" },
    { cate: "팬츠" },
    { cate: "스커트" },
    { cate: "트레이닝" },
    { cate: "가방" },
    { cate: "언더웨어" },
    { cate: "비치웨어" },
    { cate: "패션잡화" },
    { cate: "기타" },
  ];

  const handleButtonClick = (cate: string) => {
    setActiveCate(cate);
  };

  return (
    <nav className="relative h-[60px] text-[14px] text-[#666] bg-white py-[11px] text-base flex shadow-md space-x-[60px] items-center justify-center">
      {categories.map(({ cate }) => (
        <button
          key={cate}
          onClick={() => handleButtonClick(cate)}
          className={`${
            activeCate === cate ? "text-black" : ""
          } hover:text-black`}
        >
          <p>{cate}</p>
        </button>
      ))}
    </nav>
  );
}
