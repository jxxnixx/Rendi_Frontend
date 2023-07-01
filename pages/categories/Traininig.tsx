import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

const categoriesTraining = [
  { cate: "전체" },
  { cate: "트레이닝 하의" },
  { cate: "트레이닝 상의" },
  { cate: "트레이닝 세트" },
  { cate: "레깅스" },
];

export default function Training() {
  return (
    <Layout>
      <Head>
        <title>Training</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesTraining} />
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
