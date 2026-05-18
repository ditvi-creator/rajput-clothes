import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, Product } from '../constants';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown, Check, X, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Shop() {
  const [category, setCategory] = useState<'All' | 'Men' | 'Women'>('All');
  const [sortBy, setSortBy] = useState<'Featured' | 'Newest' | 'Price: Low' | 'Price: High'>('Featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Filter States
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const materials = Array.from(new Set(PRODUCTS.map(p => p.material?.trim()).filter(Boolean))) as string[];
    const colors = Array.from(new Set(PRODUCTS.map(p => p.color?.trim()).filter(Boolean))) as string[];
    const sizes = Array.from(new Set(PRODUCTS.flatMap(p => p.sizes || []).map(s => s.trim()))).filter(Boolean) as string[];
    
    return {
      materials: materials.sort(),
      colors: colors.sort(),
      sizes: sizes.sort()
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    
    // Category Filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    
    // Material Filter
    if (selectedMaterials.length > 0) {
      result = result.filter(p => p.material && selectedMaterials.includes(p.material));
    }
    
    // Color Filter
    if (selectedColors.length > 0) {
      result = result.filter(p => p.color && selectedColors.includes(p.color));
    }
    
    // Size Filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
    }
    
    // Sorting
    if (sortBy === 'Price: Low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Newest') {
      result.reverse();
    }
    
    return result;
  }, [category, sortBy, selectedMaterials, selectedColors, selectedSizes]);

  const toggleFilter = (type: 'material' | 'color' | 'size', value: string) => {
    if (type === 'material') {
      setSelectedMaterials(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (type === 'color') {
      setSelectedColors(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (type === 'size') {
      setSelectedSizes(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    }
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const activeFiltersCount = selectedMaterials.length + selectedColors.length + selectedSizes.length;

  return (
    <div className="pt-24 sm:pt-32 pb-20 bg-brand-onyx min-h-screen">
      {/* HEADER */}
      <div className="container mx-auto px-4 sm:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase font-bold mb-4">THE COLLECTION</p>
            <h1 className="text-5xl sm:text-7xl font-serif text-brand-white lowercase opacity-90 leading-[0.8]">
              heritage <span className="font-serif italic font-light text-brand-gold">universe</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 border-b border-brand-white/10 pb-4">
            {(['All', 'Men', 'Women'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "text-[10px] tracking-[0.3em] uppercase font-black transition-colors",
                  category === cat ? "text-brand-gold" : "text-brand-white/40 hover:text-brand-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="sticky top-16 sm:top-20 z-40 bg-brand-onyx/90 backdrop-blur-xl border-y border-brand-white/5 py-5 mb-12 shadow-sm">
        <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between">
          <button 
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors group"
          >
            <SlidersHorizontal className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> 
            Filter 
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 bg-brand-gold text-brand-onyx rounded-full flex items-center justify-center text-[8px] font-black">
                {activeFiltersCount}
              </span>
            )}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-brand-white hover:text-brand-gold transition-colors"
            >
              Sort By: <span className="text-brand-gold font-black">{sortBy}</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", isSortOpen ? "rotate-180" : "")} />
            </button>
            
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 w-48 bg-brand-surface border border-brand-white/10 shadow-2xl z-50 overflow-hidden"
                >
                  {(['Featured', 'Newest', 'Price: Low', 'Price: High'] as const).map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-6 py-4 text-[10px] tracking-widest uppercase text-left hover:bg-brand-gold/10 transition-colors"
                    >
                      <span className={sortBy === option ? "text-brand-gold font-bold" : "text-brand-white/60"}>
                        {option}
                      </span>
                      {sortBy === option && <Check className="w-3 h-3 text-brand-gold" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 flex gap-12">
        {/* DESKTOP SIDEBAR FILTER */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-40 space-y-12">
            <FilterSection 
              title="Size" 
              options={filterOptions.sizes} 
              activeOptions={selectedSizes}
              onToggle={(val) => toggleFilter('size', val)}
            />
            <FilterSection 
              title="Material" 
              options={filterOptions.materials} 
              activeOptions={selectedMaterials}
              onToggle={(val) => toggleFilter('material', val)}
            />
            <FilterSection 
              title="Color" 
              options={filterOptions.colors} 
              activeOptions={selectedColors}
              onToggle={(val) => toggleFilter('color', val)}
            />
            
            {activeFiltersCount > 0 && (
              <button 
                onClick={clearFilters}
                className="text-[10px] tracking-[0.3em] uppercase text-brand-gold hover:text-brand-white underline underline-offset-4 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* GRID */}
        <div className="flex-1">
          <motion.div 
            layout
            className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-1 sm:gap-x-8 gap-y-4 sm:gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="py-40 text-center">
              <p className="text-brand-white/40 uppercase tracking-[0.5em] mb-4 text-xs italic">No items found in this realm.</p>
              <button 
                onClick={clearFilters}
                className="text-brand-gold text-[10px] tracking-[0.4em] uppercase font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-full max-w-sm h-full bg-brand-onyx z-[110] border-l border-brand-white/5 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-xl font-serif text-brand-white">Filters</h2>
                <button onClick={() => setIsFilterDrawerOpen(false)}>
                  <X className="w-6 h-6 text-brand-white/40 hover:text-brand-gold transition-colors" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar space-y-12 pb-12">
                <FilterSection 
                  title="Size" 
                  options={filterOptions.sizes} 
                  activeOptions={selectedSizes}
                  onToggle={(val) => toggleFilter('size', val)}
                />
                <FilterSection 
                  title="Material" 
                  options={filterOptions.materials} 
                  activeOptions={selectedMaterials}
                  onToggle={(val) => toggleFilter('material', val)}
                />
                <FilterSection 
                  title="Color" 
                  options={filterOptions.colors} 
                  activeOptions={selectedColors}
                  onToggle={(val) => toggleFilter('color', val)}
                />
              </div>

              <div className="pt-8 border-t border-brand-white/10 flex flex-col gap-4">
                <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full py-5 bg-brand-white text-brand-onyx text-[10px] tracking-[0.4em] uppercase font-black"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
                {activeFiltersCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="w-full py-4 text-[10px] tracking-[0.3em] uppercase text-brand-white/40 font-bold"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  options: string[];
  activeOptions: string[];
  onToggle: (option: string) => void;
}

function FilterSection({ title, options, activeOptions, onToggle }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between group"
      >
        <span className="text-[12px] tracking-[0.4em] text-brand-white uppercase font-bold group-hover:text-brand-gold transition-colors tracking-[0.6em]">{title}</span>
        <ChevronRight className={cn("w-3 h-3 text-brand-white/20 transition-transform", isOpen ? "rotate-90" : "")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pt-2">
              {options.map(option => (
                <button
                  key={`${title}-${option}`}
                  onClick={() => onToggle(option)}
                  className={cn(
                    "px-4 py-2 border text-[13px] tracking-widest uppercase font-black transition-all duration-300",
                    activeOptions.includes(option)
                      ? "bg-brand-gold border-brand-gold text-brand-onyx"
                      : "bg-brand-surface border-brand-white/5 text-brand-white/60 hover:border-brand-white/40"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
