// import { Line } from "@/components/icons";
// import Items from "@/components/product/items";
// import Items8 from "@/components/product/items8";
// import Prodlist from "@/components/sort/prodlist";
// import BrLine from "@/components/structure/brLine";
// import Pagination from "@/components/structure/pagination";
// import Layout from "@/layouts/layout";
// import Head from "next/head";
// import React, { useEffect, useState } from "react"; // useEffect와 useState를 불러옵니다.
// import { useRouter } from "next/router";
// import { Product } from "@/components/product/DataTypes"; // Product 타입을 불러옵니다.
// import dummyData from "@/components/product/dummyData.json"; // 더미 데이터를 불러옵니다.

// export default function SearchResult() {
//   const router = useRouter();
//   const { search, image } = router.query;
//   useEffect(() => {
//     console.log("검색어:", search);
//     console.log("이미지:", image);
//   }, [router.query]);

//   // 전체 아이템의 개수와 총 페이지 수 계산
//   const totalItems = dummyData.length;
//   const itemsPerPage = 16;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // 현재 페이지 상태값 추가
//   const [currentPage, setCurrentPage] = useState(1);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const itemsToShow: Product[] = dummyData.slice(startIndex, endIndex);

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
//               <span className="text-[#fc435a]">{totalItems}</span>개의 상품 )
//             </p>
//           </div>
//           <div className="flex w-[1040px] h-[60px] items-center top-[30px]">
//             <Prodlist products={[]} />
//           </div>
//           <Line />
//         </div>
//       </div>

//       <div className="flex flex-col items-center justify-center">
//         <Items itemsPerPage={itemsPerPage} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </Layout>
//   );
// }
import { Line } from "@/components/icons";
import Items from "@/components/product/items";
import Prodlist from "@/components/sort/prodlist";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";

export default function SearchResult() {
  const router = useRouter();
  const { search, image } = router.query;
  useEffect(() => {
    console.log("검색어:", search);
    console.log("이미지:", image);
  }, [router.query]);

  // 전체 아이템의 개수와 총 페이지 수 계산
  const totalItems = dummyData.length;
  const itemsPerPage = 16;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지 상태값 추가
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 상품들을 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow: Product[] = dummyData.slice(startIndex, endIndex);

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
              <span className="text-[#fc435a]">{totalItems}</span>개의 상품 )
            </p>
          </div>
          <div className="flex w-[1040px] h-[60px] items-center top-[30px]">
            <Prodlist products={[]} />
          </div>
          <Line />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Items 컴포넌트에 itemsPerPage를 전달 */}
        <Items itemsToShow={itemsToShow} itemsPerPage={itemsPerPage} />
        {/* Pagination 컴포넌트에 현재 페이지와 총 페이지 수, 페이지 변경 함수를 전달 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
}
