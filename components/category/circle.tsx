import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
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

interface cProps {
  icon: string;
  direction: "hori" | "vert";
}

export default function Circle({ icon, direction }: cProps) {
  const router = useRouter();

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
    <div
    className={`flex items-center ${
      direction === "hori"
        ? "flex-col m-[15px] mobile:m-1.5"
        : "w-[350px] h-[50px] justify-start my-[15px] mx-[10px]"
    } `}
  >
    <button
      className={`${
        direction === "hori"
          ? "w-[50px] h-[50px] mobile:w-[45px] mobile:h-[45px]"
          : "w-[45px] h-[45px]"
      } mb-[10px] rounded-full bg-[#FAD5D5] bg-opacity-80 hover:bg-[#FAD5D5]`}
    >
      <Link
        href={{
          pathname: "/categories/[id]",
          query: { id: icon.toLowerCase() },
        }}
        legacyBehavior
      >
        <a className="text-[#666]">{getComponent()}</a>
      </Link>
    </button>
    <Link
      href={{
        pathname: "/categories/[id]",
        query: { id: icon.toLowerCase() },
      }}
      legacyBehavior
    >
      <a
        className={` ${
          direction === "hori"
            ? "text-[14px] mobile:text-[12px]"
            : "text-[15px] ml-[10px] mb-[10px] "
        }`}
      >
        {getKeyword()}
      </a>
    </Link>
  </div>

  );
}
