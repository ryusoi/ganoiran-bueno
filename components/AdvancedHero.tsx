
import React, { useEffect, useRef, useMemo } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

declare global {
  interface Window {
    gsap: any;
  }
}

// Static Image Data
export const heroData = [
    {
        image:'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/GANO%20SHAKH%20MEDIA%20LOW/GANO%20SHAKH%20IMAGE-Recovered__AIE.jpg'
    },
    {
        image:'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/GANO%20SHAKH%20MEDIA%20LOW/Gano%20Shakh%20Grow%20room.jpg'
    },
    {
        image:'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganodrma%20Extract%20Top.mp4'
    },
    {
        image:'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Luna.mp4' 
    },
    {
        image:'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Nutripet.mp4'
    },
    {
        image:'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%202.mp4'
    },
    {
        image:'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/GANO%20SHAKH%20MEDIA%20LOW/GANO%20TEA%20COFFEE/coffee%201.jpg'
    },
    {
        image:'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/GANO%20SHAKH%20MEDIA%20LOW/GANO%20TEA%20COFFEE/TEA%202.jpg'
    },
    {
        image: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/GROW%20ROOM.mp4'
    }
];

const AdvancedHero: React.FC<{ setPage: (p: any) => void }> = ({ setPage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Memoize localized data to prevent unnecessary re-calculations
  // The content of these objects updates instantly when `language` changes
  const localizedHeroData = useMemo(() => {
      return heroData.map((item, index) => ({
          ...item,
          place: t(`hero_slide${index + 1}_place`),
          title: t(`hero_slide${index + 1}_title`),
          title2: t(`hero_slide${index + 1}_title2`),
          description: t(`hero_slide${index + 1}_desc`),
      }));
  }, [t, language]);

  useEffect(() => {
    if (!window.gsap) {
        console.error("GSAP not loaded");
        return;
    }

    const gsap = window.gsap;
    
    const ctx = gsap.context(() => {
        // Dynamic order based on length of data
        let order = Array.from({length: localizedHeroData.length}, (_, i) => i);
        let offsetTop = 200;
        let offsetLeft = 700;
        let cardWidth = 200;
        let cardHeight = 300;
        let gap = 40;
        let numberSize = 50;
        
        const ease = "power2.inOut"; 
        const transitionDuration = 2.5; 
        const textRevealDuration = 2.0;
        const viewingTime = 8;

        let clicks = 0;

        const getCard = (index: number) => `#card${index}`;
        const getCardContent = (index: number) => `#card-content-${index}`;
        const getSliderItem = (index: number) => `#slide-item-${index}`;
        const getDetails = (index: number) => `#details-${index}`;

        function animate(target: string | Element, duration: number, properties: any) {
            return new Promise((resolve) => {
                gsap.to(target, {
                    ...properties,
                    duration: duration,
                    onComplete: resolve,
                    force3D: true,
                });
            });
        }

        function init() {
            const [active, ...rest] = order;
            const { innerHeight: height, innerWidth: width } = window;
            
            // Responsive Adjustments
            if (width < 768) {
                cardWidth = 140;
                cardHeight = 180;
                gap = 20;
                offsetTop = height - 220; 
                offsetLeft = 20; 
            } else {
                cardWidth = 160;
                cardHeight = 220;
                gap = 20;
                offsetTop = height - 240; 
                offsetLeft = width - 450; 
            }

            // HIDE ALL DETAILS & PREP POSITIONS
            localizedHeroData.forEach((_, i) => {
                gsap.set(getDetails(i), { opacity: 0, zIndex: 0, x: -200 });
                // Reset internal elements to "hidden/below" state for animation
                const el = getDetails(i);
                gsap.set(`${el} .text`, { y: 100 });
                gsap.set(`${el} .title-1`, { y: 100 });
                gsap.set(`${el} .title-2`, { y: 100 });
                gsap.set(`${el} .desc`, { y: 50 });
                gsap.set(`${el} .cta`, { y: 60 });
            });

            gsap.set(".indicator", { x: -window.innerWidth });
            
            // Setup Pagination
            gsap.set("#pagination", {
                top: offsetTop + (width < 768 ? 200 : 250),
                left: offsetLeft,
                y: 200,
                opacity: 0,
                zIndex: 60,
            });

            // Setup Active Card (Background)
            gsap.set(getCard(active), {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                zIndex: 20,
            });
            gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
            
            // INITIAL REVEAL FOR ACTIVE DETAILS
            const activeDetails = getDetails(active);
            gsap.set(activeDetails, { opacity: 0, zIndex: 22, x: -200 });
            
            // Progress Bar
            gsap.set(".progress-sub-foreground", {
                width: (width < 768 ? 200 : 500) * (1 / order.length) * (active + 1),
            });

            // Position the rest of the cards
            rest.forEach((i, index) => {
                gsap.set(getCard(i), {
                    x: offsetLeft + 400 + index * (cardWidth + gap),
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    zIndex: 30,
                    borderRadius: 10,
                });
                gsap.set(getCardContent(i), {
                    x: offsetLeft + 400 + index * (cardWidth + gap),
                    zIndex: 40,
                    y: offsetTop + cardHeight - 100,
                });
                gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
            });

            const startDelay = 0.6;

            // Animate Cover Wipe
            gsap.to(".cover", {
                x: width + 400,
                delay: 0.5,
                ease,
                duration: 1.5,
                onComplete: () => {
                    gsap.delayedCall(0.5, loop);
                },
            });

            // Animate Grid Cards In
            rest.forEach((i, index) => {
                gsap.to(getCard(i), {
                    x: offsetLeft + index * (cardWidth + gap),
                    zIndex: 30,
                    delay: startDelay + (0.1 * index),
                    duration: transitionDuration,
                    ease,
                    force3D: true,
                });
                gsap.to(getCardContent(i), {
                    x: offsetLeft + index * (cardWidth + gap),
                    zIndex: 40,
                    delay: startDelay + (0.1 * index),
                    duration: transitionDuration,
                    ease,
                    force3D: true,
                });
            });

            // Reveal Text & UI - Active Slide
            gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay, duration: 1.5 });
            
            // Animate Active Details Container
            gsap.to(activeDetails, { opacity: 1, x: 0, ease, delay: startDelay, duration: 1.5 });
            
            // Animate Text Elements inside Active Details (Initial load)
            gsap.to(`${activeDetails} .text`, { y: 0, delay: startDelay + 0.1, duration: 1, ease });
            gsap.to(`${activeDetails} .title-1`, { y: 0, delay: startDelay + 0.2, duration: 1, ease });
            gsap.to(`${activeDetails} .title-2`, { y: 0, delay: startDelay + 0.2, duration: 1, ease });
            gsap.to(`${activeDetails} .desc`, { y: 0, delay: startDelay + 0.3, duration: 1, ease });
            gsap.to(`${activeDetails} .cta`, { y: 0, delay: startDelay + 0.4, duration: 1, ease });
        }

        function step() {
            return new Promise((resolve) => {
                const prevActiveIndex = order[0];
                order.push(order.shift() as number);
                const activeIndex = order[0];

                // Identifiers
                const activeDetails = getDetails(activeIndex);
                const prevDetails = getDetails(prevActiveIndex);

                // Prepare New Active Details (Hidden, Left)
                gsap.set(activeDetails, { zIndex: 22, x: -200, opacity: 0 });
                // Reset text positions for reveal animation
                gsap.set(`${activeDetails} .text`, { y: 100 });
                gsap.set(`${activeDetails} .title-1`, { y: 100 });
                gsap.set(`${activeDetails} .title-2`, { y: 100 });
                gsap.set(`${activeDetails} .desc`, { y: 50 });
                gsap.set(`${activeDetails} .cta`, { y: 60 });

                // Animate Active Details In
                gsap.to(activeDetails, { opacity: 1, x: 0, delay: 0.4, ease, duration: 1 });
                
                // Staggered Text Reveal
                gsap.to(`${activeDetails} .text`, { y: 0, delay: 0.1, duration: textRevealDuration, ease });
                gsap.to(`${activeDetails} .title-1`, { y: 0, delay: 0.2, duration: textRevealDuration, ease });
                gsap.to(`${activeDetails} .title-2`, { y: 0, delay: 0.2, duration: textRevealDuration, ease });
                gsap.to(`${activeDetails} .desc`, { y: 0, delay: 0.4, duration: textRevealDuration, ease });
                gsap.to(`${activeDetails} .cta`, { y: 0, delay: 0.5, duration: textRevealDuration, onComplete: resolve, ease });
                
                // Hide Previous Details
                gsap.set(prevDetails, { zIndex: 12 }); // Move to back
                gsap.to(prevDetails, { opacity: 0, duration: 1, ease }); // Fade out

                // --- CARD ANIMATION LOGIC (UNCHANGED) ---
                const [active, ...rest] = order;
                const prv = rest[rest.length - 1]; // The card that was background and needs to return to grid

                gsap.set(getCard(prv), { zIndex: 10 });
                gsap.set(getCard(active), { zIndex: 20 });
                gsap.to(getCard(prv), { scale: 1.5, ease, duration: transitionDuration });

                gsap.to(getCardContent(active), {
                    y: offsetTop + cardHeight - 10,
                    opacity: 0,
                    duration: 0.5,
                    ease,
                });
                gsap.to(getSliderItem(active), { x: 0, ease, duration: transitionDuration });
                gsap.to(getSliderItem(prv), { x: -numberSize, ease, duration: transitionDuration });
                gsap.to(".progress-sub-foreground", {
                    width: (window.innerWidth < 768 ? 200 : 500) * (1 / order.length) * (active + 1),
                    ease,
                    duration: transitionDuration
                });

                // Main card expansion
                gsap.to(getCard(active), {
                    x: 0,
                    y: 0,
                    ease,
                    duration: transitionDuration,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    borderRadius: 0,
                    force3D: true,
                    onComplete: () => {
                        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                        gsap.set(getCard(prv), {
                            x: xNew,
                            y: offsetTop,
                            width: cardWidth,
                            height: cardHeight,
                            zIndex: 30,
                            borderRadius: 10,
                            scale: 1,
                        });

                        gsap.set(getCardContent(prv), {
                            x: xNew,
                            y: offsetTop + cardHeight - 100,
                            opacity: 1,
                            zIndex: 40,
                        });
                        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });
                        
                        clicks -= 1;
                        if (clicks > 0) {
                            step();
                        }
                    },
                });

                rest.forEach((i, index) => {
                    if (i !== prv) {
                        const xNew = offsetLeft + index * (cardWidth + gap);
                        gsap.set(getCard(i), { zIndex: 30 });
                        gsap.to(getCard(i), {
                            x: xNew,
                            y: offsetTop,
                            width: cardWidth,
                            height: cardHeight,
                            ease,
                            duration: transitionDuration,
                            delay: 0.1 * (index + 1),
                            force3D: true,
                        });

                        gsap.to(getCardContent(i), {
                            x: xNew,
                            y: offsetTop + cardHeight - 100,
                            opacity: 1,
                            zIndex: 40,
                            ease,
                            duration: transitionDuration,
                            delay: 0.1 * (index + 1),
                            force3D: true,
                        });
                        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease, duration: transitionDuration });
                    }
                });
            });
        }

        async function loop() {
            // Static phase
            await animate(".indicator", viewingTime, { x: 0, ease: "linear" });
            // Zip phase
            await animate(".indicator", 0.5, { x: window.innerWidth, ease: "power2.in" });
            
            // Reset bar
            gsap.set(".indicator", { x: -window.innerWidth });
            
            // Transition
            await step();
            
            // Repeat
            loop();
        }

        init();
    }, containerRef);

    return () => ctx.revert();

  }, [language, localizedHeroData]);

  const handleShop = () => {
      setPage('shop');
  };
  
  const handleScience = () => {
      setPage('about');
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white dark:bg-[#1a1a1a] font-inter transition-colors duration-500">
      <style>{`
        .card {
          position: absolute;
          left: 0;
          top: 0;
          background-position: center;
          background-size: cover;
          box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.6);
          background-color: #ffffff;
        }
        html.dark .card {
          background-color: #101014;
        }
        .card-content {
          position: absolute;
          left: 0;
          top: 0;
          color: #1a0b2e;
          padding-left: 16px;
        }
        html.dark .card-content {
          color: white;
        }
        .content-place {
          margin-top: 6px;
          font-size: 13px;
          font-weight: 300; /* Fine line */
        }
        .content-title-1, .content-title-2 {
          font-weight: 300; /* Fine line */
          font-size: 20px;
          font-family: "Syncopate", sans-serif;
        }
        .content-start {
          width: 30px;
          height: 5px;
          border-radius: 99px;
          background-color: #1a0b2e;
        }
        html.dark .content-start {
          background-color: white;
        }
        .details {
          z-index: 0; /* Default low z-index, JS will boost active one */
          position: absolute;
          top: 25%;
          left: 4%;
          width: 85%;
          max-width: 900px; /* Increased from 300px to allow titles to span */
          opacity: 0; /* Default hidden */
        }
        @media (max-width: 768px) {
            .details {
                top: 130px;
                left: 20px;
                max-width: 90%;
            }
        }
        .place-box {
          height: 46px;
          overflow: hidden;
        }
        .place-box .text {
          padding-top: 16px;
          font-size: 20px;
          position: relative;
          color: #6366f1; /* Indigo 500 in light mode */
          font-weight: 300; /* Fine line */
        }
        html.dark .place-box .text {
          color: #c7d2fe; /* Indigo 200 in dark mode */
        }
        .place-box .text:before {
          top: 0;
          left: 0;
          position: absolute;
          content: "";
          width: 30px;
          height: 4px;
          border-radius: 99px;
          background-color: #1a0b2e;
        }
        html.dark .place-box .text:before {
          background-color: white;
        }
        
        .title-1, .title-2 {
          font-weight: 100; /* Thin - matching Science page */
          font-size: 60px;
          font-family: "Syncopate", sans-serif;
          text-transform: uppercase;
          line-height: 1; 
          letter-spacing: -0.05em; /* Tighter tracking */
          word-spacing: 5px;
          color: transparent;
          background: linear-gradient(
            110deg, 
            #1e3a8a 0%, /* dark blue */
            #4338ca 20%, /* indigo-700 */
            #1a0b2e 45%, 
            #4c1d95 50%, /* purple-800 */
            #4338ca 80%, 
            #1e3a8a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gold-shine 4s linear infinite; /* Reuse shine anim */
          text-shadow: none;
          white-space: nowrap;
          padding-right: 15px; 
        }
        html.dark .title-1, html.dark .title-2 {
          background: linear-gradient(
            110deg, 
            #bfdbfe 0%, /* blue-200 */
            #c7d2fe 20%, /* indigo-200 */
            #ffffff 45%, 
            #e9d5ff 50%, /* purple-200 */
            #c7d2fe 80%, 
            #bfdbfe 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: 0 0 30px rgba(100,100,255,0.4);
        }
        @media (max-width: 768px) {
            .title-1, .title-2 {
                font-size: 28px;
                letter-spacing: -1.5px;
                line-height: 1.1;
                white-space: normal;
            }
        }

        .title-box-1, .title-box-2 {
          margin-top: 2px;
          height: 80px; 
          overflow: hidden;
        }
        @media (max-width: 768px) {
            .title-box-1, .title-box-2 {
                height: 50px;
            }
        }
        .desc {
          margin-top: 20px;
          font-size: 16px;
          line-height: 1.5;
          color: #333;
          text-shadow: none;
          max-width: 280px;
          font-weight: 300; /* Fine line description */
        }
        html.dark .desc {
          color: #eee;
          text-shadow: 0 2px 4px rgba(0,0,0,0.9);
          font-weight: 200;
        }
        .cta {
          margin-top: 28px;
          display: flex;
          align-items: center;
        }
        .bookmark {
          border: none;
          background-color: #4f46e5; /* Indigo 600 */
          width: 44px;
          height: 44px;
          border-radius: 99px;
          color: white;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 0.3s;
        }
        html.dark .bookmark {
          background-color: #6366f1; /* Indigo 500 */
        }
        .bookmark:hover {
            transform: scale(1.1);
        }
        .discover {
          border: 1px solid #1a0b2e;
          background-color: rgba(255,255,255,0.3);
          height: 44px;
          border-radius: 99px;
          color: #1a0b2e;
          padding: 4px 32px;
          font-size: 14px;
          font-weight: 600;
          margin-left: 16px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          backdrop-filter: blur(4px);
        }
        html.dark .discover {
          border: 1px solid #c7d2fe;
          background-color: rgba(0,0,0,0.3);
          color: #ffffff;
        }
        .discover:hover {
            background-color: #1a0b2e;
            color: white;
        }
        html.dark .discover:hover {
            background-color: white;
            color: black;
        }
        .indicator {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          height: 5px;
          z-index: 60;
          background-color: #6366f1; /* Indigo */
        }
        .pagination {
          position: absolute;
          left: 0px;
          top: 0px;
          display: inline-flex;
        }
        .arrow {
          z-index: 60;
          width: 50px;
          height: 50px;
          border-radius: 999px;
          border: 2px solid #333;
          display: grid;
          place-items: center;
          cursor: pointer;
          color: #333;
        }
        html.dark .arrow {
          border: 2px solid #ffffff55;
          color: white;
        }
        .arrow:nth-child(2){
          margin-left: 20px;
        }
        .progress-sub-container{
          margin-left: 24px;
          z-index: 60;
          width: 500px;
          height: 50px;
          display: flex;
          align-items: center;
        }
        @media (max-width: 768px) {
            .progress-sub-container {
                width: 200px;
            }
        }
        .progress-sub-background{
          width: 100%;
          height: 3px;
          background-color: rgba(0,0,0,0.1);
        }
        html.dark .progress-sub-background{
          background-color: #ffffff33;
        }
        .progress-sub-foreground{
          height: 3px;
          background-color: #6366f1;
        }
        .slide-numbers{
          width: 50px;
          height: 50px;
          overflow: hidden;
          z-index: 60;
          position: relative;
        }
        .item{
          width: 50px;
          height: 50px;
          position: absolute;
          color: #333;
          top: 0;
          left: 0;
          display: grid;
          place-items: center;
          font-size: 32px;
          font-weight: bold;
        }
        html.dark .item{
          color: white;
        }
        .cover{
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          background-color: #ffffff;
          z-index: 100;
        }
        html.dark .cover{
          background-color: #101014;
        }
        video {
            object-fit: cover;
        }
      `}</style>

      <div className="indicator"></div>

      {/* Dynamic Cards */}
      {localizedHeroData.map((item, index) => (
          <div key={index} className="card" id={`card${index}`}>
              {item.image.endsWith('.mp4') ? (
                  <video src={item.image} autoPlay muted loop className="w-full h-full object-cover" />
              ) : (
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
              )}
              {/* Removed mask to clearly see background media */}
          </div>
      ))}

      {/* Card Contents (Small Preview) */}
      {localizedHeroData.map((item, index) => (
          <div key={index} className="card-content" id={`card-content-${index}`}>
              <div className="content-start"></div>
              <div className="content-place">{item.place}</div>
              <div className="content-title-1">{item.title}</div>
              <div className="content-title-2">{item.title2}</div>
          </div>
      ))}

      {/* Details (Main Display) - INDIVIDUAL FOR EACH SLIDE TO FIX GHOSTING */}
      {localizedHeroData.map((item, index) => (
          <div key={index} className="details" id={`details-${index}`}>
            <div className="place-box">
                <div className="text">{item.place}</div>
            </div>
            <div className="title-box-1"><div className="title-1">{item.title}</div></div>
            <div className="title-box-2"><div className="title-2">{item.title2}</div></div>
            <div className="desc font-sans">{item.description}</div>
            <div className="cta">
                <button className="bookmark" onClick={handleShop}>
                    <ArrowRight className="w-6 h-6" />
                </button>
                <button className="discover" onClick={handleScience}>{t('hero_cta_science')}</button>
            </div>
          </div>
      ))}

      {/* Pagination Controls */}
      <div className="pagination" id="pagination">
        <div className="arrow arrow-left">
          <ChevronLeft className="w-6 h-6" />
        </div>
        <div className="arrow arrow-right">
          <ChevronRight className="w-6 h-6" />
        </div>
        <div className="progress-sub-container" >
          <div className="progress-sub-background" >
              <div className="progress-sub-foreground" ></div>
          </div>
        </div>
        <div className="slide-numbers" id="slide-numbers">
            {localizedHeroData.map((_, i) => (
                <div key={i} className="item" id={`slide-item-${i}`}>{i + 1}</div>
            ))}
        </div>
      </div>

      <div className="cover"></div>
    </div>
  );
};

export default AdvancedHero;
