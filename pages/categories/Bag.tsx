import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

const categoriesBag = [
  { cate: "전체" },
  { cate: "백팩" },
  { cate: "크로스백" },
  { cate: "숄더백" },
  { cate: "토트백" },
  { cate: "클러치" },
  { cate: "에코백" },
  { cate: "파우치" },
  { cate: "지갑" },
  { cate: "캐리어" },
];

export default function Bag() {
  return (
    <Layout>
      <Head>
        <title>Bag</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesBag} />
        <div className="flex justify-center py-8">
          <Items />
        </div>
        <div className="flex justify-center py-1">
          <Pagination />
        </div>
      </div>
    </Layout>
  );
}
