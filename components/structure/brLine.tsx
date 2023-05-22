import { useEffect, useState } from "react";

export default function BrLine() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // 초기 로드 시 스크린 크기 설정
    setScreenWidth(window.innerWidth);

    // 윈도우 창 크기 변경 이벤트 감지
    window.addEventListener("resize", handleResize);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 해제
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
