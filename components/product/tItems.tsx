import { useState } from "react";
import { cls } from "@/libs/client/utils";
import TItem from "./tItem";
import dummyData from "./tasteDummyData.json";
import { TasteProduct } from "@/components/product/DataTypes";

interface TItemsProps {
  onItemSelect: (itemId: string) => void;
}

export default function TItems({ onItemSelect }: TItemsProps) {
  // 전체 상품 데이터를 가져옵니다.
  const allItems: TasteProduct[] = dummyData;

  const renderItems = () => {
    const rows = [];
    const numItemsPerRow = 5;

    for (let i = 0; i < allItems.length; i += numItemsPerRow) {
      const rowItems = allItems.slice(i, i + numItemsPerRow);
      const row = (
        <div
          key={i}
          className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] py-[5px] mb-[10px]"
        >
          {rowItems.map((item) => (
            <TItem
              key={item.productId}
              item={item}
              onItemSelect={onItemSelect}
            />
          ))}
        </div>
      );
      rows.push(row);
    }

    return rows;
  };

  return (
    <>
      <div className="w-[1040px] h-[1100px] relative overflow-hidden bg-white">
        {renderItems()}
      </div>
    </>
  );
}
