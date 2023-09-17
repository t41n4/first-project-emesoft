import { IWindowSize } from "@/common";
import { useEffect, useState } from "react";

const useWindowSize = (): IWindowSize => {
  const [windowDimensions, setWindowDimensions] = useState<IWindowSize>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};

export default useWindowSize;
