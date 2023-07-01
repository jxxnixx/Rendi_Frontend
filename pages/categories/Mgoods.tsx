import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";
const categoriesMgoods = [
  { cate: "전체" },
  { cate: "헤어" },
  { cate: "모자" },
  { cate: "아이웨어" },
  { cate: "머플러/스카프" },
  { cate: "장갑" },
  { cate: "벨트" },
  { cate: "양말/스타킹" },
  { cate: "시계" },
  { cate: "마스크" },
  { cate: "기타" },
];

export default function Mgoods() {
  return (
    <Layout>
      <Head>
        <title>Mgoods</title>
      </Head>

      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesMgoods} />
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
