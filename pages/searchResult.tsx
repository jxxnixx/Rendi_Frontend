// import React from "react";
// import { Line } from "@/components/icons";
// import Item from "@/components/product/item";
// import Prodlist from "@/components/sort/prodlist";
// import Pagination from "@/components/structure/pagination";
// import Layout from "@/layouts/layout";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import dummyData from "@/components/product/dummyData.json";

// interface SearchResultProps {
//   totalPages: number;
// }

// const SearchResult = ({ totalPages }: SearchResultProps) => {
//   const itemsPerPage = 12; // 한 페이지에 보여줄 아이템 수
//   const router = useRouter();
//   const { search, image } = router.query;
//   useEffect(() => {
//     // 검색어와 이미지 값을 활용하여 필요한 작업을 수행합니다.
//     console.log("검색어:", search);
//     console.log("이미지:", image);
//   }, [router.query]);

//   // 페이지네이션을 위한 처리
//   const currentPage = 1; // 현재 페이지, 여기서는 기본적으로 1페이지를 보여주도록 설정
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const itemsToShow = dummyData.slice(startIndex, endIndex);

//   return (
//     <Layout>
//       <Head>
//         <title>SearchResult</title>
//       </Head>
//       <div className="flex items-center justify-center">
//         <div className="flex-col w-[1040px] pb-[32px]">
//           <div className="flex items-center w-[1040px] h-[60px] mt-[135px] text-lg font-medium ">
//             <p className="flex justify-start text-lg text-left">
//               “<span className="text-[#fc435a]">{search}</span>” 검색결과 ( 전체
//               <span className="text-[#fc435a]">{dummyData.length}</span>
//               개의 상품 )
//             </p>
//           </div>
//           <div className="flex w-[1040px] h-[60px] items-center top-[30px]">
//             <Prodlist products={[]} />
//           </div>
//           <Line />
//         </div>
//       </div>

//       <div className=" flex flex-col items-center justify-center">
//         {itemsToShow.map((item) => (
//           <Item key={item.productId} item={item} />
//         ))}
//         <Pagination totalPages={totalPages} />
//       </div>
//     </Layout>
//   );
// };

// export default SearchResult;

import { Line } from "@/components/icons";
import Items from "@/components/product/items";
import Items8 from "@/components/product/items8";
import Prodlist from "@/components/sort/prodlist";
import BrLine from "@/components/structure/brLine";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SearchResult() {
  const router = useRouter();
  const { search, image } = router.query;
  useEffect(() => {
    // 검색어와 이미지 값을 활용하여 필요한 작업을 수행합니다.

    console.log("검색어:", search);
    console.log("이미지:", image);
  }, [router.query]);

  // //페이지네이션을 위한 처리
  //   const currentPage = 1; // 현재 페이지, 여기서는 기본적으로 1페이지를 보여주도록 설정
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const itemsToShow = dummyData.slice(startIndex, endIndex);

  return (
    <Layout>
      <Head>
        <title>SearchResult</title>
      </Head>
      <div className="flex items-center justify-center">
        <div className="flex-col w-[1040px] pb-[32px]">
          <div className="flex items-center w-[1040px] h-[60px] mt-[135px] text-lg font-medium ">
            <p className="flex justify-start text-lg text-left">
              “<span className="text-[#fc435a]">{search}</span>” 검색결과 ( 전체
              <span className="text-[#fc435a]">234</span>
              개의 상품 )
            </p>
          </div>
          <div className="flex w-[1040px] h-[60px] items-center top-[30px]">
            <Prodlist products={[]} />
          </div>
          <Line />
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center">
        <Items itemsPerPage={16} />
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </Layout>
  );
}
