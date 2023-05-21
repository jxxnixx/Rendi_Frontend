import React, { useState } from "react";

enum SortOrder {
  Recommended = "recommended", // 추천순
  Popularity = "popularity", // 인기순
  PriceLowToHigh = "priceLowToHigh", // 낮은 가격순
}

interface SDropdownProps {
  options: { label: string; value: SortOrder }[]; // 드롭다운 항목들의 배열
  onSelect: (selectedOrder: SortOrder) => void; // 선택된 정렬 순서를 전달하는 콜백 함수
  defaultValue: SortOrder; // 기본 정렬 순서
}

export default function SDropdown({
  options,
  onSelect,
  defaultValue,
}: SDropdownProps) {
  const [selectedOrder, setSelectedOrder] = useState(defaultValue); // 선택된 정렬 순서 상태

  // 항목 선택 이벤트 처리 함수
  const handleOptionSelect = (order: SortOrder) => {
    setSelectedOrder(order); // 선택된 정렬 순서 업데이트
    onSelect(order); // 선택된 정렬 순서를 콜백 함수로 전달
  };

  return (
    <select
      value={selectedOrder}
      onChange={(e) => handleOptionSelect(e.target.value as SortOrder)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-2.5 p-2.5">
//   <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1.5 p-2 rounded-[40px] bg-white border border-[#666]">
//     <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#424242]">추천순</p>
//     <svg
//       width={16}
//       height={16}
//       viewBox="0 0 16 16"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="flex-grow-0 flex-shrink-0 w-4 h-4 relative"
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M2.64645 5.64645C2.84171 5.45118 3.15829 5.45118 3.35355 5.64645L8 10.2929L12.6464 5.64645C12.8417 5.45118 13.1583 5.45118 13.3536 5.64645C13.5488 5.84171 13.5488 6.15829 13.3536 6.35355L8.35355 11.3536C8.15829 11.5488 7.84171 11.5488 7.64645 11.3536L2.64645 6.35355C2.45118 6.15829 2.45118 5.84171 2.64645 5.64645Z"
//         fill="#424242"
//       />
//     </svg>
//   </div>
// </div>;
