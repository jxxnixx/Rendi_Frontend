import { useState } from "react";
import { cls } from "@/libs/client/utils";
import TItem from "./tItem";

interface TItemsProps {
  onItemSelect: (itemId: string) => void;
}

export default function TItems({ onItemSelect }: TItemsProps) {
  const selectedItems = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
    "test11",
    "test12",
    "test13",
    "test14",
    "test15",
  ]; // 선택된 아이템 목록

  const renderItems = () => {
    const rows = [];
    const numItemsPerRow = 5;

    for (let i = 0; i < selectedItems.length; i += numItemsPerRow) {
      const rowItems = selectedItems.slice(i, i + numItemsPerRow);
      const row = (
        <div
          key={i}
          className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[1040px] relative gap-[35px] px-[25px] py-[5px] mb-[10px]"
        >
          {rowItems.map((item) => (
            <TItem key={item} item={item} onSelect={onItemSelect} />
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
