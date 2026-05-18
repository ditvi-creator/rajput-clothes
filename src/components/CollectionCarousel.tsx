import { useRef } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { ChevronRight } from 'lucide-react';

export default function CollectionCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-brand-onyx overflow-hidden -mt-[50px]">
      <div className="container mx-auto px-4 sm:px-8 mb-10 flex items-end justify-between">
        <div>
          <span className="inline-block h-px w-8 bg-brand-gold mb-4" />
          <h2 className="text-4xl sm:text-6xl text-brand-white lowercase opacity-90">
             spring summer <span className="font-serif italic font-light text-brand-gold">'26</span>
          </h2>
        </div>
        <button className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-brand-white/60 hover:text-brand-white transition-colors group">
          View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-6 px-4 sm:px-8 no-scrollbar pb-8 snap-x"
      >
        {PRODUCTS.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="flex-none w-[280px] sm:w-[350px] snap-start"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
