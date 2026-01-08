
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-20", showText = true, textSize = "text-2xl md:text-3xl" }) => {
  const { t } = useLanguage();
  const logoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/222.png";

  return (
    <div className={`relative flex items-center gap-4 select-none group ${className}`}>
        {/* Image Container */}
        <div className="relative h-full aspect-square flex items-center justify-center overflow-hidden">
            {/* Base Image with subtle natural shadow for seamless embedding */}
            <img 
                src={logoUrl} 
                alt="Gano Shakh Logo" 
                className="h-full w-full object-contain relative z-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
            />
            
            {/* Shine Layer - Masked to the Image Shape */}
            <div 
                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
                style={{
                    maskImage: `url(${logoUrl})`,
                    WebkitMaskImage: `url(${logoUrl})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                }}
            >
                 <div className="absolute top-0 bottom-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/90 to-transparent logo-scanline blur-[1px]"></div>
            </div>
        </div>

        {/* Text with Gold Chrome Effect */}
        {showText && (
            <div className="flex flex-col justify-center">
                <span className={`font-serif font-bold tracking-[0.1em] uppercase text-gold-chrome ${textSize} drop-shadow-sm`}>
                    {t('brand_name')}
                </span>
            </div>
        )}
    </div>
  );
};

export default Logo;
