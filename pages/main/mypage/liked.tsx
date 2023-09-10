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

function Liked() {
  // 전체 아이템의 개수와 총 페이지 수 계산
  const totalItems = dummyData.length;
  const itemsPerPage = 8;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지 상태값 추가
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 찜한 상품 목록 관리
  const [wishList, setWishList] = useState<Product[]>([]);

  useEffect(() => {
    // localStorage에서 accessToken을 가져옵니다.
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("액세스 토큰이 없습니다.");
      return;
    }

    // getWish API를 호출하여 찜한 상품 목록 가져오기
    const getWishList = async () => {
      try {
        console.log(accessToken);
        const getWishresponse: any = await itemsApi.getWish(accessToken);

        console.log(getWishresponse);

        if (getWishresponse.success) {
          // API 응답에서 찜한 상품 목록을 가져와 상태값으로 업데이트
          setWishList(getWishresponse.response.response.wishList);
        } else {
          console.error("API 호출 실패:", getWishresponse.error);
        }
      } catch (error) {
        // 에러 처리를 여기에서 수행합니다.
        console.error("찜한 상품 목록을 가져오는 중 에러 발생:", error);
      }
    };

    getWishList();
  }, []);

  // 현재 페이지에 해당하는 상품들을 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow: Product[] = dummyData.slice(startIndex, endIndex);

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
      </Layout>
    </>
  );
}

export default Liked;
