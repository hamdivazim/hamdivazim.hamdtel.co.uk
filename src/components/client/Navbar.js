'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export default function Navbar({ expandOnScroll = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!expandOnScroll) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [expandOnScroll]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={clsx(
        'fixed z-50 top-4 shadow-xl flex items-center justify-between overflow-visible',
        'transition-all duration-700 ease-in-out',
        expandOnScroll && scrolled
          ? 'left-4 right-4 w-[calc(100%-2rem)] rounded-2xl bg-indigo-900/90 backdrop-blur-2xl'
          : 'right-4 w-fit rounded-full bg-transparent',
        !expandOnScroll && 'bg-indigo-900/90 backdrop-blur-2xl'
      )}
      style={{
        padding: '0.75rem 1.5rem',
        marginLeft: 'auto',
        marginRight: expandOnScroll && scrolled ? 'auto' : '0',
        transitionProperty:
          'width, border-radius, background-color, backdrop-filter, margin, padding',
      }}
    >

      <ul className="hidden sm:flex flex-row items-center justify-end gap-8">
       {['Home', 'About', 'Blog', 'Devlog', 'Projects'].map((text) => (
                    <li key={text}><Link
                    
                    href={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-white hover:underline"
                    >
                    {text}
                    </Link></li>
                ))}
                <li key={"pipe"}>
                    <span className='text-sm font-medium text-white select-none'>|</span>
                </li>
                <li key={"Contact"}><Link
                    
                    href="/#contact"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-white hover:underline"
                    >
                    Contact Me
                    </Link></li>
      </ul>
      
      
        <div className="sm:hidden relative z-50">
            <button
                aria-label="Toggle menu"
                onClick={() => setMenuOpen(!menuOpen)}
                className={clsx(
                'relative flex items-center justify-center overflow-hidden text-white transition-all duration-500 ease-in-out',
                menuOpen
                    ? 'w-15 h-70 px-4 py-4 rounded-md'
                    : 'w-10 h-10 rounded-full'
                )}
                style={{
                transitionProperty: 'width, height, border-radius, padding',
                }}
            >
                <div
                className={clsx(
                    'absolute top-3 z-20 w-6 h-5 transition-all duration-500',
                    menuOpen
                    ? 'left-1/2 -translate-x-1/2'
                    : 'right-5 translate-x-0'
                )}
                >
                <span
                    className={clsx(
                    'absolute h-[2px] w-full bg-white transform transition duration-300',
                    menuOpen ? 'rotate-45 top-2.5' : 'top-0'
                    )}
                />
                <span
                    className={clsx(
                    'absolute h-[2px] w-full bg-white transition-all duration-300',
                    menuOpen ? 'opacity-0' : 'top-2.5'
                    )}
                />
                <span
                    className={clsx(
                    'absolute h-[2px] w-full bg-white transform transition duration-300',
                    menuOpen ? '-rotate-45 top-2.5' : 'top-5'
                    )}
                />
                </div>

                <div
                className={clsx(
                    'flex flex-col items-end justify-center gap-4 z-10',
                    'transition-opacity duration-300 mt-10',
                    menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                >
                {['Home', 'About', 'Blog', 'Devlog', 'Projects'].map((text) => (
                    <Link
                    key={text}
                    href={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-white hover:underline"
                    >
                    {text}
                    </Link>
                ))}
                <Link
                    key={"Contact"}
                    href="/#contact"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-white hover:underline"
                    >
                    Contact
                    </Link>
                </div>
            </button>
            </div>

    </nav>
  );
}

export function NavSpace() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={clsx(isMobile ? 'h-0' : 'h-14')} />
  )
}