'use client';

// unused, might implement in an update?

import { useEffect, useRef } from 'react';

export default function QCBackground() {
  const shapesRef = useRef([]);

  useEffect(() => {
    let raf;
    const loop = () => {
      const y = window.scrollY;
      const w = window.innerWidth;
      const h = window.innerHeight;
      shapesRef.current.forEach((el, i) => {
        if (!el) return;
        const depth = (i + 1) * 0.02;
        const xOff = (w * depth) * ((i % 2) ? 1 : -1) * (y / h);
        const yOff = (h * depth) * (i < 2 ? -1 : 1) * (y / h);
        el.style.transform = `translate3d(${xOff}px, ${yOff}px, 0)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - .5) * 2;
      const y = (e.clientY / window.innerHeight - .5) * 2;
      shapesRef.current.forEach((el, i) => {
        if (!el) return;
        const depth = (i + 1) * 0.0015;
        el.style.transform += ` translate3d(${x * window.innerWidth * depth}px, ${y * window.innerHeight * depth}px, 0)`;
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const setRef = (el,i) => { shapesRef.current[i] = el; };

  const corners = [
    'top-0 left-0 rounded-br-full',
    'top-0 right-0 rounded-bl-full',
    'bottom-0 left-0 rounded-tr-full',
    'bottom-0 right-0 rounded-tl-full',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {corners.map((pos, i) => (
        <div
          key={i}
          ref={el => (shapesRef.current[i] = el)}
          className={`
            absolute ${pos}
            w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]
            bg-white/20 border border-white/30
            will-change-transform
            z-0
          `}
        />
      ))}
    </div>
  );
}