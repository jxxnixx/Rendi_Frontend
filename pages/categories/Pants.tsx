import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

const categoriesPants = [
  { cate: "전체" },
  { cate: "롱팬츠" },
  { cate: "숏팬츠" },
  { cate: "슬랙스" },
  { cate: "데님" },
];

export default function Pants() {
  return (
    <Layout>
      <Head>
        <title>Pants</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesPants} />
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
