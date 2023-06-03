import Link from "next/link";
import BrLine from "./brLine";
import ProfileBtn from "./profileBtn";
import SearchBar from "./searchBar";

export default function Header() {
  return (
    <header className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-20  h-[100px] bg-white mx-auto">
      <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-20  h-[100px] w-[1040px] bg-white mx-auto">
        {/* 헤더 손봐야함. 네비바 스크롤할때 같이올라가 */}
        {/* 헤더 구분선선 */}
        <BrLine />
        {/* 로고 */}
        <div className="w-[181px] h-[132px]">
          <Link
            href="/"
            legacyBehavior
            className="w-[181px] h-[132px] absolute left-[-0.5px] top-[-1.5px] bg-white"
          >
            <img
              src="logo.png"
              className="relative w-[147px] h-[83px] absolute left-[16.5px] top-[38px] object-cover"
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
  );
}
