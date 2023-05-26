import Link from "next/link";
import { MyPage } from "../icons";

export default function ProfileBtn() {
  return (
    <>
      <Link href="/auth/signUp" legacyBehavior>
        <button className="w-[50px] h-[30px]">
          <p className="w-[50px] h-[30px] absolute left-[945px] top-[5px] opacity-75 text-xs font-medium text-left text-[#666666]">
            회원가입
          </p>
        </button>
      </Link>
      <p className="absolute left-[935px] top-[4px] opacity-75 text-xs font-medium text-left text-[#666]">
        |
      </p>
      <Link href="/auth/login" legacyBehavior>
        <button className="w-[40px] h-[30px]">
          <p className="w-[40px] h-[30px] absolute left-[890px] top-[5px] opacity-75 text-xs font-medium text-left text-[#666666]">
            로그인
          </p>
        </button>
      </Link>
      {/* 밑에는 연주가 사람 아이콘 추가했던거 */}
      <button className="w-[18px] h-[18px] absolute left-[870px] top-[5px] opacity-75 text-xs font-medium text-left text-[#666666]">
        <Link href="/profile" legacyBehavior>
          <a className="text-[#666]">
            <MyPage />
          </a>
        </Link>
      </button>
    </>
  );
}
