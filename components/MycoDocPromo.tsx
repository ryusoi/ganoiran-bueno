
import React from 'react';
import { Bot, Sparkles, Brain, HeartPulse, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MycoDocPromoProps {
    onOpenChat: () => void;
}

const MycoDocPromo: React.FC<MycoDocPromoProps> = ({ onOpenChat }) => {
    const { t } = useLanguage();
    return (
        <section className="relative py-6 bg-neutral-900 overflow-hidden border-t border-b border-neutral-800">
            {/* Ambient Background Glow - Reduced size */}
            <div className="absolute top-1/2 left-1/4 w-[150px] h-[150px] bg-[#5E6AD2] opacity-10 blur-[50px] rounded-full pointer-events-none -translate-y-1/2"></div>
            
            <div className="max-w-4xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-4 items-center">
                <div className="order-2 md:order-1 animate-on-scroll fade-in flex flex-col items-center md:items-center text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#5E6AD2]/10 border border-[#5E6AD2]/30 text-[#8b95ea] text-[9px] font-bold tracking-widest uppercase mb-2 backdrop-blur-sm">
                        <Bot className="w-3 h-3" />
                        <span>{t('md_badge')}</span>
                    </div>

                    <h2 className="text-2xl font-serif text-white mb-1.5 leading-tight whitespace-pre-line">
                        {t('md_title')}
                    </h2>
                    
                    <p className="text-neutral-400 text-xs leading-relaxed mb-3 font-light max-w-sm mx-auto">
                        {t('md_desc')}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={onOpenChat}
                            className="group relative px-5 py-2 bg-[#5E6AD2] text-white font-bold rounded-lg overflow-hidden shadow-[0_0_20px_rgba(94,106,210,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(94,106,210,0.4)] active:scale-95"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <span className="flex items-center gap-2 text-xs md:text-sm">
                                {t('md_btn')} <Brain className="w-3.5 h-3.5" />
                            </span>
                        </button>
                    </div>
                    
                    {/* Chips - Compact */}
                    <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-3 justify-center text-[9px] text-neutral-500 font-medium w-full">
                        <div className="flex items-center gap-1.5">
                            <HeartPulse className="w-3 h-3 text-emerald-500" />
                            <span>{t('md_cell')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>{t('md_science')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Activity className="w-3 h-3 text-[#5E6AD2]" />
                            <span>{t('md_analysis')}</span>
                        </div>
                    </div>
                </div>

                <div className="order-1 md:order-2 flex justify-center relative animate-on-scroll scale-in">
                    {/* Visual of the Bot/Interface - Reduced Size */}
                    <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
                        {/* Orbit rings */}
                        <div className="absolute inset-0 border border-[#5E6AD2]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute inset-3 border border-[#5E6AD2]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                        
                        {/* Custom Robot Icon Large - Using standard animate-float class */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
                             <svg width="70%" height="70%" viewBox="0 0 100 100" fill="none" className="drop-shadow-[0_0_30px_rgba(94,106,210,0.3)]">
                                <circle cx="50" cy="50" r="45" fill="white" stroke="#5E6AD2" strokeWidth="1.5"/>
                                <path d="M10 50 C10 20 20 10 50 10 C80 10 90 20 90 50" stroke="#5E6AD2" strokeWidth="4" strokeLinecap="round"/>
                                <circle cx="10" cy="50" r="6" fill="#5E6AD2"/>
                                <circle cx="90" cy="50" r="6" fill="#5E6AD2"/>
                                <path d="M90 50 Q90 85 60 85" stroke="#5E6AD2" strokeWidth="3" strokeLinecap="round"/>
                                <circle cx="60" cy="85" r="4" fill="#5E6AD2"/>
                                
                                {/* Screen Face */}
                                <rect x="25" y="35" width="50" height="25" rx="12" fill="#101014"/>
                                
                                {/* Eyes with blinking animation */}
                                <circle cx="40" cy="47" r="4" fill="#00ffff" className="animate-pulse">
                                    <animate attributeName="opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="60" cy="47" r="4" fill="#00ffff" className="animate-pulse">
                                    <animate attributeName="opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite" />
                                </circle>

                                {/* Smile */}
                                <path d="M42 70 Q50 75 58 70" stroke="#101014" strokeWidth="2" strokeLinecap="round"/>
                                
                                {/* Medical Cross */}
                                <rect x="46" y="18" width="8" height="8" fill="#5E6AD2"/>
                                <rect x="42" y="22" width="16" height="0" stroke="#5E6AD2" strokeWidth="0"/>
                             </svg>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
}

export default MycoDocPromo;
