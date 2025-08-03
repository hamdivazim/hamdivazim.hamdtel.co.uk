"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useRef, useEffect } from "react";

export default function Carousel({ children }) {
  const viewportRef = useRef(null);
  const [emblaRef] = useEmblaCarousel({
    align: "start",
  });

  useEffect(() => {
    if (viewportRef.current) emblaRef(viewportRef.current);
  }, [emblaRef]);

  return (
    <div className="overflow-hidden" ref={viewportRef}>
      <div className="flex touch-pan-y will-change-transform gap-4">
        {children}
      </div>
    </div>
  );
}
