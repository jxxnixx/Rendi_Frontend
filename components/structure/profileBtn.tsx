import Link from "next/link";
import { MyPage } from "../icons";
// import { isLoggedInState, loginState } from "@/libs/client/atom";
// import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { removeCookie } from "@/libs/client/cookies";

export default function ProfileBtn() {
  const router = useRouter();
  const isMainPage = router.asPath.includes("/main");

  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 실행되는 함수

    removeCookie("accessToken"); // accessToken 삭제
    localStorage.removeItem("refreshToken"); // refreshToken 삭제
    router.push("/"); // 페이지 이동
  };

  return (
    <>
      {isMainPage ? (
        <>
          <p className="w-[50px] h-[30px] absolute right-[114px] top-[4px] opacity-75 text-[9pt] font-medium text-right text-[#666666]">
            <Link href="/auth/profile" legacyBehavior>
              <a className="text-[#666]">마이페이지</a>
            </Link>
          </p>
          <p className="absolute right-[105px] top-[3.5px] opacity-75 text-[10pt] font-medium text-right text-[#666]">
            |
          </p>
          <button className="w-[50px] h-[30px]" onClick={handleLogout}>
            <p className="w-[50px] h-[30px] absolute right-[60px] top-[4px] opacity-75 text-[9pt] font-medium text-right text-[#666666]">
              로그아웃
            </p>
          </button>
        </>
      ) : (
        <>
          <Link href="/auth/login" legacyBehavior>
            <button className="w-[40px] h-[30px]">
              <p className="w-[40px] h-[30px] absolute right-[114px] top-[4px] opacity-75 text-[9pt] font-medium text-right text-[#666666]">
                로그인
              </p>
            </button>
          </Link>
          <p className="absolute right-[105px] top-[3.5px] opacity-75 text-[10pt] font-medium text-right text-[#666]">
            |
          </p>
          <Link href="/auth/signup" legacyBehavior>
            <button className="w-[50px] h-[30px]">
              <p className="w-[50px] h-[30px] absolute right-[60px] top-[4px] opacity-75 text-[9pt] font-medium text-right text-[#666666]">
                회원가입
              </p>
            </button>
          </Link>
        </>
      )}
    </>
  );
}
