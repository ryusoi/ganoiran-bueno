import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DiamondHero: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  // Diamond Particle Logic
  useEffect(() => {
    if (!containerRef.current) return;

    // Create dots if they don't exist
    if (dotsRef.current.length === 0) {
        const dots = [];
        for (let i = 0; i < 200; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            
            // Assign diamond glass colors
            const colorTypes = ['diamond-white', 'diamond-blue', 'diamond-purple', 'diamond-cyan', 'diamond-pink'];
            const randomColor = colorTypes[Math.floor(Math.random() * colorTypes.length)];
            
            if (Math.random() < 0.1) {
                dot.classList.add('diamond-rainbow');
            } else {
                dot.classList.add(randomColor);
            }
            
            containerRef.current.appendChild(dot);
            dots.push(dot);
        }
        dotsRef.current = dots;
    }

    const scatterDots = () => {
        dotsRef.current.forEach((dot) => {
            const x = Math.random() * 240;
            const y = Math.random() * 240;
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            dot.style.opacity = '0.4';
            dot.style.transform = 'scale(0.8)';
            dot.style.filter = 'brightness(0.7) saturate(0.8)';
        });
    };

    const formDiamond = () => {
        const scale = 250 / 59.333;
        const diamondPoints: {x: number, y: number}[] = [];
        
        // --- WIREFRAME PATH LOGIC ---
        
        // 1. MAIN FACET
        for (let i = 0; i <= 12; i++) {
            const t = i / 12;
            diamondPoints.push({ x: (39.962 - 10.32 * t) * scale, y: (17.999 + 31.91 * t) * scale });
        }
        for (let i = 0; i <= 12; i++) {
            const t = i / 12;
            diamondPoints.push({ x: (29.642 - 10.592 * t) * scale, y: (49.909 - 31.91 * t) * scale });
        }
        for (let i = 0; i <= 12; i++) {
            diamondPoints.push({ x: (19.05 + i * 1.74) * scale, y: 17.999 * scale });
        }                
        
        // 2. TOP SECTION
        for (let i = 0; i <= 10; i++) {
            const t = i / 10;
            diamondPoints.push({ x: (22.662 + 6.986 * t) * scale, y: (13.999 - 6.986 * t) * scale });
        }
        for (let i = 0; i <= 10; i++) {
            const t = i / 10;
            diamondPoints.push({ x: (29.648 + 6.806 * t) * scale, y: (7.013 + 6.986 * t) * scale });
        }
        for (let i = 0; i <= 8; i++) {
            diamondPoints.push({ x: (36.454 - i * 1.72) * scale, y: 13.999 * scale });
        }
        
        // 3. LEFT FACET
        for (let i = 0; i <= 12; i++) {
            const t = i / 12;
            diamondPoints.push({ x: (14.835 + 8.474 * t) * scale, y: (17.999 + 25.531 * t) * scale });
        }
        for (let i = 0; i <= 12; i++) {
            const t = i / 12;
            diamondPoints.push({ x: (23.309 - 17.513 * t) * scale, y: (43.53 - 25.531 * t) * scale });
        }
        for (let i = 0; i <= 6; i++) {
            diamondPoints.push({ x: (5.796 + i * 1.51) * scale, y: 17.999 * scale });
        }
        
        // 4. RIGHT FACET
        for (let i = 0; i <= 6; i++) {
            diamondPoints.push({ x: (44.165 + i * 1.56) * scale, y: 17.999 * scale });
        }
        for (let i = 0; i <= 12; i++) {
            const t = i / 12;
            diamondPoints.push({ x: (53.535 - 17.729 * t) * scale, y: (17.999 + 25.846 * t) * scale });
        }
        for (let i = 0; i <= 12; i++) {
            const t = i / 12;
            diamondPoints.push({ x: (35.806 + 8.359 * t) * scale, y: (43.845 - 25.846 * t) * scale });
        }
        
        // 5. TOP LEFT/RIGHT CROWNS
        for (let i = 0; i <= 6; i++) {
            diamondPoints.push({ x: (51.927 - i * 1.65) * scale, y: 13.999 * scale });
        }
        for (let i = 0; i <= 8; i++) {
            const t = i / 8;
            diamondPoints.push({ x: (42.039 - 8.768 * t) * scale, y: (13.999 - 9 * t) * scale });
        }
        for (let i = 0; i <= 5; i++) {
            diamondPoints.push({ x: (33.271 + i * 1.63) * scale, y: 4.999 * scale });
        }
        for (let i = 0; i <= 8; i++) {
            const t = i / 8;
            diamondPoints.push({ x: (41.426 + 10.501 * t) * scale, y: (4.999 + 9 * t) * scale });
        }
        for (let i = 0; i <= 6; i++) {
            diamondPoints.push({ x: (16.784 + i * 1.54) * scale, y: 4.999 * scale });
        }
        for (let i = 0; i <= 8; i++) {
            const t = i / 8;
            diamondPoints.push({ x: (26.005 - 9 * t) * scale, y: (4.999 + 9 * t) * scale });
        }
        for (let i = 0; i <= 5; i++) {
            diamondPoints.push({ x: (17.005 - i * 1.98) * scale, y: 13.999 * scale });
        }
        for (let i = 0; i <= 8; i++) {
            const t = i / 8;
            diamondPoints.push({ x: (7.092 + 9.692 * t) * scale, y: (13.999 - 9 * t) * scale });
        }

        // Apply positions
        dotsRef.current.forEach((dot, index) => {
            if (index < diamondPoints.length) {
                const point = diamondPoints[index];
                dot.style.left = point.x + 'px';
                dot.style.top = point.y + 'px';
                dot.style.opacity = '0.9';
                dot.style.transform = 'scale(1)';
                
                if (index > 50 && index < 100) {
                    dot.style.filter = 'brightness(1.2) saturate(1.1)';
                }
            } else {
                dot.style.opacity = '0.2';
                dot.style.transform = 'scale(0.5)';
                dot.style.filter = 'brightness(0.8)';
            }
        });
    };

    // Initial scatter
    scatterDots();

    // Event Listeners
    let isDiamond = false;
    const card = cardRef.current;
    
    if (card) {
        const onEnter = () => {
            if (!isDiamond) {
                formDiamond();
                isDiamond = true;
            }
        };
        const onLeave = () => {
            isDiamond = false;
            scatterDots();
            card.style.transform = '';
        };
        const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        card.addEventListener('mousemove', onMove);

        return () => {
            card.removeEventListener('mouseenter', onEnter);
            card.removeEventListener('mouseleave', onLeave);
            card.removeEventListener('mousemove', onMove);
        };
    }
  }, []);

  // Update dots color logic when theme changes
  useEffect(() => {
      // We can update css variables here if needed
      if (containerRef.current) {
          containerRef.current.style.setProperty('--dot-filter', isDark ? 'brightness(1)' : 'brightness(0.5) contrast(1.5)');
      }
  }, [isDark]);

  return (
    <div className={`fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center overflow-hidden py-20 border-b border-white/10 z-0 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-[#f8f5f2]'}`}>
      <style>{`
        .luxury-card {
            padding: 3rem 4rem;
            display: grid;
            place-items: center;
            gap: 2rem;
            border: 1px solid transparent;
            border-image: linear-gradient(transparent, #ffe0a6, transparent) 1;
            border-width: 0 2px 0px 2px;
            background: radial-gradient(
                100% 61.73% at 100% 50%,
                rgba(255, 224, 166, 0.05) 0%,
                transparent 100%
            ),
            radial-gradient(
                91.09% 56.23% at 0% 50%,
                rgba(255, 224, 166, 0.05) 0%,
                transparent 100%
            );
            position: relative;
            cursor: pointer;
            width: 350px;
            height: 450px;
            transition: transform 0.3s ease;
            z-index: 10;
        }

        .luxury-card::before,
        .luxury-card::after {
            content: "";
            position: absolute;
            border: 1px solid transparent;
            border: inherit;
            z-index: -1;
        }

        .luxury-card::before {
            inset: -1rem;
            opacity: 15%;
        }

        .luxury-card::after {
            inset: -2rem;
            opacity: 5%;
        }

        .diamond-title {
            color: ${isDark ? 'white' : '#2E1065'};
            font-size: 1.8rem;
            font-weight: 700;
            text-align: center;
            letter-spacing: 0.5rem;
            text-transform: uppercase;
            background: linear-gradient(${isDark ? 'rgb(255, 224, 166), rgb(200, 150, 100)' : '#4c1d95, #2e1065'});
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 1rem;
            font-family: 'Cinzel', serif;
        }

        .diamond-subtitle {
            color: ${isDark ? '#ffe0a6' : '#6b21a8'};
            font-size: 0.9rem;
            text-align: center;
            letter-spacing: 0.2rem;
            opacity: 0.8;
            margin-bottom: 2rem;
            font-family: 'Syncopate', sans-serif;
            font-weight: 300;
        }

        .diamond-container {
            width: 250px;
            height: 250px;
            position: relative;
            border-radius: 10px;
            /* Filter for light mode to make dots more visible */
            filter: var(--dot-filter, brightness(1));
        }

        .dot {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
        }

        /* Diamond glass colors */
        .dot.diamond-white {
            background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(230, 245, 255, 0.6));
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.8), 0 0 4px rgba(200, 220, 255, 0.6);
        }

        .dot.diamond-blue {
            background: radial-gradient(circle, rgba(173, 216, 230, 0.9), rgba(135, 206, 250, 0.6));
            box-shadow: 0 0 12px rgba(173, 216, 230, 0.7), 0 0 4px rgba(100, 150, 255, 0.5);
        }

        .dot.diamond-purple {
            background: radial-gradient(circle, rgba(221, 160, 221, 0.9), rgba(186, 85, 211, 0.6));
            box-shadow: 0 0 12px rgba(221, 160, 221, 0.7), 0 0 4px rgba(150, 100, 200, 0.5);
        }

        .dot.diamond-cyan {
            background: radial-gradient(circle, rgba(224, 255, 255, 0.9), rgba(175, 238, 238, 0.6));
            box-shadow: 0 0 12px rgba(224, 255, 255, 0.7), 0 0 4px rgba(100, 200, 220, 0.5);
        }

        .dot.diamond-pink {
            background: radial-gradient(circle, rgba(255, 192, 203, 0.9), rgba(255, 182, 193, 0.6));
            box-shadow: 0 0 12px rgba(255, 192, 203, 0.7), 0 0 4px rgba(255, 150, 180, 0.5);
        }

        .dot.diamond-rainbow {
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.9) 0%,
                rgba(173, 216, 230, 0.8) 25%,
                rgba(221, 160, 221, 0.8) 50%,
                rgba(255, 192, 203, 0.8) 75%,
                rgba(224, 255, 255, 0.7) 100%);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 
                       0 0 8px rgba(173, 216, 230, 0.6),
                       0 0 4px rgba(221, 160, 221, 0.4);
            animation: rainbow-sparkle 3s ease-in-out infinite;
        }

        @keyframes rainbow-sparkle {
            0%, 100% { transform: scale(1); filter: brightness(1) saturate(1); }
            50% { transform: scale(1.2); filter: brightness(1.3) saturate(1.4); }
        }

        .diamond-price {
            color: ${isDark ? '#ffe0a6' : '#2E1065'};
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
            letter-spacing: 0.1rem;
            margin-top: 1rem;
            font-family: 'Syncopate', sans-serif;
        }

        .texture {
            position: absolute;
            background-image: linear-gradient(0deg, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px);
            background-size: 1px 5px;
            inset: 0;
            mix-blend-mode: soft-light;
            opacity: ${isDark ? '1' : '0.3'};
            -webkit-mask-image: radial-gradient(30% 45% at 100% 50%, white 0%, transparent 100%),
                                radial-gradient(30% 45% at 0% 50%, white 0%, transparent 100%);
            mask-image: radial-gradient(30% 45% at 100% 50%, white 0%, transparent 100%),
                        radial-gradient(30% 45% at 0% 50%, white 0%, transparent 100%);
            pointer-events: none;
            animation: movingLines 2s linear infinite;
        }

        @keyframes movingLines {
            0% { background-position: 0 0; }
            100% { background-position: 0 5px; }
        }
      `}</style>

      {/* Stable Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            ref={bgRef}
            className="absolute inset-0 bg-[url('https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Antler%20and%20Conks.jpg')] bg-cover bg-center opacity-30 blur-sm will-change-transform"
            style={{ transform: 'scale(1.1)' }}
          ></div>
          <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/80 to-black/40' : 'from-white via-white/80 to-white/40'}`}></div>
      </div>

      <div className="luxury-card" id="card" ref={cardRef}>
        <div className="diamond-title">{t('shop_diamond_title')}</div>
        <div className="diamond-subtitle">{t('shop_diamond_subtitle')}</div>
        
        <div className="diamond-container" id="container" ref={containerRef}>
            {/* Dots injected via useEffect */}
        </div>
        
        <div className="diamond-price">{t('shop_diamond_price')}</div>
        <div className="texture"></div>
      </div>
    </div>
  );
};

export default DiamondHero;