import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search, ShoppingBag, User, Heart, X, Plus, ChevronRight, Globe, Phone, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { auth as firebaseAuth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

const CATEGORIES = {
  Men: {
    products: ['New Arrivals', 'Best Sellers', 'Top Wear', 'Bottom Wear', 'Outerwear'],
    collections: ['Spring / Summer \'26', 'Modern Heritage', 'Festival Wear', 'Minimalist Basics'],
    featured: {
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop',
      title: 'The Saffron Bomber',
      subtitle: 'Shop the Drop'
    }
  },
  Women: {
    products: ['New Arrivals', 'Dresses', 'Lehengas', 'Silk Sarees', 'Accessories'],
    collections: ['Ethereal Cyber', 'Royal Occasion', 'Heritage Modern', 'Daily Luxury'],
    featured: {
      image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=600&auto=format&fit=crop',
      title: 'Gold Motif Saree',
      subtitle: 'New Collection'
    }
  }
};

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

export default function Header({ onOpenSearch, onOpenCart }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'Men' | 'Women' | null>(null);
  const megaMenuTimer = useRef<NodeJS.Timeout | null>(null);
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleMouseEnter = (cat: 'Men' | 'Women') => {
    if (megaMenuTimer.current) clearTimeout(megaMenuTimer.current);
    setActiveMegaMenu(cat);
  };

  const handleMouseLeave = () => {
    megaMenuTimer.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  return (
    <>
      <header className="glass fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 flex items-center">
        <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between h-full">
          {/* DESKTOP LEFT NAV */}
          <div className="hidden lg:flex items-center gap-10 h-full">
            <Link to="/shop" className="h-full flex items-center">
              <NavHoverLink 
                onMouseEnter={() => handleMouseEnter('Men')}
                onMouseLeave={handleMouseLeave}
              >
                Men
              </NavHoverLink>
            </Link>
            <Link to="/shop" className="h-full flex items-center">
              <NavHoverLink 
                onMouseEnter={() => handleMouseEnter('Women')}
                onMouseLeave={handleMouseLeave}
              >
                Women
              </NavHoverLink>
            </Link>
            <NavHoverLink>The Royal Edit</NavHoverLink>
            <NavHoverLink>Our Story</NavHoverLink>
          </div>

          {/* MOBILE HAMBURGER Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-brand-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* LOGO */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif tracking-[0.2em] text-brand-white uppercase whitespace-nowrap mr-[10px] ml-[20px]">
              Rajput <span className="text-brand-gold ml-[-5px] mr-[50px]">Clothes</span>
            </h1>
          </Link>

          {/* RIGHT UTILITY */}
          <div className="flex items-center gap-1 sm:gap-4 lg:gap-6">
            <button 
              onClick={onOpenSearch}
              className="p-2 text-brand-white hover:text-brand-gold transition-colors mr-[-15px]"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 p-2 text-brand-white">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden xl:block text-[10px] tracking-widest text-brand-white/40 uppercase">
                    {user.displayName || 'User'}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-brand-white hover:text-brand-gold transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block px-4 py-2 text-[10px] tracking-[0.3em] uppercase font-bold text-brand-white border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-all">
                Sign In
              </Link>
            )}

            <Link to="/wishlist" className="relative p-2 text-brand-white hover:text-brand-gold transition-colors mr-[-10px]">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 mr-[-5px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 sm:w-3 sm:h-3 bg-brand-gold text-brand-onyx text-[7px] sm:text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-brand-white hover:text-brand-gold transition-colors"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 sm:w-3 sm:h-3 bg-brand-gold text-brand-onyx text-[7px] sm:text-[8px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MEGA MENU ANIMATION */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              onMouseEnter={() => {
                if (megaMenuTimer.current) clearTimeout(megaMenuTimer.current);
              }}
              onMouseLeave={handleMouseLeave}
              key={activeMegaMenu}
              className="absolute top-full left-0 right-0 bg-brand-onyx border-b border-white/5 py-12 hidden lg:block"
            >
              <div className="container mx-auto px-8 grid grid-cols-12 gap-12">
                <div className="col-span-3">
                  <h3 className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold mb-8">Shop by Product</h3>
                  <div className="flex flex-col gap-4">
                    {CATEGORIES[activeMegaMenu].products.map(item => (
                      <MegaMenuLink key={`prod-${item}`}>{item}</MegaMenuLink>
                    ))}
                  </div>
                </div>
                <div className="col-span-3">
                  <h3 className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold mb-8">Curated Collections</h3>
                  <div className="flex flex-col gap-4">
                    {CATEGORIES[activeMegaMenu].collections.map(item => (
                      <MegaMenuLink key={`coll-${item}`}>{item}</MegaMenuLink>
                    ))}
                  </div>
                </div>
                <div className="col-span-6 border-l border-white/5 pl-12 flex items-center">
                   <Link to="/shop" className="relative group overflow-hidden flex-1 aspect-[16/7]">
                      <img 
                        src={CATEGORIES[activeMegaMenu].featured.image} 
                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-brand-onyx/30 group-hover:bg-brand-onyx/10 transition-colors" />
                      <div className="absolute bottom-8 left-8 flex flex-col items-start">
                        <p className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold mb-2">Trending Now</p>
                        <h4 className="text-3xl font-serif italic text-brand-white mb-4">{CATEGORIES[activeMegaMenu].featured.title}</h4>
                        <span className="text-xs tracking-[0.2em] uppercase text-brand-white border-b border-brand-white/40 pb-1 flex items-center gap-2 group/btn">
                          {CATEGORIES[activeMegaMenu].featured.subtitle} <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </div>
                   </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-brand-onyx p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
               <h2 className="text-xl font-serif text-brand-gold italic">The Royal Selection</h2>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                 <X className="w-8 h-8 text-brand-white" />
               </button>
            </div>

            <div className="flex-1 flex flex-col gap-6 overflow-y-auto pt-4 no-scrollbar">
               {(['Men', 'Women'] as const).map(cat => (
                 <div key={cat} className="flex flex-col gap-4">
                    <button 
                      onClick={() => setExpandedMobileCat(expandedMobileCat === cat ? null : cat)}
                      className="flex items-center justify-between w-full text-4xl font-serif text-brand-white uppercase tracking-tighter"
                    >
                      {cat} 
                      <motion.div
                        animate={{ rotate: expandedMobileCat === cat ? 45 : 0 }}
                      >
                        <Plus className="w-6 h-6 text-brand-gold" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedMobileCat === cat && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col gap-4 pl-4 border-l border-brand-gold/30"
                        >
                           {CATEGORIES[cat].products.map(p => (
                             <a key={`prod-${cat}-${p}`} href="#" className="text-lg tracking-widest text-brand-white/60 uppercase">{p}</a>
                           ))}
                           {CATEGORIES[cat].collections.map(c => (
                             <a key={`coll-${cat}-${c}`} href="#" className="text-lg tracking-widest text-brand-gold/60 italic font-serif">{c}</a>
                           ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
               ))}
               <a href="#" className="text-4xl font-serif text-brand-white uppercase tracking-tighter opacity-60">The Royal Edit</a>
               <a href="#" className="text-4xl font-serif text-brand-white uppercase tracking-tighter opacity-60">Our Story</a>
            </div>

            <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-6">
               <div className="flex items-center justify-between text-xs tracking-[0.2em] text-brand-white/40 uppercase">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" /> INR ₹
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Concierge
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </>
  );
}

interface NavHoverLinkProps {
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  key?: React.Key;
}

function NavHoverLink({ children, onMouseEnter, onMouseLeave }: NavHoverLinkProps) {
  return (
    <div 
      className="relative h-full flex items-center group cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="text-[11px] tracking-[0.3em] uppercase text-brand-white/70 group-hover:text-brand-white group-hover:-translate-y-px transition-all duration-300">
        {children}
      </span>
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

interface MegaMenuLinkProps {
  children: React.ReactNode;
  key?: React.Key;
}

function MegaMenuLink({ children }: MegaMenuLinkProps) {
  return (
    <Link to="/shop" className="text-sm text-brand-white/50 hover:text-brand-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
      <div className="w-0 group-hover:w-4 h-px bg-brand-gold transition-all duration-300" />
      {children}
    </Link>
  );
}

