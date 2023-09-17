import React, { useLayoutEffect, useState } from "react";
import dummyData from "./dummyData.json";
import { Product } from "@/components/product/DataTypes";
import { useRouter } from "next/router";
import { useScreenSize } from "@/libs/client/useScreen";
import Markeitem from "./markeitem";

interface ItemsProps {
  itemsPerPage: number;
  itemsToShow?: Product[];
}

export default function MarketItems({ itemsPerPage, itemsToShow }: ItemsProps) {
  const router = useRouter();
  const screen = useScreenSize();
  const allItems: any = dummyData;
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
              : "w-[1040px] px-[25px] py-[5px] mb-[0px]"
          } `}
        >
          {rowItems.map((item: Product) => (
            <Markeitem key={item.productId} item={item} />
          ))}
        </div>
      );
      rows.push(row);
    }

    return rows;
  };

  return (
    <div className="w-[1040px] relative overflow-hidden bg-white mobile:w-full">
      {renderItems()}
    </div>
  );
}
