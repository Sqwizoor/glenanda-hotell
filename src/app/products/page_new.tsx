"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { 
  ShoppingCart,
  Star,
  Heart,
  ArrowRight,
  Check,
  Award,
  Droplets,
  Sun,
  Moon,
  Sparkles,
  Shield,
  Zap,
  Leaf,
  Eye,
  Filter,
  Search,
  Flame,
  Crown,
  Gift,
  Users,
  Clock,
  Truck,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const categories = [
  { id: "all", name: "All Products" },
  { id: "cleansers", name: "Cleansers" },
  { id: "serums", name: "Serums" },
  { id: "moisturizers", name: "Moisturizers" },
  { id: "suncare", name: "Sun Care" },
  { id: "treatments", name: "Treatments" }
];

const products = [
  {
    id: "gentle-foam-cleanser",
    category: "cleansers",
    name: "Gentle Foam Cleanser",
    subtitle: "Daily purifying cleanser",
    price: 32,
    originalPrice: null,
    rating: 4.8,
    reviews: 124,
    bestseller: true,
    newProduct: false,
    icon: Droplets,
    image: "/algae.jpg",
    description: "A gentle yet effective foam cleanser that removes impurities while maintaining skin's natural moisture barrier.",
    benefits: [
      "Removes makeup and impurities",
      "Maintains skin moisture",
      "Suitable for all skin types",
      "pH balanced formula"
    ],
    ingredients: ["Glycerin", "Chamomile Extract", "Aloe Vera", "Panthenol"],
    skinTypes: ["Normal", "Dry", "Sensitive"],
    usage: "Morning & Evening"
  },
  {
    id: "vitamin-c-serum",
    category: "serums", 
    name: "Vitamin C Brightening Serum",
    subtitle: "20% L-Ascorbic Acid",
    price: 68,
    originalPrice: 85,
    rating: 4.9,
    reviews: 298,
    bestseller: true,
    newProduct: false,
    icon: Sun,
    image: "/algae2.jpg",
    description: "High-potency vitamin C serum that brightens, protects, and stimulates collagen production for radiant skin.",
    benefits: [
      "Brightens skin tone",
      "Reduces dark spots",
      "Antioxidant protection",
      "Stimulates collagen"
    ],
    ingredients: ["L-Ascorbic Acid", "Vitamin E", "Ferulic Acid", "Hyaluronic Acid"],
    skinTypes: ["Normal", "Dry", "Combination"],
    usage: "Morning"
  },
  {
    id: "hyaluronic-moisturizer",
    category: "moisturizers",
    name: "Hyaluronic Acid Moisturizer",
    subtitle: "24-hour hydration",
    price: 45,
    originalPrice: null,
    rating: 4.7,
    reviews: 186,
    bestseller: false,
    newProduct: true,
    icon: Droplets,
    image: "/algae3.jpg",
    description: "Lightweight moisturizer with multiple types of hyaluronic acid for deep, long-lasting hydration.",
    benefits: [
      "Deep hydration",
      "Plumps fine lines",
      "Lightweight formula",
      "Non-comedogenic"
    ],
    ingredients: ["Hyaluronic Acid", "Ceramides", "Niacinamide", "Peptides"],
    skinTypes: ["All skin types"],
    usage: "Morning & Evening"
  },
  {
    id: "retinol-treatment",
    category: "treatments",
    name: "Retinol Renewal Treatment",
    subtitle: "0.5% Encapsulated Retinol",
    price: 78,
    originalPrice: null,
    rating: 4.6,
    reviews: 142,
    bestseller: false,
    newProduct: false,
    icon: Moon,
    image: "/algae-peel.jpg",
    description: "Advanced retinol treatment that reduces fine lines, improves texture, and promotes cell turnover.",
    benefits: [
      "Reduces fine lines",
      "Improves skin texture",
      "Evens skin tone",
      "Promotes cell renewal"
    ],
    ingredients: ["Encapsulated Retinol", "Squalane", "Peptides", "Bakuchiol"],
    skinTypes: ["Normal", "Combination", "Mature"],
    usage: "Evening only"
  },
  {
    id: "daily-sunscreen",
    category: "suncare",
    name: "Daily Defense Sunscreen SPF 50",
    subtitle: "Broad spectrum protection",
    price: 38,
    originalPrice: null,
    rating: 4.8,
    reviews: 267,
    bestseller: true,
    newProduct: false,
    icon: Shield,
    image: "/alagepels2.jpg",
    description: "Lightweight, non-greasy sunscreen with broad spectrum SPF 50 protection and antioxidants.",
    benefits: [
      "SPF 50 protection",
      "Antioxidant rich",
      "Lightweight formula",
      "No white cast"
    ],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Vitamin E", "Green Tea"],
    skinTypes: ["All skin types"],
    usage: "Morning"
  },
  {
    id: "niacinamide-serum",
    category: "serums",
    name: "Niacinamide Pore Refining Serum",
    subtitle: "10% Niacinamide + Zinc",
    price: 28,
    originalPrice: null,
    rating: 4.5,
    reviews: 89,
    bestseller: false,
    newProduct: true,
    icon: Zap,
    image: "/algaepel.jpg",
    description: "Concentrated niacinamide serum that minimizes pores, controls oil, and improves skin texture.",
    benefits: [
      "Minimizes pores",
      "Controls oil production",
      "Improves texture",
      "Reduces redness"
    ],
    ingredients: ["Niacinamide", "Zinc PCA", "Hyaluronic Acid", "Allantoin"],
    skinTypes: ["Oily", "Combination", "Acne-prone"],
    usage: "Morning & Evening"
  },
  {
    id: "eye-cream",
    category: "treatments",
    name: "Rejuvenating Eye Cream",
    subtitle: "Peptides + Caffeine",
    price: 52,
    originalPrice: null,
    rating: 4.4,
    reviews: 73,
    bestseller: false,
    newProduct: false,
    icon: Sparkles,
    image: "/aesthetic.jpg",
    description: "Rich eye cream with peptides and caffeine to reduce puffiness, dark circles, and fine lines.",
    benefits: [
      "Reduces puffiness",
      "Diminishes dark circles",
      "Smooths fine lines",
      "Firms eye area"
    ],
    ingredients: ["Peptides", "Caffeine", "Retinyl Palmitate", "Ceramides"],
    skinTypes: ["All skin types"],
    usage: "Morning & Evening"
  },
  {
    id: "exfoliating-toner",
    category: "treatments",
    name: "AHA/BHA Exfoliating Toner",
    subtitle: "Gentle chemical exfoliation",
    price: 35,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    bestseller: false,
    newProduct: false,
    icon: Leaf,
    image: "/neww.jpg",
    description: "Gentle exfoliating toner with AHA and BHA to remove dead skin cells and unclog pores.",
    benefits: [
      "Gentle exfoliation",
      "Unclogs pores",
      "Smooths texture",
      "Brightens skin"
    ],
    ingredients: ["Glycolic Acid", "Salicylic Acid", "Witch Hazel", "Aloe Vera"],
    skinTypes: ["Normal", "Oily", "Combination"],
    usage: "Evening (2-3x per week)"
  }
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const featuredProducts = products.filter(p => p.bestseller).slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="pt-20 overflow-hidden">
      {/* Revolutionary Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50"
        style={{ y, opacity }}
      >
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-emerald-300/30 to-teal-400/20 blur-xl"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -30, 30, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Interactive Mouse Trail */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-500/20 blur-3xl pointer-events-none"
            animate={{
              x: mousePosition.x * 100,
              y: mousePosition.y * 100,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          />

          {/* Geometric Patterns */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" className="text-emerald-500" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Crown className="w-4 h-4 mr-2" />
                Premium Skincare Collection
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  Transform Your
                </span>
                <br />
                <motion.span 
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%'] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Number.POSITIVE_INFINITY 
                  }}
                >
                  Skin Journey
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Discover our revolutionary collection of clinically-proven skincare products, 
                each formulated with premium ingredients for visible results.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-6 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 group text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shop Collection
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-6 rounded-2xl text-lg group"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Products
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-6 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                {[
                  { icon: Users, number: "50K+", label: "Happy Customers" },
                  { icon: Award, number: "98%", label: "Satisfaction Rate" },
                  { icon: Sparkles, number: "25+", label: "Premium Products" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <stat.icon className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Featured Products Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-white to-emerald-50 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center p-8"
                  >
                    <div className="text-center space-y-6">
                      <motion.div
                        className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        {(() => {
                          const IconComponent = featuredProducts[currentIndex].icon;
                          return <IconComponent className="w-12 h-12 text-emerald-600" />;
                        })()}
                      </motion.div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {featuredProducts[currentIndex].name}
                        </h3>
                        <p className="text-emerald-600 font-medium mb-4">
                          {featuredProducts[currentIndex].subtitle}
                        </p>
                        <div className="flex items-center justify-center space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            ({featuredProducts[currentIndex].reviews} reviews)
                          </span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          R{featuredProducts[currentIndex].price}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? "bg-emerald-500 w-8" 
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY }
                }}
              >
                <Flame className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, -15, 15, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
              >
                <Gift className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-emerald-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Enhanced Search & Filter Section */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products, ingredients, or skin concerns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-lg"
              />
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Button
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 group ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25"
                      : "border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 bg-white/80 backdrop-blur-sm"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category.name}
                  {selectedCategory === category.id && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white/20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-emerald-600">{searchedProducts.length}</span> products
              {searchQuery && (
                <span> for &quot;<span className="font-semibold">{searchQuery}</span>&quot;</span>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {selectedCategory === "all" ? "All Products" : 
               categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional-grade formulations trusted by skincare experts worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {searchedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-[1.02] group-hover:-translate-y-2">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x400/10b981/ffffff?text=${encodeURIComponent(product.name)}`;
                        }}
                      />
                      
                      {/* Product Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 space-y-2">
                        {product.bestseller && (
                          <motion.span 
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-emerald-500 text-white shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Award className="w-3 h-3 mr-1" />
                            Bestseller
                          </motion.span>
                        )}
                        {product.newProduct && (
                          <motion.span 
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-500 text-white shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.1 }}
                          >
                            New
                          </motion.span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white shadow-lg"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.includes(product.id) 
                              ? "fill-red-500 text-red-500" 
                              : "text-gray-400"
                          }`} 
                        />
                      </Button>

                      {/* Quick Actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>

                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0"
                        animate={{
                          x: ['-100%', '200%'],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                      />
                    </div>

                    {/* Enhanced Product Info */}
                    <div className="p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/50">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-emerald-600 text-sm font-semibold bg-emerald-50 px-2 py-1 rounded-lg inline-block">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Enhanced Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <Star 
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating) 
                                      ? "text-yellow-500 fill-current" 
                                      : "text-gray-300"
                                  }`} 
                                />
                              </motion.div>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {product.reviews} reviews
                        </span>
                      </div>

                      {/* Enhanced Description */}
                      <p className="text-gray-600 text-sm leading-relaxed bg-gray-50/70 p-3 rounded-xl border-l-4 border-emerald-200">
                        {product.description}
                      </p>

                      {/* Enhanced Key Benefits */}
                      <div className="bg-emerald-50/50 p-3 rounded-xl">
                        <h4 className="text-sm font-bold text-emerald-800 mb-2 flex items-center">
                          <Sparkles className="w-4 h-4 mr-1" />
                          Key Benefits
                        </h4>
                        <div className="space-y-2">
                          {product.benefits.slice(0, 2).map((benefit, i) => (
                            <motion.div 
                              key={i} 
                              className="flex items-center text-xs text-emerald-700 bg-white/70 p-2 rounded-lg"
                              whileHover={{ scale: 1.02 }}
                            >
                              <Check className="w-3 h-3 text-emerald-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Skin Types */}
                      <div className="flex flex-wrap gap-2">
                        {product.skinTypes.map((type, i) => (
                          <motion.span 
                            key={type}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs rounded-full font-medium border border-emerald-200 hover:shadow-md transition-all cursor-default"
                          >
                            {type}
                          </motion.span>
                        ))}
                      </div>

                      {/* Enhanced Price & Action */}
                      <div className="flex items-center justify-between pt-4 border-t-2 border-gradient-to-r from-emerald-100 to-teal-100">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            R{product.price}
                          </span>
                          {product.originalPrice && (
                            <div className="flex flex-col">
                              <span className="text-sm text-red-500 line-through font-medium">
                                R{product.originalPrice}
                              </span>
                              <span className="text-xs text-green-600 font-semibold">
                                Save R{product.originalPrice - product.price}
                              </span>
                            </div>
                          )}
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 px-4 py-2 rounded-xl group"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                            Add
                          </Button>
                        </motion.div>
                      </div>

                      {/* Quick Info Tags */}
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Truck className="w-3 h-3 mr-1" />
                            Free Shipping
                          </div>
                          <div className="flex items-center">
                            <RotateCcw className="w-3 h-3 mr-1" />
                            30-Day Return
                          </div>
                        </div>
                        <div className="flex items-center text-emerald-600">
                          <Clock className="w-3 h-3 mr-1" />
                          Fast Delivery
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Start Your Skincare Journey
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Not sure which products are right for you? Book a consultation with our 
              skincare experts for personalized recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-12 py-6 rounded-full group">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Product Recommendations
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-12 py-6 rounded-full">
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
