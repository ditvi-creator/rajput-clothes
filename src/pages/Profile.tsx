import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Calendar, MapPin, Package, Heart, Settings, LogOut, Shield, ChevronRight, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth as firebaseAuth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Profile() {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-40 bg-brand-onyx flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-brand-onyx">
      {/* DECORATIVE BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-white/2 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* HEADER SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12 md:mb-16 px-4 md:px-0"
          >
            <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-surface border-2 border-brand-gold/20 flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 md:w-16 md:h-16 text-brand-gold" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 md:p-2 bg-brand-gold text-brand-onyx rounded-full hover:scale-110 transition-transform shadow-lg border-2 border-brand-onyx">
                <Camera className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1 min-w-0 w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4">
                <h1 className="text-2xl md:text-4xl font-serif text-brand-white capitalize truncate">
                  Royal Member: {user.displayName || 'Valued Guest'}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold text-[9px] md:text-[10px] tracking-widest uppercase font-bold border border-brand-gold/20 rounded-full">
                    <Shield className="w-2.5 h-2.5 md:w-3 md:h-3" /> Platinum Status
                  </span>
                  {userData?.offline && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-white/5 text-brand-white/40 text-[8px] md:text-[9px] tracking-widest uppercase font-bold border border-brand-white/10 rounded-full">
                      Guest Mode (Offline)
                    </span>
                  )}
                </div>
              </div>
              <p className="text-brand-white/40 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-1">Elite Circle Since {userData?.createdAt ? new Date(userData.createdAt).getFullYear() : '2026'}</p>
              <p className="text-brand-gold/60 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold">Personal Stylist: Ms. Meera Singh</p>
            </div>

            <button 
              onClick={handleLogout}
              className="md:ml-auto flex items-center gap-2 text-brand-white/40 hover:text-brand-crimson transition-colors group py-2"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] tracking-widest uppercase font-bold">Relinquish Session</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* NAVIGATION - Sidbar on desktop, scrollable bar on mobile */}
            <div className="lg:col-span-3">
              <div className="bg-brand-surface/30 backdrop-blur-xl border border-brand-white/5 p-2 md:p-8 lg:sticky lg:top-32 overflow-x-auto scrollbar-hide">
                <div className="flex lg:flex-col gap-1 md:gap-2 min-w-max lg:min-w-0">
                  <TabButton 
                    active={activeTab === 'profile'} 
                    onClick={() => setActiveTab('profile')}
                    icon={User}
                  >
                    Identity
                  </TabButton>
                  <TabButton 
                    active={activeTab === 'orders'} 
                    onClick={() => setActiveTab('orders')}
                    icon={Package}
                  >
                    Vault
                  </TabButton>
                  <TabButton 
                    active={activeTab === 'wishlist'} 
                    onClick={() => setActiveTab('wishlist')}
                    icon={Heart}
                  >
                    Curation
                  </TabButton>
                  <div className="hidden lg:block h-px bg-brand-white/5 my-4" />
                  <TabButton icon={Settings} className="hidden lg:flex">
                    Preferences
                  </TabButton>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile-tab"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <SectionTitle>Account Details</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <InfoCard label="Email Registered" value={user.email || '—'} icon={Mail} />
                      <InfoCard label="Account UID" value={user.uid.substring(0, 12) + '...'} icon={Shield} />
                      <InfoCard label="Primary Locale" value="Rajasthan, India" icon={MapPin} />
                      <InfoCard label="Last Login" value={new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric', day: 'numeric' })} icon={Calendar} />
                    </div>

                    <div className="bg-brand-surface/20 border border-brand-white/5 p-4 md:p-8 mt-6 md:mt-12">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                        <h3 className="text-lg md:text-xl font-serif text-brand-white">Royal Preferences</h3>
                        <button className="text-[9px] md:text-[10px] tracking-widest text-brand-gold uppercase font-bold flex items-center gap-2 group">
                          Edit Profile <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                        <div>
                          <p className="text-[9px] md:text-[10px] tracking-widest text-brand-white/30 uppercase font-bold mb-1 md:mb-2">Favorite Style</p>
                          <p className="text-xs md:text-sm text-brand-white">Modern Heritage</p>
                        </div>
                        <div>
                          <p className="text-[9px] md:text-[10px] tracking-widest text-brand-white/30 uppercase font-bold mb-1 md:mb-2">Preferred Textile</p>
                          <p className="text-xs md:text-sm text-brand-white">Hand-woven Silk</p>
                        </div>
                        <div>
                          <p className="text-[9px] md:text-[10px] tracking-widest text-brand-white/30 uppercase font-bold mb-1 md:mb-2">Sizing</p>
                          <p className="text-xs md:text-sm text-brand-white">Custom / Made-to-measure</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div
                    key="orders-tab"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-brand-white/5 rounded-full flex items-center justify-center mb-6 border border-brand-gold/10">
                      <Package className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h3 className="text-2xl font-serif text-brand-white mb-4">Your Heritage Vault is Empty</h3>
                    <p className="text-brand-white/40 text-sm max-w-md mx-auto mb-10 leading-relaxed">
                      Begin your journey into authentic Rajput craft. Your first acquisition awaits.
                    </p>
                    <Link to="/shop">
                      <button className="px-12 py-5 bg-brand-white text-brand-onyx text-[10px] tracking-[0.4em] uppercase font-black hover:bg-brand-gold transition-all">
                        Discover the Collections
                      </button>
                    </Link>
                  </motion.div>
                )}

                {activeTab === 'wishlist' && (
                  <motion.div
                    key="wishlist-tab"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-brand-white/5 rounded-full flex items-center justify-center mb-6 border border-brand-gold/10">
                      <Heart className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h3 className="text-2xl font-serif text-brand-white mb-4">No Pieces Curated Yet</h3>
                    <p className="text-brand-white/40 text-sm max-w-md mx-auto mb-10 leading-relaxed">
                      Save your favorite pieces for future royal occasions.
                    </p>
                    <Link to="/shop">
                      <button className="px-12 py-5 bg-brand-gold text-brand-onyx text-[10px] tracking-[0.4em] uppercase font-black hover:bg-brand-white transition-all">
                        Browse the Atelier
                      </button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, icon: Icon, children, onClick, className }: { active?: boolean, icon: any, children: React.ReactNode, onClick?: () => void, className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold transition-all w-auto lg:w-full",
        active 
          ? "bg-brand-gold text-brand-onyx" 
          : "text-brand-white/40 hover:bg-brand-white/5 hover:text-brand-white",
        className
      )}
    >
      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
      {children}
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.5em] text-brand-gold uppercase font-bold mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
      {children}
      <div className="h-px flex-1 bg-brand-gold/20" />
    </h2>
  );
}

function InfoCard({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="bg-brand-white/2 border border-brand-white/5 p-4 md:p-6 group hover:border-brand-gold/50 transition-all duration-500">
      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
        <div className="p-1.5 md:p-2 bg-brand-gold/10 text-brand-gold">
          <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </div>
        <p className="text-[8px] md:text-[9px] tracking-widest text-brand-white/30 uppercase font-bold">{label}</p>
      </div>
      <p className="text-xs md:text-base text-brand-white font-medium break-all">{value}</p>
    </div>
  );
}
