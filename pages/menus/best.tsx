import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

export default function Best() {
  return (
    <Layout>
      <Head>
        <title>Best</title>
      </Head>
      <div className="relative mt-[131px] flex w-full flex-col bg-slate-200 text-lg font-medium ">
        <ProdBar />
        <Items />
        <Pagination />
      </div>
    </Layout>
  );
}
