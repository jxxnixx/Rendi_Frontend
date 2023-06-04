import { useState } from "react";
import { cls } from "@/libs/client/utils";

interface TItemProps {
  item: string;
  onSelect: (itemId: string) => void;
}

export default function TItem({ item, onSelect }: TItemProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onSelect(item);
  };

  return (
    <>
      <div
        className={`relative top-[35px] mb-[80px] w-[170px] h-[250px] bg-white`}
      >
        <img
          className={cls(
            "relative w-[170px] h-[250px] rounded-lg border-2 border-gray-100 shadow-md",
            isClicked ? "border-mc" : ""
          )}
          src="https://img1.shopcider.com/product/1679737221000-h2RfX5.jpg?x-oss-process=image/resize,w_700,m_lfit/quality,Q_80/format,webp"
          onClick={handleClick}
        />
        <div className="w-[170px] h-[30px] relative mt-[5px]">
          <p className="relative h-[20px] text-[16px] font-bold text-left text-[#000]">
            {item} 로맨틱
          </p>
        </div>
      </div>
    </>
  );
}
