import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile touch screens
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, select, textarea, [data-cursor]');
        if (clickable) {
          setIsHovered(true);
          const customLabel = clickable.getAttribute('data-cursor');
          setCursorText(customLabel || '');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Primary Dot */}
      <div
        className="pointer-events-none fixed z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className={`rounded-full bg-[#FFE897] shadow-sm transition-all duration-300 ${
          isHovered ? 'w-2 h-2 opacity-0' : 'w-2.5 h-2.5 opacity-90'
        }`} />
      </div>

      {/* Expanding Ring & Context Label */}
      <div
        className="pointer-events-none fixed z-[9998] transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          className={`rounded-full border border-[#583714]/40 transition-all duration-300 flex items-center justify-center ${
            isHovered
              ? 'w-16 h-16 bg-[#FFE897]/30 backdrop-blur-sm border-[#583714] scale-100'
              : 'w-8 h-8 scale-75 border-[#583714]/20'
          }`}
        >
          {cursorText && (
            <span className="text-[9px] tracking-widest font-bold text-[#583714] uppercase animate-fade-in">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
