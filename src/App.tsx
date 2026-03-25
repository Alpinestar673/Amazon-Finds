/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShoppingCart, 
  Instagram, 
  Play,
  X,
  ChevronDown,
  ShieldCheck,
  Truck,
  Flame,
  Search,
  Menu,
  Heart,
  Eye,
  Clock,
  Mail,
  Filter,
  ChevronRight,
  ChevronLeft,
  Award,
  ThumbsUp,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Testimonial } from './types';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from './constants';

// --- Components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${className}`}>
    {children}
  </span>
);

const ProductCard = ({ 
  product, 
  onToggleWishlist, 
  isWishlisted 
}: { 
  product: Product, 
  onToggleWishlist: (id: string) => void,
  isWishlisted: boolean
}) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl overflow-hidden card-shadow border border-amazon-light group flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-amazon-light">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isViral && (
            <Badge className="bg-amazon-orange text-white">🔥 Viral</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-amazon-blue text-white">🏆 Best Seller</Badge>
          )}
          {product.isLimitedDeal && (
            <Badge className="bg-red-600 text-white">⚡ Limited Deal</Badge>
          )}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all shadow-sm z-10 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-sm text-amazon-blue hover:text-red-500'}`}
        >
          <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < Math.floor(product.rating) ? "fill-amazon-orange text-amazon-orange" : "text-gray-300"} 
            />
          ))}
          <span className="text-xs font-bold text-gray-400 ml-1">{product.rating}</span>
        </div>
        
        <h3 className="font-black text-lg leading-tight mb-1 group-hover:text-amazon-orange transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm italic text-gray-500 mb-4 line-clamp-1">
          "{product.hook}"
        </p>
        
        <ul className="space-y-1.5 mb-6 flex-grow">
          {product.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center justify-between gap-4 mt-auto">
          <div className="text-xl font-black text-amazon-blue">{product.price}</div>
          <a 
            href={product.amazonUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-grow bg-amazon-orange hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 cta-glow"
          >
            Check Price <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle?: string, icon?: any }) => (
  <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div>
      <h2 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-3">
        {Icon && <Icon className="text-amazon-orange" size={32} />}
        {title}
      </h2>
      {subtitle && <p className="text-gray-500 font-medium mt-1">{subtitle}</p>}
    </div>
    <div className="h-1 flex-grow bg-amazon-light rounded-full ml-4 hidden md:block" />
  </div>
);

const ProductModal = ({ product, onClose, onToggleWishlist, isWishlisted }: { 
  product: Product, 
  onClose: () => void, 
  onToggleWishlist: (id: string) => void,
  isWishlisted: boolean
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.hook,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-amazon-blue/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white rounded-[32px] max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm hover:bg-amazon-light rounded-full transition-colors shadow-sm"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-1/2 aspect-square bg-amazon-light relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            {product.isViral && <Badge className="bg-amazon-orange text-white">🔥 Viral</Badge>}
            {product.isBestSeller && <Badge className="bg-amazon-blue text-white">🏆 Best Seller</Badge>}
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                className={i < Math.floor(product.rating) ? "fill-amazon-orange text-amazon-orange" : "text-gray-300"} 
              />
            ))}
            <span className="text-sm font-bold text-gray-400 ml-2">{product.rating} Rating</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter leading-tight">{product.name}</h2>
          <p className="text-xl italic text-gray-500 mb-8 leading-relaxed">"{product.hook}"</p>

          <div className="space-y-4 mb-10">
            <h4 className="font-black uppercase tracking-widest text-xs text-amazon-orange">Why You Need This:</h4>
            <ul className="space-y-3">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 font-medium">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="text-3xl font-black text-amazon-blue">{product.price}</div>
            <a 
              href={product.amazonUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-amazon-orange hover:bg-orange-500 text-white px-8 py-5 rounded-2xl font-black text-lg uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl cta-glow"
            >
              Shop Now on Amazon <ExternalLink />
            </a>
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`flex-grow sm:flex-grow-0 p-5 rounded-2xl transition-all border-2 ${isWishlisted ? 'bg-red-50 text-red-500 border-red-500' : 'bg-white text-gray-400 border-gray-100 hover:border-red-500 hover:text-red-500'}`}
              >
                <Heart size={24} className={isWishlisted ? "fill-current" : ""} />
              </button>
              <button 
                onClick={handleShare}
                aria-label="Share product"
                className="flex-grow sm:flex-grow-0 p-5 rounded-2xl transition-all border-2 bg-white text-gray-400 border-gray-100 hover:border-amazon-blue hover:text-amazon-blue"
              >
                <ArrowRight className="rotate-[-45deg]" size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Finds');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  const [isScrolled, setIsScrolled] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('amazon_finds_wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('amazon_finds_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Filter products based on category and search query
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All Finds' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.hook.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWishlist = !showWishlistOnly || wishlist.includes(p.id);
    return matchesCategory && matchesSearch && matchesWishlist;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Exit intent logic
  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitPopup(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating notifications
  useEffect(() => {
    const names = ["Sarah J.", "Mike R.", "Alex T.", "Jessica W.", "David L.", "Emma B."];
    const items = ["Electric Jar Opener", "Car Vacuum", "Sunset Lamp", "Vegetable Chopper"];
    
    const showNext = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const item = items[Math.floor(Math.random() * items.length)];
      setNotificationText(`${name} just checked the price for ${item}! 🛒`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    };

    const interval = setInterval(showNext, 15000);
    setTimeout(showNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* --- HEADER --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amazon-orange rounded-xl flex items-center justify-center text-white shadow-lg">
              <ShoppingCart size={24} />
            </div>
            <div className="font-black text-2xl tracking-tighter">
              AMAZON<span className="text-amazon-orange">FINDS</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
            <a href="#trending" className="hover:text-amazon-orange transition-colors">Trending</a>
            <a href="#categories" className="hover:text-amazon-orange transition-colors">Categories</a>
            <a href="#deals" className="hover:text-amazon-orange transition-colors">Deals</a>
            <a href="#reviews" className="hover:text-amazon-orange transition-colors">Reviews</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? 'w-48 md:w-64' : 'w-10'}`}>
              <input 
                type="text"
                placeholder="Search finds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-amazon-light rounded-full py-2 pl-10 pr-4 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange transition-all ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`absolute left-0 p-2 hover:bg-amazon-light rounded-full transition-colors ${isSearchOpen ? 'text-amazon-orange' : 'text-amazon-blue'}`}
              >
                <Search size={20} />
              </button>
            </div>
            
            <button 
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`relative p-2 hover:bg-amazon-light rounded-full transition-colors ${showWishlistOnly ? 'bg-amazon-orange/10 text-amazon-orange' : ''}`}
            >
              <Heart size={20} className={wishlist.length > 0 || showWishlistOnly ? "fill-current text-red-500" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-amazon-orange text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            <button className="md:hidden p-2 hover:bg-amazon-light rounded-full transition-colors">
              <Menu size={20} />
            </button>
            <a href="#deals" className="hidden sm:flex bg-amazon-blue text-white px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amazon-orange transition-all active:scale-95">
              Today's Deals
            </a>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-amazon-light">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 p-4 rotate-12 scale-150">
            {[...Array(32)].map((_, i) => (
              <div key={i} className="aspect-square bg-amazon-blue rounded-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-amazon-orange text-white mb-6">
                <Flame size={12} className="fill-white" /> Seen on TikTok • Loved by thousands
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
                Amazon Finds That <br />
                <span className="text-amazon-orange italic">Actually</span> Make Life Easier
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 font-medium leading-relaxed">
                Viral, useful, and surprisingly affordable products that solve everyday problems. We test and curate only the absolute best finds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#categories" 
                  className="bg-amazon-blue text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl hover:bg-amazon-orange"
                >
                  Explore Finds <ArrowRight />
                </a>
                <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-amazon-light shadow-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                    ))}
                  </div>
                  <div className="text-sm font-bold">
                    <div className="text-amazon-orange">10,000+</div>
                    <div className="text-gray-400 uppercase text-[10px] tracking-widest">Happy Buyers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TRENDING NOW --- */}
      <section id="trending" className="py-20 max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Trending Now" 
          subtitle="The viral products everyone is talking about right now" 
          icon={TrendingUp} 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => p.isViral).map(product => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
              <ProductCard 
                product={product} 
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- CATEGORY FILTER --- */}
      <section id="categories" className="py-20 bg-amazon-light/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title={showWishlistOnly ? "Your Wishlist" : "Shop by Category"} 
            subtitle={showWishlistOnly ? "Items you've saved for later" : "Find exactly what you need to upgrade your lifestyle"} 
            icon={showWishlistOnly ? Heart : Filter} 
          />
          
          {!showWishlistOnly && (
            <div className="flex overflow-x-auto pb-8 gap-4 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 ${activeCategory === cat ? 'bg-amazon-orange text-white shadow-lg' : 'bg-white text-amazon-blue border border-amazon-light hover:border-amazon-orange'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {displayedProducts.map(product => (
                <div key={product.id} onClick={() => setSelectedProduct(product)} className="relative group cursor-pointer">
                  <ProductCard 
                    product={product} 
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-amazon-light rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                {showWishlistOnly ? <Heart size={40} /> : <Search size={40} />}
              </div>
              <h3 className="text-2xl font-black mb-2">{showWishlistOnly ? "Your wishlist is empty" : "No finds found"}</h3>
              <p className="text-gray-500 font-medium">{showWishlistOnly ? "Start hearting items to save them here!" : "Try searching for something else or browse categories."}</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All Finds'); setShowWishlistOnly(false);}}
                className="mt-6 text-amazon-orange font-black uppercase tracking-widest text-sm hover:underline"
              >
                {showWishlistOnly ? "Explore All Finds" : "Clear all filters"}
              </button>
            </div>
          )}
          
          {visibleCount < filteredProducts.length && (
            <div className="mt-12 text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="bg-white border-2 border-amazon-blue text-amazon-blue px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-amazon-blue hover:text-white transition-all active:scale-95"
              >
                Load More Finds
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- SHORT VIDEO SECTION --- */}
      <section className="py-20 bg-amazon-blue text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <Badge className="bg-amazon-orange text-white mb-6">Watch & Shop</Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                See These Finds <br />
                <span className="text-amazon-orange italic">In Action</span>
              </h2>
              <p className="text-lg text-gray-400 mb-10 font-medium">
                We test every product so you don't have to. Watch our quick demos to see how these viral gadgets actually perform in real life.
              </p>
              <div className="space-y-6">
                {[
                  "Honest, unfiltered reviews",
                  "Real-world problem solving",
                  "Instant shop links"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-amazon-orange/20 rounded-full flex items-center justify-center text-amazon-orange">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="font-bold text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10 }}
                  className="relative w-72 aspect-[9/16] rounded-[32px] overflow-hidden border-4 border-white/10 shrink-0 group cursor-pointer snap-center shadow-2xl"
                >
                  <img 
                    src={`https://picsum.photos/seed/viral-video-${i}/400/700`} 
                    alt="Video Preview" 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amazon-blue/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white shadow-xl group-hover:bg-amazon-orange group-hover:border-amazon-orange transition-all"
                    >
                      <Play size={24} className="ml-1 fill-white" />
                    </motion.div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-sm font-bold mb-3 line-clamp-2">Why everyone is obsessed with this {i === 1 ? 'kitchen gadget' : i === 2 ? 'home hack' : 'tech find'}... 😱</p>
                    <div className="bg-amazon-orange text-white px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-lg group-hover:scale-105 transition-transform">
                      Shop This Find
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- DEALS / LIMITED OFFERS --- */}
      <section id="deals" className="py-20 bg-amazon-orange/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[40px] p-8 md:p-16 card-shadow border border-amazon-orange/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amazon-orange/10 blur-[100px] rounded-full" />
            
            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
              <div className="flex-grow text-center lg:text-left">
                <Badge className="bg-red-600 text-white mb-6">Limited Time Offer</Badge>
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                  Today's Best <br />
                  <span className="text-amazon-orange">Flash Deals</span>
                </h2>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
                  <div className="bg-amazon-blue text-white px-6 py-4 rounded-2xl text-center min-w-[100px]">
                    <div className="text-2xl font-black">{formatTime(timeLeft).split(':')[0]}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">Hours</div>
                  </div>
                  <div className="bg-amazon-blue text-white px-6 py-4 rounded-2xl text-center min-w-[100px]">
                    <div className="text-2xl font-black">{formatTime(timeLeft).split(':')[1]}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">Minutes</div>
                  </div>
                  <div className="bg-amazon-blue text-white px-6 py-4 rounded-2xl text-center min-w-[100px]">
                    <div className="text-2xl font-black">{formatTime(timeLeft).split(':')[2]}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">Seconds</div>
                  </div>
                </div>
                <p className="text-lg text-gray-500 font-bold flex items-center justify-center lg:justify-start gap-2">
                  <AlertTriangle className="text-red-600" size={20} /> Limited stock available. Deals reset daily.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
                {PRODUCTS.filter(p => p.isLimitedDeal).map(product => (
                  <div key={product.id} className="bg-amazon-light rounded-3xl p-6 flex items-center gap-6 border border-white">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-24 h-24 rounded-2xl object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-black text-sm mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-red-600 font-black">{product.price}</span>
                        <span className="text-xs text-gray-400 line-through">$45.00</span>
                      </div>
                      <a href={product.amazonUrl} className="bg-amazon-blue text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amazon-orange transition-colors">
                        Get Deal
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section id="reviews" className="py-20 max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="What People Are Saying" 
          subtitle="Real reviews from real buyers who found their new favorites" 
          icon={ThumbsUp} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-white p-8 rounded-3xl card-shadow border border-amazon-light">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-amazon-orange text-amazon-orange" />)}
              </div>
              <p className="text-gray-600 font-medium italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amazon-light rounded-full flex items-center justify-center font-black text-amazon-blue">
                  {t.name[0]}
                </div>
                <div className="text-sm font-black">{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- EMAIL CAPTURE --- */}
      <section className="py-20 bg-amazon-blue text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-amazon-orange rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12">
            <Mail size={40} />
          </div>
          {emailSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-[40px] p-12 border-2 border-amazon-orange"
            >
              <div className="w-20 h-20 bg-amazon-orange rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-black mb-4">You're In!</h3>
              <p className="text-lg text-gray-300 font-medium">
                Check your inbox for your first exclusive deal. Welcome to the inner circle!
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
                Get The Best Finds <br />
                <span className="text-amazon-orange">Before Everyone Else</span>
              </h2>
              <p className="text-lg text-gray-400 mb-10 font-medium">
                Join 50,000+ subscribers and get exclusive daily deals, viral finds, and early access to the hottest Amazon products.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => { e.preventDefault(); setEmailSubmitted(true); }}>
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address" 
                  className="flex-grow bg-white/10 border-2 border-white/10 rounded-2xl px-6 py-5 font-bold text-white placeholder:text-gray-500 focus:outline-none focus:border-amazon-orange transition-colors"
                />
                <button type="submit" className="bg-amazon-orange text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-orange-500 transition-all active:scale-95 shadow-xl">
                  Join Free
                </button>
              </form>
              <p className="mt-6 text-xs text-gray-500 font-bold uppercase tracking-widest">
                No spam. Only the good stuff. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </section>

      {/* --- WHY TRUST US --- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Award size={40} />, title: "Expert Curation", desc: "We spend hundreds of hours testing products so you don't have to buy random junk." },
            { icon: <Zap size={40} />, title: "Viral Only", desc: "We only feature products that are actually trending and solving real problems." },
            { icon: <ShieldCheck size={40} />, title: "Honest Reviews", desc: "If a product doesn't live up to the hype, it doesn't make it onto our list." }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 bg-amazon-light rounded-[30px] flex items-center justify-center mx-auto mb-6 text-amazon-blue group-hover:bg-amazon-orange group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-12">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4">{item.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 bg-amazon-light border-t border-amazon-orange/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
            Don't Miss Today's <br />
            <span className="text-amazon-orange">Best Finds</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 font-medium">
            The internet's favorite products are selling out fast. <br className="hidden md:block" />
            Check the latest availability and prices on Amazon now.
          </p>
          <a 
            href="https://amazon.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex bg-amazon-blue text-white px-16 py-8 rounded-[30px] font-black text-2xl uppercase tracking-wider transition-all active:scale-95 shadow-2xl hover:bg-amazon-orange group"
          >
            Shop Now on Amazon <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-amazon-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-amazon-orange rounded-lg flex items-center justify-center text-white">
                  <ShoppingCart size={18} />
                </div>
                <div className="font-black text-xl tracking-tighter">
                  AMAZON<span className="text-amazon-orange">FINDS</span>
                </div>
              </div>
              <p className="text-gray-400 font-medium max-w-sm mb-8">
                Your daily destination for viral, useful, and problem-solving Amazon products. We curate the best finds so you can upgrade your life with ease.
              </p>
              <div className="flex gap-4">
                {[Instagram, Play, TrendingUp].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amazon-orange transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest text-sm mb-6">Categories</h4>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                {CATEGORIES.slice(1).map(cat => (
                  <li key={cat}><a href="#" className="hover:text-amazon-orange transition-colors">{cat}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest text-sm mb-6">Support</h4>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Affiliate Disclosure</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
              &copy; 2026 Amazon Finds. All rights reserved.
            </p>
            <p className="text-gray-600 text-[10px] max-w-2xl mx-auto leading-relaxed">
              As an Amazon Associate, we earn from qualifying purchases. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>
        </div>
      </footer>

      {/* --- EXTRA CONVERSION BOOSTERS --- */}

      {/* Sticky Bottom CTA (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-amazon-light z-40 sticky-cta-shadow">
        <a 
          href="https://amazon.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-amazon-orange text-white py-4 rounded-2xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl active:scale-95"
        >
          Shop Now on Amazon <ExternalLink size={20} />
        </a>
      </div>

      {/* Floating Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-50 bg-white text-amazon-blue p-4 rounded-2xl shadow-2xl flex items-center gap-4 border-2 border-amazon-orange"
          >
            <div className="w-12 h-12 bg-amazon-orange rounded-xl flex items-center justify-center text-white shrink-0">
              <ShoppingCart size={24} />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">{notificationText}</p>
              <p className="text-[10px] uppercase tracking-widest font-black text-amazon-orange mt-1 flex items-center gap-1">
                <Clock size={10} /> Just Now
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitPopup(false)}
              className="absolute inset-0 bg-amazon-blue/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white text-amazon-blue p-10 rounded-[40px] max-w-lg w-full text-center shadow-2xl border-4 border-amazon-orange"
            >
              <button 
                onClick={() => setShowExitPopup(false)}
                className="absolute top-6 right-6 p-2 hover:bg-amazon-light rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-20 h-20 bg-amazon-orange rounded-[30px] flex items-center justify-center mx-auto mb-6 text-white shadow-xl rotate-12">
                <Zap size={40} />
              </div>
              
              <h2 className="text-4xl font-black mb-4 leading-tight tracking-tighter">Wait! Don't Miss These Deals</h2>
              <p className="text-lg font-bold mb-8 text-gray-500">
                Our viral finds sell out fast. Check today's top-rated products before they're gone forever.
              </p>
              
              <a 
                href="https://amazon.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-6 rounded-2xl bg-amazon-orange text-white font-black text-2xl uppercase tracking-wider hover:bg-orange-500 transition-all active:scale-95 shadow-xl cta-glow"
              >
                Show Me Deals
              </a>
              
              <p className="mt-6 text-xs font-black uppercase tracking-widest text-gray-400">
                Free shipping available on most items
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onToggleWishlist={toggleWishlist}
            isWishlisted={wishlist.includes(selectedProduct.id)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
