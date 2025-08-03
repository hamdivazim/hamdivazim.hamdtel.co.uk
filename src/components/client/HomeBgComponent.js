'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HomeBgCanvas from './HomeBgCanvas';

const MOBILE_BG_IMAGES = Array.from(
  { length: 16 },
  (_, i) => `/assets/landing-mobile-bg/${i + 1}.png`
);

export default function HomeBgComponent() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileBgImage, setMobileBgImage] = useState(null);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile && !mobileBgImage) {
        setMobileBgImage(
          MOBILE_BG_IMAGES[Math.floor(Math.random() * MOBILE_BG_IMAGES.length)]
        );
      }
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [mobileBgImage]);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(t);
  }, [animate]);

  if (isMobile && mobileBgImage) {
    return (
      <div className={`absolute inset-0 ${animate ? 'slide-up-once' : ''}`}>
        <Image
          src={mobileBgImage}
          alt="Background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
    );
  }

  return <HomeBgCanvas animate={animate} />;
}
