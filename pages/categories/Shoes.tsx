import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

const categoriesShoes = [
  { cate: "전체" },
  { cate: "플랫/로퍼" },
  { cate: "블로퍼/뮬" },
  { cate: "스니커즈" },
  { cate: "샌들" },
  { cate: "힐" },
  { cate: "워커/부츠" },
  { cate: "슬리퍼/쪼리" },
  { cate: "기타" },
];

export default function Shoes() {
  return (
    <Layout>
      <Head>
        <title>Shoes</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white ">
        <ProdBar category={categoriesShoes} />
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
