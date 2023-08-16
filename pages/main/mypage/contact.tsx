import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Line } from "@/components/icons";

function Contact() {
  return (
    <>
      <Layout>
        <Head>
          <title>Profile</title>
        </Head>
        <div className="flex justify-center items-center">
          <div className="flex justify-center w-[1040px] h-[98px] mt-[135px] bg-blue">
            <Link href="/main/mypage" legacyBehavior>
              <button className="flex justify-center  left-[441buttonx] mt-[35px] text-[21pt] font-semibold text-left text-black hover:text-mc">
                마이페이지
              </button>
            </Link>
          </div>
        </div>
        {/* 버튼 */}
        <div className="flex justify-center items-center mt-[0px] opacity-90 gap-[100px] bg-white">
          <Link href="/main/mypage/liked" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              찜한 상품
            </button>
          </Link>

          <Link href="/main/mypage/likedMarket" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              즐겨찾기 마켓
            </button>
          </Link>

          <Link href="/main/mypage/contact" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-mc hover:text-mc">
              고객센터
            </button>
          </Link>

          <Link href="/main/mypage/terms" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              이용약관
            </button>
          </Link>
        </div>

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
