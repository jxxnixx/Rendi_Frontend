import Link from "next/link";
import {
  Top,
  Outer,
  Dress,
  Pants,
  Skirt,
  Inner,
  Swimsuit,
  Shoes,
  Bag,
  Mgoods,
  ETC,
} from "./icons";
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

  // 매개변수 icon에 맞게 label 추가해서 아래 circle css에 추가하기

  return (
    <button className="w-[50px] h-[50px] rounded-full bg-[#FAD5D5] bg-opacity-80 hover:bg-[#FAD5D5]">
      <Link href={`/categories/${icon}`} legacyBehavior>
        <a className="text-[#666]">{getComponent()}</a>
      </Link>
    </button>
  );
}
