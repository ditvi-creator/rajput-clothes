import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ChevronRight, Shield, Truck, RefreshCw, Star, Info, ShoppingBag, Zap, Check, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ImageMagnifier from '../components/ImageMagnifier';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const { id } = useParams();
  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return <div className="pt-40 text-center text-brand-white">Product not found.</div>;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    setIsAdding(true);
    addToCart(product, selectedSize);
    setTimeout(() => setIsAdding(false), 2000);
  };

  const images = [product.image, product.secondaryImage];

  return (
    <div className="pt-20 sm:pt-24 pb-20 bg-brand-onyx">
      <div className="container mx-auto px-4 sm:px-8">
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 mb-8 text-[10px] tracking-[0.2em] uppercase text-brand-white/40">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-white/80">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          {/* MEDIA GALLERY */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[3/4] overflow-hidden border border-white/5 bg-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="h-full w-full"
                >
                  <ImageMagnifier
                    src={images[activeImage]}
                    alt={product.name}
                    className="h-full w-full"
                    zoomLevel={2.5}
                    magnifierSize={180}
                  />
                </motion.div>
              </AnimatePresence>
              
              {product.tag && (
                <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-brand-onyx border border-brand-gold/50 backdrop-blur-md">
                   <p className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase">{product.tag}</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {images.map((img, idx) => (
                 <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "aspect-[3/4] overflow-hidden border transition-all duration-300",
                    activeImage === idx ? "border-brand-gold" : "border-white/5 opacity-50 hover:opacity-80"
                  )}
                 >
                   <img src={img} className="w-full h-full object-cover" />
                 </button>
               ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.6em] text-brand-gold uppercase font-bold mb-4">{product.category}'s Heritage</p>
              <h1 className="text-4xl sm:text-6xl font-serif text-brand-white leading-tight mb-4 lowercase italic">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 mb-6">
                 <span className="text-2xl font-medium text-brand-white">₹{product.price.toLocaleString('en-IN')}</span>
                 {product.originalPrice && (
                   <span className="text-lg text-brand-white/30 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                 )}
              </div>
              <p className="text-brand-white/60 font-light leading-relaxed max-w-md">
                {product.description || "A masterfully crafted piece that blends centuries-old traditions with the sharp, futuristic silhouettes of modern luxury fashion. Designed for the bold."}
              </p>
            </div>

            {/* SIZE SELECTION */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] tracking-[0.3em] font-bold text-brand-white uppercase">Select Size</p>
                <button className="text-[10px] tracking-[0.3em] text-brand-gold underline uppercase">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-12 border text-[10px] tracking-widest font-bold transition-all duration-300",
                      selectedSize === size 
                        ? "bg-brand-white text-brand-onyx border-brand-white" 
                        : "bg-transparent text-brand-white/40 border-white/10 hover:border-brand-white/40"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-4 mb-12">
               <motion.button 
                 onClick={handleAddToBag}
                 disabled={isAdding}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className={cn(
                   "w-full py-5 text-[10px] tracking-[0.4em] uppercase font-black transition-all flex items-center justify-center gap-3",
                   isAdding 
                    ? "bg-brand-gold text-brand-onyx" 
                    : "bg-brand-white text-brand-onyx hover:bg-brand-gold"
                 )}
               >
                 {isAdding ? (
                   <>
                     <Check className="w-4 h-4" /> Added to Bag
                   </>
                 ) : (
                   <>
                     <ShoppingBag className="w-4 h-4" /> Add to Bag
                   </>
                 )}
               </motion.button>
               <Link 
                 to="/checkout"
                 className="w-full"
               >
                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="w-full py-5 bg-transparent border border-brand-white text-brand-white text-[10px] tracking-[0.4em] uppercase font-black hover:bg-brand-white hover:text-brand-onyx transition-all flex items-center justify-center gap-3"
                 >
                   <Zap className="w-4 h-4" /> Quick Checkout
                 </motion.button>
               </Link>
               <motion.button 
                  onClick={() => toggleWishlist(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-5 border text-[10px] tracking-[0.4em] uppercase font-black transition-all flex items-center justify-center gap-3",
                    isWishlisted 
                     ? "bg-brand-gold border-brand-gold text-brand-onyx" 
                     : "bg-transparent border-white/20 text-brand-white hover:border-brand-white"
                  )}
                >
                  <Heart className={cn("w-4 h-4", isWishlisted && "fill-brand-onyx")} /> 
                  {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                </motion.button>
            </div>

            {/* TRUST MARKERS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/5">
               <TrustItem icon={<Truck className="w-4 h-4" />} title="Free Express" desc="Shipping over ₹40,000" />
               <TrustItem icon={<RefreshCw className="w-4 h-4" />} title="Returns" desc="14-Day Boutique Exchange" />
               <TrustItem icon={<Shield className="w-4 h-4" />} title="Heritage" desc="Original Authenticity" />
            </div>

            {/* ACCORDION */}
            <div className="mt-12 flex flex-col border-t border-white/5">
                <DetailsAccordion title="The Craft" content="Each Rajput Clothes piece is individually hand-finished by master artisans in Jaipur. We use heritage weaving techniques and ethically sourced materials, ensuring every garment is as sustainable as it is luxurious." />
                <DetailsAccordion title="Composition & Care" content="Primary Fabric: 100% Raw Mulberry Silk / Virgin Wool Blend. Dry Clean Only. Store in the provided luxury protection bag away from direct sunlight." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
      <div className="text-brand-gold">{icon}</div>
      <p className="text-[9px] tracking-widest text-brand-white font-bold uppercase">{title}</p>
      <p className="text-[9px] text-brand-white/40 tracking-wider font-light">{desc}</p>
    </div>
  );
}

function DetailsAccordion({ title, content }: { title: string, content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="w-full py-4 flex items-center justify-between text-[11px] tracking-[0.4em] text-brand-white uppercase font-bold text-left group"
       >
         {title}
         <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-brand-white/40 group-hover:text-brand-gold transition-colors">
            < ChevronDownIcon />
         </motion.div>
       </button>
       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: 'auto', opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="overflow-hidden"
           >
             <p className="pb-6 text-xs text-brand-white/50 leading-relaxed font-light">{content}</p>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
