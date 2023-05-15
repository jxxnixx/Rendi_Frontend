import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import NavBar from "@/components/structure/NavBar";
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
      <div className="relative mt-[104px] flex w-full flex-col bg-slate-200 text-lg font-medium ">
        <NavBar />
        <ProdBar />
        <Items />
        <Pagination />
      </div>
    </Layout>
  );
}
