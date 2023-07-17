import Link from "next/link";
import { MyPage } from "../icons";

export default function ProfileBtn() {
  return (
    <>
      <button className="w-[18px] h-[18px] absolute left-[870px] top-[3px] opacity-75 text-xs font-medium text-left text-[#666666]">
        <Link href="/auth/profile" legacyBehavior>
          <a className="text-[#666]">
            <MyPage size={14} />
          </a>
        </Link>
      </button>

      <Link href="/auth/login" legacyBehavior>
        <button className="">
          <p className="w-[40px] h-[30px] absolute left-[890px] top-[4px] opacity-75 text-[9pt] font-medium text-left text-[#666666]">
            로그인
          </p>
        </button>
      </Link>

      <p className="absolute left-[930px] top-[3.5px] opacity-75 text-[10pt] font-medium text-left text-[#666]">
        |
      </p>

      <Link href="/auth/signUp" legacyBehavior>
        <button className="">
          <p className="w-[50px] h-[30px] absolute left-[944px] top-[4px] opacity-75 text-[9pt] font-medium text-left text-[#666666]">
            회원가입
          </p>
        </button>
      </Link>
    </>
  );
}
