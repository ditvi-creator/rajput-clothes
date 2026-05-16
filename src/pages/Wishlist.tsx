import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <div className="pt-24 sm:pt-32 pb-20 min-h-screen bg-brand-onyx">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-white mb-4 tracking-tight">
              Wishlist
            </h1>
            <p className="text-brand-white/40 uppercase tracking-[0.4em] text-xs">
              {wishlistCount} Saved Masterpieces
            </p>
          </div>
        </div>

        {wishlistCount > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {wishlist.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-32 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center mb-8">
              <ShoppingBag className="w-8 h-8 text-brand-white/20" />
            </div>
            <h2 className="text-2xl font-serif text-brand-white mb-4">Your collection is empty</h2>
            <p className="text-brand-white/40 mb-8 max-w-sm">
              Discover our latest collections and save your favorite pieces to your personal wishlist.
            </p>
            <Link 
              to="/shop" 
              className="group flex items-center gap-3 text-brand-gold text-[10px] tracking-[0.4em] uppercase font-bold"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
