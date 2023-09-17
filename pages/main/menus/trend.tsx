import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Trend() {
  return (
    <Layout>
      <Head>
        <title>Trend</title>
      </Head>
      <div className="relative mt-[136px] h-full flex w-full flex-col text-lg font-medium  mobile:mt-[85px]">
        {/* <div className="text-4xl mt-[100px] font-bold text-center"> */}
        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230908/PC_215537_con01.png"
            className=" w-[1040px] h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <Link href=" ">
            <img
              src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230911/PC_215537_con02.png"
              className=" w-[1040px] h-full object-cover"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230911/PC_215537_con03.png"
            className=" w-[1040px] h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <Link href=" ">
            <img
              src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230911/PC_215537_con04_scroll01.png"
              className=" w-[1040px] h-full object-cover"
            />
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230911/PC_215537_con04_scroll02.png"
            className=" w-[1040px] h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230911/PC_215537_con05.png"
            className=" w-[1040px] h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230911/PC_215537_con09_slide01.png"
            className="w-[1040px] h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <Link href=" ">
            <img
              src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230911/PC_215537_con12_slide01_v1.png"
              className="w-[1040px] h-full object-cover"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230911/PC_215537_con12.png"
            className="w-[1040px] h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <Link href="https://www.ssfshop.com/special/87096/view?brndShopId=8SBSS&brandShopNo=BDMA07A01&utag=ref_tpl:111702$ref_cnr:22443$ref_br:8SBSS$set:3$dpos:1 ">
            <img
              src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230911/PC_215537_con13_scroll.png"
              className="w-[1040px] h-full object-cover"
            />
          </Link>
        </div>

        {/* </div> */}
      </div>
    </Layout>
  );
}
