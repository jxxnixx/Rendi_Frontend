import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

export default function New() {
  return (
    <Layout>
      <Head>
        <title>New</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col bg-white text-lg font-medium ">
        <ProdBar />
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
