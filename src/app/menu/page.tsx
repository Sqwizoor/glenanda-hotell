"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone,
  Clock,
  ChefHat,
  Utensils,
  Coffee,
  Star,
  Heart,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Menu Item Interface
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  popular: boolean;
  spicy: boolean;
  prepTime: string;
}

// Motion variants
const containerStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.6 }
  }
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const menuItems = {
  mains: [
    // Wings with Chips
    {
      id: 1,
      name: "4 Wings with Chips",
      description: "4 crispy golden chicken wings served with fresh-cut seasoned chips",
      price: "R65",
      category: "Wings & Chips",
      popular: true,
      spicy: false,
      prepTime: "15-20 min"
    },
    {
      id: 2,
      name: "6 Wings with Chips",
      description: "6 crispy golden chicken wings served with fresh-cut seasoned chips",
      price: "R80",
      category: "Wings & Chips",
      popular: true,
      spicy: false,
      prepTime: "15-20 min"
    },
    {
      id: 3,
      name: "8 Wings with Chips",
      description: "8 crispy golden chicken wings served with fresh-cut seasoned chips",
      price: "R120",
      category: "Wings & Chips",
      popular: false,
      spicy: false,
      prepTime: "20-25 min"
    },
    {
      id: 4,
      name: "12 Wings with Chips",
      description: "12 crispy golden chicken wings served with fresh-cut seasoned chips - perfect for sharing!",
      price: "R160",
      category: "Wings & Chips",
      popular: false,
      spicy: false,
      prepTime: "25-30 min"
    },
    // Wings with Pap
    {
      id: 5,
      name: "4 Wings with Pap & Gravy",
      description: "4 tender chicken wings served with traditional pap and our hotel gravy prepared by professional chefs",
      price: "R50",
      category: "Wings & Pap",
      popular: true,
      spicy: false,
      prepTime: "15-20 min"
    },
    {
      id: 6,
      name: "6 Wings with Pap & Gravy",
      description: "6 tender chicken wings served with traditional pap and our hotel gravy prepared by professional chefs",
      price: "R65",
      category: "Wings & Pap",
      popular: true,
      spicy: false,
      prepTime: "20-25 min"
    },
    {
      id: 7,
      name: "8 Wings with Pap & Gravy",
      description: "8 tender chicken wings served with traditional pap and our hotel gravy prepared by professional chefs",
      price: "R95",
      category: "Wings & Pap",
      popular: false,
      spicy: false,
      prepTime: "20-25 min"
    },
    {
      id: 8,
      name: "12 Wings with Pap & Gravy",
      description: "12 tender chicken wings served with traditional pap and our hotel gravy prepared by professional chefs - perfect for sharing!",
      price: "R120",
      category: "Wings & Pap",
      popular: false,
      spicy: false,
      prepTime: "25-30 min"
    }
  ],
  extras: [
    {
      id: 9,
      name: "Glen Samosa Spiced (12 pieces)",
      description: "12 house special samosas with our signature spice blend - crispy and flavorful",
      price: "R99",
      category: "Samosas",
      popular: true,
      spicy: true,
      prepTime: "15-20 min"
    },
    {
      id: 10,
      name: "Sweetcorn & Cheese Samosa (12 pieces)",
      description: "12 golden samosas filled with sweet corn and melted cheese - a delicious vegetarian option",
      price: "R99",
      category: "Samosas",
      popular: true,
      spicy: false,
      prepTime: "15-20 min"
    },
    {
      id: 11,
      name: "Mince Samosa (12 pieces)",
      description: "12 savory samosas filled with spiced minced meat - traditional and satisfying",
      price: "R99",
      category: "Samosas",
      popular: true,
      spicy: false,
      prepTime: "15-20 min"
    }
  ],
  drinks: [
    {
      id: 12,
      name: "Fresh Mango Juice",
      description: "Freshly squeezed mango juice - pure tropical sweetness",
      price: "R30",
      category: "Fresh Juices",
      popular: true,
      spicy: false,
      prepTime: "5 min"
    },
    {
      id: 13,
      name: "Fruit Cocktail 🍸",
      description: "Refreshing blend of seasonal fruits - perfect for any time of day",
      price: "R30",
      category: "Fresh Juices",
      popular: true,
      spicy: false,
      prepTime: "5 min"
    },
    {
      id: 14,
      name: "Passion Fruit Juice",
      description: "Exotic passion fruit juice - tangy and refreshing",
      price: "R30",
      category: "Fresh Juices",
      popular: true,
      spicy: false,
      prepTime: "5 min"
    }
  ]
};

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<MenuItem[]>([]);

  const categories = [
    { id: "all", name: "All Items", icon: Utensils },
    { id: "mains", name: "Wings", icon: ChefHat },
    { id: "extras", name: "Samosas", icon: Star },
    { id: "drinks", name: "Fresh Juices", icon: Coffee }
  ];

  const getAllItems = () => {
    return [...menuItems.mains, ...menuItems.extras, ...menuItems.drinks];
  };

  const getFilteredItems = () => {
    if (selectedCategory === "all") return getAllItems();
    return menuItems[selectedCategory as keyof typeof menuItems] || [];
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => [...prev, item]);
  };

  const getWhatsAppMessage = () => {
    if (cart.length === 0) return "Hi Glenanda Hotel, I'd like to see your room service menu.";
    
    const itemsList = cart.map(item => `- ${item.name} (${item.price})`).join('\n');
    const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace('R', '')), 0);
    
    return `Hi Glenanda Hotel, I'd like to order from room service:

${itemsList}

Total: R${total}

Please deliver to my room. Thank you!`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header with Logo */}
      <section className="relative py-16 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-32 h-32 border border-white rounded-full" />
          <div className="absolute bottom-10 right-20 w-48 h-48 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Logo placeholder - using hotel image */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl bg-white p-2">
              <Image
                src="/logo.jpeg"
                alt="Glenanda Hotel Logo"
                width={88}
                height={88}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-4"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 40px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Glenanda Hotel
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-lg rounded-full text-white/95 mb-6"
            >
              <ChefHat className="w-6 h-6" />
              <span className="text-xl font-semibold tracking-wide">ROOM SERVICE MENU</span>
              <Sparkles className="w-6 h-6" />
            </motion.div>
            
            <motion.p 
              className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Delicious meals delivered fresh to your room
            </motion.p>
          </motion.div>

          {/* Order Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          >
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6 text-emerald-200" />
                <div>
                  <p className="font-semibold">Order Now</p>
                  <p className="text-sm opacity-90">+27 60 311 4115</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-6 h-6 text-emerald-200" />
                <div>
                  <p className="font-semibold">Service Hours</p>
                  <p className="text-sm opacity-90">24/7 Available</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Heart className="w-6 h-6 text-emerald-200" />
                <div>
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-sm opacity-90">To Your Room</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white/50 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={itemFadeUp}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-emerald-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 shadow-md hover:shadow-lg"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Special Notice for Pap Dishes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ChefHat className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-bold text-emerald-800">Chef&apos;s Special Notice</h3>
                <ChefHat className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-emerald-700 leading-relaxed">
                <strong>All wings with pap are served with our hotel gravy prepared by our professional chefs for your satisfaction</strong>
              </p>
              <div className="mt-3 text-sm text-emerald-600">
                ✨ Made fresh daily with authentic South African flavors ✨
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerStagger}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {getFilteredItems().map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemFadeUp}
                  className="group"
                  whileHover={{ y: -8, rotateY: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative border-0">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    <CardContent className="p-6 relative z-10">
                      {/* Item Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              {item.name}
                            </h3>
                            {item.popular && (
                              <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                            {item.spicy && (
                              <Badge className="bg-red-100 text-red-700 text-xs">
                                🌶️ Spicy
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Price and Details */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-2xl font-bold text-emerald-600">
                          {item.price}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.prepTime}
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>

                      {/* Add to Order Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => addToCart(item)}
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <span className="flex items-center justify-center">
                            Add to Order
                          </span>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-flex ml-2"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Cart Summary (if items added) */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-emerald-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
                <span className="text-emerald-200">•</span>
                <span className="font-bold">
                  R{cart.reduce((sum, item) => sum + parseInt(item.price.replace('R', '')), 0)}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => setCart([])}
                variant="outline"
                className="text-emerald-600 border-white/20 bg-white/10 hover:bg-white/20"
              >
                Clear
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Now CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Order?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Call us now or send a WhatsApp message for instant room service delivery
            </p>

            {/* Contact Options */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={`https://wa.me/27603114115?text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-12 py-6 rounded-full shadow-2xl">
                    <Phone className="mr-3 h-5 w-5" />
                    WhatsApp Order
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </a>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="tel:+27603114115">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/10 text-lg px-12 py-6 rounded-full"
                  >
                    <Phone className="mr-3 h-5 w-5" />
                    Call Now
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Phone Number Display */}
            <motion.div
              className="mt-8 text-white/90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-semibold mb-2">📞 +27 60 311 4115</p>
              <p className="text-sm">Available 24/7 • Free delivery to your room</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to Hotel */}
      <section className="py-8 bg-gray-50 text-center">
        <Link href="/">
          <Button variant="outline" className="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
            ← Back to Glenanda Hotel
          </Button>
        </Link>
      </section>
    </div>
  );
}