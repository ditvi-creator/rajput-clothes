import React from 'react';
import { Instagram, Youtube, Pin as Pinterest, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-24 bg-brand-white border-t border-brand-white/5 text-brand-onyx">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
          {/* Column 1: The Brand */}
          <div className="flex flex-col gap-8 text-center sm:text-left">
            <h2 className="text-3xl font-serif tracking-tighter uppercase text-white">
               Rajput <span className="text-brand-gold">Clothes</span>
            </h2>
            <p className="text-xs text-onyx/40 leading-relaxed max-w-[280px] mx-auto sm:mx-0 opacity-60">
               Fusing elite royal heritage with cutting-edge modern fashion. 
               Dedicated to those who command presence.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-6">
              {[Instagram, MessageCircle, Youtube, Pinterest].map((Icon, idx) => (
                <a key={idx} href="#" className="text-brand-onyx/40 hover:text-brand-gold transition-all duration-300 transform hover:scale-110">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col gap-6 text-center sm:text-left">
            <h3 className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold">Shop</h3>
            <div className="flex flex-col gap-4 text-xs tracking-widest text-brand-onyx/60">
              <FooterLink>Men's New Arrivals</FooterLink>
              <FooterLink>Women's New Arrivals</FooterLink>
              <FooterLink>Best Sellers</FooterLink>
              <FooterLink>Gift Cards</FooterLink>
            </div>
          </div>

          {/* Column 3: Concierge */}
          <div className="flex flex-col gap-6 text-center sm:text-left">
            <h3 className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold">Concierge</h3>
            <div className="flex flex-col gap-4 text-xs tracking-widest text-brand-onyx/60">
              <FooterLink>Track Your Order</FooterLink>
              <FooterLink>Returns & Exchanges</FooterLink>
              <FooterLink>Size & Fit Guide</FooterLink>
              <FooterLink>FAQs & Help Center</FooterLink>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col gap-6 text-center sm:text-left">
            <h3 className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold">Legal</h3>
            <div className="flex flex-col gap-4 text-xs tracking-widest text-brand-onyx/60">
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Terms of Service</FooterLink>
              <FooterLink>Accessibility</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-brand-onyx/10 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60">
          <p className="text-[9px] tracking-[0.2em] uppercase">
            © 2026 Rajput Clothes. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[9px] tracking-[0.2em] uppercase">
            <span>Powered by Heritage</span>
            <span>Est. 1996</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="hover:text-brand-gold transition-colors duration-300">
      {children}
    </a>
  );
}
