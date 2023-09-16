import HoriCategory from "@/components/category/horiCategory";
import Banner from "@/components/structure/banner";
import Layout from "@/layouts/layout";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Items from "@/components/product/items";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useScreenSize } from "@/libs/client/useScreen";
import { itemsApi } from "@/libs/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserInfoState, userInfoState } from "@/libs/client/atom";
import { usersApi } from "@/libs/api";

const Home: NextPage = () => {
  const [accessToken, setAccessToken] = useState<string>(" ");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccessToken: string | null =
        localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    }
  }, []);

  const fetchNewProducts = async () => {
    try {
      const bestProResponse: any = await itemsApi.todayProducts(
        [1, 2, 3], // interests 받아오는 걸로 수정
        accessToken
      );
      console.log("best 상품 목록 : ", bestProResponse);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const fetchAndSetDefaultValues = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);

        if (accessToken) {
          const viewInfoResponse = await usersApi.viewInfos(accessToken);
          console.log(viewInfoResponse);
          console.log(userInfo.nickname);

          if (viewInfoResponse?.success) {
            console.log("회원정보 조회 성공!");
            console.log(viewInfoResponse.response.response.nickname);
            const updatedUserInfoData: UserInfoState = {
              username: viewInfoResponse.response.response.username,
              nickname: viewInfoResponse.response.response.nickname,
              email: viewInfoResponse.response.response.email,
              birth: viewInfoResponse.response.response.birth,
              phonenum: viewInfoResponse.response.response.phone,
            };

            setUserInfo(updatedUserInfoData);
            console.log(updatedUserInfoData);
          }
        } else {
          console.log("accessToken이 없습니다.");
        }
      } catch (error) {
        console.log("회원정보 조회 오류");
      }
    };

    fetchAndSetDefaultValues();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className="relative mt-[135px] bg-slate-200 mobile:mt-[85px]">
        <div className="bg-white">
          <div className="flex justify-center">
            <Banner />
          </div>
          <div className="flex justify-center mobile:w-full">
            {/* 스크롤 가능한 영역 */}
            <div className="overflow-x-scroll scrollbar-hide">
              <HoriCategory />
            </div>
          </div>

          <div className="flex justify-center  ">
            <div className="flex-row w-[1040px] mobile:w-full">
              <div className="flex justify-between text-[12pt] font-medium text-[#666666] border-t border-solid border-gray-200">
                <p className="ml-[30px] mt-[8px] mobile:ml-[20px] mobile:mt-[8px]">
                  {userInfo.nickname}님을 위한 추천 상품{" "}
                </p>

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

export default Home;
