import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../constants';

const LOCATIONS = ['Mumbai', 'Delhi', 'London', 'Dubai', 'New York', 'Jaipur'];

export default function SocialProof() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({ location: '', product: PRODUCTS[0] });

  useEffect(() => {
    const showRandom = () => {
      const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      setData({ location, product });
      setIsVisible(true);

      setTimeout(() => setIsVisible(false), 4000);
    };

    const interval = setInterval(showRandom, 15000); // Every 15 seconds
    setTimeout(showRandom, 3000); // Initial delay

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-brand-white p-2 pr-4 shadow-2xl rounded-sm"
        >
          <div className="relative h-12 w-12 overflow-hidden bg-gray-100">
            <img 
              src={data.product.image} 
              alt={data.product.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">
              RECENT PURCHASE
            </p>
            <p className="text-xs text-brand-onyx">
              Someone in <span className="font-semibold">{data.location}</span>
            </p>
            <p className="text-[11px] text-brand-onyx/80 italic font-serif">
               bought {data.product.name}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
