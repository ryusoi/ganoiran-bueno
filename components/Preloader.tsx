
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PreloaderProps {
  progress: number;
}

const Preloader: React.FC<PreloaderProps> = ({ progress }) => {
  const { t } = useLanguage();
  const logoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/222.png";

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#aa771c] blur-[150px] opacity-10 rounded-full animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        
        {/* Logo Container */}
        <div className="relative w-48 h-48 md:w-64 md:h-64">
            {/* 1. Ghost Logo (Background) - Low opacity guide */}
            <img 
                src={logoUrl} 
                alt="Loading" 
                className="absolute inset-0 w-full h-full object-contain opacity-20 grayscale filter blur-[0.5px]" 
            />
            
            {/* 2. Chrome Gold Logo (Foreground) - Dynamically filled */}
            <div 
                className="absolute inset-0 w-full h-full transition-all duration-200 ease-out will-change-[clip-path]"
                style={{ 
                    clipPath: `inset(${100 - progress}% 0 0 0)`, // Reveals from bottom to top
                    WebkitClipPath: `inset(${100 - progress}% 0 0 0)`
                }} 
            >
                <img 
                    src={logoUrl} 
                    alt="Loading Filled" 
                    className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] brightness-125 contrast-125" 
                />
            </div>
        </div>

        {/* Text Container */}
        <div className="text-center space-y-4">
            {/* Percentage - Syncopate Extra Light */}
            <h1 className="font-monolith text-5xl md:text-6xl font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#bf953f] to-[#8a5a0c] drop-shadow-sm select-none">
                {Math.round(progress)}%
            </h1>
            
            {/* Status Text - Fine Line High Def */}
            <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#aa771c]"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-monolith font-medium opacity-90 whitespace-nowrap">
                    {t('preloader_text')}
                </span>
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#aa771c]"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
