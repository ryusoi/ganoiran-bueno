
import React from 'react';
import { Product } from '../types';
import { formatPrice, STORAGE_URL } from '../data';
import MediaGallery from './MediaGallery';
import { ChevronLeft, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductDetailProps {
  product: Product;
  addToCart: (p: Product) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, addToCart, onBack }) => {
  const { t } = useLanguage();

  if (!product) return null;

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen animate-on-scroll fade-in text-center">
      <button onClick={onBack} className="mb-8 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white flex items-center justify-center gap-2 transition-colors mx-auto font-monolith text-sm font-thin">
        <ChevronLeft className="w-4 h-4" /> {t('product_back')}
      </button>
      
      <div className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
        <div className="space-y-6">
          <MediaGallery media={product.gallery && product.gallery.length > 0 ? product.gallery : [product.image_url]} />
        </div>

        <div className="lg:sticky lg:top-32 h-fit flex flex-col justify-center text-center items-center">
          <span className="text-emerald-500 font-monolith font-thin tracking-wider text-sm uppercase mb-2">{t(`cat_${product.category}`) || product.category}</span>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-6 leading-tight break-words w-full">{product.name}</h1>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-2xl md:text-3xl font-monolith font-thin dark:text-white">{formatPrice(product.price_rials)} {t('currency')}</span>
            <div className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs md:text-sm text-neutral-600 dark:text-neutral-300 font-monolith font-thin">
              {product.size}
            </div>
          </div>

          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-10 text-center font-thin">
            {product.long_description || product.description}
          </p>
          
          <button 
            onClick={() => addToCart(product)}
            className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-monolith font-thin text-lg hover:opacity-90 transition shadow-lg mb-4"
          >
            {t('feat_add')}
          </button>
          
          <button 
             onClick={() => window.open(`https://wa.me/989196214129?text=${encodeURIComponent('Hi, I am interested in ' + product.name)}`, '_blank')}
             className="w-full py-4 border-2 border-[#25D366] text-[#25D366] dark:text-[#25D366] rounded-full font-monolith font-thin text-lg hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-lg mb-8 flex items-center justify-center gap-2"
          >
              <MessageCircle className="w-5 h-5" /> {t('product_whatsapp')}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800 w-full">
             {product.benefits?.map((benefit, i) => (
               <div key={i} className="flex items-center justify-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                 <span className="text-sm font-medium dark:text-white font-monolith font-thin">{benefit}</span>
               </div>
             ))}
             {!product.benefits && (
               <div className="text-sm text-neutral-500">Pure, organic, and lab-tested quality</div>
             )}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-24 text-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-monolith font-thin dark:text-white mb-6 text-center">{t('product_ritual')}</h3>
              <div className="space-y-6 w-full max-w-md">
                <div className="flex gap-4 items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-serif text-lg shrink-0">1</div>
                  <p className="text-neutral-600 dark:text-neutral-300 pt-1 text-center font-thin">{t('product_step1')}</p>
                </div>
                <div className="flex gap-4 items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-serif text-lg shrink-0">2</div>
                  <p className="text-neutral-600 dark:text-neutral-300 pt-1 text-center font-thin">{t('product_step2')}</p>
                </div>
              </div>
           </div>
           <div className="relative h-[400px] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <img src={STORAGE_URL + "/Gano%20Shakh%20Antler%20and%20Conks.jpg"} className="w-full h-full object-cover opacity-80" alt="Ritual" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
