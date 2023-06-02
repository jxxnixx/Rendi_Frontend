import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";

export default function Trend() {
  return (
    <Layout>
      <Head>
        <title>Trend</title>
      </Head>
      <div className="relative mt-[136px] h-[800px] flex w-full flex-col bg-slate-200 text-lg font-medium "></div>
    </Layout>
  );
}
