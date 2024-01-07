import HoriCategory from "@/components/category/horiCategory";
import Banner from "@/components/structure/banner";
import Layout from "@/layouts/layout";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Items from "@/components/product/items";
import React, { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { useScreenSize } from "@/libs/client/useScreen";
import itemsApi from "@/libs/api/itemsApi";
import { Product } from "@/components/product/DataTypes";

const Home: NextPage = () => {
  const router = useRouter();

  const [realItems, setRealItems] = useState<any>();
  const [activeCate, setActiveCate] = useState<any>(null);

  const fetchNewProducts = async () => {
    try {
      const newProResponse: any = await itemsApi.newProductsForGuests(
        activeCate
      );
      console.log("new 상품 목록 : ", newProResponse);
      console.log(newProResponse.response.response);
      setRealItems(newProResponse.response.response);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    fetchNewProducts();

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/main");
    }
  }, []);

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
              <div className="flex justify-between text-[12pt] font-medium text-[#666666] border-t border-solid border-gray-200">
                <p className="ml-[30px] mt-[10px] mobile:ml-[20px]">
                  이번주 신제품
                </p>

                <Link href="/menus/new">
                  <button className="h-[34px] flex items-end">
                    <p className="">More</p>
                    <span className="text-[18px] ml-[2px] mr-[30px]"> +</span>
                  </button>
                </Link>
              </div>
              <div className="flex justify-center ">
                <Items itemsPerPage={12} allItems={realItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
