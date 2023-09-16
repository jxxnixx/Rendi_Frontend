import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import { marketApi } from "@/libs/api";

export default function Market() {
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

  const fetchMarketList = async () => {
    try {
      const allMarketBrandsResponse: any = await marketApi.allBrands();

      console.log(allMarketBrandsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMarketList();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Market</title>
      </Head>
      <div className="flex justify-center">
        <div className="mt-[135px] mobile:mt-[80px] w-full h-[400px] mobile:h-[250px] bg-[#FFE9EC]"></div>{" "}
      </div>

      <div className="flex w-full flex-col text-lg font-medium ">
        <ProdBar
          category={"default"}
          activeCate={activeCate}
          setActiveCate={setActiveCate}
        />
        <div>
          <div className="pt-4 mobile:pt-4">
            <div className="flex w-full relative justify-center pt-1.5 pb-8 mobile:py-2"></div>
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
