import { Line } from "@/components/icons";
import Items from "@/components/product/items";
import Items8 from "@/components/product/items8";
import Prodlist from "@/components/sort/prodlist";
import BrLine from "@/components/structure/brLine";
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
      <div className="flex items-center justify-center">
        <div className="flex-col w-[1040px] pb-[32px]">
          <div className="flex items-center w-[1040px] h-[60px] mt-[135px] text-lg font-medium ">
            <p className="flex justify-start text-lg text-left">
              “<span className="text-[#fc435a]">검색어</span>” 검색결과 ( 전체
              <span className="text-[#fc435a]">234</span>
              개의 상품 )
            </p>
          </div>
          <div className="flex w-[1040px] h-[60px] items-center top-[30px]">
            <Prodlist products={[]} />
          </div>
          <Line />
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center">
        <Items8 />
        <Items8 />
        <Pagination />
      </div>
    </Layout>
  );
}
