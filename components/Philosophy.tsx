import React from 'react';
import { Leaf, Droplets, Beaker, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { STORAGE_URL } from '../data';

const Philosophy = ({ setPage }: { setPage: (p: any) => void }) => {
    const { t } = useLanguage();
    return (
      <section className="py-4 px-6 max-w-7xl mx-auto border-t border-white/5 bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-cover bg-center rounded-2xl p-6 relative overflow-hidden group animate-on-scroll scale-in" style={{ backgroundImage: `url('${STORAGE_URL}/Gano%20Shakh%20Antler%20and%20Conks.jpg')` }}>
          <div className="absolute inset-0 bg-neutral-900/70 transition-colors duration-500 group-hover:bg-neutral-900/80"></div>
          <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-xl lg:text-2xl font-monolith text-white mb-2 whitespace-pre-line text-chrome">{t('phil_proven')}</h2>
            <p className="text-neutral-300 text-xs leading-relaxed mb-4 max-w-lg">
              {t('phil_desc')}
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-4 w-full">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl hover:bg-white/20 transition flex flex-col items-center">
                  <Leaf className="w-3 h-3 text-emerald-400 mb-1" />
                  <h4 className="font-bold text-white mb-0.5 text-[9px] font-monolith">{t('phil_organic')}</h4>
                  <p className="text-[8px] text-gray-300">{t('phil_log')}</p>
               </div>
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl hover:bg-white/20 transition flex flex-col items-center">
                  <Droplets className="w-3 h-3 text-blue-400 mb-1" />
                  <h4 className="font-bold text-white mb-0.5 text-[9px] font-monolith">{t('phil_dual')}</h4>
                  <p className="text-[8px] text-gray-300">{t('phil_bio')}</p>
               </div>
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl hover:bg-white/20 transition flex flex-col items-center">
                  <Beaker className="w-3 h-3 text-purple-400 mb-1" />
                  <h4 className="font-bold text-white mb-0.5 text-[9px] font-monolith">{t('phil_lab')}</h4>
                  <p className="text-[8px] text-gray-300">{t('phil_cert')}</p>
               </div>
            </div>

            <button onClick={() => setPage('about')} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur transition border border-white/30 text-[9px] uppercase tracking-wider font-bold font-monolith">
              {t('phil_btn')} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>
    );
};

export default Philosophy;