import Link from "next/link";
import { Line } from "@/components/icons";
import { useRouter } from "next/router";

export default function Mymenus() {
  const router = useRouter();
  const currentPath = router.pathname; // 현재 페이지의 URL 세그먼트

  const getMenuButtonClass = (targetPath: string): string => {
    const baseClasses =
      "flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc";

    if (currentPath.endsWith(targetPath)) {
      return `${baseClasses} text-mc`;
    }

    return baseClasses;
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex justify-center w-[1040px] h-[98px] mt-[135px] bg-blue mobile:mt-[90px] mobile:h-[70px]">
          <p className="flex justify-center  left-[441px] mt-[35px] text-[21pt] font-semibold text-left text-black mobile:mt-4 mobile:text-[18pt]">
            마이페이지
          </p>
        </div>
      </div>
      {/* 버튼 */}
      <div className="flex justify-center items-center mt-[0px] opacity-90 gap-[100px] bg-white mobile:gap-[20px]">
        <Link href="/main/mypage/liked" passHref>
          <button className={getMenuButtonClass("liked")}>찜한 상품</button>
        </Link>

        {/* <Link href="/main/mypage/likedMarket" passHref>
          <button className={getMenuButtonClass("likedmarket")}>
            즐겨찾기 마켓
          </button>
        </Link> */}

        <Link href="/main/mypage/contact" passHref>
          <button className={getMenuButtonClass("contact")}>고객센터</button>
        </Link>

        <Link href="/main/mypage/terms" passHref>
          <button className={getMenuButtonClass("terms")}>이용약관</button>
        </Link>
      </div>
    </>
  );
}
