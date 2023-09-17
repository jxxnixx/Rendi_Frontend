import { useState, useLayoutEffect } from "react";

export function useScreenSize() {
  const [screen, setScreen] = useState("laptop");

  useLayoutEffect(() => {
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

export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth;
}
