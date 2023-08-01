import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React, { useState } from "react";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";

export default function Best() {
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
        <title>Best</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar
          category={"default"}
          activeCate={activeCate}
          setActiveCate={setActiveCate}
        />
        <div className="flex justify-center py-8">
          <Items itemsToShow={itemsToShow} itemsPerPage={itemsPerPage} />
        </div>
        <div className="flex justify-center py-1">
          {" "}
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
