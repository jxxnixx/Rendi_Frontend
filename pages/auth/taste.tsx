import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";

export default function Taste() {
  return (
    <Layout>
      <Head>
        <title>Taste</title>
      </Head>
      <div className="relative mt-[131px] flex w-full flex-col bg-slate-200 text-lg font-medium ">
        <Items />
      </div>
    </Layout>
  );
}
