import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Chrome, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user: currentUser } = useAuth();
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSocialLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Async sync to firestore - wrap in try/catch so it doesn't block login if offline
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      } catch (syncErr) {
        console.warn('Firestore sync failed, but authentication succeeded:', syncErr);
      }
      
      // useEffect in this component will detect currentUser change and redirect
    } catch (err: any) {
      if (err.code === 'auth/cancelled-popup-request' || err.code === 'auth/popup-closed-by-user') {
        setIsLoading(false);
        return;
      }
      setError(err.message);
      setIsLoading(false);
    }
    // We don't setIsLoading(false) here if successful because navigation will happen
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'LOGIN') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        
        // Update profile
        if (displayName) {
          try {
            await updateProfile(user, { displayName });
          } catch (e) {
            console.warn('Profile update failed');
          }
        }
        
        // Create user doc - try/catch to not block if offline
        try {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: displayName || user.email?.split('@')[0],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        } catch (syncErr) {
          console.warn('User document creation failed');
        }
      }
      // useEffect will handle navigation
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-brand-onyx flex items-center justify-center px-4">
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-white/2 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-brand-surface/40 backdrop-blur-2xl border border-brand-white/5 p-8 sm:p-12">
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-brand-white mb-3">
              {mode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-brand-white/40 text-xs uppercase tracking-[0.3em]">
              {mode === 'LOGIN' ? 'Enter your credentials to continue' : 'Join our inner circle of heritage'}
            </p>
          </div>

          <div className="flex gap-4 mb-8 text-center">
            <button 
              disabled={isLoading}
              onClick={() => handleSocialLogin()}
              className="w-full py-3 border border-brand-white/5 flex items-center justify-center gap-3 hover:bg-brand-white/5 transition-colors group disabled:opacity-50"
            >
              <Chrome className="w-4 h-4 text-brand-white/40 group-hover:text-brand-gold transition-colors" />
              <span className="text-[10px] tracking-widest text-brand-white/60 uppercase font-bold">
                {isLoading ? 'Connecting...' : 'Continue with Google'}
              </span>
            </button>
          </div>

          <div className="relative flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-brand-white/5" />
            <span className="text-[9px] tracking-widest text-brand-white/20 uppercase">OR</span>
            <div className="h-[1px] flex-1 bg-brand-white/5" />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brand-crimson/10 border border-brand-crimson/20 text-brand-crimson text-[10px] uppercase tracking-widest font-bold text-center">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'SIGNUP' && (
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.2em] text-brand-white/40 uppercase font-bold">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-white/20 group-focus-within:text-brand-gold transition-colors" />
                  <input 
                    type="text" 
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Arjun Singh"
                    className="w-full bg-brand-white/2 border border-brand-white/5 px-12 py-4 text-brand-white text-sm focus:outline-none focus:border-brand-gold/50 transition-all placeholder:text-brand-white/10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.2em] text-brand-white/40 uppercase font-bold">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-white/20 group-focus-within:text-brand-gold transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-brand-white/2 border border-brand-white/5 px-12 py-4 text-brand-white text-sm focus:outline-none focus:border-brand-gold/50 transition-all placeholder:text-brand-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] tracking-[0.2em] text-brand-white/40 uppercase font-bold">Password</label>
                {mode === 'LOGIN' && (
                  <button type="button" className="text-[9px] tracking-widest text-brand-gold hover:text-brand-white uppercase transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-white/20 group-focus-within:text-brand-gold transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-white/2 border border-brand-white/5 px-12 py-4 text-brand-white text-sm focus:outline-none focus:border-brand-gold/50 transition-all placeholder:text-brand-white/10"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-white/20 hover:text-brand-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-5 bg-brand-white text-brand-onyx text-[10px] tracking-[0.4em] uppercase font-black hover:bg-brand-gold transition-all flex items-center justify-center gap-3 relative overflow-hidden disabled:opacity-50"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-5 h-5 border-2 border-brand-onyx/20 border-t-brand-onyx rounded-full animate-spin"
                  />
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    {mode === 'LOGIN' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-10 text-center">
            <button 
              onClick={() => setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
              className="text-[10px] tracking-[0.2em] text-brand-white/40 uppercase group"
            >
              {mode === 'LOGIN' ? "Don't have an account? " : "Already have an account? "}
              <span className="text-brand-white group-hover:text-brand-gold transition-colors border-b border-transparent group-hover:border-brand-gold">
                {mode === 'LOGIN' ? 'Join Now' : 'Sign In'}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
