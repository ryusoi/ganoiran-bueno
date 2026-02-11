
import React from 'react';
import { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCarousel from './ProductCarousel';
import DynamicBands from './DynamicBands';
import GlobalVisionBackground from './GlobalVisionBackground';

interface CollectionParallaxProps {
  products: Product[];
  addToCart: (p: Product) => void;
  onProductClick: (id: string) => void;
}

const CollectionParallax: React.FC<CollectionParallaxProps> = ({ products, addToCart, onProductClick }) => {
  const { t } = useLanguage();

  return (
    <div id="parallax-world-of-ugg">
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Oswald:300,400,700');
        @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic');

        /* Structure Override */
        #parallax-world-of-ugg {width: 100%; padding:0; background-color: white;}
        html.dark #parallax-world-of-ugg { background-color: #101014; }

        /* Helpers */
        .margin-top-10 {padding-top:10px;}
        .margin-bot-10 {padding-bottom:10px;}

        /* Typography */
        #parallax-world-of-ugg h1 {font-family:'Syncopate', sans-serif; font-size:24px; font-weight:100; text-transform: uppercase; color:black; padding:0; margin:0;}
        /* Removed opacity: .9 to ensure clean rendering */
        #parallax-world-of-ugg h2 {font-family:'Syncopate', sans-serif; font-size:60px; letter-spacing:10px; text-align:center; color:white; font-weight:100; text-transform:uppercase; z-index:10;}
        #parallax-world-of-ugg h3 {font-family:'Syncopate', sans-serif; font-size:14px; line-height:0; font-weight:100; letter-spacing:8px; text-transform: uppercase; color:black;}
        #parallax-world-of-ugg p {font-family:'Source Sans Pro', sans-serif; font-weight:400; font-size:16px; line-height:28px; text-align:center;}

        /* Section - Title */
        #parallax-world-of-ugg .title {background: white; padding: 60px; margin:0 auto; text-align:center;}
        #parallax-world-of-ugg .title h1 {font-size:35px; letter-spacing:8px;}

        /* Section - Block */
        #parallax-world-of-ugg .block {background: white; padding: 60px; width:820px; margin:0 auto; text-align:center;}
        #parallax-world-of-ugg .block-gray {background: #f2f2f2;padding: 60px;}

        /* Section - Parallax (Static Images) */
        #parallax-world-of-ugg .parallax-one {
            padding-top: 200px; 
            padding-bottom: 200px; 
            overflow: hidden; 
            position: relative; 
            width: 100%; 
            background-image: url('https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Antler%20and%20Conks.jpg'); 
            background-attachment: fixed; 
            background-size: cover; 
            -moz-background-size: cover; 
            -webkit-background-size: cover; 
            background-repeat: no-repeat; 
            background-position: top center;
        }

        /* Dynamic Parallax Styles */
        /* Wrapper to enable clip-path parallax for components */
        .dynamic-parallax-wrapper {
            position: relative;
            clip-path: inset(0); /* Crucial: Clips the fixed child to this section's bounds */
            height: auto;
        }
        
        /* Fixed background placement */
        .fixed-component-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        }

        #parallax-world-of-ugg .parallax-two, 
        #parallax-world-of-ugg .parallax-three {
            padding-top: 200px; 
            padding-bottom: 200px; 
            overflow: hidden; 
            position: relative; 
            width: 100%;
            z-index: 10;
            /* Background handled by .fixed-component-bg */
        }

        /* Extras */
        #parallax-world-of-ugg .line-break {border-bottom:1px solid black; width: 150px; margin:0 auto;}

        html { scroll-behavior: smooth; }

        @media (max-width: 1024px) {
          #parallax-world-of-ugg .parallax-one {
            background-attachment: scroll;
            background-position: center;
          }

          .fixed-component-bg {
            position: absolute;
            height: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #parallax-world-of-ugg .parallax-one {
            background-attachment: scroll;
          }

          .fixed-component-bg {
            position: absolute;
            height: 100%;
          }
        }

        /* Media Queries */
        @media screen and (max-width: 959px) and (min-width: 768px) {
          #parallax-world-of-ugg .block {padding: 40px; width:620px;}
        }
        @media screen and (max-width: 767px) {
          #parallax-world-of-ugg .block {padding: 30px; width:420px;}
          #parallax-world-of-ugg h2 {font-size:30px;}
          #parallax-world-of-ugg .block {padding: 30px;}
          #parallax-world-of-ugg .parallax-one, #parallax-world-of-ugg .parallax-two, #parallax-world-of-ugg .parallax-three {padding-top:100px; padding-bottom:100px;}
        }
        @media screen and (max-width: 479px) {
          #parallax-world-of-ugg .block {padding: 30px 15px; width:290px;}
        }

        /* Dark Mode Support */
        html.dark #parallax-world-of-ugg .block,
        html.dark #parallax-world-of-ugg .title { background: #101014; }
        html.dark #parallax-world-of-ugg h1, 
        html.dark #parallax-world-of-ugg h3 { color: white; }
        html.dark #parallax-world-of-ugg p { color: #ccc; }
        html.dark #parallax-world-of-ugg .line-break { border-color: #333; }
      `}</style>

      {/* Intro Section */}
      <section>
          <div className="title">
            <h1 className="font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome">{t('coll_intro_title')}</h1>
          </div>
          <div className="bg-white dark:bg-[#101014]">
            <ProductCarousel 
                products={products} 
                addToCart={addToCart} 
                onProductClick={onProductClick} 
            />
          </div>
      </section>

      {/* SECTION 1: ORIGIN (Static Image Parallax) */}
      <section>
        <div className="parallax-one text-center">
          <h2 className="font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome">{t('coll_sec1_title')}</h2>
        </div>
      </section>

      <section>
        <div className="block text-center">
          <p className="text-center">{t('coll_sec1_p1')}</p>
          <p className="line-break margin-top-10"></p>
          <p className="margin-top-10 text-center">{t('coll_sec1_p2')}</p>
        </div>
      </section>

      {/* SECTION 2: SAVING PLANET EARTH (Dynamic Bands Parallax) */}
      <section className="dynamic-parallax-wrapper text-center">
        <div className="fixed-component-bg">
            <DynamicBands />
        </div>
        <div className="parallax-two text-center">
            {/* Minimal tint for readability */}
            <div className="absolute inset-0 bg-[#1a0b2e]/30 pointer-events-none"></div>
            <h2 className="relative z-10 font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome leading-tight text-center whitespace-pre-line">
                {t('coll_parallax2_text')}
            </h2>
        </div>
      </section>

      <section>
        <div className="block text-center">
          <p className="text-center">{t('coll_sec2_p1')}</p>
          <p className="line-break margin-top-10"></p>
          <p className="margin-top-10 text-center">{t('coll_sec2_p2')}</p>
        </div>
      </section>

      {/* SECTION 3: EVOLUTION (Global Vision Background) */}
      <section className="dynamic-parallax-wrapper text-center">
        <div className="fixed-component-bg">
            <GlobalVisionBackground />
        </div>
        <div className="parallax-three text-center flex flex-col items-center justify-center">
            {/* Removed text-chrome and gradient to eliminate all shadows and glows */}
            <h2 className="relative z-10 font-monolith font-thin tracking-tighter text-white leading-tight px-4 text-center bg-transparent" style={{ textShadow: 'none', background: 'transparent' }}>
                {t('coll_parallax3_title')}<br />
                <span className="text-xl md:text-2xl tracking-[0.2em] block mt-4 font-monolith text-white font-light bg-transparent" style={{fontWeight: 300, textShadow: 'none', background: 'transparent'}}>
                    {t('coll_parallax3_sub')}
                </span>
            </h2>
        </div>
      </section>

      <section>
        <div className="block text-center">
          <p className="text-center">{t('coll_sec3_p1')}</p>
          <p className="line-break margin-top-10"></p>
          <p className="margin-top-10 text-center">{t('coll_sec3_p2')}</p>
        </div>
      </section>

    </div>
  );
};

export default CollectionParallax;
