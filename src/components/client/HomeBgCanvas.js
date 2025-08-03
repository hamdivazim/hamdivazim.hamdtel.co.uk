'use client';

import { useEffect, useRef, useMemo, useCallback, useState } from 'react';

const COLOURS = ['#800000', '#16A34A', '#EA580C', '#EAB308', '#F59E0B'];
const ROTATIONS = [0, 90, 180, 270];
const spriteCache = new Map();
const backgroundCache = new Map();

function createSprites(size) {
  return COLOURS.map(colour =>
    ROTATIONS.map(rot => {
      const off = document.createElement('canvas');
      off.width = size;
      off.height = size;
      const ctx = off.getContext('2d');
      ctx.translate(size / 2, size / 2);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.translate(-size / 2, -size / 2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, size, 0, Math.PI / 2);
      ctx.lineTo(0, size);
      ctx.closePath();
      ctx.fillStyle = colour;
      ctx.fill();
      return off;
    })
  );
}

export default function HomeBgCanvas({ animate }) {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const getSprites = useMemo(
    () => size => {
      if (!spriteCache.has(size)) {
        spriteCache.set(size, createSprites(size));
      }
      return spriteCache.get(size);
    },
    []
  );

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const textBox = document.getElementById('landing-text')?.getBoundingClientRect() ?? {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };

    if (!canvas || !ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const size = 120;

    canvas.width = width;
    canvas.height = height;

    const key = `shifted-${size}-${width}x${height}`;
    if (backgroundCache.has(key)) {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(backgroundCache.get(key), 0, 0);
      return;
    }

    const navH = height * 0.20;
    const navStartX = width * 0.75;
    const margin = size;
    const skipX1 = textBox.left - margin;
    const skipX2 = textBox.right + margin;
    const scrollY = window.scrollY;
    const skipY1 = textBox.top + scrollY - margin;
    const skipY2 = textBox.bottom + scrollY + margin;

    const sprites = getSprites(size);
    const rows = Math.ceil(height / size);
    const cols = Math.ceil(width / size) + 2;
    const density = 0.55;

    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const offctx = offscreen.getContext('2d');

    for (let r = 0; r < rows; r++) {
      for (let c = -1; c < cols; c++) {
        const rnd = Math.random();
        if (rnd > density) continue;
        const x = c * size;
        const y = (r - 1) * size - scrollY;
        if (x + size > skipX1 && x < skipX2 && y + size > skipY1 && y < skipY2) continue;
        if (x + size > navStartX && y < navH) continue;
        const idx = Math.floor(rnd * COLOURS.length * ROTATIONS.length);
        const ci = idx % COLOURS.length;
        const ri = Math.floor(idx / COLOURS.length);
        offctx.drawImage(sprites[ci][ri], x, y);
      }
    }

    backgroundCache.set(key, offscreen);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(offscreen, 0, 0);
  }, [getSprites]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId;

    const onIntersect = (entries) => {
      const entry = entries[0];
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) {
        drawGrid();
      }
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0.1,
    });

    observer.observe(canvas);

    const onResize = () => {
      rafId = requestAnimationFrame(() => {
        if (visible) drawGrid();
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [drawGrid, visible]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 will-change-transform ${animate ? 'slide-up-once' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
        pointerEvents: 'none',
      }}
    />
  );
}
