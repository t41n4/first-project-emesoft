import React, { useRef, useEffect } from "react";

const ScrollArea: React.FC = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.addEventListener("wheel", (e) => {
        container.scrollLeft += e.deltaY;
      });
    }
  }, []);

  return (
    <div className="w-full h-64 overflow-x-auto" ref={scrollContainerRef}>
      {children}
    </div>
  );
};

export default ScrollArea;
