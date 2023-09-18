import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // scroll container
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // page scrollable height based on content length
  const [pageHeight, setPageHeight] = useState<number>(0);

  // update scrollable height when browser is resizing
  const resizePageHeight = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);

  // observe when the browser is resizing
  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizePageHeight(entries)
    );
    scrollRef.current && resizeObserver.observe(scrollRef.current);
    return () => resizeObserver.disconnect();
  }, [scrollRef, resizePageHeight]);

  const { scrollY } = useScroll(); // measures how many pixels the user has scrolled vertically
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on the current scroll position to translateY the document in a natural way
  const transform = useTransform(scrollY, [0, pageHeight], [0, -100]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }; // easing of smooth scroll
  const spring = useSpring(transform, physics); // apply easing to the negative scroll value

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: spring }} // translateY of scroll container using negative scroll value
        className="scroll-container flex w-full h-1/2"
      >
        {children}
      </motion.div>
    </>
  );
};

export default SmoothScroll;
