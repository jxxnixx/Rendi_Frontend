import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { MyPage, Next, ShoppingBag } from "@/components/icons";
import Items from "@/components/product/items";
import { itemsApi, usersApi } from "@/libs/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  UserInfoState,
  recentViewedItemsState,
  userInfoState,
} from "@/libs/client/atom";

import Mymenus from "@/components/structure/mymenus";
import { useRecoilState, useRecoilValue } from "recoil";
import { access } from "fs";

function Mypage() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const recentViewedItems = useRecoilValue(recentViewedItemsState);
  const [realItems, setRealItems] = useState<any>();

  useEffect(() => {
    const fetchAndSetDefaultValues = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);

        if (accessToken) {
          const viewInfoResponse = await usersApi.viewInfos(accessToken);
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

            // 먼저 회원정보 업데이트
            setUserInfo(updatedUserInfoData);
            console.log(updatedUserInfoData);

            // 회원정보가 업데이트되면 아래의 최근 본 상품 관련 코드를 실행
            console.log(recentViewedItems);
            console.log(accessToken);

            if (accessToken) {
              const recentResponse: any = await itemsApi.recentView(
                recentViewedItems,
                accessToken
              );
              console.log(recentResponse);
              console.log(recentResponse.response.response);
              setRealItems(recentResponse.response.response);
            }
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
    <>
      <Layout>
        <Head>
          <title>Profile</title>
        </Head>
        <Mymenus />
        {/* 회원정보수정 */}
        <div className="flex justify-center items-center ">
          <div className="flex justify-center items-center  w-[1040px] h-[85px] mt-[10px]   border-t border-b border-black ">
            <div className="flex items-center h-[50px] w-[50px] ">
              <MyPage size={30} />
            </div>
            <div>
              <div className="flex items-end h-[50px] ">
                {/* <p className="text-lg text-center text-black">아무개! 님</p> */}
                <p className="text-lg text-center text-black">
                  {userInfo.nickname} 님
                </p>
              </div>
              <Link href="/main/mypage/edit">
                <button className="flex items-top h-[50px] ">
                  <p className="text-m text-center text-[#666]">
                    회원정보 조회
                  </p>
                  <div className="flex items-top mt-[2px]">
                    <Next />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* 최근본상품 */}
        <div className="flex justify-center">
          <div className="flex-row  w-[1040px] min-h-[500px] h-full mobile:min-h-[300px]">
            <div className="flex text-[12pt] font-medium  text-black">
              <div className="flex ml-[10px] mr-[5px] items-center h-[40px]">
                <ShoppingBag />
              </div>
              <p className="flex items-center h-[40px] ">최근 본 상품</p>
            </div>
            <div className="flex items-end justify-center">
              <Items itemsPerPage={8} allItems={realItems} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Mypage;
