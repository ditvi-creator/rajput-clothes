import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-brand-onyx flex flex-col p-6 sm:p-12"
        >
          <div className="flex justify-end mb-12">
            <button 
              onClick={onClose}
              className="p-2 text-brand-white hover:text-brand-gold transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="container mx-auto max-w-4xl flex-1 flex flex-col justify-center">
            <div className="relative group">
              <input 
                autoFocus
                type="text" 
                placeholder="SEARCH FOR HERITAGE..."
                className="w-full bg-transparent border-b-2 border-brand-white/20 py-6 text-2xl sm:text-4xl font-serif text-brand-white placeholder:text-brand-white/20 focus:outline-none focus:border-brand-gold transition-colors uppercase tracking-widest"
              />
              <SearchIcon className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 text-brand-white/20 group-focus-within:text-brand-gold transition-colors" />
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold mb-6">Trending Searches</h3>
                <div className="flex flex-col gap-4">
                  {['Saffron Bomber', 'Heritage Kurta', 'Silk Saree', 'Cyber Jackets'].map(term => (
                    <button key={term} className="text-left text-brand-white/60 hover:text-brand-white transition-colors text-lg font-serif italic">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hidden sm:block">
                <h3 className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold mb-6">Suggestions</h3>
                 <div className="flex flex-col gap-4">
                  {['Latest Drop', 'Best Sellers', 'Occasion Wear'].map(term => (
                    <button key={term} className="text-left text-brand-white/60 hover:text-brand-white transition-colors text-lg font-serif italic">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
