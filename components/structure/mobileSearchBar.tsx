import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useRouter } from "next/router";

interface MobileSearchBarProps {
  onClose: () => void; // 팝업 닫기 핸들러
}

export default function MobileSearchBar({ onClose }: any) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [imageValue, setImageValue] = useState(""); // State to store the image value

  const handleSearch = () => {
    // Search logic here
    console.log("Search query:", searchQuery);
    console.log("Image value:", imageValue);

    onClose(); // Close the popup

    // Construct the URL with searchQuery and imageValue and navigate
    router.push(`/searchResult?search=${searchQuery}&image=${imageValue}`);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-40">
      {/* 검색창 */}
      <div className="p-4 flex justify-between items-center">
        {/* Left arrow icon to close popup */}
        <LeftOutlined onClick={onClose} className="text-2xl cursor-pointer" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="border border-gray-300 rounded w-full py-2 px-3"
        />
      </div>
      {/* 최근 검색어와 인기 검색어 */}
      <div className="p-4">
        {/* 최근 검색어 */}
        <h2 className="text-lg font-semibold mb-2">최근 검색어</h2>
        {/* 여기에 최근 검색어 컴포넌트를 추가하세요 */}

        {/* 인기 검색어 */}
        <h2 className="text-lg font-semibold mt-4 mb-2">인기 검색어</h2>
        {/* 여기에 인기 검색어 컴포넌트를 추가하세요 */}
      </div>
      {/* 검색 버튼 */}
      <div className="p-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          검색
        </button>
      </div>
    </div>
  );
}
