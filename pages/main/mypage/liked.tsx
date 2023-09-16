import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { HeartIcon, Line } from "@/components/icons";
import Pagination from "@/components/structure/pagination";
import Items from "@/components/product/items";
import React, { useEffect, useState } from "react";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import Mymenus from "@/components/structure/mymenus";
import { itemsApi } from "@/libs/api";

export default function Liked() {
  const [accessToken, setAccessToken] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccessToken: string | null =
        localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    }
  }, []);

  // 현재 페이지 상태값 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [realItems, setRealItems] = useState<any>();

  const getWishList = async () => {
    try {
      console.log(accessToken);
      const getWishresponse: any = await itemsApi.getWish(accessToken);

      console.log(getWishresponse);

      setRealItems(getWishresponse.response.response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

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
    <>
      <Layout>
        <Head>
          <title>Profile</title>
        </Head>
        <Mymenus />
        <div className="flex justify-center  mt-[10px] ">
          <Line />
        </div>
        {/* 최근본상품 */}
        <div className="flex justify-center">
          <div className="flex-row  w-[1040px] h-[1234px] mt-[5px]">
            <div className="flex text-[12pt] font-medium  text-black">
              <div className="flex ml-[10px] mr-[5px] items-center h-[40px]">
                <HeartIcon
                  className={`w-7 h-7 transition duration-200 z-10`}
                  fill={"none"}
                  stroke={"#666666"}
                />
              </div>
              <p className="flex items-center h-[40px] ">찜한 상품</p>
            </div>
            <div className="flex items-end justify-center">
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
      </Layout>
    </>
  );
}
