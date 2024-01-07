import { Line } from "@/components/icons";
import Items from "@/components/product/items";
import Prodlist from "@/components/sort/prodlist";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import { useScreenSize } from "@/libs/client/useScreen";
import itemsApi from "@/libs/api/itemsApi";

export default function All() {
  const screen = useScreenSize();
  const [filteredData, setFilteredData] = useState<any>(null);

  // 필터링된 데이터를 받아올 함수
  const handleFilteredData = (data: any) => {
    setFilteredData(data);
    console.log(data);
  };

  const [activeCate, setActiveCate] = useState<any>(null);

  // 현재 페이지 상태값 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [realItems, setRealItems] = useState<any>();

  const fetchNewProducts = async () => {
    try {
      const allProResponse: any = await itemsApi.allProductsForGuests(
        filteredData
      );
      console.log("상품 전체 : ", allProResponse);
      setRealItems(allProResponse.response.response);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    fetchNewProducts();
  }, [filteredData]);

  // 전체 아이템의 개수와 총 페이지 수 계산
  let totalItems = 0;
  if (realItems) {
    totalItems = realItems.length;
  }
  const itemsPerPage = 16;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 상품들을 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow: Product[] = realItems
    ? realItems.slice(startIndex, endIndex)
    : [];

  return (
    <Layout>
      <Head>
        <title>SearchResult</title>
      </Head>
      <div className="flex items-center justify-center">
        <div
          className={`flex-col  pb-[32px] ${
            screen === "mobile"
              ? "mt-[50px] w-full h-[135px]"
              : "mt-[135px] w-[1040px]"
          }`}
        >
          <div
            className={`flex items-end h-[40px]  ${
              screen === "mobile"
                ? "mobile:  mt-[35px] h-[30px] ml-[20px] w-full"
                : "top-[30px] w-[1040px]"
            }`}
          >
            <p
              className={`flex justify-start text-lg text-left ${
                screen === "mobile" ? "text-[10pt]  " : "text-lg"
              }`}
            >
              전체 상품
            </p>
          </div>
          <div className="overflow-x-auto scrollbar-hide flex w-[1040px] h-[60px] items-center mobile:w-full mobile:ml-[15px] mobile:h-[50px]  mobile:mr-[25px]">
            <Prodlist products={[]} onSendData={handleFilteredData} />
          </div>
          <div className="flex justify-center">
            <Line />
          </div>
        </div>
      </div>
      {/* <FilterPopup
        onApplyFilters={(filters) => console.log("Applied filters:", filters)}
        onResetFilters={() => console.log("Reset filters")}
      /> */}
      <div className="flex flex-col items-center justify-center">
        {/* Items 컴포넌트에 itemsPerPage를 전달 */}
        <Items
          itemsToShow={itemsToShow}
          itemsPerPage={itemsPerPage}
          allItems={realItems}
        />
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
