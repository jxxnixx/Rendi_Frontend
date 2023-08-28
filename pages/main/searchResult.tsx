import { Line } from "@/components/icons";
import Items from "@/components/product/items";
import Prodlist from "@/components/sort/prodlist";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import FilterPopup from "@/components/sort/filterPopup";
import { useScreenSize } from "@/libs/client/useScreen";

export default function SearchResult() {
  const router = useRouter();
  const { search, image } = router.query;
  useEffect(() => {
    console.log("검색어:", search);
    console.log("이미지:", image);
  }, [router.query]);

  // 전체 아이템의 개수와 총 페이지 수 계산
  const totalItems = dummyData.length;
  const itemsPerPage = 16;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지 상태값 추가
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 상품들을 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow: Product[] = dummyData.slice(startIndex, endIndex);
  const screen = useScreenSize();

  return (
    <Layout>
      <Head>
        <title>SearchResult</title>
      </Head>
      <div className="flex items-center justify-center">
        <div
          className={`flex-col  pb-[32px] ${
            screen === "mobile" ? "mt-[50px] w-full" : "mt-[135px] w-[1040px]"
          }`}
        >
          <div
            className={`flex items-center h-[60px] ${
              screen === "mobile"
                ? "mobile:mt-[25px] ml-[20px] w-full"
                : "top-[30px] w-[1040px]"
            }`}
          >
            <p
              className={`flex justify-start text-lg text-left ${
                screen === "mobile" ? "text-sm" : "text-lg"
              }`}
            >
              {/* <div className="flex-col pb-[32px] mt-[135px] w-[1040px] mobile:mt-[50px] mobile:w-[640px]">
          <div className="flex items-center h-[60px] top-[30px] mobile:mt-[25px] mobile:ml-[10px] mobile:w-[640px]">
            <p className="flex justify-start text-left text-lg mobile:text-sm"> */}
              “<span className="text-[#fc435a]">{search}</span>” 검색결과 ( 전체
              <span className="text-[#fc435a]">{totalItems}</span>개의 상품 )
            </p>
          </div>
          <div className="flex w-[1040px] h-[60px] items-center top-[30px] mobile:w-full mobile:ml-[15px]">
            <Prodlist products={[]} />
          </div>
          <Line />
        </div>
      </div>
      {/* <FilterPopup
        onApplyFilters={(filters) => console.log("Applied filters:", filters)}
        onResetFilters={() => console.log("Reset filters")}
      /> */}
      <div className="flex flex-col items-center justify-center">
        {/* Items 컴포넌트에 itemsPerPage를 전달 */}
        <Items itemsToShow={itemsToShow} itemsPerPage={itemsPerPage} />
        {/* Pagination 컴포넌트에 현재 페이지와 총 페이지 수, 페이지 변경 함수를 전달 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
}
