import { useState } from "react";
import { cls } from "@/libs/client/utils";
import { useScreenSize } from "@/libs/client/useScreen";

interface TItemProps {
  item: {
    productId: number;
    title: string;
    imgUrls: string[];
  };

  onItemSelect: (itemId: string) => void;
}

export default function TItem({ item, onItemSelect }: TItemProps) {
  const screen = useScreenSize();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onItemSelect(item.productId.toString());
  };

  return (
    <>
      <div
      onClick={handleClick}
        className={`flex flex-col align-center justify-center  mb-[80px]  top-[35px]  bg-white ${
          screen === "mobile" ? "w-[45%]  h-[200px] mt-[45px] " : "w-[170px] h-[200px] "}`}
         // 클릭 이벤트를 처리하는 핸들러를 추가합니다.
      >
        {item.imgUrls && (
          <div>
            {item.imgUrls.map((url, index) => (
              <img
                key={index}
                className={cls(
                  "relative rounded-lg border-2 border-gray-100 shadow-md",
                  isClicked ? "border-mc" : "",
                  screen === "mobile" ? "w-full h-[250px]" : "w-[170px] h-[250px]"
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
