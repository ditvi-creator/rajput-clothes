import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Plus, X, Heart } from 'lucide-react';
import { Product } from '../constants';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);

  return (
    <div 
      className="group relative flex flex-col bg-brand-onyx"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE CONTAINER */}
      <Link to={`/product/${product.id}`} className="relative aspect-product overflow-hidden border border-brand-white/5">
        <AnimatePresence mode="wait">
          <motion.img
            key={isHovered ? 'secondary' : 'primary'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={isHovered ? product.secondaryImage : product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* BADGES */}
        {product.tag && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-brand-white text-brand-onyx border border-brand-gold/30 shadow-2xl">
            <p className="text-[9px] font-bold tracking-widest uppercase">
              {product.tag}
            </p>
          </div>
        )}

        {/* WISHLIST BUTTON */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-4 right-4 z-20 group/heart"
        >
          <div className={cn(
            "w-10 h-10 rounded-full border border-brand-white/5 flex items-center justify-center transition-all duration-500",
            isWishlisted ? "bg-brand-gold border-brand-gold shadow-lg shadow-brand-gold/20" : "bg-white/80 backdrop-blur-md group-hover/heart:bg-white"
          )}>
            <Heart 
              className={cn(
                "w-4 h-4 transition-transform duration-500 group-hover/heart:scale-110",
                isWishlisted ? "fill-brand-onyx text-brand-onyx" : "text-brand-white group-hover/heart:text-brand-gold"
              )} 
            />
          </div>
        </button>
      </Link>

      {/* QUICK ADD BUTTON */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowQuickAdd(true);
        }}
        className="absolute bottom-[100px] right-4 z-20 w-10 h-10 bg-brand-white text-brand-onyx flex items-center justify-center rounded-full shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 active:scale-90"
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* QUICK ADD DRAWER */}
      <AnimatePresence>
        {showQuickAdd && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 z-30 bg-brand-white p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] tracking-widest font-bold text-brand-onyx uppercase">SELECT SIZE</p>
              <button onClick={() => setShowQuickAdd(false)}>
                <X className="w-4 h-4 text-brand-onyx" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  className="h-10 border border-brand-onyx/20 text-brand-onyx text-xs hover:bg-brand-onyx hover:text-brand-white transition-colors uppercase font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product, size);
                    setShowQuickAdd(false);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INFO */}
      <Link to={`/product/${product.id}`} className="py-4">
        <h3 className="text-sm font-sans uppercase tracking-[0.15em] text-brand-white/90 mb-1">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-brand-gold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-brand-white/40 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
