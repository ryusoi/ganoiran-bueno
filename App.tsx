
import React, { useState, useEffect, useMemo, Suspense, lazy, useRef, ReactNode } from 'react';
import { products as initialProducts, resolveUrl, formatPrice, STORAGE_URL } from './data';
import { Product } from './types';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import ChatBot from './components/ChatBot';
import AboutContent from './components/AboutContent'; 
import LoginModal from './components/LoginModal';
import CouponPopup from './components/CouponPopup';
import NavSidebar from './components/NavSidebar'; 
import QRCodeModal from './components/QRCodeModal'; 
import Logo from './components/Logo'; 
import SkincarePage from './components/SkincarePage'; 
import PetHealthPage from './components/PetHealthPage'; 
import ExtractPage from './components/ExtractPage';
import ReishiDecorPage from './components/ReishiDecorPage';
import ProductDetail from './components/ProductDetail';
import ContactPage from './components/ContactPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import Preloader from './components/Preloader';
import AdvancedHero from './components/AdvancedHero'; // Keep eager for LCP
import ProductGrid from './components/ProductGrid';
import SporeFooter from './components/SporeFooter';
import SocialProofBubble from './components/SocialProofBubble';
import { useLanguage } from './contexts/LanguageContext';
import { 
  ShoppingBag, Menu, X, Plus, Minus, Users, Map, ChevronUp, ChevronDown, Share2, Sun, Moon
} from 'lucide-react';

// Lazy Load Below-the-Fold Components
const CollectionParallax = lazy(() => import('./components/CollectionParallax'));
const GanoMediaGallery = lazy(() => import('./components/GanoMediaGallery'));
const CultivationVideo = lazy(() => import('./components/CultivationVideo'));
const TeaRitual = lazy(() => import('./components/TeaRitual'));
const InstagramInvite = lazy(() => import('./components/InstagramInvite'));
const LazyMycoPulseSection = lazy(() => import('./components/MycoPulseSection'));
const LazyCoffeeTeaCube = lazy(() => import('./components/CoffeeTeaCube'));

// --- Types ---
type Page = 'home' | 'shop' | 'about' | 'contact' | 'product_detail' | 'skincare' | 'pets' | 'extract' | 'decor';

// --- Helper Functions ---
const inferCategory = (name: string): Product['category'] => {
  const n = name.toLowerCase();
  if (n.includes('luna') || n.includes('sol') || n.includes('skin') || n.includes('cream') || n.includes('gel')) return 'skincare';
  if (n.includes('pet') || n.includes('animal')) return 'pets';
  if (n.includes('decor')) return 'decor';
  return 'supplement';
};

// Map static IDs to translation prefixes
const PRODUCT_KEYS: Record<string, string> = {
  'a1b2c3d4-e5f6-47a8-91b0-1234567890ab': 'prod_reishi',
  'b2c3d4e5-f6a7-48b9-92c1-2345678901bc': 'prod_extract',
  'c3d4e5f6-a7b8-49ca-93d2-3456789012cd': 'prod_luna',
  'd4e5f6a7-b8c9-4adb-94e3-4567890123de': 'prod_sol',
  'e6f7a8b9-c0d1-4ef2-95f3-567890123ef0': 'prod_nutripet', 
};

// --- Custom Hook for Scroll Animations ---
const useScrollAnimation = (dependencies: any[] = []) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe elements
    const observeElements = () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    };

    // Immediate attempt
    observeElements();
    
    // Retry after small delay to catch dynamic content
    const timeoutId = setTimeout(observeElements, 100);

    // FAILSAFE: Force elements to be visible after 1 second if animation didn't trigger
    const failsafeId = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animate');
      });
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      clearTimeout(failsafeId);
    };
  }, dependencies);
};

const LazySection: React.FC<{
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
  intrinsicSize?: string;
}> = ({ children, fallback, rootMargin = '350px 0px', intrinsicSize = '900px' }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || shouldRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <section
      ref={sectionRef}
      style={{ contentVisibility: 'auto', containIntrinsicSize: intrinsicSize }}
    >
      {shouldRender ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </section>
  );
};

// --- Sub-Components ---

// --- HEADER ---
const Header: React.FC<{ 
  toggleCart: () => void; 
  toggleNav: () => void;
  cartCount: number; 
  setPage: (p: Page) => void;
  onOpenLogin: () => void;
  user: User | null;
  transparent?: boolean;
  isDark: boolean;
  toggleTheme: () => void;
}> = ({ toggleCart, toggleNav, cartCount, setPage, onOpenLogin, user, transparent, isDark, toggleTheme }) => {
  const { t } = useLanguage();
  
  const getUserName = () => {
    if (!user || !user.displayName) return '';
    const name = user.displayName.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <header className={`fixed z-50 top-0 left-0 right-0 transition-colors duration-300 h-20 ${transparent ? 'bg-transparent text-white' : 'bg-[#F9FAFB]/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left: Brand or Mobile Menu */}
        <div className="flex items-center gap-4">
          <button onClick={toggleNav} className={`p-2 rounded-full transition-colors ${transparent ? 'hover:bg-white/10 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800 text-purple-950 dark:text-white'}`}>
            <Menu className="w-6 h-6" />
          </button>
          
          <button onClick={() => setPage('home')} className="flex items-center gap-3 group">
              <Logo className="h-16 w-auto" textSize="text-xl md:text-2xl" />
          </button>
        </div>
        
        {/* Desktop Nav */}
        <nav className={`hidden lg:flex items-center gap-8 text-sm font-medium ${transparent ? 'text-white/80 hover:text-white' : 'text-purple-950 dark:text-neutral-300'}`}>
          <button onClick={() => setPage('home')} className="hover:text-emerald-500 transition">{t('nav_home')}</button>
          <button onClick={() => setPage('shop')} className="hover:text-emerald-500 transition">{t('nav_shop')}</button>
          <button onClick={() => setPage('skincare')} className="hover:text-emerald-500 transition">{t('nav_skincare')}</button>
          <button onClick={() => setPage('pets')} className="hover:text-emerald-500 transition">{t('nav_pets')}</button>
          <button onClick={() => setPage('about')} className="hover:text-emerald-500 transition">{t('nav_about')}</button>
        </nav>

        {/* Right: User & Cart */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`hidden md:flex relative h-6 w-12 rounded-full transition-colors duration-300 focus:outline-none ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
            >
              {isDark ? <Moon size={10} className="text-black" /> : <Sun size={10} className="text-amber-500" />}
            </span>
          </button>

          <LanguageSwitcher />

          {user && user.displayName ? (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide">
                {getUserName()}
              </span>
            </div>
          ) : (
             <button 
                onClick={onOpenLogin} 
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all group ${transparent ? 'border-white/30 hover:bg-white/10 text-white' : 'border-neutral-300 dark:border-neutral-700 hover:border-emerald-500/50 hover:bg-neutral-100 dark:hover:bg-white/5'}`}
             >
                <div className={`w-1.5 h-1.5 rounded-full border transition-colors ${transparent ? 'border-white' : 'border-neutral-400 dark:border-neutral-500 group-hover:border-emerald-500'}`}></div>
                <span className={`text-[10px] uppercase tracking-widest font-medium ${transparent ? 'text-white' : 'text-purple-950 dark:text-neutral-400 group-hover:text-purple-950 dark:group-hover:text-white'}`}>
                    {t('nav_guest')}
                </span>
            </button>
          )}

          <button onClick={toggleCart} className={`p-2 rounded-full transition-colors relative ${transparent ? 'hover:bg-white/10 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-800 text-purple-950 dark:text-white'}`}>
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

const TrustBar = () => {
    const { t } = useLanguage();
    return (
      <section className="border-t border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 py-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 text-center animate-on-scroll blur-slide">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <span className="text-xl md:text-2xl font-serif italic text-purple-950 dark:text-white">{t('trust_restore')}</span>
            <img src={`${STORAGE_URL}/Gano%20Shakh%20Antler%20and%20Conks.jpg`} className="w-10 h-7 object-cover rounded-lg -rotate-6 shadow-xl ring-2 ring-white dark:ring-neutral-800" alt="Extract" />
            <span className="text-xl md:text-2xl font-serif italic text-purple-950 dark:text-white">{t('trust_love')}</span>
            <img src={`${STORAGE_URL}/Gano%20Shakh%20Grow%20room.jpg`} className="w-10 h-7 object-cover rounded-lg rotate-6 shadow-xl ring-2 ring-white dark:ring-neutral-800" alt="Mushroom" />
            <span className="text-xl md:text-2xl font-serif italic text-purple-950 dark:text-white">{t('trust_renew')}</span>
          </div>
        </div>
      </section>
    );
};

const Footer: React.FC<{ setPage: (p: Page) => void, onShare: () => void, isDark: boolean }> = ({ setPage, onShare, isDark }) => {
    const [isSitemapOpen, setIsSitemapOpen] = useState(false);
    const { t } = useLanguage();

    const sitemapLinks = {
        Shop: [
            { label: t('col_view_all'), page: 'shop' },
            { label: t('nav_extract'), page: 'extract' },
            { label: t('nav_skincare'), page: 'skincare' },
            { label: t('nav_pets'), page: 'pets' },
            { label: t('nav_decor'), page: 'decor' }
        ],
        Science: [
            { label: t('nav_about'), page: 'about' },
        ],
        Support: [
            { label: t('nav_contact'), page: 'contact' },
            { label: t('footer_shipping'), page: 'contact' },
            { label: t('footer_share'), action: onShare }
        ]
    };

    return (
      <footer className="relative bg-[#F3F4F6] dark:bg-[#05020a] border-t border-neutral-200 dark:border-neutral-800 pt-8 pb-6 transition-colors duration-300 font-sans">
        {/* P5 Spore Dynamics Background - NO OVERLAY */}
        <SporeFooter isDark={isDark} />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-center md:text-left relative z-10 text-shadow-md">
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
            <Logo className="h-12 mb-3" textSize="text-xl" />
            <p className="text-purple-950 dark:text-neutral-300 font-light text-xs max-w-sm mb-3 text-center md:text-left leading-relaxed font-monolith tracking-wider uppercase drop-shadow-sm">
              {t('footer_pioneer')}
            </p>
            <LanguageSwitcher className="mt-1" />
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-thin mb-3 text-purple-950 dark:text-white uppercase tracking-[0.2em] text-[10px] font-monolith border-b border-neutral-300 dark:border-white/10 pb-1">{t('footer_shop')}</h4>
            <ul className="space-y-2 text-xs font-light text-purple-900 dark:text-neutral-300">
              <li onClick={() => setPage('shop')} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer tracking-wider font-monolith text-purple-950 dark:text-white">{t('col_view_all')}</li>
              <li onClick={() => setPage('extract')} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer tracking-wide">{t('nav_extract')}</li>
              <li onClick={() => setPage('skincare')} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer tracking-wide">{t('nav_skincare')}</li>
              <li onClick={() => setPage('pets')} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer tracking-wide">{t('nav_pets')}</li>
              <li onClick={() => setPage('decor')} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer tracking-wide">{t('nav_decor')}</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-thin mb-3 text-purple-950 dark:text-white uppercase tracking-[0.2em] text-[10px] font-monolith border-b border-neutral-300 dark:border-white/10 pb-1">{t('footer_support')}</h4>
            <ul className="space-y-2 text-xs font-light text-purple-900 dark:text-neutral-300">
              <li onClick={() => setPage('contact')} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer tracking-wide">{t('nav_contact')}</li>
              <li onClick={() => setPage('contact')} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer tracking-wide">{t('footer_shipping')}</li>
              <li onClick={onShare} className="hover:text-emerald-500 dark:hover:text-emerald-400 transition cursor-pointer flex items-center gap-2 justify-center md:justify-start tracking-wide">{t('footer_share')} <Share2 className="w-3 h-3"/></li>
            </ul>
          </div>
        </div>

        {/* Sitemap Toggle */}
        <div className="max-w-7xl mx-auto px-6 border-t border-neutral-200 dark:border-white/10 pt-4 relative z-10">
            <button 
                onClick={() => setIsSitemapOpen(!isSitemapOpen)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 hover:text-purple-950 dark:hover:text-white transition-colors mb-3 font-monolith"
            >
                <Map className="w-3 h-3" />
                {t('footer_sitemap')}
                {isSitemapOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Expandable Sitemap */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden transition-all duration-500 ease-in-out ${isSitemapOpen ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                {Object.entries(sitemapLinks).map(([category, links]) => (
                    <div key={category}>
                        <h5 className="font-monolith font-bold text-purple-950 dark:text-white mb-2 text-[9px] uppercase tracking-widest">{category}</h5>
                        <ul className="space-y-1">
                            {links.map((link, idx) => (
                                <li key={idx}>
                                    <button 
                                        onClick={() => link.page ? setPage(link.page as Page) : link.action?.()}
                                        className="text-[9px] text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 text-left font-light tracking-wide uppercase"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center md:items-start text-[9px] text-neutral-500 font-monolith tracking-wider">
              <p className="mx-auto md:mx-0">© 2025 Gano Shakh. {t('footer_rights')}.</p>
              <p className="mt-1 font-thin text-[8px] bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shine_4s_linear_infinite]">
                {t('contact_credit')}
              </p>
            </div>
        </div>
      </footer>
    );
};

const CartSidebar: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  cartItems: { product: Product; qty: number }[];
  updateQty: (id: string, delta: number) => void;
}> = ({ isOpen, onClose, cartItems, updateQty }) => {
  const { t } = useLanguage();
  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(String(item.product.price_rials).replace(/,/g, ''), 10) || 0;
    return sum + (price * item.qty);
  }, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      <div className={`fixed inset-y-0 right-0 z-[51] w-full sm:w-96 bg-white dark:bg-neutral-900 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
            <h3 className="text-lg font-bold font-serif text-purple-950 dark:text-white">{t('cart_title')}</h3>
            <button onClick={onClose} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full dark:text-white"><X className="w-5 h-5"/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-neutral-500 mt-10">{t('cart_empty')}</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img src={resolveUrl(item.product.image_url)} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg border border-neutral-100 dark:border-neutral-800" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-purple-950 dark:text-white">{item.product.name}</h4>
                    <p className="text-sm text-neutral-500 mb-2">{formatPrice(item.product.price_rials)} {t('currency')} <span className="text-xs text-neutral-500">x{item.qty}</span></p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQty(item.product.id, -1)} className="p-1 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-white"><Minus className="w-3 h-3"/></button>
                      <span className="text-sm font-medium text-purple-950 dark:text-white">{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, 1)} className="p-1 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-white"><Plus className="w-3 h-3"/></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-purple-950 dark:text-white">{t('cart_total')}</span>
              <span className="text-lg font-bold font-serif text-purple-950 dark:text-white">{total.toLocaleString()} {t('currency')}</span>
            </div>
            <button 
                onClick={() => {
                    const message = `Hi, I would like to order: \n${cartItems.map(i => `- ${i.product.name} (x${i.qty})`).join('\n')}\nTotal: ${total.toLocaleString()}`;
                    window.open(`https://wa.me/989196214129?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg"
            >
              {t('cart_checkout')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  
  // Track coupon triggering to prevent double show
  const [hasCouponTriggered, setHasCouponTriggered] = useState(false);
  
  const { t } = useLanguage();

  // FIX: Enable scroll animations
  useScrollAnimation([page]);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Optimized Preloader Logic: Granular and Smooth
  useEffect(() => {
    // We increase by small random amounts very frequently to look liquid/smooth
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Very small increments (0 to 1.5) to prevent jumping from mid-way to 100
        const next = prev + Math.random() * 1.5; 
        
        if (next >= 100) {
          clearInterval(timer);
          // Wait for exactly 1 second at 100% before removing the preloader
          setTimeout(() => setLoading(false), 1000); 
          return 100;
        }
        return next;
      });
    }, 20); // Fast updates (50fps) for fluid motion
    return () => clearInterval(timer);
  }, []);

  // Manual Trigger for Coupon (for Subscription events)
  const handleManualCouponTrigger = () => {
      if (!hasCouponTriggered) {
          setIsCouponOpen(true);
          setHasCouponTriggered(true);
      }
  };

  // Coupon Popup Timer - 5 Minutes (300,000 ms)
  useEffect(() => {
      if (!loading && !hasCouponTriggered) {
          const timer = setTimeout(() => {
              setIsCouponOpen(true);
              setHasCouponTriggered(true);
          }, 300000); // 5 minutes
          return () => clearTimeout(timer);
      }
  }, [loading, hasCouponTriggered]);

  // Dark Mode Toggle
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Dynamic Product Translations
  const translatedProducts = useMemo(() => {
    return initialProducts.map(p => {
        const keyPrefix = PRODUCT_KEYS[p.id];
        if (!keyPrefix) return p;
        
        return {
            ...p,
            name: t(`${keyPrefix}_name`),
            description: t(`${keyPrefix}_desc`),
            long_description: t(`${keyPrefix}_long`),
            size: t(`${keyPrefix}_size`), // Mapped size
            benefits: [
                t(`${keyPrefix}_ben1`),
                t(`${keyPrefix}_ben2`),
                t(`${keyPrefix}_ben3`),
            ]
        };
    });
  }, [t]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const handleProductClick = (id: string) => {
      const prod = translatedProducts.find(p => p.id === id);
      if (prod) {
          setSelectedProduct(prod);
          setPage('product_detail');
          window.scrollTo(0,0);
      }
  };

  if (loading) return <Preloader progress={progress} />;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0a0a0c] text-white' : 'bg-[#F9FAFB] text-neutral-900'}`}>
      <Header 
        toggleCart={() => setIsCartOpen(true)} 
        toggleNav={() => setIsNavOpen(true)}
        cartCount={cartItems.reduce((a, c) => a + c.qty, 0)}
        setPage={(p) => { setPage(p); window.scrollTo(0,0); }}
        onOpenLogin={() => setIsLoginOpen(true)}
        user={user}
        transparent={page === 'home' || page === 'skincare' || page === 'pets' || page === 'extract' || page === 'decor'}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main className="relative z-0">
        {page === 'home' && (
          <>
            {/* LCP Element: Kept Eager */}
            <AdvancedHero setPage={setPage} />
            <TrustBar />
            
            {/* Lazy Load Heavy Below-Fold Sections */}
            <LazySection fallback={<div className="h-96 w-full bg-[#101014] animate-pulse"></div>} intrinsicSize="1200px">
              <CollectionParallax 
                products={translatedProducts} 
                addToCart={addToCart} 
                onProductClick={handleProductClick} 
              />
            </LazySection>

            {/* NEW SECTION: MYCO DOC PULSE */}
            <LazySection fallback={<div className="h-[520px] w-full bg-[#101014]"></div>} intrinsicSize="520px">
              <LazyMycoPulseSection onOpenChat={() => setIsChatOpen(true)} />
            </LazySection>

            <LazySection fallback={<div className="h-64 w-full bg-[#101014]"></div>} intrinsicSize="500px">
              <GanoMediaGallery />
            </LazySection>

            <LazySection fallback={<div className="h-screen w-full bg-black"></div>} intrinsicSize="900px">
              <CultivationVideo onOpenChat={() => setIsChatOpen(true)} />
            </LazySection>

            {/* New Coffee & Tea Cube Section */}
            <LazySection fallback={<div className="h-[640px] w-full bg-[#101014]"></div>} intrinsicSize="640px">
              <LazyCoffeeTeaCube />
            </LazySection>

            <LazySection fallback={<div className="h-96 w-full bg-[#101014]"></div>} intrinsicSize="600px">
              <TeaRitual />
            </LazySection>

            {/* New Instagram Invite Section */}
            <LazySection fallback={<div className="h-48 w-full bg-neutral-900"></div>} intrinsicSize="300px">
              <InstagramInvite />
            </LazySection>
          </>
        )}

        {page === 'shop' && (
           <ProductGrid 
              products={translatedProducts} 
              addToCart={addToCart} 
              onProductClick={handleProductClick}
              isDark={isDark}
           />
        )}

        {page === 'about' && <AboutContent isDark={isDark} />}
        
        {page === 'contact' && <ContactPage />}

        {page === 'product_detail' && selectedProduct && (
            <ProductDetail 
                product={selectedProduct} 
                addToCart={addToCart} 
                onBack={() => setPage('shop')} 
            />
        )}

        {page === 'skincare' && <SkincarePage addToCart={addToCart} isDark={isDark} />}
        {page === 'pets' && <PetHealthPage addToCart={addToCart} />}
        {page === 'extract' && <ExtractPage addToCart={addToCart} isDark={isDark} />}
        {page === 'decor' && <ReishiDecorPage />}
      </main>

      <Footer setPage={(p) => { setPage(p); window.scrollTo(0,0); }} onShare={() => setIsQROpen(true)} isDark={isDark} />

      {/* Modals & Overlays */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        updateQty={updateQty} 
      />

      <NavSidebar 
        isOpen={isNavOpen} 
        onClose={() => setIsNavOpen(false)} 
        setPage={(p) => { setPage(p); }}
        page={page}
        toggleTheme={toggleTheme}
        isDark={isDark}
        onShare={() => setIsQROpen(true)}
        onSubscribeSuccess={handleManualCouponTrigger}
      />

      <ChatBot 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
        onClose={() => setIsChatOpen(false)} 
      />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={() => { 
            setIsLoginOpen(false); 
            alert(t('auth_welcome_msg'));
            handleManualCouponTrigger();
        }} 
      />

      <CouponPopup 
        isVisible={isCouponOpen} 
        onClose={() => setIsCouponOpen(false)} 
      />
      
      <QRCodeModal 
        isOpen={isQROpen} 
        onClose={() => setIsQROpen(false)} 
      />

      <SocialProofBubble />
    </div>
  );
};

export default App;
