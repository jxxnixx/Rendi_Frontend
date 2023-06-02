import HoriCategory from "@/components/category/horiCategory";
import Banner from "@/components/structure/banner";
import Layout from "@/layouts/layout";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Items from "@/components/product/items";
import React from "react";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className="relative mt-[135px] bg-slate-200">
        <div className="bg-white">
          <Banner />
          <HoriCategory />
          <div className="flex justify-center py-8">
            <Items />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
