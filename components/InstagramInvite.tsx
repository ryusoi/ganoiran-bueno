
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const InstagramInvite: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-10 flex flex-col items-center justify-center bg-neutral-50 dark:bg-zinc-950 border-t border-neutral-200 dark:border-white/5 overflow-hidden transition-all duration-300">
      
      <style>{`
        /* Container to hold the absolute positioned logo */
        .insta-box {
            position: relative;
            width: 100px;
            height: 100px;
            margin: 0 auto 1rem auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* Scaled wrapper to make the large CSS logo smaller without breaking keyframes */
        .insta-scale-wrapper {
            transform: scale(0.4);
            transform-origin: center;
            width: 200px;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        /* EXACT CSS CONVERTED FROM USER SCSS */
        .instagram {
            height: 200px;
            width: 200px;
            overflow: hidden;
            border-radius: 35px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -100px;
            animation: animate_logo 10s infinite alternate;
            z-index: 10;
        }

        .instagram::after {
            content: '';
            position: relative;
            display: block;
            top: 0;
            left: 0;
            width: 100%;
            height: 2000px;
            background: linear-gradient(135deg, #5335cf 0%, #de005e 25%, #f66e48 50%, #de005e 75%, #5335cf 100%);
            animation: animate_bg 10s infinite linear;
        }

        /* .logo > div */
        .logo > div {
            position: absolute;
            top: 50%;
            left: 50%;
            border: #fff 9px solid;
            z-index: 2;
            box-sizing: border-box;
        }

        /* .logo > div.logo_light */
        .logo > div.logo_light {
            border: 7px #fff solid;
            border-radius: 10em;
            right: 23%;
            top: 23%;
            left: auto;
            animation: animate_light 5s infinite normal;
        }

        /* &_border -> .logo_border */
        .logo_border {
            border-radius: 35px;
            width: 74%;
            height: 74%;
            margin-top: -37%;
            margin-left: -37%;
            animation: animate_border 5s infinite alternate;
        }

        /* &_circle -> .logo_circle */
        .logo_circle {
            width: 48%;
            height: 48%;
            border-radius: 10em;
            margin-top: -24%;
            margin-left: -24%;
            animation: animate_circle 5s infinite alternate;
        }

        /* KEYFRAMES */
        @keyframes animate_bg {
            0% { top: 0; }
            50% { top: -1800px; }
            100% { top: 0; }
        }

        @keyframes animate_logo {
            0% { transform: scale(0); border-radius: 35px; }
            2.5% { transform: scale(1.1); border-radius: 10em; }
            5% { transform: scale(1); border-radius: 35px; }
            96% { transform: scale(1); border-radius: 35px; }
            98% { transform: scale(1.1); border-radius: 10em; }
            100% { transform: scale(0); }
        }

        @keyframes animate_border {
            0% { border-radius: 10em; transform: scale(0); opacity: 0; }
            2% { opacity: 0; }
            18% { border-radius: 35px; transform: scale(1); opacity: 1; }
            90% { border-radius: 35px; transform: scale(1); }
        }

        @keyframes animate_circle {
            0% { transform: scale(0); opacity: 0; }
            5% { transform: scale(0); opacity: 0; }
            10% { transform: scale(1.3); opacity: 1; }
            15% { transform: scale(1); }
            95% { transform: scale(1); background-color: transparent; }
            97% { transform: scale(1.2); background-color: #ffffff; }
            100% { transform: scale(1); }
        }

        @keyframes animate_light {
            0% { opacity: 0; }
            20% { opacity: 0; }
            25% { opacity: 1; }
            75% { opacity: 1; }
            100% { opacity: 0; }
        }
      `}</style>

      {/* Title */}
      <h2 className="text-lg md:text-xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-200 dark:via-indigo-200 dark:to-purple-200 drop-shadow-sm mb-6 text-chrome">
          {t('insta_invite_title')}
      </h2>

      {/* EXACT HTML STRUCTURE WRAPPED IN RELATIVE CONTAINER WITH SCALE */}
      <a href="https://www.instagram.com/ganoshakh" target="_blank" rel="noopener noreferrer" className="insta-box block cursor-pointer">
          <div className="insta-scale-wrapper">
            <div className="instagram">
                <div className="logo">
                    <div className="logo_border"></div>
                    <div className="logo_circle"></div>
                    <div className="logo_light"></div>
                </div>
            </div>
          </div>
      </a>

      {/* Subtitle */}
      <p className="text-neutral-600 dark:text-neutral-400 font-thin text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 max-w-md leading-relaxed text-center">
          {t('insta_invite_subtitle')}
      </p>

      {/* CTA Button */}
      <a href="https://www.instagram.com/ganoshakh" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-white dark:bg-white/5 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10 font-monolith text-[9px] font-bold tracking-widest shadow-xl hover:bg-neutral-50 dark:hover:bg-white/20 transition-all">
          {t('insta_invite_btn')}
      </a>

    </section>
  );
};

export default InstagramInvite;
