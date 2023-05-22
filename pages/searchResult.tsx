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
        <title>SearchResult</title>
      </Head>
      <div>
        <div className="relative mt-[135px] flex flex-col bg-white text-lg font-medium justify-center items-center">
          <p className="absolute top-[21px] text-lg text-left">
            <span className="text-lg text-left text-black">“</span>
            <span className="text-lg text-left text-[#fc435a]">검색어</span>
            <span className="text-lg text-left text-black">
              ” 검색결과 ( 전체{" "}
            </span>
            <span className="text-lg text-left text-[#fc435a]">234</span>
            <span className="text-lg text-left text-black">개의 상품 )</span>
          </p>
        </div>
        <div className="mx-auto">
          <Prodlist products={[]} />
          <Pagination />
        </div>
      </div>
    </Layout>
  );
}
