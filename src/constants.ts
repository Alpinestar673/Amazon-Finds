import { Product, Testimonial } from './types';

export const CATEGORIES = [
  'All Finds',
  'Home Essentials',
  'Kitchen Gadgets',
  'Car Accessories',
  'Beauty & Self Care',
  'Tech Finds'
];

export const PRODUCTS: Product[] = [
  // Trending / Viral
  {
    id: '1',
    name: 'Electric Jar Opener',
    image: 'https://picsum.photos/seed/jar/400/400',
    hook: 'You didn’t know you needed this until now',
    benefits: ['Hands-free operation', 'Opens any jar size', 'Perfect for arthritis'],
    rating: 4.8,
    price: '$24.99',
    category: 'Kitchen Gadgets',
    isViral: true,
    amazonUrl: 'https://amazon.com'
  },
  {
    id: '2',
    name: 'Sunset Projection Lamp',
    image: 'https://picsum.photos/seed/lamp/400/400',
    hook: 'This changes the entire vibe of your room',
    benefits: ['16 color modes', 'Remote controlled', 'Perfect for TikTok'],
    rating: 4.7,
    price: '$19.99',
    category: 'Home Essentials',
    isViral: true,
    amazonUrl: 'https://amazon.com'
  },
  {
    id: '3',
    name: 'Portable Car Vacuum',
    image: 'https://picsum.photos/seed/vacuum/400/400',
    hook: 'Why is no one talking about how powerful this is?',
    benefits: ['Cordless & lightweight', 'HEPA filter', 'High suction power'],
    rating: 4.9,
    price: '$35.00',
    category: 'Car Accessories',
    isBestSeller: true,
    amazonUrl: 'https://amazon.com'
  },
  // Home Essentials
  {
    id: '4',
    name: 'Motion Sensor Closet Lights',
    image: 'https://picsum.photos/seed/lights/400/400',
    hook: 'I wish I found this sooner for my dark closets',
    benefits: ['USB rechargeable', 'Easy magnetic mount', 'Auto on/off'],
    rating: 4.6,
    price: '$29.99',
    category: 'Home Essentials',
    amazonUrl: 'https://amazon.com'
  },
  {
    id: '5',
    name: 'Aesthetic Glass Straws',
    image: 'https://picsum.photos/seed/straws/400/400',
    hook: 'The most satisfying way to drink your iced coffee',
    benefits: ['Eco-friendly', 'Heat resistant', 'Easy to clean'],
    rating: 4.8,
    price: '$12.99',
    category: 'Home Essentials',
    amazonUrl: 'https://amazon.com'
  },
  // Kitchen Gadgets
  {
    id: '6',
    name: 'Vegetable Chopper Pro',
    image: 'https://picsum.photos/seed/chopper/400/400',
    hook: 'This cut my meal prep time in half',
    benefits: ['12 interchangeable blades', 'Large container', 'Dishwasher safe'],
    rating: 4.9,
    price: '$22.50',
    category: 'Kitchen Gadgets',
    isLimitedDeal: true,
    amazonUrl: 'https://amazon.com'
  },
  {
    id: '7',
    name: 'Silicone Stovetop Gap Cover',
    image: 'https://picsum.photos/seed/gap/400/400',
    hook: 'No more crumbs falling between the stove!',
    benefits: ['Heat resistant', 'Universal fit', 'Easy to wipe clean'],
    rating: 4.5,
    price: '$9.99',
    category: 'Kitchen Gadgets',
    amazonUrl: 'https://amazon.com'
  },
  // Car Accessories
  {
    id: '8',
    name: 'Car Trash Can with Lid',
    image: 'https://picsum.photos/seed/trash/400/400',
    hook: 'Keep your car spotless with this simple find',
    benefits: ['Leakproof liner', 'Adjustable strap', 'Compact design'],
    rating: 4.7,
    price: '$14.99',
    category: 'Car Accessories',
    amazonUrl: 'https://amazon.com'
  },
  // Beauty & Self Care
  {
    id: '9',
    name: 'Ice Roller for Face',
    image: 'https://picsum.photos/seed/roller/400/400',
    hook: 'My morning routine secret for depuffing',
    benefits: ['Reduces redness', 'Calms skin', 'Shrinks pores'],
    rating: 4.8,
    price: '$15.99',
    category: 'Beauty & Self Care',
    isViral: true,
    amazonUrl: 'https://amazon.com'
  },
  {
    id: '10',
    name: 'Scalp Massager Brush',
    image: 'https://picsum.photos/seed/scalp/400/400',
    hook: 'The best $8 I ever spent on my hair',
    benefits: ['Deep cleans scalp', 'Promotes growth', 'Relaxing massage'],
    rating: 4.9,
    price: '$7.99',
    category: 'Beauty & Self Care',
    amazonUrl: 'https://amazon.com'
  },
  // Tech Finds
  {
    id: '11',
    name: 'Cleaning Gel for Electronics',
    image: 'https://picsum.photos/seed/gel/400/400',
    hook: 'Oddly satisfying and actually works',
    benefits: ['Reusable', 'Reaches tight gaps', 'No residue'],
    rating: 4.6,
    price: '$6.99',
    category: 'Tech Finds',
    isViral: true,
    amazonUrl: 'https://amazon.com'
  },
  {
    id: '12',
    name: 'Cable Management Box',
    image: 'https://picsum.photos/seed/cable/400/400',
    hook: 'Hide that messy cable nest instantly',
    benefits: ['Large capacity', 'Kid & pet proof', 'Ventilated design'],
    rating: 4.7,
    price: '$18.99',
    category: 'Tech Finds',
    amazonUrl: 'https://amazon.com'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Sarah J.', text: 'This actually works! My kitchen is so much more organized now.', rating: 5 },
  { id: '2', name: 'Mike R.', text: 'Best purchase this month. The car vacuum is a game changer.', rating: 5 },
  { id: '3', name: 'Alex T.', text: 'I saw this on TikTok and had to get it. No regrets!', rating: 5 },
  { id: '4', name: 'Jessica W.', text: 'The jar opener is perfect for my mom. She loves it!', rating: 5 }
];
