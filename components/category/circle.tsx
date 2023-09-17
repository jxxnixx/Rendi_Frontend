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
} from "../icons";

interface cProps {
  icon: string;
  direction: "hori" | "vert";
}

export const getComponent = (icon: any) => {
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
    default:
      return null;
  }
};

export const getKeyword = (icon: any) => {
  switch (icon.toLowerCase()) {
    case "top":
      return "상의";
    case "outer":
      return "아우터";
    case "dress":
      return "원피스";
    case "pants":
      return "팬츠";
    case "skirt":
      return "스커트";
    case "training":
      return "트레이닝";
    case "inner":
      return "이너웨어";
    case "swimsuit":
      return "수영복";
    case "shoes":
      return "슈즈";
    case "bag":
      return "가방";
    case "mgoods":
      return "패션잡화";
    default:
      return null;
  }
};

export default function Circle({ icon, direction }: cProps) {
  getComponent(icon);

  getKeyword(icon);

  const router = useRouter();
  const isMainPage = router.asPath.includes("/main");

  return (
    <div
      className={`flex items-center ${
        direction === "hori"
          ? "hover:text-[#FC435A] flex-col m-[17.5px] mobile:m-1.5"
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
        {isMainPage ? (
          <Link
            href={{
              pathname: "/main/categories/[id]",
              query: { id: icon.toLowerCase() },
            }}
          >
            <div className="text-[#666]">{getComponent(icon)}</div>
          </Link>
        ) : (
          <Link
            href={{
              pathname: "/categories/[id]",
              query: { id: icon.toLowerCase() },
            }}
            className="text-[#666]"
          >
            {getComponent(icon)}
          </Link>
        )}
      </button>
      {isMainPage ? (
        <Link
          href={{
            pathname: "/main/categories/[id]",
            query: { id: icon.toLowerCase() },
          }}
        >
          <div
            className={` ${
              direction === "hori"
                ? "text-[14px] mobile:text-[12px] "
                : "text-[15px] ml-[10px] mb-[10px] "
            }`}
          >
            {getKeyword(icon)}
          </div>
        </Link>
      ) : (
        <Link
          href={{
            pathname: "/categories/[id]",
            query: { id: icon.toLowerCase() },
          }}
          className={` ${
            direction === "hori"
              ? "text-[14px] mobile:text-[12px] "
              : "text-[15px] ml-[10px] mb-[10px] "
          }`}
        >
          {getKeyword(icon)}
        </Link>
      )}
    </div>
  );
}
