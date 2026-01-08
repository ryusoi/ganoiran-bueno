import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveUrl } from '../data';

interface MediaGalleryProps {
  media: string[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
        if (media.length > 1) {
          setCurrentIndex((prev) => (prev + 1) % media.length);
        }
    }, 6000);
    return () => clearInterval(interval);
  }, [media.length]);

  const currentMedia = media[currentIndex];
  const isVideo = currentMedia?.match(/\.(mp4|webm|mov)$/i);

  if (!currentMedia) return null;

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-neutral-100 dark:bg-neutral-800 rounded-3xl overflow-hidden group">
      {isVideo ? (
        <video
          key={currentMedia}
          src={resolveUrl(currentMedia)}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img 
          src={resolveUrl(currentMedia)} 
          alt="Product gallery" 
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out scale-105 group-hover:scale-110" 
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none"></div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {media.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>

      <button 
        onClick={() => setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % media.length)}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MediaGallery;