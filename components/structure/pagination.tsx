import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  currentPage: number; // 현재 페이지 번호
  totalPages: number; // 전체 페이지 수
  onPageChange: (pageNumber: number) => void; // 페이지 변경 시 호출되는 함수
}

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page: number) => {
    onPageChange(page); // 부모 컴포넌트(SearchResult)에서 제공하는 onPageChange 함수를 호출하여 currentPage를 업데이트합니다.
  };

  return (
    <Stack spacing={1} direction="row">
      <Pagination
        count={totalPages}
        page={currentPage}
        color="primary"
        onChange={(event, page) => handlePageChange(page)}
        sx={{
          "& .Mui-selected": {
            backgroundColor: "white", // bg-color 투명
            color: "#FC435A",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "transparent", // hover 시 bg-color 투명
            color: "#FC435A",
          },
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
