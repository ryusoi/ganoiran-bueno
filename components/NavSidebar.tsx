import React, { useState } from 'react';
import { X, Sun, Moon, Share2, Mail, Instagram } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

interface NavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setPage: (page: any) => void;
  page: string;
  toggleTheme: () => void;
  isDark: boolean;
  onShare: () => void;
  onSubscribeSuccess: () => void;
}

const NavSidebar: React.FC<NavSidebarProps> = ({ isOpen, onClose, setPage, page, toggleTheme, isDark, onShare, onSubscribeSuccess }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useLanguage();

  const links = [
    { label: t('nav_home'), page: 'home' },
    { label: t('nav_shop'), page: 'shop' },
    { label: t('nav_extract'), page: 'extract' },
    { label: t('nav_skincare'), page: 'skincare' },
    { label: t('nav_pets'), page: 'pets' },
    { label: t('nav_decor'), page: 'decor' },
    { label: t('nav_about'), page: 'about' },
    { label: t('nav_contact'), page: 'contact' },
  ];

  const handleLinkClick = (targetPage: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(targetPage);
    onClose();
  };

  const handleShareClick = () => {
    onShare();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
        setSubscribed(true);
        onSubscribeSuccess();
    }
  };

  return (
    <>
      <style>{`
        @keyframes flow-shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .shining-line {
          background: linear-gradient(to right, #5e42a6, #b74e91, #5e42a6);
          background-size: 200% 100%;
          animation: flow-shine 3s linear infinite;
        }
      `}</style>

      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 left-0 z-[100] w-[85vw] md:w-[350px] bg-[#fcfbf9] dark:bg-[#312450] shadow-[0_0_60px_rgba(0,0,0,0.8)] transform transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1) flex flex-col border-r border-[#5e42a6]/30 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-8 flex items-center justify-between">
            <Logo className="h-10 opacity-90" textSize="text-lg" />
            <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-purple-950 dark:text-white group"
            >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col justify-center px-12 relative overflow-y-auto custom-scrollbar">
             {/* Decorative Background Logo */}
             <div className="absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none grayscale mix-blend-overlay">
                 <img src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/222.png" className="w-[350px]" alt="" />
             </div>

             <nav className="space-y-8 relative z-10 text-right">
               {links.map((link, idx) => {
                 const isActive = page === link.page;
                 return (
                    <button 
                        key={idx}
                        onClick={() => handleLinkClick(link.page)}
                        className="group relative block w-full text-right transition-all duration-300"
                    >
                        <span className={`font-monolith text-xs md:text-sm font-thin uppercase tracking-[0.4em] leading-loose transition-all duration-300 ${isActive ? 'text-purple-950 dark:text-white' : 'text-purple-900/40 dark:text-white/35 group-hover:text-purple-950 dark:group-hover:text-white/75'}`}>
                            {link.label}
                        </span>
                        
                        {/* Static Base Line */}
                        <span className={`absolute bottom-[-5px] left-0 w-full h-[2px] bg-purple-200 dark:bg-black/30 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-20'}`}></span>

                        {/* Active Shining Line */}
                        <span className={`absolute bottom-[-5px] left-0 w-full h-[2px] shining-line transition-all duration-500 transform ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></span>
                    </button>
                 );
               })}
             </nav>
        </div>

        {/* Footer */}
        <div className="p-8 bg-[#f3f4f6] dark:bg-[#2a1f45] border-t border-[#5e42a6]/20">
            <div className="mb-6 flex justify-end">
               <LanguageSwitcher className="opacity-80 hover:opacity-100 transition-opacity" />
            </div>

            {!subscribed ? (
                <form onSubmit={handleSubscribe} className="relative mb-6 group">
                    <input 
                        type="email" 
                        placeholder={t('nav_newsletter_placeholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-purple-300/50 dark:border-white/20 py-2 pr-8 text-[10px] text-purple-950 dark:text-white placeholder-purple-900/30 dark:placeholder-white/30 focus:outline-none focus:border-[#b74e91] transition-colors font-monolith tracking-wider"
                    />
                    <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-purple-900/40 dark:text-white/40 hover:text-[#b74e91] transition-colors">
                        <Mail className="w-3 h-3" />
                    </button>
                </form>
            ) : (
                <div className="mb-6 py-2 text-[#b74e91] text-[10px] font-bold font-monolith tracking-widest flex items-center justify-end gap-2 animate-fade-in">
                    <span>{t('nav_subscribed')}</span>
                </div>
            )}

            <div className="flex items-center justify-between text-purple-950/60 dark:text-white/40">
                <div className="flex gap-4">
                    <button onClick={toggleTheme} className="flex items-center gap-2 text-[10px] font-bold font-monolith tracking-widest hover:text-purple-950 dark:hover:text-white transition-colors">
                        {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                    </button>
                </div>

                <div className="flex gap-4">
                    <a href="https://instagram.com" target="_blank" className="hover:text-purple-950 dark:hover:text-white transition-colors"><Instagram className="w-4 h-4"/></a>
                    <button onClick={handleShareClick} className="hover:text-purple-950 dark:hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default NavSidebar;