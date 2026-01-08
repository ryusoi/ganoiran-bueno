
import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle, Mail, Globe, Send, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, url = "https://ganoiran.vercel.app" }) => {
  const [copied, setCopied] = useState(false);
  const qrImageUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoiran%20QR%20code.png";
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareSocial = (platform: string) => {
    const text = t('share_message_body');
    let link = "";
    switch(platform) {
        case 'whatsapp': link = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`; break;
        case 'telegram': link = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`; break;
        case 'email': link = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`; break;
        case 'facebook': link = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
        case 'linkedin': link = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break;
        case 'instagram': 
            navigator.clipboard.writeText(url);
            link = 'https://instagram.com'; 
            alert(t('share_insta_alert'));
            break;
        default: break;
    }
    if (link) window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
        <div className="relative w-full max-w-4xl bg-[#101014] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white z-20"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Left Side: Visual / QR */}
            <div className="w-full md:w-5/12 bg-gradient-to-br from-emerald-950 to-black p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden group min-h-[300px]">
                 {/* Decorative background elements */}
                 <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent"></div>
                 
                 <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl mb-6 transform transition-transform group-hover:scale-105 duration-500">
                    <img src={qrImageUrl} alt="QR Code" className="w-40 h-40 object-contain mix-blend-multiply" />
                 </div>
                 
                 <div className="text-center relative z-10">
                    <h3 className="text-white font-serif text-2xl mb-2">{t('brand_name')}</h3>
                    <div className="flex items-center gap-2 justify-center text-emerald-400 text-xs uppercase tracking-widest font-medium border border-emerald-500/30 px-3 py-1 rounded-full bg-emerald-900/20">
                         <Share2 className="w-3 h-3" />
                         <span>{t('qr_share')}</span>
                    </div>
                 </div>
            </div>

            {/* Right Side: Actions */}
            <div className="w-full md:w-7/12 p-8 md:p-10 bg-[#101014] flex flex-col justify-center overflow-y-auto custom-scrollbar">
                 <div className="mb-6">
                     <h2 className="text-3xl font-serif text-white mb-2">{t('qr_dashboard')}</h2>
                     <p className="text-neutral-400 text-sm leading-relaxed">
                        {t('qr_desc')}
                     </p>
                 </div>

                 {/* Copy Link Input */}
                 <div className="mb-6">
                     <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold mb-3 block">{t('qr_app_url')}</label>
                     <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 focus-within:border-emerald-500/50 transition-colors group">
                        <Globe className="w-5 h-5 text-neutral-500 ml-2 group-focus-within:text-emerald-500 transition-colors" />
                        <input 
                            type="text" 
                            value={url} 
                            readOnly 
                            className="bg-transparent border-none text-neutral-300 text-sm w-full focus:ring-0 px-2 font-mono"
                        />
                        <button 
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold ${copied ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-neutral-200'}`}
                        >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? t('qr_copied') : t('qr_copy')}
                        </button>
                     </div>
                 </div>

                 {/* Social Grid */}
                 <div>
                    <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold mb-3 block">{t('qr_quick')}</label>
                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                        {/* Instagram */}
                        <button onClick={() => shareSocial('instagram')} className="flex items-center justify-start gap-4 p-3 rounded-xl bg-pink-500/5 border border-pink-500/20 hover:bg-pink-500/10 transition-all group">
                             <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Instagram className="w-4 h-4 text-pink-500" />
                             </div>
                             <span className="text-neutral-300 text-sm font-medium">{t('social_instagram')}</span>
                        </button>

                        {/* Facebook */}
                        <button onClick={() => shareSocial('facebook')} className="flex items-center justify-start gap-4 p-3 rounded-xl bg-[#1877F2]/5 border border-[#1877F2]/20 hover:bg-[#1877F2]/10 transition-all group">
                             <div className="w-8 h-8 rounded-full bg-[#1877F2]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Facebook className="w-4 h-4 text-[#1877F2]" />
                             </div>
                             <span className="text-neutral-300 text-sm font-medium">{t('social_facebook')}</span>
                        </button>

                         {/* LinkedIn */}
                        <button onClick={() => shareSocial('linkedin')} className="flex items-center justify-start gap-4 p-3 rounded-xl bg-[#0A66C2]/5 border border-[#0A66C2]/20 hover:bg-[#0A66C2]/10 transition-all group">
                             <div className="w-8 h-8 rounded-full bg-[#0A66C2]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                             </div>
                             <span className="text-neutral-300 text-sm font-medium">{t('social_linkedin')}</span>
                        </button>

                        {/* WhatsApp */}
                        <button onClick={() => shareSocial('whatsapp')} className="flex items-center justify-start gap-4 p-3 rounded-xl bg-[#25D366]/5 border border-[#25D366]/20 hover:bg-[#25D366]/10 transition-all group">
                             <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                             </div>
                             <span className="text-neutral-300 text-sm font-medium">{t('social_whatsapp')}</span>
                        </button>
                        
                        {/* Telegram */}
                        <button onClick={() => shareSocial('telegram')} className="flex items-center justify-start gap-4 p-3 rounded-xl bg-[#0088cc]/5 border border-[#0088cc]/20 hover:bg-[#0088cc]/10 transition-all group">
                             <div className="w-8 h-8 rounded-full bg-[#0088cc]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Send className="w-4 h-4 text-[#0088cc]" />
                             </div>
                             <span className="text-neutral-300 text-sm font-medium">{t('social_telegram')}</span>
                        </button>
                        
                        {/* Email */}
                        <button onClick={() => shareSocial('email')} className="flex items-center justify-start gap-4 p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:bg-purple-500/10 transition-all group">
                             <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Mail className="w-4 h-4 text-purple-400" />
                             </div>
                             <span className="text-neutral-300 text-sm font-medium">{t('social_email_label')}</span>
                        </button>
                        
                        {/* More */}
                        <button onClick={() => navigator.clipboard.writeText(url)} className="flex items-center justify-start gap-4 p-3 rounded-xl bg-neutral-800/50 border border-neutral-700 hover:bg-neutral-800 transition-all group">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Share2 className="w-4 h-4 text-neutral-400" />
                             </div>
                             <span className="text-neutral-300 text-sm font-medium">{t('qr_more')}</span>
                        </button>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default QRCodeModal;
