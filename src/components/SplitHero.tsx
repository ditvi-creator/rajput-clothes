import { motion } from 'motion/react';

export default function SplitHero() {
  return (
    <section className="relative h-[90vh] sm:h-screen w-full flex flex-col sm:flex-row overflow-hidden">
      {/* MEN SIDE */}
      <motion.div 
        whileHover={{ flex: 1.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex-1 overflow-hidden h-1/2 sm:h-full cursor-pointer"
      >
        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
        <img 
          src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1200&auto=format&fit=crop" 
          alt="Men Category"
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl font-serif text-white mb-4 italic"
          >
            Men
          </motion.h2>
          <div className="h-px w-0 group-hover:w-24 bg-brand-gold transition-all duration-500" />
          <p className="mt-4 text-xs tracking-[0.3em] uppercase text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            Heritage Bold
          </p>
        </div>
      </motion.div>

      {/* WOMEN SIDE */}
      <motion.div 
        whileHover={{ flex: 1.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex-1 overflow-hidden h-1/2 sm:h-full cursor-pointer"
      >
        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
        <img 
          src="https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1200&auto=format&fit=crop" 
          alt="Women Category"
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-serif text-white mb-4 italic"
          >
            Women
          </motion.h2>
          <div className="h-px w-0 group-hover:w-24 bg-brand-gold transition-all duration-500" />
          <p className="mt-4 text-xs tracking-[0.3em] uppercase text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            Regal Cyber
          </p>
        </div>
      </motion.div>

      {/* CENTER LUXURY TAG */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden sm:block">
        <div className="bg-brand-white px-8 py-3 border border-brand-gold/30 shadow-2xl">
           <p className="text-[10px] tracking-[0.8em] text-brand-onyx uppercase">EST. 1996</p>
        </div>
      </div>
    </section>
  );
}
