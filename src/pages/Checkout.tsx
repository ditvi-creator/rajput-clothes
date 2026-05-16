import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { ChevronRight, ShieldCheck, Truck, Lock, CreditCard, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-gold/20">
            <ShieldCheck className="w-12 h-12 text-brand-onyx" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-brand-white mb-4 lowercase tracking-tight">Your order is <span className="italic text-brand-gold">secured.</span></h1>
          <p className="text-brand-white/40 mb-12 max-w-md mx-auto">Thank you for choosing Rajput Clothes. You will receive a confirmation email shortly with your tracking details.</p>
          <Link 
            to="/"
            className="px-12 py-5 bg-brand-white text-brand-onyx text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-brand-gold transition-colors"
          >
            RETURN TO HOME
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-8">
        <h1 className="text-5xl font-serif text-brand-white mb-12 lowercase italic opacity-80">Secured Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* CHECKOUT FORM */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <section>
              <h2 className="text-[15px] tracking-[0.4em] text-brand-gold uppercase font-bold mb-8 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border border-brand-gold flex items-center justify-center text-[8px]">1</span>
                Shipping Information
              </h2>
              <form onSubmit={handlePlaceOrder} className="grid grid-cols-2 gap-6">
                <Input label="First Name" placeholder="Rajesh" />
                <Input label="Last Name" placeholder="Kumar" />
                <div className="col-span-2">
                  <Input label="Address" placeholder="123 Royal Palace Road" />
                </div>
                <Input label="City" placeholder="Jaipur" />
                <Input label="State" placeholder="Rajasthan" />
                <Input label="PIN Code" placeholder="302001" />
                <Input label="Phone" placeholder="+91 XXXXX XXXXX" />
                
                <div className="col-span-2 mt-8">
                  <h2 className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold mb-8 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border border-brand-gold flex items-center justify-center text-[8px]">2</span>
                    Payment Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PaymentOption icon={<CreditCard className="w-5 h-5" />} name="Credit/Debit Card" active />
                    <PaymentOption icon={<Zap className="w-5 h-5" />} name="UPI / Net Banking" />
                  </div>
                </div>

                <div className="col-span-2 mt-12 bg-white/5 p-8 border border-white/5">
                   <div className="flex items-start gap-4 mb-8">
                      <Lock className="w-6 h-6 text-brand-gold" />
                      <div>
                        <p className="text-[10px] tracking-widest text-brand-white uppercase font-bold mb-1">Encrypted Transaction</p>
                        <p className="text-xs text-brand-white/40 leading-relaxed">Your data is protected by bank-level 256-bit SSL encryption. We never store your card details on our heritage servers.</p>
                      </div>
                   </div>
                   <button 
                    disabled={isProcessing || cart.length === 0}
                    className={cn(
                      "w-full py-6 text-[10px] tracking-[0.5em] uppercase font-bold transition-all",
                      isProcessing ? "bg-brand-gold/50 text-brand-onyx cursor-wait" : "bg-brand-white text-brand-onyx hover:bg-brand-gold"
                    )}
                   >
                     {isProcessing ? "PROCESSING SECURELY..." : "COMPLETE PURCHASE"}
                   </button>
                </div>
              </form>
            </section>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-5">
             <div className="sticky top-32 bg-white/5 p-8 border border-white/5">
                <h3 className="text-[10px] tracking-[0.4em] text-brand-gold uppercase font-bold mb-8">Order Summary</h3>
                <div className="flex flex-col gap-6 mb-8 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                      <div className="w-16 aspect-[3/4] overflow-hidden bg-white/5">
                        <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs tracking-widest text-brand-white uppercase font-bold mb-1">{item.name}</h4>
                        <p className="text-[10px] text-brand-white/40 uppercase mb-2">Size: {item.selectedSize} × {item.quantity}</p>
                        <p className="text-xs text-brand-gold font-bold font-mono">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col gap-4">
                   <div className="flex justify-between text-xs tracking-widest text-brand-white/40 uppercase">
                      <span>Subtotal</span>
                      <span className="font-mono text-[25px]">₹{totalPrice.toLocaleString('en-IN')}</span>
                   </div>
                   <div className="flex justify-between text-xs tracking-widest text-brand-white/40 uppercase">
                      <span>Shipping</span>
                      <span className="text-brand-gold font-bold">FREE</span>
                   </div>
                   <div className="flex justify-between text-lg tracking-[0.2em] text-brand-white uppercase font-serif mt-4 pt-4 border-t border-white/10">
                      <span>Total</span>
                      <span className="text-brand-gold text-[25px]">₹{totalPrice.toLocaleString('en-IN')}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

function Input({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[15px] tracking-widest text-brand-white/40 uppercase font-bold">{label}</label>
      <input 
        required
        type="text" 
        placeholder={placeholder}
        className="bg-transparent border-b border-white/10 py-3 text-sm text-brand-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold transition-colors"
      />
    </div>
  );
}

function PaymentOption({ icon, name, active }: { icon: React.ReactNode, name: string, active?: boolean }) {
  return (
    <button 
      type="button"
      className={cn(
        "flex items-center gap-4 p-5 border transition-all duration-300",
        active ? "border-brand-gold bg-brand-gold/10" : "border-white/5 hover:border-white/20"
      )}
    >
      <div className={cn(active ? "text-brand-gold" : "text-white/20")}>{icon}</div>
      <span className={cn("text-[10px] tracking-widest uppercase font-bold", active ? "text-brand-white" : "text-brand-white/40")}>{name}</span>
    </button>
  );
}
