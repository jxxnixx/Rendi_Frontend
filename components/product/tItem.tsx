import { useState } from "react";
import { cls } from "@/libs/client/utils";

interface TItemProps {
  item: {
    productId: number;
    title: string;
    imgUrls: string[];
  };

  onItemSelect: (itemId: string) => void;
}

export default function TItem({ item, onItemSelect }: TItemProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onItemSelect(item.productId.toString());
  };

  return (
    <>
      <div
        className={`relative top-[35px] mb-[80px] w-[170px] h-[250px] bg-white`}
        onClick={handleClick} // 클릭 이벤트를 처리하는 핸들러를 추가합니다.
      >
        {item.imgUrls && (
          <div>
            {item.imgUrls.map((url, index) => (
              <img
                key={index}
                className={cls(
                  "relative w-[170px] h-[250px] rounded-lg border-2 border-gray-100 shadow-md",
                  isClicked ? "border-mc" : "" // isClicked 상태에 따라 테두리 스타일을 변경합니다.
                )}
                src={url}
                alt={item.title}
              />
            ))}
          </div>
        )}
        <div className="w-[170px] h-[30px] relative mt-[5px]">
          <p className="relative h-[20px] text-[16px] font-bold text-left text-[#000]">
            {item.title}
          </p>
        </div>
      </div>
    </>
  );
}
