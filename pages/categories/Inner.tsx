import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

export default function Inner() {
  const categoriesInner = [
    { cate: "전체" },
    { cate: "브라" },
    { cate: "팬티" },
    { cate: "속옷세트" },
    { cate: "이너" },
    { cate: "보정" },
  ];

  return (
    <Layout>
      <Head>
        <title>Inner</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesInner} />
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
