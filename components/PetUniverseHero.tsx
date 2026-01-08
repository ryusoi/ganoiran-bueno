
import React, { useEffect, useState } from 'react';
import { Dog, Cat } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PetUniverseHero: React.FC = () => {
  const { t } = useLanguage();
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const starCount = 150;
    const newStars = [];
    for(let i=0; i<starCount; i++) {
        const size = Math.random() * 2 + 1;
        const style = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: Math.random(),
            animationDelay: `${Math.random() * 5}s`
        };
        newStars.push(<div key={i} className="starlight" style={style}></div>);
    }
    setStars(newStars);
  }, []);

  return (
    <div className="relative w-full h-[90vh] bg-[#090909] overflow-hidden">
      <style>{`
        .universe {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            overflow: hidden;
            background-color: #090909;
        }

        @keyframes suncycle {
            0% { bottom: 0; left: 50%; opacity: 0; }
            20% { bottom: -20%; left: 50%; opacity: 0; }
            50% { bottom: 50%; left: 50%; opacity: 1; }
            80% { bottom: -20%; left: 50%; opacity: 0; }
            100% { bottom: 0; left: 50%; opacity: 0; }
        }

        @keyframes mooncycle {
            0% { bottom: -20%; right: 80%; transform: scale(0.8); }
            50% { bottom: 70%; right: 20%; transform: scale(1); }
            100% { bottom: -20%; right: 80%; transform: scale(0.8); }
        }

        @keyframes daycycle {
            0% { top: 0; opacity: 1; }
            40% { top: 100%; opacity: 0; }
            60% { top: 100%; opacity: 0; }
            100% { top: 0; opacity: 1; }
        }

        @keyframes nightcycle {
            0% { top: -100%; opacity: 0; }
            40% { top: 0; opacity: 1; }
            60% { top: 0; opacity: 1; }
            100% { top: -100%; opacity: 0; }
        }

        @keyframes movement {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes float-animal {
            0%, 100% { transform: translateY(0) rotate(5deg); }
            50% { transform: translateY(-20px) rotate(-5deg); }
        }

        .moon {
            animation: mooncycle 66s linear infinite;
            height: 150px;
            width: 150px;
            position: absolute;
            z-index: 20;
            border-radius: 50%;
            background-image: radial-gradient(#fff, #fff, #ddccbb);
            box-shadow: 0 0 75px rgba(255,255,255,0.77);
        }

        .dusk {
            animation: daycycle 66s linear infinite;
            background: linear-gradient(to bottom, #001d22, #93e6f3, #ff9900, #ff9900);
            height: 100%;
            width: 100%;
            opacity: 0.9;
            position: absolute;
            z-index: 10;
        }

        .night {
            animation: nightcycle 66s linear infinite;
            background: linear-gradient(to top, #001d22, #001d22, #090909);
            height: 100%;
            width: 100%;
            opacity: 0.9;
            position: absolute;
            z-index: 15;
        }

        .galaxy {
            animation: movement 200s linear infinite;
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            z-index: 5;
        }

        .starlight {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            box-shadow: 0 0 4px #ffffff;
        }

        .horizon-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 30;
            pointer-events: none;
        }
        .horizon-wrapper img {
            width: 100%;
            height: auto;
            max-height: 40vh;
            object-fit: cover;
            object-position: bottom;
            filter: contrast(1.2) brightness(0.7);
        }

        .floating-icons {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 40;
            display: flex;
            gap: 60px;
            pointer-events: none;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        .float-icon-wrapper {
            animation: float-animal 8s ease-in-out infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(5px);
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 0 30px rgba(255,255,255,0.1);
        }
        
        .float-icon {
            color: white;
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.8));
        }

        .hero-text-overlay {
            position: absolute;
            top: 60%; /* Positioned below floating icons */
            left: 50%;
            transform: translateX(-50%);
            z-index: 50;
            text-align: center;
            width: 90%;
            max-width: 1000px;
        }
      `}</style>

      <div className="universe">
        <div className="galaxy">
            {stars}
        </div>
        <div className="moon"></div>
        <div className="night"></div>
        <div className="dusk"></div>
        
        <div className="floating-icons">
             <div className="float-icon-wrapper">
                <Dog className="w-16 h-16 md:w-24 md:h-24 float-icon" />
             </div>
             <div className="float-icon-wrapper" style={{animationDelay: '4s'}}>
                <Cat className="w-16 h-16 md:w-24 md:h-24 float-icon" />
             </div>
        </div>

        <div className="hero-text-overlay">
             {/* Science Page Style Title */}
             <h1 className="text-4xl md:text-6xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-8 leading-tight whitespace-pre-line text-center">
                {t('pet_hero_title')}
             </h1>
             
             {/* Updated Box Styling: Glassmorphism */}
             <div className="bg-black/30 backdrop-blur-md p-6 rounded-3xl border border-white/5 inline-block shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <p className="text-sm md:text-xl text-neutral-200 font-light leading-relaxed whitespace-pre-line text-center font-serif tracking-wide">
                    {t('pet_hero_sub')}
                </p>
             </div>
        </div>

        <div className="horizon-wrapper">
            <img className="img-responsive" src="https://openclipart.org/image/2400px/svg_to_png/26840/johnny-automatic-Cincinnati-Skyline.png" alt="Skyline" />
        </div>
      </div>
    </div>
  );
};

export default PetUniverseHero;
