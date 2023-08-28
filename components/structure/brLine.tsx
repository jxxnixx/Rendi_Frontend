import { useScreenWidth } from "@/libs/client/useScreen";
import { useEffect, useState } from "react";

export default function BrLine() {
  const screenWidth = useScreenWidth();

  return (
    <svg
      width={screenWidth}
      height={1}
      viewBox={`0 0 ${screenWidth} 1`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-[135px]"
      preserveAspectRatio="none"
    >
      <line
        y1="0.5"
        x2={screenWidth}
        y2="0.5"
        stroke="gray"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
