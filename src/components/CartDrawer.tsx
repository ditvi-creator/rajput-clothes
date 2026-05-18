import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-brand-onyx text-brand-white p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-brand-gold" />
                  <h2 className="text-xl font-serif">Your Bag ({totalItems})</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-brand-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar py-4">
                {cart.length > 0 ? (
                  <div className="flex flex-col gap-8">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                        <div className="w-24 aspect-[3/4] bg-brand-surface overflow-hidden">
                          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-sm font-sans uppercase tracking-widest font-bold max-w-[160px] leading-tight text-brand-white">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id, item.selectedSize)}
                              className="text-brand-white/40 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[10px] text-brand-white/40 uppercase tracking-widest mb-4">Size: {item.selectedSize}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-brand-white/10 rounded px-2 py-1">
                              <span className="text-xs font-bold px-2">{item.quantity}</span>
                            </div>
                            <span className="text-sm font-bold text-brand-gold">₹{item.price.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-brand-white/5 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag className="w-8 h-8 text-brand-gold" />
                    </div>
                    <p className="text-sm tracking-widest uppercase font-bold mb-2 text-brand-white">YOUR BAG IS EMPTY</p>
                    <p className="text-xs text-brand-white/40 mb-8 max-w-[200px]">
                      It seems you haven't added any heritage pieces yet.
                    </p>
                    <button 
                      onClick={onClose}
                      className="px-8 py-4 bg-brand-white text-brand-onyx text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-brand-gold transition-colors flex items-center gap-2"
                    >
                      CONTINUE SHOPPING <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-auto border-t border-brand-white/10 pt-8">
                <div className="flex justify-between mb-4">
                  <span className="text-xs tracking-widest uppercase text-brand-white/40">Subtotal</span>
                  <span className="font-bold text-lg text-brand-gold">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <Link to="/checkout" className="w-full" onClick={onClose}>
                  <button 
                    disabled={cart.length === 0}
                    className={cn(
                      "w-full py-4 text-[10px] tracking-[0.3em] uppercase font-bold transition-colors",
                      cart.length > 0 
                        ? "bg-brand-white text-brand-onyx hover:bg-brand-gold shadow-lg" 
                        : "bg-brand-white/5 text-brand-white/20 cursor-not-allowed"
                    )}
                  >
                    CHECKOUT SECURELY
                  </button>
                </Link>
                <p className="mt-4 text-[10px] text-center text-brand-white/30 italic">
                  Free Express Shipping on orders over ₹40,000
                </p>
              </div>
          </motion.div>
        </>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </AnimatePresence>
  );
}

import { cn } from '../lib/utils';
