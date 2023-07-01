import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

const categoriesETC = [{ cate: "전체" }];

export default function ETC() {
  return (
    <Layout>
      <Head>
        <title>ETC</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesETC} />
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
