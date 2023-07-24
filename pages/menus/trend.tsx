import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

export default function Trend() {
  return (
    <Layout>
      <Head>
        <title>Trend</title>
      </Head>
      <div className="relative mt-[136px] h-[800px] flex w-full flex-col text-lg font-medium ">
        <div className="text-4xl mt-[100px] font-bold text-center">
          준비중입니다...
        </div>
      </div>
    </Layout>
  );
}
