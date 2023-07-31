import HoriCategory from "@/components/category/horiCategory";
import Banner from "@/components/structure/banner";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Items from "@/components/product/items";
import Link from "next/link";

const Main = () => {
  return (
    <Layout>
      <Head>
        <title>Main</title>
      </Head>
      <div className="relative mt-[135px] bg-slate-200">
        <div className="bg-white">
          <div className="flex justify-center">
            <Banner />
          </div>
          <div className="flex justify-center">
            <HoriCategory />
          </div>

          <div className="flex justify-center">
            <div className="flex-row w-[1040px]">
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

export default Main;
