// ScreenUtil.js
import { useState, useEffect } from "react";

export function useScreenSize() {
  const [screen, setScreen] = useState("laptop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setScreen("mobile");
      } else {
        setScreen("laptop");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기화

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screen;
}
