import { useEffect, useState } from "react";

export interface IWindowSize {
  width: number | 0;
  height: number | 0;
}

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
