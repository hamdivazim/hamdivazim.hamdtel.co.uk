"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";

export default function Carousel({ children }) {
  const viewportRef = useRef(null);
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false
  });

  useEffect(() => {
    if (viewportRef.current) emblaRef(viewportRef.current);
  }, [emblaRef]);

  return (
    <div className="overflow-hidden" ref={viewportRef}>
      <div className="flex transition-transform duration-300 ease-out">
        {children}
      </div>
    </div>
  );
}
