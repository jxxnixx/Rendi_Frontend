import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { HeartIcon, Line } from "@/components/icons";
import Pagination from "@/components/structure/pagination";
import Items from "@/components/product/items";
import React, { useState } from "react";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";

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
        <div className="flex justify-center items-center">
          <div className="flex justify-center w-[1040px] h-[98px] mt-[135px] bg-blue">
            <Link href="/auth/profile" legacyBehavior>
              <button className="flex justify-center  left-[441buttonx] mt-[35px] text-[21pt] font-semibold text-left text-black hover:text-mc">
                마이페이지
              </button>
            </Link>
          </div>
        </div>
        {/* 버튼 */}
        <div className="flex justify-center items-center mt-[0px] opacity-90 gap-[100px] bg-white">
          <Link href="/auth/profile/liked" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-mc hover:text-mc">
              찜한 상품
            </button>
          </Link>

          <Link href="/auth/profile/likedMarket" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              즐겨찾기 마켓
            </button>
          </Link>

          <Link href="/auth/profile/contact" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              고객센터
            </button>
          </Link>

          <Link href="/auth/profile/terms" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              이용약관
            </button>
          </Link>
        </div>

        <div className="flex justify-center  mt-[10px] ">
          <Line />
        </div>
        {/* 최근본상품 */}
        <div className="flex justify-center">
          <div className="flex-row  w-[1040px] h-[834px]">
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
