import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Line, ShoppingBag } from "@/components/icons";
import Markets8 from "@/components/product/martketList";
import Mymenus from "@/components/structure/mymenus";

function LikedMarket() {
  return (
    <>
      <Layout>
        <Head>
          <title>Profile</title>
        </Head>
        <Mymenus />
        <div className="flex justify-center  mt-[10px] ">
          <Line />
        </div>
        {/* 즐겨찾기한 마켓 */}
        <div className="flex justify-center">
          <div className="flex-row  w-[1040px] h-[834px]">
            <div className="flex text-[12pt] font-medium  text-black">
              <div className="flex ml-[10px] mr-[5px] items-center h-[40px]">
                <ShoppingBag />
              </div>
              <p className="flex items-center h-[40px] ">즐겨찾기 마켓</p>
            </div>
            <div className="flex items-end justify-center">
              <Markets8 />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default LikedMarket;
