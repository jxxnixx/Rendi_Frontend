import React, { useState } from "react";
import { NextIcon, PreviousIcon } from "../icons";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;

      pages.push(
        <li key={i}>
          <a
            href="#"
            className={`px-3 py-2 leading-tight ${
              isActive
                ? "text-[#FC435A]" // 클릭된 페이지의 글씨체를 빨간색으로 변경
                : "text-gray-500 hover:text-gray-700" // hover 효과 추가
            } bg-white  ${
              isActive ? "pointer-events-none" : "hover:bg-gray-100" // 클릭된 페이지에서는 배경색 변경 없음
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex justify-center items-center -space-x-px">
        <li>
          <a
            href="#"
            className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700   ${
              currentPage === 1 ? "pointer-events-none" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <span className="sr-only">Previous</span>
            <PreviousIcon />
          </a>
        </li>
        {renderPageNumbers()}
        <li>
          <a
            href="#"
            className={`block px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700  ${
              currentPage === totalPages ? "pointer-events-none" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span className="sr-only">Next</span>
            <NextIcon />
          </a>
        </li>
      </ul>
    </nav>
  );
}
