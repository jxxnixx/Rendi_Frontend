import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Line } from "@/components/icons";
import Mymenus from "@/components/structure/mymenus";

function Terms() {
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
        <div className="flex h-[1000px] justify-center items-center  "></div>
      </Layout>
    </>
  );
}

export default Terms;
