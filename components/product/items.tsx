import React, { useEffect, useState } from "react";
import Item from "./item";
import dummyData from "./dummyData.json";
import { Product } from "@/components/product/DataTypes";
import { useRouter } from "next/router";
import { useScreenSize } from "@/libs/client/useScreen";
import { itemsApi } from "@/libs/api";

interface ItemsProps {
  itemsPerPage: number;
  itemsToShow?: Product[];
}

type ClickCounts = { [productId: number]: number };
type LastClickTimes = { [productId: number]: number | null };

export default function Items({ itemsPerPage, itemsToShow }: ItemsProps) {
  const router = useRouter();
  const screen = useScreenSize();
  const allItems: Product[] = dummyData;
  const itemsToDisplay = itemsToShow || allItems.slice(0, itemsPerPage);
  // 만약 itemsToShow가 제공되지 않았다면, 처음 itemsPerPage개의 상품만 보여줍니다.

  const [clickCounts, setClickCounts] = useState<ClickCounts>({});
  const [lastClickTimes, setLastClickTimes] = useState<LastClickTimes>({});
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const updateClickCount = (productId: number, clickCount: number) => {
    setClickCounts((prevClickCounts) => ({
      ...prevClickCounts,
      [productId]: clickCount,
    }));
    console.log(productId + ":" + clickCount);
  };

  const updateLastClickTime = (productId: number, clickTime: number | null) => {
    setLastClickTimes((prevLastClickTimes) => ({
      ...prevLastClickTimes,
      [productId]: clickTime,
    }));
  };

  const sendClickCountsToBackend = async () => {
    try {
      for (const productId in clickCounts) {
        const productIdn = parseInt(productId); // 문자열을 숫자로 변환
        const clickCount = clickCounts[productId];
        console.log(productIdn);
        console.log(clickCount);
        console.log(clickCounts);

        const hitsResponse: any = await itemsApi.updateHits(
          productIdn,
          clickCount
        );
        console.log("클릭 카운트 업데이트한다?");
        console.log(hitsResponse.response);
      }
    } catch (error) {
      console.log("클릭 카운트 업데이트 에러:", error);
    }
  };

  useEffect(() => {
    const startInterval = () => {
      const newIntervalId = setInterval(() => {
        sendClickCountsToBackend();
      }, 600000); // 600초 (10분)

      setIntervalId(newIntervalId);
    };

    // 클릭 타임스탬프가 있는 경우에만 주기적인 업데이트 시작
    if (Object.keys(lastClickTimes).length > 0) {
      startInterval();
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      sendClickCountsToBackend(); // 컴포넌트 언마운트 시 마지막 업데이트 수행
    };
  }, [lastClickTimes]);

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
            <Item
              key={item.productId}
              item={item}
              updateClickCount={updateClickCount}
              lastClickTime={lastClickTimes[item.productId] || null}
              updateLastClickTime={updateLastClickTime} // setLastClickTime 함수 전달
            />
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
