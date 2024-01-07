import HoriCategory from "@/components/category/horiCategory";
import Banner from "@/components/structure/banner";
import Layout from "@/layouts/layout";
import type { NextPage } from "next";
import Head from "next/head";
import router, { useRouter } from "next/router";
import Items from "@/components/product/items";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useScreenSize } from "@/libs/client/useScreen";
import itemsApi from "@/libs/api/itemsApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserInfoState, userInfoState } from "@/libs/client/atom";
import usersApi from "@/libs/api/usersApi";

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

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [realItems, setRealItems] = useState<any>();

  const fetchAndSetDefaultValues = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);

      if (!accessToken) {
        // accessToken이 없다면 로그인 페이지로 리다이렉트
        router.push("/auth/login");
        return;
      }

      let viewInfoResponse: any = await usersApi.viewInfos(accessToken);
      console.log(viewInfoResponse);

      if (!viewInfoResponse?.success) {
        // 회원 정보 조회에 실패한 경우 처리
        console.log("회원정보 조회 실패");
        return;
      }

      if (accessToken) {
        const viewInfoResponse: any = await usersApi.viewInfos(accessToken);
        console.log(viewInfoResponse);

        if (viewInfoResponse?.success) {
          console.log("회원정보 조회 성공!");

          const updatedUserInfoData: UserInfoState = {
            username: viewInfoResponse.response.response.username,
            nickname: viewInfoResponse.response.response.nickname,
            email: viewInfoResponse.response.response.email,
            birth: viewInfoResponse.response.response.birth,
            phonenum: viewInfoResponse.response.response.phone,
            interests: viewInfoResponse.response.response.interests,
          };

          setUserInfo(updatedUserInfoData);
          console.log(updatedUserInfoData);

          const todayProResponse: any = await itemsApi.todayProducts(
            updatedUserInfoData.interests,
            accessToken
          );

          console.log("today 상품 목록 : ", todayProResponse.response.response);
          setRealItems(todayProResponse.response.response);
        }
      }
    } catch (error) {
      console.log("회원정보 조회 오류");
    }
  };

  const [activeCate, setActiveCate] = useState<any>(null);

  const fetchNewProducts = async () => {
    try {
      const newProResponse: any = await itemsApi.newProductsForGuests(
        activeCate
      );
      console.log("new 상품 목록 : ", newProResponse);
      console.log(newProResponse.response.response);
      setRealItems(newProResponse.response.response);
    } catch (error) {}
  };

  useEffect(() => {
    // fetchAndSetDefaultValues();
    fetchNewProducts();
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
                  회원님을 위한 추천 상품
                </p>
                {/* 
                <Link href="/menus/new">
                  <button className="h-[34px] flex items-end">
                    <p className="">More</p>
                    <span className="text-[18px] ml-[2px] mr-[30px]"> +</span>
                  </button>
                </Link> */}
              </div>
              <div className="flex justify-center ">
                <Items itemsPerPage={12} allItems={realItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
