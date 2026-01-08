
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Play, ChevronLeft, ChevronRight, Loader2, Film, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MediaItem {
  name: string;
  url: string;
  title: string;
  description: string;
  type: 'video' | 'image';
}

const ITEMS_PER_PAGE = 6;

const GanoMediaGallery: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchMedia = async () => {
      // IMPORTANT: If supabase is not initialized (missing keys), stop loading immediately
      if (!supabase) {
          console.warn("Supabase client not initialized. Hiding gallery.");
          setLoading(false);
          return;
      }

      try {
        const bucketName = 'GANO SHAKH MP4 LOW';
        // List files - limit increased to ensure we get all relevant media
        const { data, error } = await supabase.storage.from(bucketName).list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

        if (error) {
          console.error('Error fetching media list:', error);
          setLoading(false);
          return;
        }

        if (!data) {
            setLoading(false);
            return;
        }

        const items: MediaItem[] = data
          .filter(file => file.name !== '.emptyFolderPlaceholder' && file.metadata?.mimetype !== 'application/x-directory')
          .map(file => {
            const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(file.name);
            const cleanName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
            
            // Generate High Definition Dynamic Titles
            let title = cleanName
              .replace(/[-_]/g, ' ')
              .replace(/%20/g, ' ')
              .replace(/\(\d+\)/g, '') // Remove (1), (2) etc
              .trim();
            
            // Title Enhancement
            if (title.toLowerCase().includes('gano shakh')) title = "Gano Shakh: The Source";
            else if (title.toLowerCase().includes('nutripet')) title = "Gano Nutri-Pet Formula";
            else if (title.toLowerCase().includes('luna')) title = "Luna Night Repair";
            else if (title.toLowerCase().includes('sol')) title = "Sol Day Protection";
            else if (title.toLowerCase().includes('extract')) title = "Dual-Extraction Process";
            else if (title.toLowerCase().includes('biome')) title = "Reishi Biome Science";
            else if (title.toLowerCase().includes('cult')) title = "Log Cultivation Method";
            else title = title.charAt(0).toUpperCase() + title.slice(1);

            // Generate Professional Descriptions based on context
            let desc = "Experience the unparalleled purity of Iran's only log-cultivated Ganoderma Lucidum";
            const lower = cleanName.toLowerCase();
            
            if (lower.includes('luna')) desc = "Advanced dermatological night complex utilizing Reishi spores to accelerate cellular regeneration and collagen synthesis";
            else if (lower.includes('sol')) desc = "A potent day-gel formulation providing rapid dermal repair for burns, sun damage, and environmental stressors";
            else if (lower.includes('nutri')) desc = "Specialized veterinary longevity formula supporting immune modulation and joint health in companion animals";
            else if (lower.includes('extract')) desc = "Our proprietary dual-extraction technology isolates full-spectrum triterpenes and polysaccharides for maximum bioavailability";
            else if (lower.includes('farm') || lower.includes('grow') || lower.includes('cult')) desc = "Inside our Mazandaran facility: mimicking the natural hardwood forest environment to produce the highest density of bioactives";
            else if (lower.includes('decor')) desc = "Living fungal art: unique Reishi sculptures grown over 24 months, bringing the healing energy of nature into your space";
            else if (lower.includes('health')) desc = "Exploring the intersection of ancient fungal wisdom and modern clinical application for holistic wellness";
            else if (lower.includes('team')) desc = "Meet the dedicated mycologists and scientists behind the Gano Shakh revolution";

            return {
              name: file.name,
              url: urlData.publicUrl,
              title: title,
              description: desc,
              type: file.metadata?.mimetype?.startsWith('image') ? 'image' : 'video'
            };
          });

        setMediaItems(items);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const totalPages = Math.ceil(mediaItems.length / ITEMS_PER_PAGE);
  const currentItems = mediaItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setPlayingIndex(null); // Reset playing video on page change
      const el = document.getElementById('gallery-top');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return <div className="py-6 bg-[#0a0a0c]"></div>; 
  }

  if (mediaItems.length === 0) return null;

  return (
    <section id="gallery-top" className="py-6 bg-[#0a0a0c] relative overflow-hidden border-t border-white/5 text-center">
       {/* Compact Background accent */}
       <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-900/10 blur-[80px] rounded-full pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 animate-on-scroll fade-in">
             <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-900/20 backdrop-blur-md mb-2">
                  <Film className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-monolith font-thin">The Archives</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-2">
                Visualizing the Mycelial Network
             </h2>
             <p className="text-neutral-400 max-w-xl mx-auto font-thin text-xs leading-relaxed text-center">
                Exclusive high-definition footage of our cultivation process, product formulation, and the pristine environment of our Mazandaran facility
             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {currentItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group bg-[#151518] rounded-xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col"
                >
                   {/* Media Container */}
                   <div 
                      className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                      onClick={() => setPlayingIndex(playingIndex === idx ? null : idx)}
                   >
                      {playingIndex === idx ? (
                         <video 
                            src={item.url} 
                            className="w-full h-full object-cover" 
                            controls 
                            autoPlay 
                            playsInline
                         />
                      ) : (
                         <>
                            {item.type === 'video' ? (
                                <video 
                                src={item.url} 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105"
                                muted
                                playsInline
                                />
                            ) : (
                                <img 
                                src={item.url} 
                                alt={item.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105"
                                />
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all duration-300 shadow-xl group-hover:scale-110">
                                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                </div>
                            </div>
                         </>
                      )}
                      
                      {/* Overlay Title for quick glance */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-white text-xs font-thin font-monolith tracking-wide text-center">{item.title}</span>
                      </div>
                   </div>

                   {/* Content */}
                   <div className="p-4 flex flex-col flex-1 bg-[#151518] text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                          <h3 className="text-sm font-thin font-monolith text-white leading-snug group-hover:text-emerald-400 transition-colors text-center">
                             {item.title}
                          </h3>
                          <Sparkles className="w-3 h-3 text-emerald-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="h-px w-6 bg-white/10 mb-2 group-hover:w-full group-hover:bg-emerald-500/50 transition-all duration-500 mx-auto"></div>
                      <p className="text-[10px] text-neutral-400 font-thin leading-relaxed line-clamp-3 text-center">
                         {item.description}
                      </p>
                   </div>
                </div>
             ))}
          </div>

          {/* Pagination - Compact */}
          {totalPages > 1 && (
             <div className="flex items-center justify-center gap-3 mt-8">
                <button 
                   onClick={() => handlePageChange(currentPage - 1)}
                   disabled={currentPage === 1}
                   className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-emerald-600 hover:border-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                   <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="text-xs text-neutral-400 font-mono">
                    Page <span className="text-white">{currentPage}</span> of {totalPages}
                </span>

                <button 
                   onClick={() => handlePageChange(currentPage + 1)}
                   disabled={currentPage === totalPages}
                   className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-emerald-600 hover:border-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                   <ChevronRight className="w-4 h-4" />
                </button>
             </div>
          )}
       </div>
    </section>
  );
};

export default GanoMediaGallery;
