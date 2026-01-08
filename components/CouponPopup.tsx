
import React, { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CouponPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const CouponPopup: React.FC<CouponPopupProps> = ({ isVisible, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(7);
  const { t } = useLanguage();

  useEffect(() => {
    if (isVisible) {
      setTimeLeft(7);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none p-4">
      {/* Container: Small, Sharp, High Def */}
      <div className="pointer-events-auto relative bg-[#Fdfbf7] w-[300px] p-1 rounded-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-[#c7b299] transition-all animate-[fadeIn_0.3s_ease-out]">
        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          @keyframes float-up { 
            0% { transform: translateY(40px) scale(0.8); opacity: 0; } 
            60% { transform: translateY(-10px) scale(1.05); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 1; } 
          }
          @keyframes shine-lines {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>
        
        {/* Inner Sharp Border */}
        <div className="border border-[#4a3b2a] p-5 rounded-sm relative bg-[#fffdf5] overflow-hidden">
           
           {/* Badge */}
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4a3b2a] px-3 py-0.5 shadow-sm z-20">
              <span className="text-[#d4af37] font-serif text-[9px] font-bold tracking-[0.2em] uppercase block transform translate-y-[1px]">
                {t('coupon_member')}
              </span>
           </div>

           <div className="text-center relative z-10">
              {/* Dynamic Vintage Icon */}
              <div className="flex justify-center mb-1 -mt-2 h-24 items-end overflow-visible">
                 <svg viewBox="0 0 200 200" className="w-32 h-32 filter drop-shadow-md">
                    <defs>
                        <linearGradient id="gold-shine" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8"/>
                            <stop offset="100%" stopColor="#8c7b65" stopOpacity="0.4"/>
                        </linearGradient>
                        <filter id="paper-texture">
                            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise"/>
                            <feDiffuseLighting in="noise" lightingColor="#fffdf5" surfaceScale="2">
                                <feDistantLight azimuth="45" elevation="60"/>
                            </feDiffuseLighting>
                        </filter>
                    </defs>

                    {/* Group centered */}
                    <g transform="translate(100, 140)">
                        {/* BOX BACK (Behind Mushroom) */}
                        <path d="M-30 0 L30 0 L35 -25 L-35 -25 Z" fill="#e8e4da" stroke="#5c4d3c" strokeWidth="1" />
                        <rect x="-30" y="0" width="60" height="40" fill="#f4f1ea" stroke="#5c4d3c" strokeWidth="1" />
                        
                        {/* MUSHROOM (Animated) */}
                        <g className="animate-[float-up_1.2s_cubic-bezier(0.34,1.56,0.64,1)_0.2s_forwards]" style={{opacity: 0}}>
                            {/* Stalk */}
                            <path d="M-5 10 Q-8 20 -5 35 L5 35 Q8 20 5 10 Z" fill="#4a2c20" />
                            
                            {/* Cap Main Body */}
                            <path d="M-35 10 C-35 -20, 35 -20, 35 10 C 35 25, 10 30, -5 20 C -20 30, -35 25, -35 10" 
                                  fill="#8b3a1a" stroke="#2c1b10" strokeWidth="1.5" />
                            
                            {/* Cap Highlights/Rings (Vintage etching style) */}
                            <path d="M-28 10 C-28 -12, 28 -12, 28 10" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
                            <path d="M-20 12 C-20 -5, 20 -5, 20 12" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.5" />
                            
                            {/* Detailed Glint */}
                            <ellipse cx="-15" cy="0" rx="4" ry="8" transform="rotate(-20)" fill="white" opacity="0.15" />
                            
                            {/* Magic Particles */}
                            <g className="animate-pulse">
                                <circle cx="-30" cy="-10" r="1" fill="#d4af37" />
                                <circle cx="30" cy="-15" r="1.5" fill="#d4af37" />
                                <circle cx="0" cy="-25" r="1" fill="#d4af37" />
                            </g>
                        </g>

                        {/* BOX FRONT (In front of Mushroom to create depth) */}
                        <path d="M-35 0 L35 0 L35 35 L-35 35 Z" fill="#fcfbf7" stroke="#4a3b2a" strokeWidth="1.5" />
                        
                        {/* Box Lid (Flapped open) */}
                        <path d="M-35 0 L35 0 L45 -20 L-45 -20 Z" fill="#e8e4da" stroke="#4a3b2a" strokeWidth="1" transform="rotate(-15 -35 0)" />
                        
                        {/* Ribbon */}
                        <rect x="-5" y="0" width="10" height="35" fill="#4a3b2a" opacity="0.1" />
                        <rect x="-5" y="0" width="10" height="35" fill="url(#gold-shine)" />
                        
                        {/* Bow Tie */}
                        <path d="M0 0 Q-10 -10 -15 0 Q-10 10 0 0 Z" fill="#d4af37" stroke="#4a3b2a" strokeWidth="0.5" />
                        <path d="M0 0 Q10 -10 15 0 Q10 10 0 0 Z" fill="#d4af37" stroke="#4a3b2a" strokeWidth="0.5" />
                    </g>
                 </svg>
              </div>

              <h3 className="font-serif text-lg font-bold tracking-wide text-[#2c2c2c] mb-1">
                 {t('coupon_gift')}
              </h3>

              <div className="my-3 py-2 bg-[#f4f1ea] border border-[#e5e0d4] relative group cursor-pointer hover:bg-[#ebe7de] transition-colors flex flex-col items-center justify-center" onClick={() => navigator.clipboard.writeText('AMIGOS')}>
                 <p className="text-[8px] uppercase tracking-widest text-[#8c7b65] mb-0.5">{t('coupon_secret')}</p>
                 <p className="font-serif text-2xl font-bold text-[#4a3b2a] tracking-widest select-all">AMIGOS</p>
                 <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Copy className="opacity-0 group-hover:opacity-100 w-3 h-3 text-[#4a3b2a]/50 transition-opacity" />
                 </div>
              </div>

              <p className="text-[10px] font-sans text-[#5c4d3c] leading-tight">
                 {t('coupon_desc')}
              </p>
           </div>
           
           {/* Timer */}
           <div className="absolute -bottom-2 right-4 bg-[#Fdfbf7] px-2 text-[9px] text-[#8c7b65] font-mono border-x border-[#4a3b2a]/20">
              {timeLeft}s
           </div>
        </div>

        {/* Sharp Corner Accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#4a3b2a]"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#4a3b2a]"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#4a3b2a]"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#4a3b2a]"></div>
      </div>
    </div>
  );
};

export default CouponPopup;
