import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Line, MyPage, Next, ShoppingBag } from "@/components/icons";
import Items from "@/components/product/items";

function Mypage() {
  return (
    <>
      <Layout>
        <Head>
          <title>Mypage</title>
        </Head>
        <div className="flex justify-center items-center">
          <div className="flex justify-center w-[1040px] h-[98px] mt-[135px] bg-blue">
            <p className="flex justify-center  left-[441px] mt-[35px] text-[21pt] font-semibold text-left text-black">
              마이페이지
            </p>
          </div>
        </div>
        {/* 버튼 */}
        <div className="flex justify-center items-center mt-[0px] opacity-90 gap-[100px] bg-white">
          <Link href="/main/mypage/liked" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              찜한 상품
            </button>
          </Link>

          <Link href="/main/mypage/likedMarket" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              즐겨찾기 마켓
            </button>
          </Link>

          <Link href="/main/mypage/contact" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              고객센터
            </button>
          </Link>

          <Link href="/main/mypage/terms" legacyBehavior>
            <button className="flex-grow-0 flex-shrink-0 text-[20] text-center text-black hover:text-mc">
              이용약관
            </button>
          </Link>
        </div>
        {/* 회원정보수정 */}
        <div className="flex justify-center items-center  ">
          <div className="flex justify-center items-center  w-[1040px] h-[85px] mt-[10px]  border-t border-b border-black">
            <div className="flex items-center h-[50px] w-[50px] ">
              <MyPage size={30} />
            </div>
            <div>
              <div className="flex items-end h-[50px] ">
                <p className="text-lg text-center text-black">아무개! 님</p>
              </div>
              <Link href="/main/mypage/view">
                <button className="flex items-top h-[50px] ">
                  <p className="text-m text-center text-[#666]">
                    회원정보 조회
                  </p>
                  <div className="flex items-top mt-[4.5px]">
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
