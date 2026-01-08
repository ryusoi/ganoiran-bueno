
import React, { useState, useRef, useEffect } from 'react';
import { chatWithMycoDoc } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Send, Mic, Brain, Heart, Activity, FileText, Copy, Trash2, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    VANTA: any;
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const MycoDocIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="white" stroke="#5E6AD2" strokeWidth="4"/>
    <path d="M10 50 C10 20 20 10 50 10 C80 10 90 20 90 50" stroke="#5E6AD2" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="10" cy="50" r="8" fill="#5E6AD2"/>
    <circle cx="90" cy="50" r="8" fill="#5E6AD2"/>
    <path d="M90 50 Q90 85 60 85" stroke="#5E6AD2" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="60" cy="85" r="5" fill="#5E6AD2"/>
    <rect x="25" y="35" width="50" height="25" rx="12" fill="#101014"/>
    <circle cx="40" cy="47" r="4" fill="#00ffff" className="animate-pulse"/>
    <circle cx="60" cy="47" r="4" fill="#00ffff" className="animate-pulse delay-75"/>
    <path d="M42 70 Q50 75 58 70" stroke="#101014" strokeWidth="3" strokeLinecap="round"/>
    <rect x="46" y="18" width="8" height="8" fill="#5E6AD2"/>
  </svg>
);

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  // Strip out hashtags (#) and horizontal rules (---) before processing
  const cleanedText = text.replace(/#/g, '').replace(/---/g, '');
  
  const parts = cleanedText.split('\n');
  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        if (part.trim().startsWith('- ') || part.trim().startsWith('* ')) {
          const content = part.trim().substring(2);
          return (
            <div key={i} className="flex gap-2 ml-2">
              <span className="text-[#5E6AD2] mt-1.5">•</span>
              <p className="flex-1" dangerouslySetInnerHTML={{ __html: parseBold(content) }} />
            </div>
          );
        }
        if (!part.trim()) return <div key={i} className="h-2" />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: parseBold(part) }} />;
      })}
    </div>
  );
};

const parseBold = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<b class="text-white font-bold">$1</b>');
};

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const startTextRef = useRef<string>(''); // Ref to store text before speaking starts
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isOpen && !vantaEffect && window.VANTA && vantaRef.current) {
      try {
          const effect = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x5E6AD2,
            backgroundColor: 0x101014,
            points: 12.00,
            maxDistance: 23.00,
            spacing: 18.00
          });
          setVantaEffect(effect);
      } catch (e) {
          console.error("Vanta init failed", e);
      }
    }
    return () => {
      if (vantaEffect && !isOpen) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, [isOpen]);

  useEffect(() => {
     if (!isOpen && vantaEffect) {
         vantaEffect.destroy();
         setVantaEffect(null);
     }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      
      recognition.continuous = false; // Keep false to process sentence by sentence
      recognition.interimResults = true; // KEY: Allows real-time display of speech
      
      // Map current app language to speech recognition language codes
      const langMap: Record<string, string> = {
        'en': 'en-US',
        'fa': 'fa-IR',
        'es': 'es-ES',
        'ar': 'ar-SA',
        'tr': 'tr-TR',
        'it': 'it-IT'
      };
      recognition.lang = langMap[language] || 'en-US';

      // Store the current input text so we append to it, rather than overwrite
      startTextRef.current = input;

      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
           alert(t('chat_mic_error'));
        }
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        // Iterate through results to handle interim updates properly
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        
        // Append transcribed text to the text that existed before speaking started
        const spacer = startTextRef.current && !startTextRef.current.endsWith(' ') ? ' ' : '';
        setInput(startTextRef.current + spacer + transcript);
      };

      try {
        recognition.start();
      } catch (err) {
        console.error("Failed to start recognition:", err);
        setIsListening(false);
      }
    } else {
      alert(t('chat_no_voice'));
    }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { 
        role: 'user', 
        text: textToSend, 
        timestamp: Date.now() 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => {
        const parts: any[] = [{ text: m.text }];
        return {
            role: m.role,
            parts
        };
    });

    try {
        // Pass null for image since attachments are removed
        const responseText = await chatWithMycoDoc(textToSend, null, history);
        
        const botMsg: ChatMessage = { role: 'model', text: responseText || t('chat_consulting'), timestamp: Date.now() };
        setMessages(prev => [...prev, botMsg]);
    } catch (e) {
        const errorMsg: ChatMessage = { role: 'model', text: t('chat_error'), timestamp: Date.now() };
        setMessages(prev => [...prev, errorMsg]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDelete = (index: number) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  const prompts = [
    {
      title: t('proto_weight_title'),
      desc: t('proto_weight_desc'),
      icon: <Activity className="w-5 h-5 text-[#5E6AD2]" />,
      query: t('proto_weight_query')
    },
    {
      title: t('proto_skin_title'),
      desc: t('proto_skin_desc'),
      icon: <Heart className="w-5 h-5 text-[#5E6AD2]" />,
      query: t('proto_skin_query')
    },
    {
      title: t('proto_cancer_title'),
      desc: t('proto_cancer_desc'),
      icon: <Activity className="w-5 h-5 text-[#5E6AD2]" />,
      query: t('proto_cancer_query')
    },
    {
      title: t('proto_brain_title'),
      desc: t('proto_brain_desc'),
      icon: <Brain className="w-5 h-5 text-[#5E6AD2]" />,
      query: t('proto_brain_query')
    }
  ];

  return (
    <>
      {!isOpen && (
        <button 
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full shadow-[0_0_40px_rgba(94,106,210,0.6)] hover:scale-110 transition-all duration-300 group bg-white p-2 border-2 border-[#5E6AD2]"
        >
          <div className="w-full h-full relative">
             <MycoDocIcon />
             <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b95ea] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#5E6AD2]"></span>
             </span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#101014] text-white font-sans animate-fade-in">
          
          <div ref={vantaRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[#5E6AD2] opacity-10 blur-[100px] rounded-full pointer-events-none z-0"></div>

          <header className="relative z-20 px-6 py-4 flex items-center border-b border-white/10 bg-[#101014]/80 backdrop-blur-md">
            <button onClick={onClose} className="mr-4 text-gray-400 hover:text-white transition-colors">
               <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5E6AD2] animate-pulse"></div>
                <h1 className="text-lg font-medium tracking-wide">{t('chat_title')} <span className="text-[#5E6AD2] text-xs uppercase ml-2 border border-[#5E6AD2]/30 px-2 py-0.5 rounded">{t('chat_ai')}</span></h1>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <button 
                onClick={() => setMessages([])}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title={t('chat_new_tooltip')}
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>
          </header>

          <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-6 pb-32">
            {messages.length === 0 ? (
              <div className="max-w-4xl mx-auto mt-10">
                <div className="text-center mb-16 animate-fade-in">
                   <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#5E6AD2] to-[#2a3266] flex items-center justify-center shadow-[0_0_40px_rgba(94,106,210,0.4)] p-4 border-4 border-[#101014]">
                      <MycoDocIcon />
                   </div>
                   <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                      {t('chat_welcome')}
                   </h1>
                   <p className="text-gray-400 max-w-lg mx-auto text-lg font-light">
                      {t('chat_subtitle')}
                   </p>
                </div>

                <div className="mb-12">
                   <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-1 text-center">{t('chat_protocols')}</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {prompts.map((prompt, idx) => (
                         <div 
                           key={idx}
                           onClick={() => handleSend(prompt.query)}
                           className="bg-[#1E1E26]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-[#5E6AD2] hover:bg-[#5E6AD2]/5 cursor-pointer transition-all duration-300 group"
                         >
                            <div className="flex flex-col items-center text-center">
                               <div className="w-10 h-10 rounded-lg bg-[#5E6AD2]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mb-3">
                                  {prompt.icon}
                                </div>
                               <div>
                                  <h3 className="font-medium mb-1 text-gray-100 group-hover:text-[#5E6AD2] transition-colors">{prompt.title}</h3>
                                  <p className="text-sm text-gray-400 leading-relaxed">{prompt.desc}</p>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-8 py-8">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in group relative`}>
                     {msg.role === 'model' && (
                        <div className="w-12 h-12 rounded-full bg-[#5E6AD2] flex items-center justify-center mr-4 mt-1 shadow-lg shrink-0 overflow-hidden border-2 border-white/10">
                           <MycoDocIcon />
                        </div>
                     )}

                     <div className={`max-w-[85%] rounded-2xl p-6 relative ${
                        msg.role === 'user' 
                           ? 'bg-[#5E6AD2] text-white rounded-tr-sm shadow-lg' 
                           : 'bg-[#1E1E26] border border-white/10 text-gray-200 rounded-tl-sm shadow-xl'
                     }`}>
                        <div className={`absolute -top-3 ${msg.role === 'user' ? 'left-0' : 'right-0'} flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                            <button 
                                onClick={() => handleCopy(msg.text)}
                                className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/60 transition-colors border border-white/10"
                            >
                                <Copy className="w-3 h-3" />
                            </button>
                            <button 
                                onClick={() => handleDelete(idx)}
                                className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/70 hover:text-red-400 hover:bg-black/60 transition-colors border border-white/10"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                        
                        {msg.image && (
                            <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
                                <img src={msg.image} alt="Upload" className="max-w-full max-h-[300px] object-cover" />
                            </div>
                        )}

                        <div className="leading-relaxed text-[15px]">
                            {msg.role === 'user' ? msg.text : <FormattedText text={msg.text} />}
                        </div>
                     </div>

                     {msg.role === 'user' && (
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ml-4 mt-1 shadow-lg shrink-0">
                           <div className="text-sm font-bold text-white">{t('chat_you')}</div>
                        </div>
                     )}
                  </div>
                ))}
                
                {isLoading && (
                   <div className="flex justify-start animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-[#5E6AD2]/50 mr-4 shrink-0"></div>
                      <div className="bg-[#1E1E26] border border-white/10 p-6 rounded-2xl rounded-tl-sm w-48 h-20 flex items-center gap-2">
                         <span className="w-2 h-2 bg-[#5E6AD2] rounded-full animate-bounce"></span>
                         <span className="w-2 h-2 bg-[#5E6AD2] rounded-full animate-bounce delay-100"></span>
                         <span className="w-2 h-2 bg-[#5E6AD2] rounded-full animate-bounce delay-200"></span>
                      </div>
                   </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </main>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#101014] border-t border-white/10 z-30">
             <div className="max-w-5xl mx-auto">
                <div className="bg-[#1E1E26] border border-white/10 rounded-xl p-3 shadow-2xl focus-within:border-[#5E6AD2] transition-colors relative">
                   <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                         if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                         }
                      }}
                      className="w-full bg-transparent outline-none resize-none text-gray-200 placeholder-gray-500 font-light text-base pl-2 pt-1" 
                      placeholder={t('chat_input')}
                      rows={2}
                   />
                   
                   <div className="flex justify-between items-center mt-3 px-2">
                      <div className="flex space-x-2">
                         <button 
                            onClick={toggleListening}
                            className={`p-2 rounded hover:bg-white/5 transition-colors ${isListening ? 'text-red-500 animate-pulse bg-red-500/10' : 'text-gray-400 hover:text-white'}`}
                            title={`Voice Input (${language})`}
                         >
                            <Mic className="w-5 h-5" />
                         </button>
                      </div>
                      <button 
                         onClick={() => handleSend()}
                         disabled={(!input.trim()) || isLoading}
                         className="bg-[#5E6AD2] hover:bg-[#4b56a8] disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-6 rounded-lg flex items-center transition-all shadow-lg hover:shadow-[#5E6AD2]/25 font-medium"
                      >
                         <span>{t('chat_send')}</span>
                         {isLoading ? <Loader2 className="w-4 h-4 ml-2 animate-spin" /> : <Send className="w-4 h-4 ml-2" />}
                      </button>
                   </div>
                </div>
                <p className="text-center text-gray-600 text-[10px] mt-3">{t('chat_disclaimer')}</p>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
