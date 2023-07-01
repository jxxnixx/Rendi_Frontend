import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

export default function Skirt() {
  const categoriesSkirt = [
    { cate: "전체" },
    { cate: "미니스커트" },
    { cate: "롱스커트" },
    { cate: "미디스커트" },
  ];

  return (
    <Layout>
      <Head>
        <title>Skirt</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesSkirt} />
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
