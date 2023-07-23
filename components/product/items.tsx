import React, { useEffect } from "react";
import Item from "./item";
import dummyData from "./dummyData.json";
import { Product } from "@/components/product/DataTypes";
import { useRouter } from "next/router";

interface ItemsProps {
  itemsPerPage: number; // itemsPerPage를 props로 받습니다.
}

export default function Items({ itemsPerPage }: ItemsProps) {
  const router = useRouter();
  const { search, image } = router.query;
  useEffect(() => {
    // 검색어와 이미지 값을 활용하여 필요한 작업을 수행합니다.
    console.log("검색어:", search);
    console.log("이미지:", image);
  }, [router.query]);

  // 페이지네이션을 위한 처리
  const currentPage = 1; // 현재 페이지, 여기서는 기본적으로 1페이지를 보여주도록 설정
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow: Product[] = dummyData.slice(startIndex, endIndex);

  const renderItems = () => {
    const rows = [];
    const numItemsPerRow = 4;

    for (let i = 0; i < itemsToShow.length; i += numItemsPerRow) {
      const rowItems = itemsToShow.slice(i, i + numItemsPerRow);
      const row = (
        <div
          key={i}
          className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] py-[5px] mb-[10px]"
        >
          {rowItems.map((item: Product) => (
            <Item key={item.productId} item={item} />
          ))}
        </div>
      );
      rows.push(row);
    }

    return rows;
  };

  return (
    <div className="w-[1040px] relative overflow-hidden bg-white">
      {renderItems()}
    </div>
  );
}
