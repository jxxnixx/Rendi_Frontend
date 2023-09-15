import { motion, useCycle, Variants } from "framer-motion";
import Link from "next/link";
import Circle from "../category/circle";
import { MyPage } from "../icons";
import { usersApi } from "@/libs/api";
import {
  UserInfoState,
  recentViewedItemsState,
  userInfoState,
} from "@/libs/client/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Sidebar animation variants
const sidebarVariants: Variants = {
  open: {
    x: 0,
    width: "100vw",
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    x: "-100%",
    width: 0,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
};

// Toggler component

const Path = ({ openPath, closedPath, ...rest }: any) => {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      variants={{
        open: { d: openPath, transition: { duration: 0.3 } },
        closed: { d: closedPath, transition: { duration: 0.3 } },
      }}
      {...rest}
    ></motion.path>
  );
};

const Toggler = ({ toggle }: any) => {
  return (
    <>
      <button
        onClick={toggle}
        className="flex h-[24px] w-[24px] rounded-full border-0 outline-none focus:outline-none ml-3"
      >
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path openPath="M 3 16.5 L 17 2.5" closedPath="M 2 2.5 L 20 2.5" />
          <Path closedPath="M 2 9.423 L 20 9.423" openPath="" />
          <Path
            closedPath="M 2 16.346 L 20 16.346"
            openPath="M 3 2.5 L 17 16.346"
          />
        </svg>
      </button>
    </>
  );
};

// Navigation component
const Navigation = ({ onItemClick }: any) => {
  const navigationItems = [
    { label: "Today", path: "/" },
    { label: "Best", path: "/menus/best" },
    { label: "New", path: "/menus/new" },
    { label: "Market", path: "/menus/market" },
    { label: "Trend", path: "/menus/trend" },
    { label: "All", path: "/menus/all" },
  ];

  const icons = [
    "Top",
    "Outer",
    "Dress",
    "Pants",
    "Skirt",
    "Training",
    "Inner",
    "Swimsuit",
    "Shoes",
    "Bag",
    "Mgoods",
    "ETC",
  ];
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loginState, setLoginState] = useState(true); // 로그인유무로 닉네임 출력할지 로그인하라는 메세지 출력할지 결정

  // useEffect(() => {
  //   const fetchAndSetDefaultValues = async () => {
  //     try {
  //       const accessToken = localStorage.getItem("accessToken");
  //       console.log(accessToken);

  //       if (accessToken && !userInfo.nickname) {
  //         const viewInfoResponse = await usersApi.viewInfos(accessToken);
  //         console.log(viewInfoResponse);
  //         console.log(userInfo.nickname);

  //         if (viewInfoResponse?.success) {
  //           console.log("회원정보 조회 성공!");
  //           console.log(viewInfoResponse.response.response.nickname);
  //           const updatedUserInfoData: UserInfoState = {
  //             ...userInfo,
  //             nickname: viewInfoResponse.response.response.nickname,
  //           };

  //           setUserInfo(updatedUserInfoData);
  //           console.log(updatedUserInfoData);
  //         }
  //       } else if (accessToken && userInfo.nickname) {
  //         console.log("userInfo 이미 존재:", userInfo.nickname);
  //       } else {
  //         console.log("accessToken이 없습니다.");
  //         setLoginState(false); // 로그인 상태가 아닐때는 ""님이아니고 로그인하라는 메세지 출력
  //       }
  //     } catch (error) {
  //       console.log("회원정보 조회 오류");
  //     }
  //   };

  //   fetchAndSetDefaultValues();
  // }, []);

  const router = useRouter();
  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 실행되는 함수
    localStorage.removeItem("accessToken"); // accessToken 삭제
    setUserInfo({
      // userInfoState를 빈 객체로 설정
      username: "",
      nickname: "",
      email: "",
      birth: "",
      phonenum: "",
    }); // userInfoState 상태 초기화 //추가
    router.push("/"); // 페이지 이동
  };

  return (
    <ul className="absolute mt-5">
      <div className="divide-y divide-solid">
        {/* 첫번째 구분선 */}
        <div></div>
        {/* 프로필 들어갈 영역 */}
        <div className="flex justify-center">
          <Link href={loginState ? "/main/mypage" : "/auth/login"}>
            <div
              className="w-100vw h-[45px] flex-col m-5"
              onClick={onItemClick}
            >
              <div className="flex justify-center align-center">
                {/* <UserOutlined/> */}
                <MyPage size={20} />
              </div>
              <div className="m-2">
                {loginState
                  ? `${userInfo.nickname} 님 `
                  : "로그인이 필요합니다."}
              </div>
            </div>
          </Link>
        </div>

        <div className="">
          <div className="flex m-2 justify-center">Pages</div>
        </div>
        <div className=" ">
          {navigationItems.map((item, index) => (
            <li
              key={index}
              className="h-[30px] mt-3 ml-5
       "
            >
              <Link
                href={item.path}
                onClick={onItemClick}
                className="flex items-center "
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </div>
        <div className="">
          <div className="flex m-2 justify-center">Categories</div>
        </div>
        <div className=" ">
          <li>
            <div
              className="flex flex-col items-center ml-2"
              onClick={onItemClick}
            >
              {icons.map((icon, index) => (
                <Circle key={index} icon={icon} direction="vert" />
              ))}
            </div>
          </li>
        </div>
        {loginState && (
          <div className="">
            <div
              className="flex m-2 justify-center cursor-pointer font"
              onClick={() => {
                handleLogout();
                onItemClick();
              }}
            >
              로그아웃
            </div>
          </div>
        )}
      </div>
    </ul>
  );
};

// Sidebar component
export default function SideBar() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div
      className={`overflow-y-auto scrollbar-hide  ${
        isOpen ? "fixed inset-0 bg-white" : ""
      }`}
    >
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="absolute top-5 left-0 bottom-0"
      >
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className="absolute top-5  bottom-0 w-[100vw] h-full bg-white"
        />
        <Toggler toggle={() => toggleOpen()} />
        {isOpen && (
          <Navigation
            onItemClick={() => {
              toggleOpen();
            }}
          />
        )}
      </motion.nav>
    </div>
  );
}
