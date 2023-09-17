import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/layouts/layout";
import Head from "next/head";
import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import { marketApi } from "@/libs/api";

export default function BrandPage() {
  const router = useRouter();
  const { id }: any = router.query; // 이 부분에서 동적 경로의 값인 brandId를 가져옵니다.

  const [activeCate, setActiveCate] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [realItems, setRealItems] = useState<any>();

  const fetchMarketProducts = async () => {
    console.log(id);
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);

      if (accessToken) {
        const newProResponse: any = await marketApi.brandDetailsForUsers(
          id,
          accessToken
        );
        console.log("마켓 상품 목록 : ", newProResponse);

        console.log(newProResponse.response.response.responseList);
        setRealItems(newProResponse.response.response.responseList);
      } else {
        console.log("accessToken이 없습니다.");
      }
    } catch (error) {
      console.log("마켓별 불러오기 실패!");
    }
  };

  useEffect(() => {
    fetchMarketProducts();
  }, []);

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
              <Items
                itemsToShow={itemsToShow}
                itemsPerPage={itemsPerPage}
                allItems={realItems}
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
