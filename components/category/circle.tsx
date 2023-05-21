import Link from "next/link";
import {
  Top,
  Outer,
  Dress,
  Pants,
  Skirt,
  Training,
  Inner,
  Swimsuit,
  Shoes,
  Bag,
  Mgoods,
  ETC,
} from "../icons";

import React from "react";

interface cProps {
  icon: string;
}

export default function Circle({ icon }: cProps) {
  // category pink circle + icon 조건문
  const getComponent = () => {
    switch (icon) {
      case "Top":
        return <Top />;
      case "Outer":
        return <Outer />;
      case "Dress":
        return <Dress />;
      case "Pants":
        return <Pants />;
      case "Skirt":
        return <Skirt />;
      case "Training":
        return <Training />;
      case "Inner":
        return <Inner />;
      case "Swimsuit":
        return <Swimsuit />;
      case "Shoes":
        return <Shoes />;
      case "Bag":
        return <Bag />;
      case "Mgoods":
        return <Mgoods />;
      case "ETC":
        return <ETC />;
      default:
        return null;
    }
  };

  // 키워드 추가
  const getKeyword = () => {
    switch (icon) {
      case "Top":
        return "상의";
      case "Outer":
        return "아우터";
      case "Dress":
        return "원피스";
      case "Pants":
        return "팬츠";
      case "Skirt":
        return "스커트";
      case "Training":
        return "트레이닝";
      case "Inner":
        return "이너웨어";
      case "Swimsuit":
        return "수영복";
      case "Shoes":
        return "슈즈";
      case "Bag":
        return "가방";
      case "Mgoods":
        return "패션잡화";
      case "ETC":
        return "기타";
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center m-[15px]">
        <button className="w-[50px] h-[50px] mb-[10px] rounded-full bg-[#FAD5D5] bg-opacity-80 hover:bg-[#FAD5D5]">
          <Link href={`/categories/${icon}`} legacyBehavior>
            <a className="text-[#666]">{getComponent()}</a>
          </Link>
        </button>
        <Link href={`/categories/${icon}`} legacyBehavior>
          <a className="text-xs">{getKeyword()}</a>
        </Link>
      </div>
    </>
  );
}
