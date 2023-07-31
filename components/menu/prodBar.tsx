// import React, { useState } from "react";

// interface Category {
//   cate: string;
// }

// interface ProdBarProps {
//   category: "default" | Category[];
//   // 선택된 카테고리를 전달하기 위한 onCategoryClick prop을 추가합니다.
//   onCategoryClick: (cate: string) => void;
// }

// export default function ProdBar({ category, onCategoryClick }: ProdBarProps) {
//   const [activeCate, setActiveCate] = useState("전체");

//   const categoriesDefault: Category[] = [
//     { cate: "전체" },
//     { cate: "상의" },
//     { cate: "아우터" },
//     { cate: "원피스/세트" },
//     { cate: "팬츠" },
//     { cate: "스커트" },
//     { cate: "트레이닝" },
//     { cate: "가방" },
//     { cate: "언더웨어" },
//     { cate: "비치웨어" },
//     { cate: "패션잡화" },
//     { cate: "기타" },
//   ];

//   const handleButtonClick = (cate: string) => {
//     setActiveCate(cate);
//     // onCategoryClick 콜백 함수를 호출하여 선택된 카테고리를 전달합니다.
//     onCategoryClick(cate);
//   };

//   let categories: Category[];

//   if (category === "default") {
//     categories = categoriesDefault;
//   } else {
//     categories = category as Category[];
//   }

//   return (
//     <nav className="relative h-[60px] text-[14px] text-[#666] bg-white py-[11px] text-base flex shadow-md space-x-[60px] items-center justify-center">
//       {categories.map(({ cate }) => (
//         <button
//           key={cate}
//           onClick={() => handleButtonClick(cate)}
//           className={`${
//             activeCate === cate ? "text-black" : ""
//           } hover:text-black`}
//         >
//           <p>{cate}</p>
//         </button>
//       ))}
//     </nav>
//   );
// }
// // import React, { useState } from "react";

// // interface Category {
// //   cate: string;
// // }

// // interface ProdBarProps {
// //   category: "default" | Category[] | undefined;
// // }

// // export default function ProdBar({ category }: ProdBarProps) {
// //   const [activeCate, setActiveCate] = useState("전체");

// //   const categoriesDefault: Category[] = [
// //     { cate: "전체" },
// //     { cate: "상의" },
// //     { cate: "아우터" },
// //     { cate: "원피스/세트" },
// //     { cate: "팬츠" },
// //     { cate: "스커트" },
// //     { cate: "트레이닝" },
// //     { cate: "가방" },
// //     { cate: "언더웨어" },
// //     { cate: "비치웨어" },
// //     { cate: "패션잡화" },
// //     { cate: "기타" },
// //   ];

// //   const handleButtonClick = (cate: string) => {
// //     setActiveCate(cate);
// //   };

// //   let categories: Category[];

// //   if (category === "default") {
// //     categories = categoriesDefault;
// //   } else {
// //     categories = category || [];
// //   }

// //   return (
// //     <nav className="relative h-[60px] text-[14px] text-[#666] bg-white py-[11px] text-base flex shadow-md space-x-[60px] items-center justify-center">
// //       {categories.map(({ cate }) => (
// //         <button
// //           key={cate}
// //           onClick={() => handleButtonClick(cate)}
// //           className={`${
// //             activeCate === cate ? "text-black" : ""
// //           } hover:text-black`}
// //         >
// //           <p>{cate}</p>
// //         </button>
// //       ))}
// //     </nav>
// //   );
// // }
import React, { useState, useEffect } from "react";
import { atomActiveCate } from "@/libs/client/atom";
import { useSetRecoilState, useRecoilValue } from "recoil";

interface Category {
  cate: string;
}

interface ProdBarProps {
  id: string;
  category: "default" | Category[];
}

export default function ProdBar({ id, category }: ProdBarProps) {
  const setActiveCate = useSetRecoilState(atomActiveCate);
  const activeCate = useRecoilValue(atomActiveCate); // Recoil의 atomActiveCate 값 가져오기

  // activeCate 값 사용
  useEffect(() => {
    console.log("category:", id, " activeCate:", activeCate, "2");
  }, [id, activeCate]);

  const categoriesDefault: Category[] = [
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

  let categories: Category[];

  if (category === "default") {
    categories = categoriesDefault;
  } else {
    categories = category as Category[];
  }

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
