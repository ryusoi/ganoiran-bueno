
import React from 'react';
import { Instagram, Wind, Sun, Clock, Brain, Eye, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import MushroomHero from './MushroomHero';

const ReishiDecorPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans overflow-hidden text-center">
      
      {/* 1. INTERACTIVE MUSHROOM HERO (Replaces Parallax Video) */}
      <section className="relative w-full h-screen overflow-hidden">
         <MushroomHero />
      </section>

      <div className="relative z-10 text-center px-6 animate-on-scroll fade-in mix-blend-screen max-w-7xl mx-auto flex flex-col items-center justify-center -mt-20 pointer-events-none">
           <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-monolith font-thin tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome whitespace-normal md:whitespace-pre-line leading-tight break-words w-full animate-pulse">
              {t('decor_title')}
           </h1>
           <p className="text-base md:text-2xl font-monolith font-thin tracking-[0.3em] text-neutral-300 uppercase text-center mt-4">
              {t('decor_sub')}
           </p>
      </div>

      {/* 2. THE ARTISTIC PROCESS */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll slide-right text-center lg:text-center order-2 lg:order-1">
               <div className="w-16 h-1 bg-gradient-to-r from-[#aa771c] to-transparent mb-8 mx-auto"></div>
               <h2 className="text-3xl md:text-5xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-8 leading-tight whitespace-normal md:whitespace-pre-line text-center">
                  {t('decor_process')}
               </h2>
               <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6 font-thin text-center">
                  {t('decor_p1')}
               </p>
               <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-8 font-thin text-center">
                  {t('decor_p2')}
               </p>
               
               <div className="flex flex-wrap gap-8 text-neutral-500 justify-center">
                  <div className="flex flex-col items-center">
                     <Clock className="w-6 h-6 mb-2 text-[#aa771c]" />
                     <span className="text-[10px] md:text-xs uppercase tracking-widest font-monolith font-thin">{t('decor_24m')}</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <Sun className="w-6 h-6 mb-2 text-[#aa771c]" />
                     <span className="text-[10px] md:text-xs uppercase tracking-widest font-monolith font-thin">{t('decor_light')}</span>
                  </div>
                  <div className="flex flex-col items-center">
                     <Wind className="w-6 h-6 mb-2 text-[#aa771c]" />
                     <span className="text-[10px] md:text-xs uppercase tracking-widest font-monolith font-thin">{t('decor_air')}</span>
                  </div>
               </div>
            </div>

            <div className="relative h-[500px] md:h-[750px] w-full animate-on-scroll scale-in order-1 lg:order-2">
               <div className="absolute inset-0 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(170,119,28,0.2)]">
                   <video 
                      src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%20Natural%20Sculpture.mp4"
                      className="w-full h-full object-cover"
                      autoPlay muted loop playsInline
                   />
               </div>
            </div>
         </div>
      </section>

      {/* 3. NEUROAESTHETICS */}
      <section className="py-24 bg-black/50 border-y border-white/5">
         <div className="max-w-7xl mx-auto px-6 text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-6 whitespace-normal md:whitespace-pre-line text-center">{t('decor_neuro')}</h2>
         </div>

         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
             <div className="bg-[#1a1a1e] p-8 rounded-3xl border border-white/5 hover:border-[#aa771c]/30 transition-colors group flex flex-col items-center text-center">
                 <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#aa771c]/20 transition-colors text-[#aa771c]">
                    <Eye className="w-7 h-7" />
                 </div>
                 <h3 className="text-xl font-monolith font-thin text-white mb-3">{t('decor_visual')}</h3>
                 <p className="text-neutral-400 font-thin text-sm">{t('decor_visual_desc')}</p>
             </div>

             <div className="bg-[#1a1a1e] p-8 rounded-3xl border border-white/5 hover:border-[#aa771c]/30 transition-colors group flex flex-col items-center text-center">
                 <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#aa771c]/20 transition-colors text-[#aa771c]">
                    <Heart className="w-7 h-7" />
                 </div>
                 <h3 className="text-xl font-monolith font-thin text-white mb-3">{t('decor_stress')}</h3>
                 <p className="text-neutral-400 font-thin text-sm">{t('decor_stress_desc')}</p>
             </div>

             <div className="bg-[#1a1a1e] p-8 rounded-3xl border border-white/5 hover:border-[#aa771c]/30 transition-colors group flex flex-col items-center text-center">
                 <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#aa771c]/20 transition-colors text-[#aa771c]">
                    <Brain className="w-7 h-7" />
                 </div>
                 <h3 className="text-xl font-monolith font-thin text-white mb-3">{t('decor_micro')}</h3>
                 <p className="text-neutral-400 font-thin text-sm">{t('decor_micro_desc')}</p>
             </div>
         </div>
      </section>

      <section className="py-24 px-6 text-center">
          <a href="https://instagram.com/ganoshakh" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all group">
              <Instagram className="w-5 h-5" />
              <span className="font-monolith font-thin tracking-widest uppercase text-sm">{t('decor_join')}</span>
          </a>
      </section>

    </div>
  );
};

export default ReishiDecorPage;
