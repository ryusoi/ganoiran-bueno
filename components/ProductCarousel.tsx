import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Product } from '../types';
import { resolveUrl, formatPrice } from '../data';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCarouselProps {
  products: Product[];
  addToCart: (p: Product) => void;
  onProductClick: (id: string) => void;
  title?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, addToCart, onProductClick, title }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(4);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive breakpoints logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerScreen(1);
      else if (width < 1024) setItemsPerScreen(2);
      else setItemsPerScreen(4);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); 
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerScreen]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      (prev + 1) > products.length - itemsPerScreen ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      (prev - 1) < 0 ? products.length - itemsPerScreen : prev - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  return (
    <div className="w-full py-12 bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {title && (
          <div className="mb-10 relative">
            <h2 className="font-monolith text-3xl font-light tracking-widest text-neutral-800 dark:text-white uppercase pl-4 border-l-4 border-emerald-500">
              {title}
            </h2>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 mt-4"></div>
          </div>
        )}

        <div className="relative group"
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
        >
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-black/50 p-2 rounded-full shadow-md hover:bg-emerald-500 hover:text-white transition-all -ml-4 md:-ml-8 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-black/50 p-2 rounded-full shadow-md hover:bg-emerald-500 hover:text-white transition-all -mr-4 md:-mr-8 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Track */}
          <div className="overflow-hidden w-full px-1 py-4"> 
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerScreen)}%)` }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0 px-3 transition-all duration-300"
                  style={{ width: `${100 / itemsPerScreen}%` }}
                >
                  <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg border border-neutral-100 dark:border-neutral-700 h-full flex flex-col group/card hover:-translate-y-2 transition-transform duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900 cursor-pointer" onClick={() => onProductClick(product.id)}>
                      {product.video_url ? (
                        <video 
                          src={resolveUrl(product.video_url)}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster={resolveUrl(product.image_url)}
                        />
                      ) : (
                        <img 
                          src={resolveUrl(product.image_url)} 
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover/card:scale-110 transition-transform duration-700"
                        />
                      )}
                      
                      <span className="absolute top-2 right-2 px-2 py-1 flex items-center justify-center bg-red-600 text-white rounded text-[10px] font-bold shadow-sm border border-white/10 tracking-wider">
                        {t('badge_new')}
                      </span>

                      {product.video_url && (
                         <div className="absolute top-2 left-2 p-1.5 bg-black/50 rounded-full text-white backdrop-blur-sm">
                            <Play className="w-3 h-3 fill-current" />
                         </div>
                      )}
                    </div>
                    
                    <div className="p-4 text-center flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-monolith font-normal text-xs uppercase tracking-wider text-neutral-500 mb-1">
                          {t(`cat_${product.category}`) || product.category}
                        </h4>
                        <h3 className="font-monolith font-bold text-sm text-neutral-900 dark:text-white mb-2 line-clamp-1" title={product.name}>
                          {product.name}
                        </h3>
                      </div>
                      
                      <div className="mt-2">
                        <h5 className="font-monolith font-light text-lg text-emerald-600 dark:text-emerald-400">
                          {formatPrice(product.price_rials)} {t('currency')}
                        </h5>
                        
                        <button 
                          onClick={() => addToCart(product)}
                          className="mt-3 w-full py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-black transition-colors rounded"
                        >
                          {t('feat_add')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;