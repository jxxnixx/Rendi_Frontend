import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import NavBar from "@/components/structure/NavBar";
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
      <div className="relative mt-[104px] flex w-full flex-col bg-slate-200 text-lg font-medium ">
        <NavBar />
        <ProdBar />
        <Items />
        <Pagination
          currentPage={0}
          totalPages={0}
          onPageChange={function (page: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </Layout>
  );
}
