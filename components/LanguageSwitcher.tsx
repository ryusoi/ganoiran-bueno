
import React, { useState } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Globe, Check } from 'lucide-react';

const flags: Record<Language, string> = {
  en: "https://flagcdn.com/w40/gb.png",
  fa: "https://flagcdn.com/w40/ir.png",
  es: "https://flagcdn.com/w40/es.png",
  ar: "https://flagcdn.com/w40/sa.png",
  tr: "https://flagcdn.com/w40/tr.png",
  it: "https://flagcdn.com/w40/it.png"
};

const labels: Record<Language, string> = {
  en: "English",
  fa: "فارسی",
  es: "Español",
  ar: "العربية",
  tr: "Türkçe",
  it: "Italiano"
};

const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative z-50 ${className}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
      >
        <img 
            src={flags[language]} 
            alt={language} 
            className="w-5 h-5 rounded-full object-cover shadow-sm"
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl z-50 py-1 overflow-hidden animate-fade-in">
            {(Object.keys(flags) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors ${language === lang ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'text-neutral-700 dark:text-neutral-300'}`}
              >
                <div className="flex items-center gap-3">
                    <img src={flags[lang]} alt={lang} className="w-4 h-4 rounded-full object-cover" />
                    <span>{labels[lang]}</span>
                </div>
                {language === lang && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
