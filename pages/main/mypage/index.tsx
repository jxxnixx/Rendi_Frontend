// import Layout from "@/layouts/layout";
// import Head from "next/head";
// import Link from "next/link";
// import { Line, MyPage, Next, ShoppingBag } from "@/components/icons";
// import Items from "@/components/product/items";
// import { AEditInfosProps, usersApi } from "@/libs/api";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";
// import {
//   UserInfoState,
//   UserInputState,
//   userInfoState,
// } from "@/libs/client/atom";
// import { useRecoilState } from "recoil";

// function Mypage() {
//   const router = useRouter();
//   const {
//     watch,
//     formState: { errors },
//     setValue,
//   } = useForm<UserInputState>({
//     mode: "onChange",
//   });

//   const [userInfo, setUserInfo] = useRecoilState(userInfoState);

//   useEffect(() => {
//     const fetchAndSetDefaultValues = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");

//         if (accessToken) {
//           const viewInfoResponse = await usersApi.viewInfos(accessToken);
//           console.log(viewInfoResponse);
//           if (viewInfoResponse?.success) {
//             console.log("회원정보 조회 성공!");

//             const updatedUserInfoData: UserInfoState = {
//               username: viewInfoResponse.response.response.username,
//               nickname: viewInfoResponse.response.response.nickname,
//               email: viewInfoResponse.response.response.email,
//               birth: viewInfoResponse.response.response.birth,
//               phonenum: viewInfoResponse.response.response.phone,
//             };

//             setUserInfo(updatedUserInfoData);
//             console.log(updatedUserInfoData);
//           }
//         } else {
//           console.log("accessToken이 없습니다.");
//         }
//       } catch (error) {
//         console.log("회원정보 조회 오류");
//       }
//     };

//     fetchAndSetDefaultValues();
//   }, []);

//   return (
//     <>
//       <Layout>
//         <Head>
//           <title>Mypage</title>
//         </Head>
//         <div className="flex justify-center items-center">
//           <div className="flex justify-center w-[1040px] h-[98px] mt-[135px] bg-blue mobile:mt-[90px] mobile:h-[70px]">
//             <p className="flex justify-center  left-[441px] mt-[35px] text-[21pt] font-semibold text-left text-black mobile:mt-4 mobile:text-[18pt]">
//               마이페이지
//             </p>
//           </div>
//         </div>
//         {/* 버튼 */}
//         <div className="flex justify-center items-center mt-[0px] opacity-90 gap-[100px] bg-white mobile:gap-[20px]">
//           <Link href="/main/mypage/liked" legacyBehavior>
//             <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
//               찜한 상품
//             </button>
//           </Link>

//           <Link href="/main/mypage/likedMarket" legacyBehavior>
//             <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
//               즐겨찾기 마켓
//             </button>
//           </Link>

//           <Link href="/main/mypage/contact" legacyBehavior>
//             <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
//               고객센터
//             </button>
//           </Link>

//           <Link href="/main/mypage/terms" legacyBehavior>
//             <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
//               이용약관
//             </button>
//           </Link>
//         </div>
//         {/* 회원정보수정 */}
//         <div className="flex justify-center items-center  ">
//           <div className="flex justify-center items-center  w-[1040px] h-[85px] mt-[10px]  border-t border-b border-black">
//             <div className="flex items-center h-[50px] w-[50px] ">
//               <MyPage size={30} />
//             </div>
//             <div>
//               <div className="flex items-end h-[50px] ">
//                 {/* <p className="text-lg text-center text-black">아무개! 님</p> */}
//                 <p className="text-lg text-center text-black">
//                   {userInfo.nickname} 님
//                 </p>
//               </div>
//               <Link href="/main/mypage/edit">
//                 <button className="flex items-top h-[50px] ">
//                   <p className="text-m text-center text-[#666]">
//                     회원정보 조회
//                   </p>
//                   <div className="flex items-top mt-[2px]">
//                     <Next />
//                   </div>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//         {/* 최근본상품 */}
//         <div className="flex justify-center">
//           <div className="flex-row  w-[1040px] h-[834px]">
//             <div className="flex text-[12pt] font-medium  text-black">
//               <div className="flex ml-[10px] mr-[5px] items-center h-[40px]">
//                 <ShoppingBag />
//               </div>
//               <p className="flex items-center h-[40px] ">최근 본 상품</p>
//             </div>
//             <div className="flex items-end justify-center">
//               <Items itemsPerPage={8} />
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// }

// export default Mypage;

import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Line, MyPage, Next, ShoppingBag } from "@/components/icons";
import Items from "@/components/product/items";
import { AEditInfosProps, usersApi } from "@/libs/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  UserInfoState,
  UserInputState,
  userInfoState,
} from "@/libs/client/atom";
import { useRecoilState } from "recoil";
import Mymenus from "@/components/structure/mymenus";

function Mypage() {
  const router = useRouter();
  const {
    watch,
    formState: { errors },
    setValue,
  } = useForm<UserInputState>({
    mode: "onChange",
  });

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const fetchAndSetDefaultValues = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

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
    <>
      <Layout>
      <Head>
          <title>Profile</title>
        </Head>
        <Mymenus />
        {/* 회원정보수정 */}
        <div className="flex justify-center items-center  ">
          <div className="flex justify-center items-center  w-[1040px] h-[85px] mt-[10px]  border-t border-b border-black">
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
          <div className="flex-row  w-[1040px] h-[834px]">
            <div className="flex text-[12pt] font-medium  text-black">
              <div className="flex ml-[10px] mr-[5px] items-center h-[40px]">
                <ShoppingBag />
              </div>
              <p className="flex items-center h-[40px] ">최근 본 상품</p>
            </div>
            <div className="flex items-end justify-center">
              <Items itemsPerPage={8} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Mypage;
