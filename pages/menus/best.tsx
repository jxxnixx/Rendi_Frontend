import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React, { useLayoutEffect, useState } from "react";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import itemsApi from "@/libs/api/itemsApi";

export default function Best() {
  const [activeCate, setActiveCate] = useState<any>(null);

  // 현재 페이지 상태값 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [realItems, setRealItems] = useState<any>();

  const fetchNewProducts = async () => {
    try {
      if (activeCate === "전체") {
        setActiveCate(null);
        return;
      }
      const bestProResponse: any = await itemsApi.bestProductsForGuests(
        activeCate
      );
      console.log("best 상품 목록 : ", bestProResponse);
      setRealItems(bestProResponse.response.response);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    fetchNewProducts();
  }, [activeCate]);

  console.log(realItems);

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
        <title>Best</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white mobile:mt-[90px] ">
        <ProdBar
          category={"default"}
          activeCate={activeCate}
          setActiveCate={setActiveCate}
        />
        <div className="flex justify-center py-8 mobile:py-3">
          <Items
            itemsToShow={itemsToShow}
            itemsPerPage={itemsPerPage}
            allItems={realItems}
          />
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
