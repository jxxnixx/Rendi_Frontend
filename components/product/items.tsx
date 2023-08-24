import React, { useEffect, useState } from "react";
import Item from "./item";
import dummyData from "./dummyData.json";
import { Product } from "@/components/product/DataTypes";
import { useRouter } from "next/router";
import { useScreenSize } from "@/libs/client/useScreen";

interface ItemsProps {
  itemsPerPage: number; // itemsPerPage를 props로 받습니다.
  itemsToShow?: Product[]; // itemsToShow를 옵셔널하게 설정합니다.
}

export default function Items({ itemsPerPage, itemsToShow }: ItemsProps) {
  const router = useRouter();

  const { search, image } = router.query;
  useEffect(() => {
    // 검색어와 이미지 값을 활용하여 필요한 작업을 수행합니다.
    console.log("검색어:", search);
    console.log("이미지:", image);
  }, [router.query]);

  const screen = useScreenSize();

  // 전체 상품 데이터를 가져옵니다.
  const allItems: Product[] = dummyData;

  // 만약 itemsToShow가 제공되지 않았다면, 처음 itemsPerPage개의 상품만 보여줍니다.
  const itemsToDisplay = itemsToShow || allItems.slice(0, itemsPerPage);

  const renderItems = () => {
    const rows = [];
    const numItemsPerRow = screen === "mobile" ? 2 : 4;

    for (let i = 0; i < itemsToDisplay.length; i += numItemsPerRow) {
      const rowItems = itemsToDisplay.slice(i, i + numItemsPerRow);
      const row = (
        <div
          key={i}
          className={`flex relative justify-between items-start ${
            screen === "mobile"
              ? "w-full px-[16px] py-[3px] mb-[5px]"
              : "w-[1040px] px-[25px] py-[5px] mb-[10px]"
          } `}
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
    <div className="w-[1040px] relative overflow-hidden bg-white mobile:w-[640px]">
      {renderItems()}
    </div>
  );
}
