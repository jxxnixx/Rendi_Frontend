import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Line } from "@/components/icons";
import Mymenus from "@/components/structure/mymenus";

function Contact() {
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
        <div className="flex h-[500px] justify-center items-center  ">
          <div className="flex flex-col justify-center items-center w-[1040px] h-[300px] bg-white">
            이메일 문의 : RendiCorporation@gmail.com
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Contact;
