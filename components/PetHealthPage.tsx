
import React from 'react';
import PetUniverseHero from './PetUniverseHero';
import { 
  Activity, Moon, Zap, ShieldAlert, Heart, AlertTriangle, 
  Dog, Cat, ExternalLink
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PetHealthPage: React.FC<{ addToCart: (product: any) => void }> = ({ addToCart }) => {
  const { t } = useLanguage();
  
  const ganoNutriPet = {
      id: 'e6f7a8b9-c0d1-4ef2-95f3-567890123ef0',
      name: t('prod_nutripet_name'),
      price_rials: '6800000',
      image_url: 'media/nutripet.png',
      active: true,
      category: 'pets'
  };

  const silentCrisis = [
      {
          title: t('pet_crisis_1'),
          desc: t('pet_crisis_1_desc'),
          icon: <Activity className="w-6 h-6 text-red-400" />
      },
      {
          title: t('pet_crisis_2'),
          desc: t('pet_crisis_2_desc'),
          icon: <AlertTriangle className="w-6 h-6 text-amber-400" />
      },
      {
          title: t('pet_crisis_3'),
          desc: t('pet_crisis_3_desc'),
          icon: <Zap className="w-6 h-6 text-yellow-400" />
      },
      {
          title: t('pet_crisis_4'),
          desc: t('pet_crisis_4_desc'),
          icon: <Moon className="w-6 h-6 text-indigo-400" />
      },
      {
          title: t('pet_crisis_5'),
          desc: t('pet_crisis_5_desc'),
          icon: <ShieldAlert className="w-6 h-6 text-orange-400" />
      },
      {
          title: t('pet_crisis_6'),
          desc: t('pet_crisis_6_desc'),
          icon: <Activity className="w-6 h-6 text-pink-400" />
      },
      {
          title: t('pet_crisis_7'),
          desc: t('pet_crisis_7_desc'),
          icon: <AlertTriangle className="w-6 h-6 text-stone-400" />
      },
      {
          title: t('pet_crisis_8'),
          desc: t('pet_crisis_8_desc'),
          icon: <Activity className="w-6 h-6 text-green-400" />
      },
      {
          title: t('pet_crisis_9'),
          desc: t('pet_crisis_9_desc'),
          icon: <ShieldAlert className="w-6 h-6 text-red-600" />
      },
      {
          title: t('pet_crisis_10'),
          desc: t('pet_crisis_10_desc'),
          icon: <Heart className="w-6 h-6 text-purple-400" />
      },
      {
          title: t('pet_crisis_11'),
          desc: t('pet_crisis_11_desc'),
          icon: <Zap className="w-6 h-6 text-blue-400" />
      },
      {
          title: t('pet_crisis_12'),
          desc: t('pet_crisis_12_desc'),
          icon: <Moon className="w-6 h-6 text-teal-400" />
      }
  ];

  const dogDiseases = [
    t("pet_disease_cancer"), t("pet_disease_heart"), t("pet_disease_kidney"), t("pet_disease_liver"),
    t("pet_disease_diabetes"), t("pet_disease_obesity"), t("pet_disease_arthritis"), t("pet_disease_gi"), 
    t("pet_disease_autoimmune"), t("pet_disease_cushings"), t("pet_disease_infections"), t("pet_disease_epilepsy")
  ];

  const catDiseases = [
    t("pet_disease_kidney"), t("pet_disease_cancer"), t("pet_disease_hyperthyroidism"), t("pet_disease_diabetes"),
    t("pet_disease_heart"), t("pet_disease_urinary"), t("pet_disease_liver"), t("pet_disease_infections"),
    t("pet_disease_dental"), t("pet_disease_gi"), t("pet_disease_allergies"), t("pet_disease_cognitive")
  ];

  const globalPartners = [
      { name: "MycoDog", url: "https://mycodog.com" },
      { name: "Real Mushrooms", url: "https://www.realmushrooms.com/pet" },
      { name: "Host Defense", url: "https://hostdefense.com" },
      { name: "GOBA Guard", url: "https://goba.eu" },
      { name: "Mushrooms 4 Pets", url: "https://healthfulpets.co.uk" },
      { name: "Pet Wellbeing", url: "https://petwellbeing.co.uk" },
      { name: "Buddy & Lola", url: "https://www.petsathome.com" },
      { name: "NaturVet", url: "https://naturvet.com" },
      { name: "Hemp Heros", url: "https://hempheros.ie" },
      { name: "All Natural Pet", url: "https://allnaturalpet.co.uk" },
      { name: "Earth Buddy Pet", url: "https://earthbuddypet.com" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 font-sans transition-colors duration-500 text-center">
      
      <PetUniverseHero />

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             <div className="animate-on-scroll fade-in flex flex-col items-center text-center">
                <span className="text-emerald-500 font-monolith font-thin tracking-widest uppercase text-xs mb-4 block">{t('pet_vet_badge')}</span>
                <h2 className="text-3xl md:text-5xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-8 leading-tight animate-pulse break-words">
                   {t('pet_crisis_title')}
                </h2>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 text-center font-thin">
                   {t('pet_crisis_desc1')}
                </p>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 text-center font-thin">
                   {t('pet_crisis_desc2')}
                </p>
             </div>
             <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video group animate-on-scroll scale-in">
                <video 
                   src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Nutripet%20(1).mp4" 
                   className="w-full h-full object-cover"
                   autoPlay muted loop playsInline
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
             </div>
          </div>
      </section>

      <section className="bg-neutral-900 py-16 md:py-24 border-y border-neutral-800">
          <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl md:text-4xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome text-center mb-16">
                  {t('pet_12_title')}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {silentCrisis.map((item, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors animate-on-scroll fade-in flex flex-col items-center text-center group">
                          <div className="mb-4 p-3 bg-neutral-900 rounded-xl w-fit border border-white/20 group-hover:border-emerald-500/50 transition-colors">
                              {item.icon}
                          </div>
                          <h3 className="text-lg font-monolith font-thin text-white mb-2">{item.title}</h3>
                          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed text-center font-thin">
                              {item.desc}
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
             <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-xl animate-on-scroll slide-right flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                        <Dog className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-monolith font-thin text-neutral-900 dark:text-white text-chrome">{t('pet_dog_title')}</h3>
                </div>
                <ul className="space-y-3 w-full">
                    {dogDiseases.map((d, i) => (
                        <li key={i} className="flex items-center justify-center gap-3 text-neutral-600 dark:text-neutral-300 font-thin text-sm">
                            <span className="text-red-500 mt-1">•</span>
                            {d}
                        </li>
                    ))}
                </ul>
             </div>

             <div className="flex flex-col gap-8">
                 <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video group animate-on-scroll scale-in">
                    <video 
                       src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Biome.mp4" 
                       className="w-full h-full object-cover"
                       autoPlay muted loop playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-8">
                        <p className="text-white font-monolith font-thin text-lg md:text-xl text-center">{t('pet_micro_title')}</p>
                    </div>
                 </div>
                 <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-500/20 text-center">
                    <h4 className="text-lg md:text-xl font-thin font-monolith text-emerald-800 dark:text-emerald-400 mb-4">{t('pet_sol_title')}</h4>
                    <p className="text-emerald-900/80 dark:text-emerald-200/80 text-center text-sm md:text-base font-thin">
                        {t('pet_micro_desc')}
                    </p>
                 </div>
             </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
             <div className="flex flex-col gap-8 order-2 lg:order-1">
                 <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video group animate-on-scroll scale-in">
                    <video 
                       src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Nutripet.mp4" 
                       className="w-full h-full object-cover"
                       autoPlay muted loop playsInline
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-8">
                        <p className="text-white font-monolith font-thin text-lg md:text-xl text-center">{t('pet_vitality')}</p>
                    </div>
                 </div>
             </div>

             <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-xl order-1 lg:order-2 animate-on-scroll slide-left flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400">
                        <Cat className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-monolith font-thin text-neutral-900 dark:text-white text-chrome">{t('pet_cat_title')}</h3>
                </div>
                <ul className="space-y-3 w-full">
                    {catDiseases.map((d, i) => (
                        <li key={i} className="flex items-center justify-center gap-3 text-neutral-600 dark:text-neutral-300 font-thin text-sm">
                            <span className="text-red-500 mt-1">•</span>
                            {d}
                        </li>
                    ))}
                </ul>
             </div>
          </div>
      </section>

      <section className="bg-neutral-900 py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
              <video 
                  src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Nutripet%20Gano.mp4" 
                  className="w-full h-full object-cover"
                  autoPlay muted loop playsInline
              />
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-7xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-8 text-center">{t('pet_cta_title')}</h2>
              <p className="text-lg md:text-xl text-white/90 mb-12 font-thin text-center">
                  {t('pet_cta_desc')}
              </p>
              <button 
                onClick={() => addToCart(ganoNutriPet)}
                className="px-10 py-5 bg-white text-black rounded-full font-monolith font-thin text-base md:text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                {t('feat_add')}
              </button>
          </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-monolith font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-[0_0_30px_rgba(100,100,255,0.4)] text-chrome mb-4 text-center">{t('pet_global_title')}</h2>
              <p className="text-neutral-500 text-center font-thin">{t('pet_global_sub')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {globalPartners.map((partner, idx) => (
                  <a 
                    key={idx}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-emerald-500 transition-colors group"
                  >
                      <span className="font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mx-auto font-monolith text-xs md:text-sm font-thin">
                          {partner.name}
                      </span>
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-neutral-400 group-hover:text-emerald-500" />
                  </a>
              ))}
          </div>
      </section>

    </div>
  );
};

export default PetHealthPage;
