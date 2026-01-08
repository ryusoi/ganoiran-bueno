import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { STORAGE_URL } from '../data';

const VisualArchive: React.FC = () => {
  const { t } = useLanguage();
  const videos = [
    { title: t('vid_health'), url: `${STORAGE_URL}/Gano%20Health.mp4` },
    { title: t('vid_process'), url: `${STORAGE_URL}/Gano%20Shakh%20(2).mp4` },
    { title: t('vid_log'), url: `${STORAGE_URL}/Gano%20Shakh%20Log.mp4` },
    { title: t('vid_nutri'), url: `${STORAGE_URL}/Nutripet%20Gano.mp4` },
    { title: t('vid_biome'), url: `${STORAGE_URL}/Reishi%20Biome%20(2).mp4` },
    { title: t('vid_team'), url: `${STORAGE_URL}/Team%20Sales.mp4` },
  ];

  const safePlay = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => { });
    }
  };

  return (
    <section className="py-10 bg-[#0a0a0c] relative overflow-hidden text-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6 animate-on-scroll fade-in">
          <h2 className="text-3xl md:text-4xl font-monolith mb-2 bg-gradient-to-b from-yellow-100 via-yellow-300 to-yellow-600 bg-clip-text text-transparent drop-shadow-md text-gold-chrome">{t('visual_title')}</h2>
          <p className="text-neutral-400 text-sm text-center">{t('visual_desc')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((vid, idx) => (
            <div key={idx} className={`group relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-neutral-900 animate-on-scroll card-reveal stagger-${(idx % 3) + 1}`}>
              <video 
                src={vid.url} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                muted
                loop
                playsInline
                onMouseOver={safePlay}
                onMouseOut={e => e.currentTarget.pause()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none p-4 flex flex-col justify-end items-center">
                <h3 className="text-sm font-monolith font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center">
                  {vid.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualArchive;