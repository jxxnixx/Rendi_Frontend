import ProdBar from "@/components/menu/prodBar";
import Items from "@/components/product/items";
import Pagination from "@/components/structure/pagination";
import Layout from "@/layouts/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Product } from "@/components/product/DataTypes";
import dummyData from "@/components/product/dummyData.json";
import skirtDummyData from "@/components/product/skirtDummyData.json";
import miniSkirtDummyData from "@/components/product/miniSkirtDummyData.json";
import { atomActiveCate } from "@/libs/client/atom";
import { useRecoilValue } from "recoil";

interface Category {
  cate: string;
}

interface ProductPageProps {
  category: Category;
}

const categories: { [key: string]: Category[] } = {
  bag: [
    { cate: "전체" },
    { cate: "백팩" },
    { cate: "크로스백" },
    { cate: "숄더백" },
    { cate: "토트백" },
    { cate: "클러치" },
    { cate: "에코백" },
    { cate: "파우치" },
    { cate: "지갑" },
    { cate: "캐리어" },
  ],
  dress: [
    { cate: "전체" },
    { cate: "미니원피스" },
    { cate: "롱원피스" },
    { cate: "투피스" },
    { cate: "점프수트" },
  ],
  etc: [{ cate: "전체" }],
  inner: [
    { cate: "전체" },
    { cate: "브라" },
    { cate: "팬티" },
    { cate: "속옷세트" },
    { cate: "이너" },
    { cate: "보정" },
  ],
  mgoods: [
    { cate: "전체" },
    { cate: "헤어" },
    { cate: "모자" },
    { cate: "아이웨어" },
    { cate: "머플러/스카프" },
    { cate: "장갑" },
    { cate: "벨트" },
    { cate: "양말/스타킹" },
    { cate: "시계" },
    { cate: "마스크" },
    { cate: "기타" },
  ],
  outer: [
    { cate: "전체" },
    { cate: "가디건" },
    { cate: "바람막이" },
    { cate: "자켓" },
    { cate: "코트" },
    { cate: "패딩" },
    { cate: "플리스" },
    { cate: "집업/점퍼" },
    { cate: "야상" },
  ],
  pants: [
    { cate: "전체" },
    { cate: "롱팬츠" },
    { cate: "숏팬츠" },
    { cate: "슬랙스" },
    { cate: "데님" },
  ],
  shoes: [
    { cate: "전체" },
    { cate: "플랫/로퍼" },
    { cate: "블로퍼/뮬" },
    { cate: "스니커즈" },
    { cate: "샌들" },
    { cate: "힐" },
    { cate: "워커/부츠" },
    { cate: "슬리퍼/쪼리" },
    { cate: "기타" },
  ],
  skirt: [
    { cate: "전체" },
    { cate: "미니스커트" },
    { cate: "롱스커트" },
    { cate: "미디스커트" },
  ],
  swimsuit: [
    { cate: "전체" },
    { cate: "비키니" },
    { cate: "원피스수영복" },
    { cate: "모노키니" },
    { cate: "비치상의" },
    { cate: "비치하의" },
    { cate: "래쉬가드" },
    { cate: "악세사리" },
    { cate: "아쿠아슈즈" },
  ],
  top: [
    { cate: "전체" },
    { cate: "반소매 티셔츠" },
    { cate: "긴소매 티셔츠" },
    { cate: "블라우스" },
    { cate: "셔츠" },
    { cate: "민소매" },
    { cate: "니트" },
    { cate: "조끼" },
    { cate: "후드" },
    { cate: "맨투맨" },
  ],
  training: [
    { cate: "전체" },
    { cate: "트레이닝 하의" },
    { cate: "트레이닝 상의" },
    { cate: "트레이닝 세트" },
    { cate: "레깅스" },
  ],
};

const ProductPage: React.FC<ProductPageProps> = () => {
  const router = useRouter();
  const id = router.query?.id as string;
  const activeCate = useRecoilValue(atomActiveCate);

  const selectedCategory = categories[id as string];
  console.log(id);
  console.log(selectedCategory);
  console.log(selectedCategory[0].cate);

  if (!selectedCategory) {
    return <div>Invalid category</div>;
  }

  const categoryName = selectedCategory[0].cate;

  // 상품 데이터를 가져올 때, 카테고리에 따라 다른 데이터를 사용
  let dataToUse;
  if (id === "skirt" && activeCate === "전체") {
    dataToUse = skirtDummyData;
  } else if (id === "skirt" && activeCate === "미니스커트") {
    dataToUse = miniSkirtDummyData;
  } else {
    dataToUse = dummyData;
  }

  // 전체 아이템의 개수와 총 페이지 수 계산
  const totalItems = dataToUse.length;
  const itemsPerPage = 16;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지 상태값 추가
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 상품들을 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow: Product[] = dataToUse.slice(startIndex, endIndex);

  return (
    <Layout>
      <Head>
        <title>{categoryName}</title>
      </Head>
      <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white">
        <ProdBar id={id} category={selectedCategory} />
        <div className="flex justify-center py-8">
          <Items itemsPerPage={16} itemsToShow={itemsToShow} />
        </div>
        <div className="flex justify-center py-1">
          {/* Pagination 컴포넌트에 현재 페이지와 총 페이지 수, 페이지 변경 함수를 전달 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;

// import ProdBar from "@/components/menu/prodBar";
// import Items from "@/components/product/items";
// import Pagination from "@/components/structure/pagination";
// import Layout from "@/layouts/layout";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import { Product } from "@/components/product/DataTypes";
// import dummyData from "@/components/product/dummyData.json";
// import skirtDummyData from "@/components/product/skirtDummyData.json";
// import miniSkirtDummyData from "@/components/product/miniSkirtDummyData.json";

// interface Category {
//   cate: string;
//   pageName: string;
// }

// interface ProductPageProps {
//   category: Category;
// }

// const categories: { [key: string]: Category[] } = {
//   bag: [
//     { cate: "전체", pageName: "bag" },
//     { cate: "백팩", pageName: "backpack" },
//     { cate: "크로스백", pageName: "crossbag" },
//     { cate: "숄더백", pageName: "shoulderbag" },
//     { cate: "토트백", pageName: "totebag" },
//     { cate: "클러치", pageName: "clutch" },
//     { cate: "에코백", pageName: "ecobag" },
//     { cate: "파우치", pageName: "pouch" },
//     { cate: "지갑", pageName: "wallet" },
//     { cate: "캐리어", pageName: "carrier" },
//   ],
//   dress: [
//     { cate: "전체", pageName: "dress" },
//     { cate: "미니원피스", pageName: "minidress" },
//     { cate: "롱원피스", pageName: "longdress" },
//     { cate: "투피스", pageName: "twopiece" },
//     { cate: "점프수트", pageName: "jumpsuit" },
//   ],
//   etc: [{ cate: "전체", pageName: "etc" }],
//   inner: [
//     { cate: "전체", pageName: "inner" },
//     { cate: "브라", pageName: "bra" },
//     { cate: "팬티", pageName: "panty" },
//     { cate: "속옷세트", pageName: "underwearset" },
//     { cate: "이너", pageName: "inner" },
//     { cate: "보정", pageName: "correction" },
//   ],
//   mgoods: [
//     { cate: "전체", pageName: "mgoods" },
//     { cate: "헤어", pageName: "hair" },
//     { cate: "모자", pageName: "hat" },
//     { cate: "아이웨어", pageName: "eyewear" },
//     { cate: "머플러/스카프", pageName: "muffler" },
//     { cate: "장갑", pageName: "glove" },
//     { cate: "벨트", pageName: "belt" },
//     { cate: "양말/스타킹", pageName: "socks" },
//     { cate: "시계", pageName: "watch" },
//     { cate: "마스크", pageName: "mask" },
//     { cate: "기타", pageName: "etc" },
//   ],
//   outer: [
//     { cate: "전체", pageName: "outer" },
//     { cate: "가디건", pageName: "cardigan" },
//     { cate: "바람막이", pageName: "windbreaker" },
//     { cate: "자켓", pageName: "jacket" },
//     { cate: "코트", pageName: "coat" },
//     { cate: "패딩", pageName: "padding" },
//     { cate: "플리스", pageName: "fleece" },
//     { cate: "집업/점퍼", pageName: "zipup" },
//     { cate: "야상", pageName: "fieldjacket" },
//   ],
//   pants: [
//     { cate: "전체", pageName: "pants" },
//     { cate: "롱팬츠", pageName: "longpants" },
//     { cate: "숏팬츠", pageName: "shortpants" },
//     { cate: "슬랙스", pageName: "slacks" },
//     { cate: "데님", pageName: "denim" },
//   ],
//   shoes: [
//     { cate: "전체", pageName: "shoes" },
//     { cate: "플랫/로퍼", pageName: "flat" },
//     { cate: "블로퍼/뮬", pageName: "bloper" },
//     { cate: "스니커즈", pageName: "sneakers" },
//     { cate: "샌들", pageName: "sandals" },
//     { cate: "힐", pageName: "heel" },
//     { cate: "워커/부츠", pageName: "walker" },
//     { cate: "슬리퍼/쪼리", pageName: "slipper" },
//     { cate: "기타", pageName: "etc" },
//   ],
//   skirt: [
//     { cate: "전체", pageName: "skirt" },
//     { cate: "미니스커트", pageName: "miniskirt" },
//     { cate: "롱스커트", pageName: "longskirt" },
//     { cate: "미디스커트", pageName: "midiskirt" },
//   ],
//   swimsuit: [
//     { cate: "전체", pageName: "swimsuit" },
//     { cate: "비키니", pageName: "bikini" },
//     { cate: "원피스수영복", pageName: "onepiece" },
//     { cate: "모노키니", pageName: "monokini" },
//     { cate: "비치상의", pageName: "beachwear" },
//     { cate: "비치하의", pageName: "beachwear" },
//     { cate: "래쉬가드", pageName: "rashguard" },
//     { cate: "악세사리", pageName: "accessory" },
//     { cate: "아쿠아슈즈", pageName: "aquashoes" },
//   ],
//   top: [
//     { cate: "전체", pageName: "top" },
//     { cate: "반소매 티셔츠", pageName: "halfsleeve" },
//     { cate: "긴소매 티셔츠", pageName: "longsleeve" },
//     { cate: "블라우스", pageName: "blouse" },
//     { cate: "셔츠", pageName: "shirt" },
//     { cate: "민소매", pageName: "sleeveless" },
//     { cate: "니트", pageName: "knit" },
//     { cate: "조끼", pageName: "vest" },
//     { cate: "후드", pageName: "hood" },
//     { cate: "맨투맨", pageName: "man2man" },
//   ],
//   training: [
//     { cate: "전체", pageName: "training" },
//     { cate: "트레이닝 하의", pageName: "trainingpants" },
//     { cate: "트레이닝 상의", pageName: "trainingtop" },
//     { cate: "트레이닝 세트", pageName: "trainingset" },
//     { cate: "레깅스", pageName: "leggings" },
//   ],
// };
// const ProductPage: React.FC<ProductPageProps> = ({ category }) => {
//   const router = useRouter();
//   const { id } = router.query;

//   const selectedCategory = categories[id as string];

//   if (!selectedCategory) {
//     return <div>Invalid category</div>;
//   }

//   const categoryName = selectedCategory[0].cate;

//   // 전체 아이템의 개수와 총 페이지 수 계산
//   const totalItems = dummyData.length;
//   const itemsPerPage = 16;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // 현재 페이지 상태값 추가
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [currentPage, setCurrentPage] = useState(1);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   // 현재 페이지에 해당하는 상품들을 계산
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const itemsToShow: Product[] = dummyData.slice(startIndex, endIndex);

//   return (
//     <Layout>
//       <Head>
//         <title>{categoryName}</title>
//       </Head>
//       <div className="relative mt-[135px] flex w-full flex-col text-lg font-medium bg-white">
//         <ProdBar category={selectedCategory} />
//         <div className="flex justify-center py-8">
//           <Items itemsPerPage={16} itemsToShow={itemsToShow} />
//         </div>
//         <div className="flex justify-center py-1">
//           {/* Pagination 컴포넌트에 현재 페이지와 총 페이지 수, 페이지 변경 함수를 전달 */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProductPage;
