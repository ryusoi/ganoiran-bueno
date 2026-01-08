
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const GeometricBackground: React.FC = () => {
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const baseSize = 55; // vmin
    const length = 101;
    const half = Math.floor(length / 2);
    const gapDist = baseSize / length;
    const gapSize = baseSize / half;
    const time = 2.5;
    const delay = time / half;
    const ratioA = 0.5;
    const ratioB = 0.25;

    const newItems: React.ReactNode[] = [];

    // Helper to calculate styles
    const getStyle = (i: number, sign: number) => {
      const d = sign * (i * gapDist * 1.75);
      const size = baseSize - gapSize * (i - 1);
      
      return {
        '--delay': `${delay * i}s`,
        '--dist': `${d}vmin`,
        width: `${size}vmin`,
        height: `${size}vmin`,
        '--after-size': `${size * ratioA}vmin`,
        '--before-size': `${size * ratioB}vmin`,
        zIndex: 10 + (sign * i),
      } as React.CSSProperties;
    };

    // First loop
    for (let i = 1; i <= half; ++i) {
      newItems.push(
        <li 
          key={`a-${i}`} 
          className="geo-li"
          style={getStyle(i, 1)} 
        />
      );
    }
    // Second loop
    for (let i = 1; i <= half; ++i) {
      newItems.push(
        <li 
          key={`b-${i}`} 
          className="geo-li"
          style={getStyle(i, -1)} 
        />
      );
    }

    setItems(newItems);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-center">
      <style>{`
        .geo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: anim-v 20s ease-in-out infinite alternate;
          perspective: 440vmin;
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
        }
        .geo-ul {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          list-style: none;
          transform-style: preserve-3d;
          animation: anim-r 20s linear infinite;
          width: 55vmin;
          height: 55vmin;
          padding: 0;
          margin: 0;
        }
        .geo-li {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
          animation: anim-h 2.5s var(--delay, 0s) ease-in-out infinite alternate;
          box-shadow: 0 0 2.75vmin 0.6875vmin rgba(61,132,168,0.25) inset;
          border-radius: 50%;
          will-change: transform;
          background: none;
        }
        .geo-li::before,
        .geo-li::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          pointer-events: none;
          border-radius: 50%;
        }
        .geo-li::after {
          width: var(--after-size, 0);
          height: var(--after-size, 0);
          animation: anim-s 2.5s ease-in-out infinite alternate;
          box-shadow: 0 0 1.375vmin 0.34375vmin rgba(70,205,207,0.25) inset;
        }
        .geo-li::before {
          width: var(--before-size, 0);
          height: var(--before-size, 0);
          animation: anim-spin 2.5s var(--delay, 0s) linear infinite;
          box-shadow: 0 0 .6875vmin 0.171875vmin rgba(171,237,216,0.75) inset;
        }
        @keyframes anim-v {
          0%   { transform: translate3d(0, 10vh, 0); }
          100% { transform: translate3d(0,-10vh, 0) rotate3d(0,0,1,90deg);}
        }
        @keyframes anim-h {
          0%   { transform: translate(-50%, -50%) translate3d(0,0,0);}
          100% { transform: translate(-50%, -50%) translate3d(0,0,var(--dist,0));}
        }
        @keyframes anim-spin {
          0% { transform: translate(-50%,-50%) rotate(0deg);}
          100% { transform: translate(-50%,-50%) rotate(360deg);}
        }
        @keyframes anim-s {
          0% { transform: translate(-50%,-50%) scale3d(1,1,1);}
          100% { transform: translate(-50%,-50%) scale3d(1.5,1.5,1.5);}
        }
        @keyframes anim-r {
          0% { transform: rotate3d(1,1,0,75deg) rotate3d(0,0,-1,0deg);}
          100% { transform: rotate3d(1,1,0,75deg) rotate3d(0,0,-1,360deg);}
        }
      `}</style>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="geo-section">
          <ul className="geo-ul">{items}</ul>
        </div>
      </div>

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#abedd8] via-[#46cdcf] to-[#3d84a8] drop-shadow-[0_0_15px_rgba(70,205,207,0.5)] mb-8">
            {t('geo_contact')}
        </h2>
        <p className="text-[#abedd8] font-light tracking-widest text-lg uppercase">
            {t('geo_assist')}
        </p>
      </div>
    </div>
  );
};

export default GeometricBackground;
