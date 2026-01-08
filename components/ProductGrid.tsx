import React from 'react';
import { ChevronLeft, ChevronRight, Heart, Plus, Star, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { resolveUrl, formatPrice } from '../data';
import { useLanguage } from '../contexts/LanguageContext';
import DiamondHero from './DiamondHero';

interface ProductGridProps {
  products: Product[];
  addToCart: (p: Product) => void;
  onProductClick: (id: string) => void;
  isDark?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart, onProductClick, isDark = true }) => {
    const { t } = useLanguage();
    
    return (
      <>
        {/* NEW DIAMOND INTERACTIVE HERO (Fixed Background) */}
        <DiamondHero isDark={isDark} />

        {/* Spacer to push content below the fixed hero initially */}
        <div className="w-full h-[100vh] relative z-10 pointer-events-none"></div>

        <section className="py-24 bg-neutral-50 dark:bg-neutral-800 transition-colors duration-300 relative z-20 text-center shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]" id="shop">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12 animate-on-scroll fade-in">
              <h2 className="text-3xl md:text-4xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-2">{t('feat_title')}</h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6 text-center font-thin">{t('feat_desc')}</p>
              <div className="flex gap-2">
                <button className="p-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-white dark:hover:bg-neutral-700 transition dark:text-white"><ChevronLeft className="w-5 h-5" /></button>
                <button className="p-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-white dark:hover:bg-neutral-700 transition dark:text-white"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, idx) => (
                <article 
                  key={product.id}
                  className={`group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-all hover:shadow-xl hover:-translate-y-1 animate-on-scroll card-reveal stagger-${(idx % 3) + 1} text-center`}
                >
                  <div className="relative aspect-square overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800" onClick={() => onProductClick(product.id)}>
                    {product.video_url ? (
                      <video 
                          src={resolveUrl(product.video_url)}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                          className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    
                    <span className="absolute top-4 left-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur px-3 py-1 rounded-full text-xs font-monolith font-thin text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 z-10">
                      {t(`cat_${product.category}`) || product.category}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const text = `Hi, I am interested in ${product.name}`;
                            const url = `https://wa.me/989196214129?text=${encodeURIComponent(text)}`;
                            window.open(url, '_blank');
                        }}
                        className="absolute top-4 right-14 p-2.5 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_15px_rgba(37,211,102,0.5)] hover:shadow-[0_0_20px_rgba(37,211,102,0.8)] transition-all duration-300 z-20 hover:scale-110 flex items-center justify-center group/wa"
                        title="Chat on WhatsApp"
                    >
                        <MessageCircle className="w-4 h-4" />
                    </button>

                    <button className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-neutral-800/80 rounded-full hover:scale-110 transition backdrop-blur dark:text-white z-10">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-6 flex flex-col items-center">
                    <div className="flex flex-col items-center mb-2 w-full">
                      <h3 className="font-monolith text-lg font-thin text-gold-chrome cursor-pointer" onClick={() => onProductClick(product.id)}>{product.name}</h3>
                      <span className="font-medium font-monolith text-neutral-900 dark:text-white mt-1">{formatPrice(product.price_rials)} {t('currency')}</span>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2 text-center font-thin">{product.description}</p>
                    
                    <div className="flex items-center justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs text-neutral-400 ml-2">{t('reviews_count')}</span>
                    </div>

                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-monolith font-thin flex items-center justify-center gap-2 hover:opacity-90 transition"
                    >
                      {t('feat_add')} <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </>
    );
};

export default ProductGrid;