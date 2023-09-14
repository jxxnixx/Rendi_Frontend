import HoriCategory from "@/components/category/horiCategory";
import Banner from "@/components/structure/banner";
import Layout from "@/layouts/layout";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Items from "@/components/product/items";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useScreenSize } from "@/libs/client/useScreen";
import { itemsApi } from "@/libs/api";

const Home: NextPage = () => {
  const [accessToken, setAccessToken] = useState<string>(" ");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccessToken: string | null =
        localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    }
  }, []);

  const fetchNewProducts = async () => {
    try {
      const bestProResponse: any = await itemsApi.todayProducts(
        [1, 2, 3], // interests 받아오는 걸로 수정
        accessToken
      );
      console.log("best 상품 목록 : ", bestProResponse);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className="relative mt-[135px] bg-slate-200 mobile:mt-[85px]">
        <div className="bg-white">
          <div className="flex justify-center">
            <Banner />
          </div>
          <div className="flex justify-center mobile:w-full">
            {/* 스크롤 가능한 영역 */}
            <div className="overflow-x-scroll scrollbar-hide">
              <HoriCategory />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex-row w-[1040px] mobile:w-full">
              <div className="flex justify-between text-[12pt] font-medium text-black">
                <p className="ml-[30px] mt-[10px]">이번주 신제품</p>

                <Link href="/menus/new">
                  <button className="h-[34px] flex items-end">
                    <p className="">More</p>
                    <span className="text-[18px] ml-[2px] mr-[30px]"> +</span>
                  </button>
                </Link>
              </div>
              <div className="flex justify-center ">
                <Items itemsPerPage={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
