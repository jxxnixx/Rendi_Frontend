import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

const categoriesDress = [
  { cate: "전체" },
  { cate: "미니원피스" },
  { cate: "롱원피스" },
  { cate: "투피스" },
  { cate: "점프수트" },
];

export default function Dress() {
  return (
    <Layout>
      <Head>
        <title>Dress</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesDress} />
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
