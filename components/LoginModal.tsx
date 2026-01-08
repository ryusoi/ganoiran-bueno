
import React, { useEffect, useState } from 'react';
import { db, auth } from '../lib/firebase';
import { ref, push } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();

  // Handle mounting animation for crisp appearance
  useEffect(() => {
    if (isOpen) setIsMounted(true);
    else {
        const timer = setTimeout(() => setIsMounted(false), 200);
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Optimized Meteor Logic: Only runs when mounted
  useEffect(() => {
    if (!isOpen) return;
    const container = document.getElementById('meteor-container');
    if (!container) return;
    container.innerHTML = '';
    
    // Reduced count slightly for guaranteed 60fps start
    const meteorCount = 8;
    for (let i = 0; i < meteorCount; i++) {
      const meteor = document.createElement('div');
      meteor.classList.add('meteor');
      const delay = Math.random() * 2;
      const duration = Math.random() * 3 + 2;
      const topPosition = Math.random() * 100;
      const leftPosition = Math.floor(Math.random() * 300) - 150;
      meteor.style.top = `${topPosition}%`;
      meteor.style.left = `${leftPosition}px`;
      meteor.style.animationDelay = `${delay}s`;
      meteor.style.animationDuration = `${duration}s`;
      container.appendChild(meteor);
    }
  }, [isOpen]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // Generate a deterministic password so the user never has to type it,
    // but we satisfy Firebase's requirement for a password to create a persistent user.
    // NOTE: This acts as a "passwordless" flow for the user, but standard auth for Firebase.
    const deterministicPassword = `Gano-${btoa(email.toLowerCase()).substring(0, 16)}-2025!`;

    try {
      let userCredential;
      let isNewUser = false;

      try {
        // 1. Try to create a new user (This saves email to Auth tab)
        userCredential = await createUserWithEmailAndPassword(auth, email, deterministicPassword);
        isNewUser = true;
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          // 2. If email exists, log them in with the generated password
          // (This assumes they registered via this app previously)
          userCredential = await signInWithEmailAndPassword(auth, email, deterministicPassword);
        } else {
          throw error;
        }
      }

      if (userCredential && userCredential.user) {
        // 3. Update profile with email so it shows in the Header
        if (!userCredential.user.displayName || userCredential.user.displayName !== email) {
            try {
              await updateProfile(userCredential.user, {
                  displayName: email
              });
              // Force refresh of the user object so the app listeners pick up the new displayName
              await userCredential.user.reload();
              // Trigger auth state change listener manually if needed, or rely on reload
              if (auth.currentUser) {
                 await auth.updateCurrentUser(auth.currentUser); 
              }
            } catch (profileError) {
              console.warn("Profile update failed, but auth succeeded:", profileError);
            }
        }

        // 4. Save to Realtime Database (Backup record)
        // Only push if it's a new user.
        // Wrap in try/catch to ignore PERMISSION_DENIED (common in secured/demo DBs)
        if (isNewUser) {
            try {
              const subscribersRef = ref(db, 'subscribers');
              await push(subscribersRef, {
                  email: email,
                  uid: userCredential.user.uid,
                  timestamp: new Date().toISOString(),
                  source: 'passwordless_registration'
              });
            } catch (dbError: any) {
              // If permission denied, we just log it and proceed. 
              // The user is authenticated in Auth service, which is sufficient for the UI.
              if (dbError.code === 'PERMISSION_DENIED' || dbError.message.includes('permission denied')) {
                console.warn("Database write permission denied. User created in Auth only.");
              } else {
                console.error("Database error:", dbError);
              }
            }
        }
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Auth Error:", error);
      // Fallback: If the deterministic login fails (e.g. they have a real password set from elsewhere),
      // we show a message.
      if (error.code === 'auth/wrong-password') {
          alert(t('auth_wrong_pass'));
      } else {
          alert(t('auth_fail_prefix') + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen && !isMounted) return null;

  return (
    <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-200 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`relative max-w-sm w-full bg-[#050505] rounded-xl overflow-hidden shadow-2xl border border-white/20 transform transition-all duration-200 ease-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        
        <button 
            onClick={onClose}
            className="absolute top-3 right-3 z-50 text-neutral-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
        >
            <X className="w-4 h-4" />
        </button>

        <div className="relative h-full">
          {/* Meteor Background */}
          <div id="meteor-container" className="absolute inset-0 overflow-hidden pointer-events-none opacity-50"></div>
          
          <div className="relative z-10 p-8 flex flex-col items-center">
            <div className="mb-5">
              <span className="px-3 py-1 bg-white/5 rounded border border-indigo-500/50 text-[10px] tracking-[0.2em] font-bold text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
                {t('login_cosmic')}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2 text-center font-serif tracking-tight">{t('login_portal')}</h2>
            <p className="text-neutral-400 text-xs text-center mb-6 max-w-[200px] leading-relaxed font-medium">
              {t('login_desc')}
            </p>
            
            <form onSubmit={handleSubscribe} className="w-full space-y-4 mb-4">
              <div className="relative group">
                <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-3 rounded-lg bg-[#111] text-white text-sm border border-neutral-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all placeholder-neutral-600 font-medium" 
                    placeholder={t('login_placeholder')}
                    required 
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {loading ? t('login_connecting') : t('login_btn')} <ArrowRight className="w-3 h-3" />
              </button>
            </form>
            
            <div className="text-center w-full pt-3 border-t border-white/5">
              <p className="text-neutral-500 text-[9px] uppercase tracking-widest font-semibold">
                {t('login_secure')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
