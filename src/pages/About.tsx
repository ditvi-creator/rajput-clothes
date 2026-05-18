import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="min-h-screen pt-40 bg-brand-onyx px-8 selection:bg-brand-gold selection:text-brand-onyx">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] w-12 bg-brand-gold/30" />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold"
          >
            Since 1982
          </motion.p>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl font-serif text-brand-white mb-16 leading-tight"
        >
          A Legacy of <br /><span className="italic text-brand-gold">Craftsmanship</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-brand-white/70 leading-relaxed font-light">
          <div className="md:col-span-8">
            <p className="text-2xl text-brand-white/90 mb-10 leading-tight">
              Born from the heart of Rajput heritage, our maison was founded to preserve and promote the ancient textile traditions of the royal lineages.
            </p>
            <p className="mb-8">
              Every thread woven into our garments tells a story of valor, dignity, and the pursuit of aesthetic perfection. We work directly with master artisans across Rajasthan to bring you pieces that are not merely clothes, but wearable history.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
             <div className="p-8 border border-white/5 bg-white/[0.02]">
                <h3 className="text-brand-gold uppercase tracking-widest text-[10px] font-bold mb-4">Our Values</h3>
                <ul className="space-y-4 text-[11px] uppercase tracking-widest text-brand-white/40">
                  <li>Heritage First</li>
                  <li>Ethical Sourcing</li>
                  <li>Master Artisans</li>
                  <li>Royal Detail</li>
                </ul>
             </div>
          </div>
        </div>

        <div className="my-24 aspect-[21/9] w-full overflow-hidden grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 border border-white/10">
           <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000" alt="Artisan setup" />
        </div>

        <div className="prose prose-invert max-w-none text-brand-white/70 leading-relaxed font-light pb-32">
          <p>
            Our commitment to legacy architecture extends beyond our designs. We practice ethical sourcing and sustainable production, ensuring that the heritage we represent continues to thrive for generations to come.
          </p>
        </div>
      </div>
    </div>
  );
}
