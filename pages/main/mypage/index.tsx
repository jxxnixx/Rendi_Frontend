import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Line, MyPage, Next, ShoppingBag } from "@/components/icons";
import Items from "@/components/product/items";
import Mymenus from "@/components/structure/mymenus";

function Mypage() {
  return (
    <>
      <Layout>
        <Head>
          <title>Mypage</title>
        </Head>
        <Mymenus />
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
