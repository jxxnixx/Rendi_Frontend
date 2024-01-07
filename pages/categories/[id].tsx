import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import skirtDummyData from "@/components/product/skirtDummyData.json";
import miniSkirtDummyData from "@/components/product/miniSkirtDummyData.json";
import { Categories } from "@/components/category/categories";
import itemsApi from "@/libs/api/itemsApi";
import { getKeyword } from "@/components/category/circle";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const parentsCate: string = `${getKeyword(id)}`;

  const [activeCate, setActiveCate] = useState<any>(null);

  // 현재 페이지 상태값 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [realItems, setRealItems] = useState<any>();

  const selectedCategory = Categories[id as string];

  const fetchCategories = async () => {
    try {
      console.log(parentsCate, activeCate);
      const cateProResponse: any = await itemsApi.categoriesForGuests(
        parentsCate,
        activeCate
      );

      console.log("best 상품 목록 : ", cateProResponse);
      setRealItems(cateProResponse.response.response);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    fetchCategories();
  }, [activeCate]);

  // // 상품 데이터를 가져올 때, 카테고리에 따라 다른 데이터를 사용
  // let dataToUse;
  // if (id === "skirt" && activeCate === "전체") {
  //   dataToUse = skirtDummyData;
  // } else if (id === "skirt" && activeCate === "미니스커트") {
  //   dataToUse = miniSkirtDummyData;
  // } else {
  //   dataToUse = dummyData;
  // }

  if (!selectedCategory) {
    return <div>Invalid category</div>;
  }

  const categoryName = selectedCategory[0].cate;

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
        <title>{categoryName}</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white mobile:mt-[90px]">
        <ProdBar
          category={selectedCategory}
          activeCate={activeCate}
          setActiveCate={setActiveCate}
        />
        <div className="flex justify-center py-8 mobile:py-3">
          <Items
            itemsPerPage={16}
            itemsToShow={itemsToShow}
            allItems={realItems}
          />
        </div>
        <div className="flex justify-center py-1">
          {/* Pagination 컴포넌트에 현재 페이지와 총 페이지 수, 페이지 변경 함수를 전달 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
