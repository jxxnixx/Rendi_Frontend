import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import { itemsApi } from "@/libs/api";

export default function New() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccessToken: string | null =
        localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    }
  }, []);

  const [activeCate, setActiveCate] = useState<string>(" ");
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

  const fetchNewProducts = async () => {
    if (accessToken) {
      try {
        const newProResponse: any = await itemsApi.newProductsForUsers(
          activeCate,
          accessToken
        );
        console.log("new 상품 목록 : ", newProResponse);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchNewProducts();
  }, [activeCate]);

  return (
    <Layout>
      <Head>
        <title>New</title>
      </Head>

      <div className="relative mt-[135px] flex w-full flex-col bg-white text-lg font-medium mobile:mt-[90px]">
        <ProdBar
          category={"default"}
          activeCate={activeCate}
          setActiveCate={setActiveCate}
        />
        <div className="flex justify-center py-8 mobile:py-3">
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
