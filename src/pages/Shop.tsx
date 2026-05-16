import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, Product } from '../constants';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

export default function Shop() {
  const [category, setCategory] = useState<'All' | 'Men' | 'Women'>('All');
  const [sortBy, setSortBy] = useState<'Featured' | 'Newest' | 'Price: Low' | 'Price: High'>('Featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    
    if (sortBy === 'Price: Low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Newest') {
      result.reverse();
    }
    
    return result;
  }, [category, sortBy]);

  return (
    <div className="pt-24 sm:pt-32 pb-20">
      {/* HEADER */}
      <div className="container mx-auto px-4 sm:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase font-bold mb-4">THE COLLECTION</p>
            <h1 className="text-5xl sm:text-7xl font-serif text-brand-white lowercase opacity-90 leading-[0.8]">
              heritage <span className="font-serif italic font-light text-brand-gold">universe</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            {(['All', 'Men', 'Women'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-colors ${
                  category === cat ? 'text-brand-gold' : 'text-brand-white/40 hover:text-brand-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="sticky top-16 sm:top-20 z-40 bg-brand-onyx/80 backdrop-blur-xl border-y border-white/5 py-4 mb-12">
        <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between">
          <button className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filter
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors"
            >
              Sort By: <span className="text-brand-gold">{sortBy}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 w-48 bg-brand-onyx border border-white/10 shadow-2xl z-50 overflow-hidden"
                >
                  {(['Featured', 'Newest', 'Price: Low', 'Price: High'] as const).map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-6 py-4 text-[10px] tracking-widest uppercase text-left hover:bg-white/5 transition-colors"
                    >
                      <span className={sortBy === option ? 'text-brand-gold' : 'text-brand-white/60'}>
                        {option}
                      </span>
                      {sortBy === option && <Check className="w-3 h-3 text-brand-gold" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="container mx-auto px-4 sm:px-8">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-brand-white/40 uppercase tracking-[0.5em]">No items found in this realm.</p>
          </div>
        )}
      </div>
    </div>
  );
}
