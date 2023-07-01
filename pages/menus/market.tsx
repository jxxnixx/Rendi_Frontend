import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

export default function Market() {
  return (
    <Layout>
      <Head>
        <title>Market</title>
      </Head>
      <div className="flex justify-center">
        <div className=" mt-[135px] w-[1040px]  h-[400px] bg-[#FFE9EC]"></div>{" "}
      </div>

      <div className="flex  w-full flex-col text-lg font-medium ">
        <ProdBar category={"default"} />
        <div className="flex justify-center ">
          <div className=" pt-[9px]">
            <button className=" justify-center w-[100px] h-[30px] mb-[4px] ml-[25px] text-[11pt] text-[#666666]">
              이번주 신제품
            </button>
            <Items />
          </div>
        </div>
        <div className="flex justify-center py-1">
          <Pagination />
        </div>
      </div>
    </Layout>
  );
}
