import { SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";

interface ProfileForm {
  id: string;
  password: string;

  extraError?: string;
}

function Profile() {
  return (
    <>
      <Layout>
        <Head>
          <title>Profile</title>
        </Head>
        <div className="flex justify-center items-center">
          <div className="flex justify-center w-[1040px] h-[128px] mt-[135px] bg-blue">
            <p className="flex justify-center  left-[441px] mt-[45px] text-4xl font-semibold text-left text-black">
              마이페이지
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center  mt-[0px] opacity-90 gap-[100px] bg-white">
          <Link href="/auth/profile/liked" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-[#FC435A]">
              찜한 상품
            </button>
          </Link>

          <Link href="/auth/profile/likedMarket" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-[#FC435A]">
              즐겨찾기 마켓
            </button>
          </Link>

          <Link href="/auth/profile/contact" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-[#FC435A]">
              고객센터
            </button>
          </Link>

          <Link href="/auth/profile/terms" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-[#FC435A]">
              이용약관
            </button>
          </Link>
        </div>
      </Layout>
    </>
  );
}

export default Profile;
