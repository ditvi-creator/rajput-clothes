export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage: string;
  category: 'Men' | 'Women';
  tag?: string;
  description?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Heritage Sherwani',
    price: 45000,
    originalPrice: 65000,
    image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1594938363749-9ce03683f0f9?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    tag: '45% OFF',
    description: 'A masterpiece of craftsmanship featuring intricate gold thread work.'
  },
  {
    id: '2',
    name: 'Onyx Silk Saree',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1549439602-43bbcb347ad5?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    tag: 'NEW',
    description: 'Pure mulberry silk with a deep onyx sheen and minimalist borders.'
  },
  {
    id: '3',
    name: 'Gold Motif Kurta',
    price: 8500,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1552374196-cdd07c94c597?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    tag: 'SALE',
    description: 'Lightweight linen blend with subtle gold embroidery on the collar.'
  },
  {
    id: '4',
    name: 'Cyber-Heritage Lehenga',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1583391733975-6429355ea959?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    tag: 'EXCLUSIVE',
    description: 'A fusion of futuristic patterns and traditional hand-woven fabric.'
  },
  {
    id: '5',
    name: 'Regal Bandhgala Jacket',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1593030103066-009c9580435a?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    description: 'Velvet finished jacket with antique buttons and slim-fit tailoring.'
  },
  {
    id: '6',
    name: 'Emerald Anarkali Suit',
    price: 24500,
    originalPrice: 30000,
    image: 'https://images.unsplash.com/photo-1599421143899-7253503f89e5?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1599421144186-069fd5718712?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    tag: 'LIMITED',
    description: 'Flowing georgette with heavy silver zari work on the yoke.'
  },
  {
    id: '7',
    name: 'Saffron Silk Kurta',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1621335829175-95f437384d7c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1621335829141-9c6062f2dbf8?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    description: 'Bright saffron raw silk shirt perfect for summer occasions.'
  },
  {
    id: '8',
    name: 'Champagne Cocktail Gown',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a30c00c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1518831959520-2184c2e39998?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    tag: 'REFINED',
    description: 'Modern silhouette with traditional beadwork detailing.'
  },
  {
    id: '9',
    name: 'Midnight Velvet Blazer',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1594938363749-9ce03683f0f9?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    description: 'Deep navy velvet with satin lapels for an elite evening look.'
  },
  {
    id: '10',
    name: 'Ivory Chikankari Saree',
    price: 15500,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1549439602-43bbcb347ad5?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    description: 'Delicate hand embroidery from Lucknow on fine translucent cotton.'
  },
  {
    id: '11',
    name: 'Royal Blue Achkan',
    price: 36000,
    image: 'https://plus.unsplash.com/premium_photo-1682090843365-f75a6146ad5b?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://plus.unsplash.com/premium_photo-1682090843365-f75a6146ad5b?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    tag: 'BEST SELLER',
    description: 'Long coat-like garment featuring heritage floral motifs.'
  },
  {
    id: '12',
    name: 'Ruby Rose Lehenga',
    price: 92000,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    description: 'Bridal crimson with golden zardosi embroidery and heavy dupatta.'
  },
  {
    id: '13',
    name: 'Linen Jodhpur Pants',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1552374196-cdd07c94c597?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    description: 'Tapered heritage fit pants for a sharp, sophisticated silhouette.'
  },
  {
    id: '14',
    name: 'Turquoise Kaftan',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1583391733975-6429355ea959?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    tag: 'COMFORT',
    description: 'Breezy luxury silk kaftan with minimal metallic borders.'
  },
  {
    id: '15',
    name: 'Hand-loomed Nehru Vest',
    price: 7800,
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1593030103066-009c9580435a?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    description: 'Khadi silk vest with wooden buttons and signature monogram.'
  },
  {
    id: '16',
    name: 'Pastel Peach Sharara',
    price: 21000,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1549439602-43bbcb347ad5?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    description: 'Three-piece set with flared bottoms and mirror work highlights.'
  },
  {
    id: '17',
    name: 'Black Mandarin Shirt',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    description: 'Sleek black shirt with a clean mandarin collar and hidden placket.'
  },
  {
    id: '18',
    name: 'Golden Tissue Gown',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    tag: 'ROYAL',
    description: 'A shimmering gold gown that reimagines heritage tissue fabric.'
  },
  {
    id: '19',
    name: 'Embroidered Mojaris',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1552374196-cdd07c94c597?q=80&w=800&auto=format&fit=crop',
    category: 'Men',
    description: 'Hand-sewn leather footwear with royal crest patterns.'
  },
  {
    id: '20',
    name: 'Polki Statement Choker',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1583391733975-6429355ea959?q=80&w=800&auto=format&fit=crop',
    category: 'Women',
    tag: 'ANTIQUE',
    description: 'Uncut diamond set in heavy gold foil with emerald drops.'
  }
];
