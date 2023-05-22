import Prodlist from "@/components/sort/prodlist";
import NavBar from "@/components/structure/NavBar";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

export default function searchResult() {
  return (
    <Layout>
      <Head>
        <title>Best</title>
      </Head>
      <div className="relative mt-[104px] flex w-full flex-col bg-slate-200 text-lg font-medium">
        <div className="w-[1040px] h-[60px] relative overflow-hidden bg-white">
          <NavBar />
          <div className="absolute left-[-201px] top-[361px]" />
          <p className="absolute left-2.5 top-[21px] text-lg text-left">
            <span className="text-lg text-left text-black">“</span>
            <span className="text-lg text-left text-[#fc435a]">검색어</span>
            <span className="text-lg text-left text-black">
              ” 검색결과 ( 전체{" "}
            </span>
            <span className="text-lg text-left text-[#fc435a]">234</span>
            <span className="text-lg text-left text-black">개의 상품 )</span>
          </p>
        </div>
        <div className="w-[1040px] mx-auto">
          <Prodlist products={[]} />
          <Pagination />
        </div>
      </div>
    </Layout>
  );
}
