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
        className={` transition-transform transform hover:scale-105 focus:outline-none focus:ring-0 mt-1 flex flex-col align-center justify-center mb-[80px] top-[35px] ${
          screen === "mobile"
            ? "w-[120px]  h-[150px] mt-[45px] mb-[1px] "
            : "w-[200px] h-[200px] "
        }`}
        // 클릭 이벤트를 처리하는 핸들러를 추가합니다.
      >
        {item.imgUrls && (
          <div className="cursor-pointer flex items-center justify-center">
            {item.imgUrls.map((url, index) => (
              <img
                key={index}
                className={cls(
                  " rounded-lg border-2 border-gray-100 shadow-md",
                  isClicked ? "border-mc" : "",
                  screen === "mobile"
                    ? "w-[100px] h-[150px] "
                    : "w-[180px] h-[250px]"
                )}
                src={url}
                alt={item.title}
              />
            ))}
          </div>
        )}
        <div className="w-auto h-[30px] mt-[5px] ">
          <p className="h-[20px] text-[16px] font-bold text-center text-[#000]">
            {item.title}
          </p>
        </div>
      </div>
    </>
  );
}
