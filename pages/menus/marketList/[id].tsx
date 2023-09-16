import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/layouts/layout";
import Head from "next/head";
import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";

export default function BrandPage() {
  const router = useRouter();
  const { id } = router.query; // 이 부분에서 동적 경로의 값인 brandId를 가져옵니다.

  const [activeCate, setActiveCate] = useState("전체");
  const totalItems = dummyData.length;
  const itemsPerPage = 16;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow: Product[] = dummyData.slice(startIndex, endIndex);

  return (
    <Layout>
      <Head>
        <title>Market</title>
      </Head>
      <div className="flex justify-center">
        <div className="mt-[135px] mobile:mt-[80px] w-full h-[400px] mobile:h-[250px] bg-[#FFE9EC]"></div>{" "}
      </div>
      <div className="flex w-full flex-col text-lg font-medium">
        <ProdBar
          category={"default"}
          activeCate={activeCate}
          setActiveCate={setActiveCate}
        />
        <div>
          <div className="pt-4 mobile:pt-4">
            <div className="flex w-full relative justify-center pt-1.5 pb-8 mobile:py-2">
              <Items itemsToShow={itemsToShow} itemsPerPage={itemsPerPage} />
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
