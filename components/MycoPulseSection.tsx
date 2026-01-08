
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Brain, HeartPulse, Sparkles, Activity } from 'lucide-react';

interface MycoPulseSectionProps {
  onOpenChat: () => void;
}

const MycoPulseSection: React.FC<MycoPulseSectionProps> = ({ onOpenChat }) => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-16 bg-black overflow-hidden text-center border-t border-white/10" style={{ clipPath: 'inset(0)' }}>
      
      {/* --- BACKGROUND: Fixed position for Parallax Effect --- */}
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-0 opacity-70">
        <style>{`
          @keyframes rotFirst {
            0% { transform: rotate(-360deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes rotminiC {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          @keyframes changeColor {
            0% { box-shadow: 0px 0px 70px #FFB61E; border: 3px solid #FFB61E; }
            35% { box-shadow: 0px 0px 100px #14FE07; border: 3px solid #14FE07; }
            55% { box-shadow: 0px 0px 100px #DD0D02; border: 3px solid #DD0D02; }
            100% { box-shadow: 0px 0px 70px #FFB61E; border: 3px solid #FFB61E; }
          }
          
          /* Text Mask / Shine Animation */
          @keyframes textShine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          
          .mainWrap {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 100%; height: 100%;
            display: flex; justify-content: center; align-items: center;
          }
          
          .wrapper { position: relative; }
          
          /* Scaled down to fit smaller section height (40vmin) */
          .c1 {
            border-radius: 100%;
            height: 40vmin; width: 40vmin;
            border: 1px solid #e7b439;
            animation: rotFirst 30s linear infinite;
            position: relative;
          }
          
          .c2 {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            border-radius: 100%;
            height: 38vmin; width: 38vmin;
            border: 1px solid #FFB61E;
            border-style: dashed;
          }
          
          .c3 {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            border: 1px solid #FFB61E;
            height: 36vmin; width: 36vmin;
            border-radius: 100%;
            animation: changeColor 30s linear infinite;
          }
          
          .rect1 {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 24vmin; height: 24vmin;
            border: 1px solid #FFB61E;
            border-style: dotted;
          }
          
          .miniC {
            position: relative;
            width: 100%; height: 100%;
          }
          
          .miniC1, .miniC2, .miniC3, .miniC4 {
            position: absolute;
            width: 4vmin; height: 4vmin;
            border: 3px solid #FFB61E;
            border-radius: 100%;
            animation: changeColor 30s linear infinite;
          }
          
          .miniC1 { top: -12%; left: 50%; transform: translate(-50%, -50%); }
          .miniC2 { top: 50%; left: -12%; transform: translate(-50%, -50%); }
          .miniC3 { top: 50%; left: 112%; transform: translate(-50%, -50%); }
          .miniC4 { top: 112%; left: 50%; transform: translate(-50%, -50%); }
          
          .c4 {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            border: 1px solid #FFB61E;
            height: 24vmin; width: 24vmin;
            border-radius: 100%;
            border-style: dotted;
            animation: changeColor 30s linear infinite;
            display: flex; justify-content: center; align-items: center;
          }
          
          .rect2 {
            border: 1px solid #FFB61E;
            height: 16vmin; width: 16vmin;
            position: absolute; 
            animation: rotminiC 10s linear infinite;
          }
          
          .rect3 {
            border: 1px solid #FFB61E;
            height: 16vmin; width: 16vmin;
            position: absolute;
            transform: rotate(135deg);
          }
          
          .c5 {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            border: 1px solid #FFB61E;
            height: 14vmin; width: 14vmin;
            border-radius: 100%;
            animation: changeColor 30s linear infinite;
          }
          
          .c6 {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            border: 3px solid #FFB61E;
            height: 10vmin; width: 10vmin;
            border-radius: 100%;
            animation: changeColor 30s linear infinite;
          }

          /* Utility for Shining Text Mask */
          .shining-mask-text {
             background: linear-gradient(
                110deg,
                #888 20%,
                #fff 45%,
                #fff 55%,
                #888 80%
             );
             background-size: 200% auto;
             -webkit-background-clip: text;
             background-clip: text;
             color: transparent;
             animation: textShine 4s linear infinite;
             /* Ensure fallback visibility if background-clip fails or contrasts poorly */
             text-shadow: 0 0 20px rgba(0,0,0,0.8);
          }
        `}</style>

        <div className="mainWrap">
          <div className="wrapper">
            <div className="c1">
              <div className="c2">
                <div className="c3">
                  <div className="rect1">
                    <div className="miniC">
                      <div className="miniC1"></div>
                      <div className="miniC2"></div>
                      <div className="miniC3"></div>
                      <div className="miniC4"></div>
                    </div>
                  </div>
                  <div className="c4">
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                  </div>
                  <div className="c5"></div>
                  <div className="c6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT OVERLAY (Static, Scrolls normally over the fixed background) --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/80 mb-6 shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md">
              <Brain className="w-3 h-3 text-[#14FE07] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-monolith font-thin shining-mask-text">
                  {t('md_badge')}
              </span>
          </div>

          {/* Titles - Uses the Shining Mask Text class */}
          <h2 className="text-3xl md:text-5xl font-monolith font-thin tracking-tighter mb-4 leading-tight whitespace-pre-line shining-mask-text drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {t('md_title')}
          </h2>

          {/* Separator */}
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#FFB61E] to-transparent mb-6 opacity-80"></div>

          {/* Description - Standard white for readability against the dark/dynamic background */}
          <p className="text-white/90 text-xs md:text-sm font-thin tracking-[0.2em] mb-10 max-w-xl mx-auto leading-loose uppercase drop-shadow-md">
              {t('md_desc')}
          </p>

          {/* High Definition Dynamic Button */}
          <button 
              onClick={onOpenChat}
              className="group relative px-12 py-4 bg-black overflow-hidden rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(20,254,7,0.5)] border border-white/20 hover:border-[#14FE07] active:scale-95"
          >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <span className="relative flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase font-monolith font-bold text-white group-hover:text-[#14FE07] transition-colors">
                  {t('md_btn')} <Brain className="w-4 h-4" />
              </span>
          </button>

          {/* Context Note */}
          <p className="text-white/50 text-[9px] font-monolith font-thin tracking-wider max-w-lg mx-auto mt-8 mb-8 text-center italic">
              {t('md_consult_context')}
          </p>

          {/* Feature Chips - Opaque backgrounds for visibility */}
          <div className="flex flex-wrap gap-6 justify-center">
               <div className="flex flex-col items-center gap-2 group cursor-default">
                   <div className="p-2 rounded-full border border-white/10 bg-black/60 group-hover:border-[#14FE07]/50 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                       <HeartPulse className="w-4 h-4 text-neutral-400 group-hover:text-[#14FE07] transition-colors" />
                   </div>
                   <span className="text-[8px] uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors font-monolith font-thin">{t('md_cell')}</span>
               </div>
               <div className="flex flex-col items-center gap-2 group cursor-default">
                   <div className="p-2 rounded-full border border-white/10 bg-black/60 group-hover:border-[#FFB61E]/50 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                       <Sparkles className="w-4 h-4 text-neutral-400 group-hover:text-[#FFB61E] transition-colors" />
                   </div>
                   <span className="text-[8px] uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors font-monolith font-thin">{t('md_science')}</span>
               </div>
               <div className="flex flex-col items-center gap-2 group cursor-default">
                   <div className="p-2 rounded-full border border-white/10 bg-black/60 group-hover:border-[#DD0D02]/50 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                       <Activity className="w-4 h-4 text-neutral-400 group-hover:text-[#DD0D02] transition-colors" />
                   </div>
                   <span className="text-[8px] uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors font-monolith font-thin">{t('md_analysis')}</span>
               </div>
          </div>

      </div>
    </section>
  );
};

export default MycoPulseSection;
