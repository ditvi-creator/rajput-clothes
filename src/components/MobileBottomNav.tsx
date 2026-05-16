import React from 'react';
import { motion } from 'motion/react';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface MobileBottomNavProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

export default function MobileBottomNav({ onOpenSearch, onOpenCart }: MobileBottomNavProps) {
  const { totalItems } = useCart();
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-onyx/80 backdrop-blur-xl border-t border-white/5 px-6 py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <NavButton icon={<Home className="w-6 h-6" />} label="Home" active />
        </Link>
        <NavButton icon={<Search className="w-6 h-6" />} label="Search" onClick={onOpenSearch} />
        <button 
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 text-brand-white/60"
        >
          <div className="p-1">
            <ShoppingBag className="w-6 h-6 text-brand-white" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-brand-gold text-brand-onyx text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[9px] uppercase tracking-widest font-bold">Bag</span>
        </button>
        <NavButton icon={<Heart className="w-6 h-6" />} label="Vault" />
        <NavButton icon={<User className="w-6 h-6" />} label="Account" />
      </div>
    </nav>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors duration-300 ${active ? 'text-brand-gold' : 'text-brand-white/40'}`}
    >
      <div className="p-1">
        {icon}
      </div>
      <span className="text-[9px] uppercase tracking-widest font-bold">{label}</span>
    </button>
  );
}
