import React, { useEffect } from "react";
import Item from "./item";
import dummyData from "./dummyData.json";
import { Product } from "@/components/product/DataTypes";
import { useRouter } from "next/router";

interface ItemsProps {
  itemsPerPage: number; // itemsPerPage를 props로 받습니다.
}

export default function ItemsNoPage({ itemsPerPage }: ItemsProps) {
  const router = useRouter();
  const { search, image } = router.query;
  useEffect(() => {
    // 검색어와 이미지 값을 활용하여 필요한 작업을 수행합니다.
    console.log("검색어:", search);
    console.log("이미지:", image);
  }, [router.query]);

  // itemsToShow가 없다면 dummyData에서 상품들을 선택합니다.
  const itemsToDisplay: Product[] = itemsToShow || dummyData;

  const renderItems = () => {
    const rows = [];
    const numItemsPerRow = 4;

    for (let i = 0; i < itemsToDisplay.length; i += numItemsPerRow) {
      const rowItems = itemsToDisplay.slice(i, i + numItemsPerRow);
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
