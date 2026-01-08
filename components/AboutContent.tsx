import React, { useEffect, useState } from 'react';
import { FlaskConical, Dna, ShieldCheck } from 'lucide-react';
import ScienceBackground from './ScienceBackground';
import ScienceTechBackground from './ScienceTechBackground';
import NutritionalMatrix from './NutritionalMatrix';
import { useLanguage } from '../contexts/LanguageContext';

const AboutContent: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const [offset, setOffset] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setOffset(window.pageYOffset);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`min-h-screen font-sans overflow-hidden text-center transition-colors duration-500 ${isDark ? 'bg-[#101014] text-white' : 'bg-[#F9FAFB] text-purple-950'}`}>
      <style>{`
        .text-purple-chrome {
            background: linear-gradient(
                110deg,
                #e9d5ff 0%,
                #a855f7 20%,
                #ffffff 45%,
                #ffffff 55%,
                #a855f7 80%,
                #e9d5ff 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shine 4s linear infinite;
        }
      `}</style>
      
      {/* 1. HERO SHADER BACKGROUND */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
         <ScienceBackground isDark={isDark} />
         <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-black/20' : 'bg-white/20'}`}></div>
         <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto animate-on-scroll fade-in flex flex-col items-center justify-center">
             <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md mb-6">
                 <span className="text-blue-300 text-[10px] md:text-xs font-monolith tracking-[0.2em] font-thin uppercase">{t('about_badge')}</span>
             </div>
             <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] mb-8 whitespace-normal md:whitespace-pre-line text-chrome break-words max-w-full leading-[1.1]">
                 {t('about_title')}
             </h1>
             <p className={`text-base md:text-xl font-thin max-w-2xl mx-auto leading-relaxed text-center px-4 ${isDark ? 'text-blue-100/80' : 'text-purple-900/70'}`}>
                 {t('about_sub')}
             </p>
         </div>
      </section>

      {/* NEW SECTION: SCIENCE & TECHNOLOGY */}
      <section className="relative h-screen w-full overflow-hidden" style={{ clipPath: 'inset(0)' }}>
          {/* Stable Parallax Background Container */}
          <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
              <ScienceTechBackground isDark={isDark} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none mix-blend-normal">
              <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl md:text-6xl font-monolith font-thin tracking-tighter text-purple-chrome mb-8 leading-tight">
                      {t('about_tech_title')}
                  </h2>
                  <p className={`text-base md:text-2xl font-thin max-w-4xl mx-auto leading-relaxed text-center tracking-wide font-sans ${isDark ? 'text-purple-100/90' : 'text-purple-950/80'}`}>
                      {t('about_tech_desc')}
                  </p>
              </div>
          </div>
      </section>

      {/* 2. EXISTING CONTENT (Restyled) */}
      <div className={`relative z-10 border-t ${isDark ? 'bg-[#101014] border-white/5' : 'bg-[#F9FAFB] border-purple-900/10'}`}>
        <div className="prose prose-invert max-w-5xl mx-auto px-6 py-16 md:py-24 font-sans leading-relaxed text-center">
            
            <div className="text-center mb-16">
                <h2 className={`text-3xl md:text-5xl font-monolith font-thin mb-6 text-gold-chrome leading-tight ${isDark ? 'text-white' : ''}`}>{t('about_log_title')}</h2>
                <p className="text-lg md:text-xl text-emerald-400 font-thin text-center">{t('about_log_sub')}</p>
            </div>

            <div className={`p-6 md:p-12 rounded-3xl border mb-16 transition-colors shadow-2xl text-center ${isDark ? 'bg-[#1E1E26] border-white/10 hover:border-emerald-500/30' : 'bg-white border-purple-100 hover:border-emerald-500/30 shadow-purple-900/5'}`}>
                <h3 className={`text-xl md:text-2xl font-monolith font-thin mb-4 text-center ${isDark ? 'text-white' : 'text-purple-950'}`}>{t('about_abstract')}</h3>
                <p className={`text-base md:text-lg text-center font-thin ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('about_abstract_desc')}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20 text-center">
                <div className={`flex flex-col items-center p-6 md:p-8 rounded-3xl border ${isDark ? 'bg-emerald-950/20 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                <h3 className="text-lg md:text-xl font-monolith font-thin text-emerald-400 mb-6 uppercase tracking-wider">{t('about_log_sys')}</h3>
                <ul className={`space-y-4 text-center inline-block w-full text-sm md:text-base font-thin ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li className="flex items-center justify-center gap-3"><span className="text-emerald-500 font-thin text-lg">✓</span> {t('about_log_1')}</li>
                    <li className="flex items-center justify-center gap-3"><span className="text-emerald-500 font-thin text-lg">✓</span> {t('about_log_2')}</li>
                    <li className="flex items-center justify-center gap-3"><span className="text-emerald-500 font-thin text-lg">✓</span> {t('about_log_3')}</li>
                    <li className="flex items-center justify-center gap-3"><span className="text-emerald-500 font-thin text-lg">✓</span> {t('about_log_4')}</li>
                </ul>
                </div>
                <div className={`flex flex-col items-center p-6 md:p-8 rounded-3xl border opacity-80 ${isDark ? 'bg-red-950/10 border-red-500/10' : 'bg-red-50 border-red-200'}`}>
                <h3 className="text-lg md:text-xl font-monolith font-thin text-red-400 mb-6 uppercase tracking-wider">{t('about_saw_sys')}</h3>
                <ul className={`space-y-4 text-center inline-block w-full text-sm md:text-base font-thin ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <li className="flex items-center justify-center gap-3"><span>•</span> {t('about_saw_1')}</li>
                    <li className="flex items-center justify-center gap-3"><span>•</span> {t('about_saw_2')}</li>
                    <li className="flex items-center justify-center gap-3"><span>•</span> {t('about_saw_3')}</li>
                    <li className="flex items-center justify-center gap-3"><span>•</span> {t('about_saw_4')}</li>
                </ul>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 text-center mb-20">
                <div>
                    <h2 className={`text-2xl md:text-3xl font-monolith font-thin mt-4 mb-6 ${isDark ? 'text-white' : 'text-purple-950'}`}>{t('about_lignin_title')}</h2>
                    <p className={`leading-loose text-center font-thin text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t('about_lignin_desc')}
                    </p>
                </div>
                <div>
                    <h2 className={`text-2xl md:text-3xl font-monolith font-thin mt-4 mb-6 ${isDark ? 'text-white' : 'text-purple-950'}`}>{t('about_energy_title')}</h2>
                    <p className={`leading-loose text-center font-thin text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {t('about_energy_desc')}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-10">
                <FlaskConical className="w-6 h-6 md:w-8 md:h-8 text-emerald-400"/> 
                <h2 className={`text-2xl md:text-3xl font-monolith font-thin m-0 text-gold-chrome ${isDark ? 'text-white' : ''}`}>{t('about_mech')}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-20">
                <div className={`p-8 rounded-3xl border transition-colors text-center ${isDark ? 'bg-[#1E1E26] border-white/5 hover:bg-emerald-900/10' : 'bg-white border-purple-100 hover:bg-emerald-50'}`}>
                <h4 className="text-lg md:text-xl font-monolith font-thin text-emerald-400 mb-4 flex items-center justify-center gap-2"><Dna className="w-5 h-5"/> {t('about_triterpenes')}</h4>
                <p className={`text-sm leading-relaxed text-center font-thin ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('about_triterpenes_desc')}
                </p>
                </div>
                <div className={`p-8 rounded-3xl border transition-colors text-center ${isDark ? 'bg-[#1E1E26] border-white/5 hover:bg-emerald-900/10' : 'bg-white border-purple-100 hover:bg-emerald-50'}`}>
                <h4 className="text-lg md:text-xl font-monolith font-thin text-emerald-400 mb-4 flex items-center justify-center gap-2"><ShieldCheck className="w-5 h-5"/> {t('about_beta')}</h4>
                <p className={`text-sm leading-relaxed text-center font-thin ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('about_beta_desc')}
                </p>
                </div>
            </div>
        </div>
      </div>

      {/* 3. NUTRITIONAL MATRIX (NEW) */}
      <NutritionalMatrix />

      <div className={`relative z-10 border-t ${isDark ? 'bg-[#101014] border-white/5' : 'bg-[#F9FAFB] border-purple-900/10'}`}>
        <div className="prose prose-invert max-w-5xl mx-auto px-6 py-12 font-sans leading-relaxed text-center">
            <div className={`p-8 md:p-10 rounded-3xl text-center shadow-2xl border ${isDark ? 'bg-gradient-to-br from-emerald-900/40 to-black border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200'}`}>
                <h3 className={`text-2xl font-monolith font-thin mb-4 ${isDark ? 'text-white' : 'text-purple-950'}`}>{t('about_commit')}</h3>
                <p className={`text-base md:text-lg font-thin max-w-2xl mx-auto text-center ${isDark ? 'text-emerald-100' : 'text-emerald-900'}`}>
                {t('about_commit_desc')}
                </p>
            </div>
        </div>
      </div>

      {/* 4. NEW SECTION: ANTLER CULTIVATION METHOD */}
      <section className={`relative w-full min-h-screen flex items-center justify-center py-24 border-t overflow-hidden ${isDark ? 'bg-black border-white/10' : 'bg-[#F0F2F5] border-purple-900/10'}`}>
           {/* Video Background */}
           <div className="absolute inset-0 flex items-center justify-center">
               <video 
                   src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/GROW%20ROOM.mp4"
                   className="w-full h-full object-contain"
                   autoPlay muted loop playsInline
               />
               <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-white/70'}`}></div>
           </div>

           <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-on-scroll fade-in">
                <div className={`inline-block px-4 py-1.5 rounded-full border backdrop-blur-md mb-6 ${isDark ? 'border-emerald-500/30 bg-emerald-900/20' : 'border-emerald-500/30 bg-emerald-50/80'}`}>
                    <span className="text-emerald-400 text-[10px] md:text-xs font-monolith tracking-[0.2em] font-thin uppercase">{t('about_antler_badge')}</span>
                </div>
                
                <h2 className="text-3xl md:text-6xl font-monolith font-thin mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-tight text-chrome whitespace-normal md:whitespace-pre-line text-center">
                    {t('about_antler_title')}
                </h2>

                <div className={`backdrop-blur-xl p-6 md:p-12 rounded-3xl border shadow-2xl text-center ${isDark ? 'bg-[#101014]/60 border-white/10' : 'bg-white/60 border-white/40'}`}>
                    <p className={`text-base md:text-lg leading-loose font-thin mb-6 text-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {t('about_antler_p1')}
                    </p>
                    <p className={`text-base md:text-lg leading-loose font-thin text-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {t('about_antler_p2')}
                    </p>
                </div>
           </div>
      </section>

      {/* 5. PARALLAX VIDEO FOOTER */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center border-t border-white/10">
            {/* Parallax Container */}
            <div 
                className="absolute inset-0 w-full h-[120%]"
                style={{ 
                    // Calculate parallax: start translating up as user scrolls down
                    transform: `translateY(${Math.max(-100, (offset * 0.08) - 150)}px)` 
                }}
            >
                <video 
                    src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/MYCOLOGY%20SCIENCE1.mp4"
                    className="w-full h-full object-cover opacity-60"
                    autoPlay muted loop playsInline
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl px-6">
                <h2 className="text-4xl md:text-7xl font-monolith font-thin text-gold-chrome mb-6 drop-shadow-2xl">
                    {t('about_evo')}
                </h2>
                <p className="text-lg md:text-2xl text-neutral-200 font-thin mb-8 text-center">
                    {t('about_fungi')}
                </p>
                <button className="px-8 py-4 border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm font-monolith font-thin text-sm">
                    {t('about_papers')}
                </button>
            </div>
      </section>

    </div>
  );
};

export default AboutContent;