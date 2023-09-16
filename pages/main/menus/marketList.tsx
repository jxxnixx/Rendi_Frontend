import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React, { useState } from "react";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import MarketItems from "../../../components/product/marketitems";

export default function MarketList() {
  const [activeCate, setActiveCate] = useState("전체");
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

  return (
    <Layout>
      <Head>
        <title>Market</title>
      </Head>

      <div className="flex justify-center">
        <div className="flex justify-center items-end font-bold mt-[135px] mobile:items-center mobile:mt-[105px] w-[1040px] h-[50px] mobile:h-[50px]   ">
          마켓 모아보기
        </div>
      </div>
      <div className="flex w-full flex-col text-lg font-medium  ">
        <div>
          <div className="pt-[15px] mobile:pt-4">
            <div className="flex w-full relative justify-center pt-1.5 pb-8 mobile:py-2">
              {/* <Items itemsToShow={itemsToShow} itemsPerPage={itemsPerPage} /> */}
              <MarketItems
                itemsToShow={itemsToShow}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center py-1">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
