import Link from "next/link";
import { useRouter } from "next/router";
import { removeCookie } from "@/libs/client/cookies";
import { useState } from "react";

export default function ProfileBtn() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    setUsername(savedUsername);
  }

  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 실행되는 함수

    removeCookie("accessToken"); // accessToken 삭제
    localStorage.removeItem("refreshToken"); // refreshToken 삭제
    localStorage.removeItem("username");
    router.push("/"); // 페이지 이동
  };

  return (
    <>
      <p className="w-[50px] h-[30px] absolute right-[114px] top-[4px] opacity-75 text-[9pt] font-medium text-right text-[#666666]">
        <Link href="/auth/profile" legacyBehavior>
          <a className="text-[#666]">
            {/* <MyPage size={14} /> */}
            {username}님
          </a>
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
  );
}

//https://velog.io/@rifkin/react-TIL-10
