import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

const categoriesTop = [
  { cate: "전체" },
  { cate: "반소매 티셔츠" },
  { cate: "긴소매 티셔츠" },
  { cate: "블라우스" },
  { cate: "셔츠" },
  { cate: "민소매" },
  { cate: "니트" },
  { cate: "조끼" },
  { cate: "후드" },
  { cate: "맨투맨" },
];

export default function Top() {
  return (
    <Layout>
      <Head>
        <title>Top</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesTop} />
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
