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

  return (
    <button className="w-[50px] h-[50px] rounded-full bg-[#FAD5D5] bg-opacity-80 hover:bg-[#FAD5D5]">
      <Link href={`/categories/${icon}`} legacyBehavior>
        <a className="text-[#666]">{getComponent()}</a>
      </Link>
    </button>
  );
}
