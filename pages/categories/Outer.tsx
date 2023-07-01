import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

const categoriesOuter = [
  { cate: "전체" },
  { cate: "가디건" },
  { cate: "바람막이" },
  { cate: "자켓" },
  { cate: "코트" },
  { cate: "패딩" },
  { cate: "플리스" },
  { cate: "집업/점퍼" },
  { cate: "야상" },
];

export default function Outer() {
  return (
    <Layout>
      <Head>
        <title>Outer</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesOuter} />
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
