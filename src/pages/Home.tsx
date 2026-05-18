import React from 'react';
import { motion } from 'motion/react';
import SplitHero from '../components/SplitHero';
import CollectionCarousel from '../components/CollectionCarousel';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <SplitHero />
      
      <CollectionCarousel />
      
      {/* MISSION SECTION */}
      <section className="py-32 bg-brand-surface/30">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 aspect-[4/5] overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=1200&auto=format&fit=crop" 
                  alt="Heritage"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-brand-gold/20 -z-0" />
              <div className="absolute -top-10 -left-10 w-64 h-64 border border-brand-gold/20 -z-0" />
            </div>
            
            <div className="flex flex-col gap-8">
              <p className="text-[10px] tracking-[0.6em] text-brand-gold uppercase font-bold">OUR PHILOSOPHY</p>
              <h2 className="text-5xl sm:text-7xl font-serif text-brand-white leading-[0.9]">
                The <span className="italic">Rajput</span> Spirit.
              </h2>
              <p className="text-brand-white/60 text-lg font-light leading-relaxed max-w-xl">
                We believe that clothing is not just attire; it is a declaration of identity. Rajput Clothes merges the timeless elegance of royal heritage with the bold, industrial edge of cyber-culture. Each piece is a testament to the artisan's skill and the visionary's courage.
              </p>
              <div className="flex flex-col gap-6 mt-4">
                <FeatureItem 
                  icon={<Star className="w-5 h-5" />} 
                  title="Elite Craftsmanship" 
                  desc="Hand-woven fabrics and intricate embroidery by master artisans."
                />
                <FeatureItem 
                  icon={<Shield className="w-5 h-5" />} 
                  title="Royal Legacy" 
                  desc="Designs inspired by centuries of royal aesthetics and heritage."
                />
                <FeatureItem 
                  icon={<Zap className="w-5 h-5" />} 
                  title="Future Oriented" 
                  desc="Modern silhouettes for the digital age and the bold visionary."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE SECTION */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
          poster="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1800&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-man-walking-in-a-dark-alley-34446-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        
        <div className="relative z-10 text-center px-4">
          <h3 className="text-6xl sm:text-8xl font-serif text-white uppercase tracking-tighter mb-8 leading-none">
            REDEFINE <br /> <span className="text-brand-gold italic">PRESENCE</span>
          </h3>
          <p className="text-white/60 tracking-[0.5em] uppercase text-xs sm:text-sm mb-12">Command the Room without a Single Word</p>
          <Link 
            to="/shop"
            className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black text-[15px] tracking-[0.4em] uppercase font-black hover:bg-brand-gold transition-colors"
          >
            ENTER THE UNIVERSE <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* INSTAGRAM GRID */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-8">
           <div className="flex flex-col items-center mb-20 text-center">
              <p className="text-[10px] tracking-[0.6em] text-brand-gold uppercase font-bold mb-4">#RAJPUTCLOTHES</p>
              <h2 className="text-4xl sm:text-6xl font-serif text-brand-white italic">Seen in the Wild</h2>
           </div>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800',
                'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=800',
                'https://images.unsplash.com/photo-1549439602-43bbcb347ad5?q=80&w=800',
                'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800'
              ].map((img, idx) => (
                <div key={idx} className="aspect-square overflow-hidden group border border-brand-white/5">
                   <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" />
                </div>
              ))}
           </div>
        </div>
      </section>
    </>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-brand-gold">{icon}</div>
      <div>
        <h4 className="text-brand-white uppercase tracking-widest text-xs font-bold mb-1">{title}</h4>
        <p className="text-brand-white/40 text-sm font-light leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
