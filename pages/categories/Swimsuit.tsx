import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

const categoriesSwimsuit = [
  { cate: "전체" },
  { cate: "비키니" },
  { cate: "원피스수영복" },
  { cate: "모노키니" },
  { cate: "비치상의" },
  { cate: "비치하의" },
  { cate: "래쉬가드" },
  { cate: "악세사리" },
  { cate: "아쿠아슈즈" },
];

export default function Swimsuit() {
  return (
    <Layout>
      <Head>
        <title>Swimsuit</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesSwimsuit} />
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
