
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { resolveUrl } from '../data';

const SocialProofBubble: React.FC = () => {
  const { t, dir } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({ action: '', product: '', image: '' });

  const products = [
    { nameKey: 'prod_reishi_name', img: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/GANO%20SHAKH%20IMAGE.png' }, 
    { nameKey: 'prod_extract_name', img: 'media/gano_extract.png' }, 
    { nameKey: 'prod_luna_name', img: 'media/gano_luna_night.png' }, 
    { nameKey: 'prod_sol_name', img: 'media/gano_sol_day_gel.png' }, 
    { nameKey: 'prod_nutripet_name', img: 'media/nutripet.png' }, 
    { nameKey: 'decor_title', img: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%202.mp4' } 
  ];

  const actions = ['social_act_view', 'social_act_buy', 'social_act_purch'];

  useEffect(() => {
    const triggerPopup = () => {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        
        setData({
            action: randomAction,
            product: randomProduct.nameKey,
            image: randomProduct.img
        });
        
        setIsVisible(true);
        
        setTimeout(() => {
            setIsVisible(false);
        }, 7000);
    };

    // First appearance after 15 seconds
    const initialTimeout = setTimeout(() => {
        triggerPopup();
        // Then loop every 90 seconds
        const interval = setInterval(triggerPopup, 90000);
        return () => clearInterval(interval);
    }, 15000);
    
    return () => clearTimeout(initialTimeout);
  }, []);

  if (!isVisible) return null;

  const isVideo = data.image.match(/\.(mp4|webm|mov)$/i);

  return (
    <div className={`fixed bottom-24 ${dir === 'rtl' ? 'right-6' : 'left-6'} z-40 animate-fade-in`}>
       <style>{`
         @keyframes border-rotate {
           from { transform: translate(-50%, -50%) rotate(0deg); }
           to { transform: translate(-50%, -50%) rotate(360deg); }
         }
       `}</style>
       
       <div className="relative group rounded-full p-[1px] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
          {/* Dynamic Neon Blue Light Border */}
          <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-[conic-gradient(transparent_0deg,transparent_270deg,#00ffff_360deg)] animate-[border-rotate_4s_linear_infinite]" style={{ transformOrigin: 'center center' }}></div>
          
          {/* Inner Content */}
          <div className="relative bg-[#101014]/90 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-3 border border-white/10">
             <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-neutral-900 flex-shrink-0">
                {isVideo ? (
                    <video src={resolveUrl(data.image)} className="w-full h-full object-cover" autoPlay muted loop />
                ) : (
                    <img src={resolveUrl(data.image)} alt="Product" className="w-full h-full object-cover" />
                )}
             </div>
             <div className="flex flex-col pr-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-0.5">
                    {t(data.action)}
                </span>
                <span className="text-xs font-serif text-white whitespace-nowrap max-w-[200px] truncate">
                    {t(data.product)}
                </span>
             </div>
          </div>
       </div>
    </div>
  );
};

export default SocialProofBubble;
