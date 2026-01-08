
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CultivationVideoProps {
    onOpenChat: () => void;
}

const CultivationVideo: React.FC<CultivationVideoProps> = ({ onOpenChat }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Default to muted for background autoplay
  const { t } = useLanguage();

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Attempt autoplay
    video.play().catch(e => console.log("Autoplay blocked", e));
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-20 border-t border-white/5 text-center">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
            <video
                ref={videoRef}
                src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Cult..mp4"
                className="w-full h-full object-cover opacity-60"
                playsInline
                loop
                muted={isMuted}
                autoPlay
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex flex-col items-center justify-center">
            
            {/* Cultivation Info - Centered */}
            <div className="text-center animate-on-scroll fade-in flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-900/20 backdrop-blur-md mb-4">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-monolith font-thin">{t('cult_farm')}</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-6 leading-tight text-center">
                    {t('cult_title')}
                </h2>
                
                <p className="text-neutral-200 text-lg leading-relaxed font-thin mb-8 max-w-xl mx-auto text-center">
                    {t('cult_desc')}
                </p>

                {/* Log Grown Badge/Info */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl inline-block text-center hover:bg-white/10 transition-colors">
                    <h3 className="text-2xl font-monolith font-thin text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 mb-2 text-center">
                        {t('cult_log')}
                    </h3>
                    <p className="text-neutral-300 text-xs leading-relaxed font-thin text-center">
                        {t('cult_log_desc')}
                    </p>
                </div>
            </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-6 left-6 flex gap-3 z-20">
             <button 
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors text-white"
             >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
             </button>
             
             <button 
                onClick={toggleMute}
                className="p-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors text-white"
             >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
             </button>
        </div>
    </section>
  );
};

export default CultivationVideo;
