import Link from "next/link";
import { MyPage } from "../icons";
import { useRouter } from "next/router";
import { userInfoState } from "@/libs/client/atom"; //추가
import { useRecoilState } from "recoil"; //추가

export default function ProfileBtn() {
  const router = useRouter();
  const isMainPage = router.asPath.includes("/main");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState); //추가

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
    <>
      {isMainPage ? (
        <>
          <p className="w-[60px] h-[30px] absolute right-[114px] top-[4px] opacity-75 text-[9pt] font-medium text-right text-[#666666]">
            <Link href="/main/mypage" legacyBehavior>
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
          <Link href="/auth/signUp" legacyBehavior>
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
