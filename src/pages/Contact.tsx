import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-40 bg-brand-onyx px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-brand-gold text-xs uppercase tracking-[0.5em] mb-8">Concierge Services</p>
          <h1 className="text-4xl sm:text-6xl font-serif text-brand-white mb-8">Get in <span className="italic">Touch</span></h1>
          <p className="text-brand-white/60 mb-12 leading-loose">Whether you're seeking custom tailoring, heritage consultation, or support with an order, our concierge team is at your disposal.</p>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-brand-gold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-white/40 mb-1">Email Us</p>
                <p className="text-brand-white">concierge@rajputclothes.com</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-brand-gold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-white/40 mb-1">Call Us</p>
                <p className="text-brand-white">+91 (141) 555-0123</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-brand-gold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-white/40 mb-1">Atelier</p>
                <p className="text-brand-white">M.I. Road, Jaipur, Rajasthan</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-brand-surface/40 backdrop-blur-xl border border-white/5 p-8 sm:p-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors duration-700" />
          <form className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-white/40">Name</label>
                <input className="w-full bg-brand-onyx border border-white/10 px-4 py-4 text-brand-white outline-none focus:border-brand-gold transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-white/40">Email</label>
                <input className="w-full bg-brand-onyx border border-white/10 px-4 py-4 text-brand-white outline-none focus:border-brand-gold transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-white/40">Subject</label>
              <select className="w-full bg-brand-onyx border border-white/10 px-4 py-4 text-brand-white outline-none focus:border-brand-gold transition-colors appearance-none">
                <option>General Inquiry</option>
                <option>Custom Tailoring</option>
                <option>Order Support</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-white/40">Message</label>
              <textarea rows={5} className="w-full bg-brand-onyx border border-white/10 px-4 py-4 text-brand-white outline-none focus:border-brand-gold transition-colors resize-none" />
            </div>
            <button className="w-full py-5 bg-brand-gold text-brand-onyx text-[10px] tracking-[0.4em] uppercase font-black hover:bg-brand-white transition-all flex items-center justify-center gap-3">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
