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
      <div className="relative mt-[136px] h-full flex w-full flex-col text-lg font-medium mobile:mt-[85px]">
        {/* <div className="text-4xl mt-[100px] font-bold text-center"> */}
        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230905/PC_215192_cont_01.jpg"
            className=" w-[1040px] h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <Link href="https://www.ssfshop.com/special/86849/view?brndShopId=8SBSS&brandShopNo=BDMA07A01&utag=ref_tpl:111702$ref_cnr:22443$ref_br:8SBSS$set:1$dpos:1">
            <img
              src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230905/PC_215192_cont_02.jpg"
              className=" w-[1040px] h-full object-cover"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230905/PC_215192_cont_03.jpg"
            className=" w-[1040px] h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <Link href="https://www.ssfshop.com/special/86849/view?brndShopId=8SBSS&brandShopNo=BDMA07A01&utag=ref_tpl:111702$ref_cnr:22443$ref_br:8SBSS$set:1$dpos:1">
            <img
              src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230905/PC_215192_cont_04.jpg"
              className=" w-[1040px] h-full object-cover"
            />
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230818/PC_213516_con01.png"
            className=" w-[1040px] h-full object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://img.ssfshop.com/display/html/DSP_CTGRY/20230818/PC_213516_con03_v1.png"
            className=" w-[1040px] h-full object-cover"
          />
        </div>

        {/* </div> */}
      </div>
    </Layout>
  );
}
