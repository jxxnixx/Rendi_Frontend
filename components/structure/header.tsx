import Link from "next/link";
import BrLine from "./brLine";
import ProfileBtn from "./profileBtn";
import SearchBar from "./searchBar";
import { useRouter } from "next/router";
import { useScreenSize } from "@/libs/client/useScreen";
import { useState } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import MoSearchBar from "./moSearchBar";
import SideBar from "./sidebar";
import logo from "../../public/logo.png";
import Image from "next/image";

export default function Header() {
  // 쿠키에서 로그인 상태를 확인하는 함수

  const router = useRouter();
  const isMainPage = router.asPath.includes("/main");

  const screen = useScreenSize();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); // 모바일 검색창 열림 상태

  return (
    <header className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-30  h-[100px] mobile:h-[50px] bg-white mx-auto mobile:w-full">
      <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-30  h-[100px] mobile:h-[50px] w-[1040px] bg-white mx-auto mobile:w-full">
        {screen === "mobile" ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center space-x-4 ml-4 mr-6">
              {/* <MenuOutlined className="text-2xl" /> */}
              <SideBar />
            </div>
            <div className="flex items-center">
              <Link href="/" legacyBehavior>
                <Image
                  src={logo}
                  alt="logo"
                  className="w-[82px] h-[50px] ml-8 object-cover"
                />
              </Link>
              <div />
            </div>
            <div className="flex items-center space-x-4 mr-4">
              {/* 모바일 검색 아이콘을 클릭하면 팝업 보이기 */}
              <SearchOutlined
                className="text-2xl cursor-pointer"
                onClick={() => setIsMobileSearchOpen(true)}
              />
              {/* 로그인 아닌 상태에서는 로그인 페이지로, 로그인 상태에서는 마이페이지로 연결 */}
              {isMainPage ? (
                <Link href="/main/mypage" legacyBehavior>
                  <UserOutlined className="text-2xl" />
                </Link>
              ) : (
                <Link href="/auth/login" legacyBehavior>
                  <UserOutlined className="text-2xl" />
                </Link>
              )}
            </div>
          </div>
        ) : (
          <>
            <header className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-30  h-[100px] bg-white mx-auto mobile-[390px] mobile-[h-50px]">
              <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-30  h-[100px] w-[1040px] bg-white mx-auto mobile-[390px] mobile-[h-50px]">
                {/* 헤더 구분선 */}
                <BrLine />
                {/* 로고 */}
                <div className="w-[181px] h-[132px]">
                  <Link
                    href="/"
                    legacyBehavior
                    className="w-[181px] h-[132px] absolute left-[-0.5px] top-[-1.5px] bg-white"
                  >
                    <Image
                      src={logo}
                      alt="logo"
                      className="relative w-[147px] h-[83px] left-[16.5px] top-[38px] object-cover"
                    />
                  </Link>
                </div>
                {/* 검색창 */}
                <div className="w-[679px] h-[46px] left-[181px] mt-[38px]">
                  <SearchBar />
                </div>
                {/* 회원가입/로그인 */}
                <div className="w-[85px] h-[30px]">
                  <ProfileBtn />
                </div>
              </div>
            </header>
          </>
        )}
      </div>
      {isMobileSearchOpen && (
        <MoSearchBar onClose={() => setIsMobileSearchOpen(false)} />
      )}
    </header>
  );
}
