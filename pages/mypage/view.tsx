import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Segmented } from "antd";
import { useState } from "react";
import { SignUpState, signUpState } from "@/libs/client/atom";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { AEditInfosProps, usersApi } from "@/libs/api";
import { getCookie } from "@/libs/client/cookies";

function View() {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AEditInfosProps>({
    mode: "onChange",
  });

  const handleClick = async () => {
    // 입력값 가져오기

    try {
      const accessToken: any = localStorage.getItem("accessToken");

      const viewInfoResponse = await usersApi.viewInfos(accessToken);
      console.log(viewInfoResponse);

      if (viewInfoResponse?.success) {
        console.log("회원정보 조회 성공!");

        console.log(viewInfoResponse.response.response.birth);
        console.log(viewInfoResponse.response.response.email);
        console.log(viewInfoResponse.response.response.nickname);
        console.log(viewInfoResponse.response.response.phone);
        console.log(viewInfoResponse.response.response.username);
      }
    } catch (error) {
      console.log("회원정보 조회 오류");
    }
  };

  const submitForm: SubmitHandler<AEditInfosProps> = (
    data: AEditInfosProps
  ) => {
    handleClick();
  };

  console.log;

  return (
    <>
      <Layout>
        <Head>
          <title>View</title>
        </Head>

        <div className=" mt-[104px] flex w-full h-[1500px] flex-col bg-white text-lg font-medium ">
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit(submitForm)}
              className=" items-center gap-[6px] p-0 w-[448px] h-[1500px]"
            >
              <p className="relative top-[109px] text-4xl font-semibold text-center text-black">
                회원정보 조회
              </p>

              <div className="relative top-[133px]">
                <div className="flex mt-[40px] text-center justify-center">
                  <SubmitBtn
                    type="submit"
                    large={true}
                    text="조회하기"
                    className="flex justify-center items-center h-screen"
                    onClick={handleClick} // handleClick 함수 추가
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default View;
