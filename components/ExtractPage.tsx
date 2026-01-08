import React from 'react';
import { STORAGE_URL, formatPrice } from '../data';
import { Droplets, Shield, Zap, Moon, FlaskConical, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ExtractHeroShader from './ExtractHeroShader';

interface ExtractPageProps {
  addToCart: (product: any) => void;
  isDark?: boolean;
}

const ExtractPage: React.FC<ExtractPageProps> = ({ addToCart, isDark = true }) => {
  const { t } = useLanguage();
  const extractProduct = {
    id: 'b2c3d4e5-f6a7-48b9-92c1-2345678901bc',
    name: t('prod_extract_name'),
    price_rials: '9700000',
    image_url: 'media/gano_extract.png',
    active: true,
    category: 'supplement'
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 font-sans transition-colors duration-500 text-center">
      
      {/* Hero Section */}
      <div className={`relative h-[85vh] w-full overflow-hidden flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
        {/* High Definition Dynamics Shader */}
        <ExtractHeroShader isDark={isDark} />
        
        {/* Subtle Gradient Overlay for Text Readability */}
        <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-transparent via-transparent to-neutral-900/90' : 'from-transparent via-transparent to-white/90'} pointer-events-none`}></div>
        
        <div className="relative z-10 text-center px-4 md:px-6 animate-on-scroll fade-in w-full max-w-7xl mx-auto flex flex-col items-center pointer-events-none">
           <span className="text-blue-300 font-monolith font-thin tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block">{t('extract_hero_badge')}</span>
           <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-6 leading-tight break-words whitespace-normal md:whitespace-pre-line">
              {t('extract_hero_title')}
           </h1>
           <p className={`text-base md:text-xl ${isDark ? 'text-gray-200' : 'text-gray-700'} max-w-2xl mx-auto font-thin leading-relaxed text-center px-4`}>
              {t('extract_hero_desc')}
           </p>
        </div>
      </div>

      {/* The Alchemy Section */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16 animate-on-scroll fade-in">
            <h2 className="text-3xl md:text-4xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-4">{t('extract_why_title')}</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-center font-thin text-sm md:text-base">
               {t('extract_why_desc')}
            </p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
               <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <Droplets className="w-7 h-7" />
               </div>
               <h3 className="text-lg md:text-xl font-monolith font-thin text-neutral-900 dark:text-white mb-3">{t('extract_water')}</h3>
               <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 text-center font-thin">
                  {t('extract_water_desc')}
               </p>
               <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-2 w-full font-thin">
                  <li className="flex items-center justify-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> {t('extract_list_immune')}</li>
                  <li className="flex items-center justify-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> {t('extract_list_gut')}</li>
                  <li className="flex items-center justify-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> {t('extract_list_blood')}</li>
               </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden flex flex-col items-center text-center">
               <div className="absolute top-0 right-0 p-3 bg-amber-400 text-black text-[10px] font-thin uppercase tracking-widest font-monolith">
                  {t('extract_gold')}
               </div>
               <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6">
                  <FlaskConical className="w-7 h-7" />
               </div>
               <h3 className="text-lg md:text-xl font-monolith font-thin text-neutral-900 dark:text-white mb-3">{t('extract_alc')}</h3>
               <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 text-center font-thin">
                  {t('extract_alc_desc')}
               </p>
               <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-2 w-full font-thin">
                  <li className="flex items-center justify-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> {t('prod_extract_ben3')}</li>
                  <li className="flex items-center justify-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> {t('extract_list_histamine')}</li>
                  <li className="flex items-center justify-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> {t('extract_list_hormone')}</li>
               </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
               <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                  <Zap className="w-7 h-7" />
               </div>
               <h3 className="text-lg md:text-xl font-monolith font-thin text-neutral-900 dark:text-white mb-3">{t('extract_bio')}</h3>
               <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 text-center font-thin">
                  {t('extract_bio_desc')}
               </p>
               <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-2 w-full font-thin">
                  <li className="flex items-center justify-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> {t('extract_list_fast')}</li>
                  <li className="flex items-center justify-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> {t('extract_list_dose')}</li>
                  <li className="flex items-center justify-center gap-2"><Check className="w-3 h-3 text-emerald-500" /> {t('extract_list_digest')}</li>
               </ul>
            </div>
         </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 md:py-24 bg-neutral-900 dark:bg-neutral-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
              <div className="flex flex-col items-center justify-center animate-on-scroll slide-right text-center order-2 lg:order-1">
                  <h2 className="text-3xl md:text-5xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-6 break-words">{t('prod_extract_name')}</h2>
                  <div className="flex items-center justify-center gap-4 mb-8">
                     <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-[10px] md:text-xs font-thin uppercase tracking-widest font-monolith">
                        {t('extract_prod_badge')}
                     </span>
                     <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-[10px] md:text-xs font-thin uppercase tracking-widest font-monolith">
                        {t('size_50ml')}
                     </span>
                  </div>

                  <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8 font-thin text-center">
                     {t('prod_extract_long')}
                  </p>

                  <div className="space-y-4 mb-10 w-full max-w-md">
                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 justify-center">
                        <Moon className="w-6 h-6 text-indigo-400" />
                        <div className="text-left">
                           <h4 className="text-white font-monolith font-thin text-sm">{t('extract_sleep')}</h4>
                           <p className="text-neutral-400 text-xs font-thin">{t('decor_stress_desc')}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 justify-center">
                        <Shield className="w-6 h-6 text-emerald-400" />
                        <div className="text-left">
                           <h4 className="text-white font-monolith font-thin text-sm">{t('extract_immune')}</h4>
                           <p className="text-neutral-400 text-xs font-thin">{t('extract_list_immune')}</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                      <span className="text-3xl md:text-4xl font-monolith font-thin text-white">{formatPrice(extractProduct.price_rials)} {t('currency')}</span>
                      <button 
                        onClick={() => addToCart(extractProduct)}
                        className="px-8 py-4 bg-white text-neutral-900 rounded-full font-monolith font-thin text-base md:text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 w-full md:w-auto justify-center"
                      >
                        {t('feat_add')} <ArrowRight className="w-5 h-5" />
                      </button>
                  </div>
              </div>

              <div className="relative h-[400px] md:h-[600px] flex items-center justify-center animate-on-scroll scale-in order-1 lg:order-2 w-full">
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                     <video 
                        src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganodrma%20Extract%20Top.mp4"
                        className="w-full h-full object-cover opacity-80"
                        autoPlay muted loop playsInline
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                     
                     <div className="absolute bottom-8 left-8 right-8 text-center">
                        <p className="text-amber-200 font-serif italic text-lg md:text-xl">"{t('extract_quote')}"</p>
                     </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Usage Ritual */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto text-center">
         <h2 className="text-3xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-12">{t('extract_ritual')}</h2>
         <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center max-w-xs">
               <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-monolith text-2xl text-neutral-900 dark:text-white mb-6 border border-neutral-200 dark:border-neutral-700">1</div>
               <h4 className="font-thin font-monolith text-neutral-900 dark:text-white mb-2">{t('extract_step1')}</h4>
               <p className="text-sm text-neutral-500 text-center font-thin">{t('extract_step1_desc')}</p>
            </div>
            <div className="hidden md:block w-24 h-px bg-neutral-200 dark:bg-neutral-800"></div>
            <div className="flex flex-col items-center max-w-xs">
               <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-monolith text-2xl text-neutral-900 dark:text-white mb-6 border border-neutral-200 dark:border-neutral-700">2</div>
               <h4 className="font-thin font-monolith text-neutral-900 dark:text-white mb-2">{t('extract_step2')}</h4>
               <p className="text-sm text-neutral-500 text-center font-thin">{t('extract_step2_desc')}</p>
            </div>
            <div className="hidden md:block w-24 h-px bg-neutral-200 dark:bg-neutral-800"></div>
            <div className="flex flex-col items-center max-w-xs">
               <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-monolith text-2xl text-neutral-900 dark:text-white mb-6 border border-neutral-200 dark:border-neutral-700">3</div>
               <h4 className="font-thin font-monolith text-neutral-900 dark:text-white mb-2">{t('extract_step3')}</h4>
               <p className="text-sm text-neutral-500 text-center font-thin">{t('extract_step3_desc')}</p>
            </div>
         </div>
      </section>

    </div>
  );
};

export default ExtractPage;