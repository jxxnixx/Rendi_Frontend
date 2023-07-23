// Pagination.tsx 파일

import React from "react";
import { NextIcon, PreviousIcon } from "../icons";

interface PaginationProps {
  currentPage: number; // 현재 페이지 번호
  totalPages: number; // 전체 페이지 수
  onPageChange: (pageNumber: number) => void; // 페이지 변경 시 호출되는 함수
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page: number) => {
    onPageChange(page); // 부모 컴포넌트(SearchResult)에서 제공하는 onPageChange 함수를 호출하여 currentPage를 업데이트합니다.
  };

  // 페이지 번호를 렌더링하는 함수
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
            className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700   ${
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
};

export default Pagination;
