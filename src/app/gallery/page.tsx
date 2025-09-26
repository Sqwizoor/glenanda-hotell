"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

// Hotel gallery media using real images from /public - Enhanced for group bookings
const mediaData: Array<{ id: string; type: "image"; src: string; alt: string; tags: string[]; category: string }> = [
  // Group Events & Gatherings
  { id: "g1", type: "image", src: "/group2.jpeg", alt: "Corporate team building session", tags: ["groups", "events", "corporate"], category: "Group Events" },
  { id: "g2", type: "image", src: "/group3.jpeg", alt: "Family reunion celebration", tags: ["groups", "family", "celebrations"], category: "Group Events" },
  { id: "g3", type: "image", src: "/group4.jpeg", alt: "Wedding party gathering", tags: ["groups", "weddings", "celebrations"], category: "Group Events" },
  { id: "g4", type: "image", src: "/group5.jpeg", alt: "Conference networking event", tags: ["groups", "corporate", "networking"], category: "Group Events" },
  { id: "g5", type: "image", src: "/group8.jpeg", alt: "Birthday celebration with friends", tags: ["groups", "celebrations", "social"], category: "Group Events" },
  { id: "g6", type: "image", src: "/group9.jpeg", alt: "Business retreat planning session", tags: ["groups", "corporate", "meetings"], category: "Group Events" },
  { id: "g7", type: "image", src: "/group11.jpeg", alt: "Large group dining experience", tags: ["groups", "dining", "social"], category: "Group Events" },
  { id: "g8", type: "image", src: "/group12.jpeg", alt: "Team collaboration workshop", tags: ["groups", "corporate", "teamwork"], category: "Group Events" },
  { id: "g9", type: "image", src: "/group13.jpeg", alt: "Multi-generational family gathering", tags: ["groups", "family", "celebrations"], category: "Group Events" },
  { id: "g10", type: "image", src: "/group14.jpeg", alt: "Executive board meeting", tags: ["groups", "corporate", "executive"], category: "Group Events" },
  { id: "g11", type: "image", src: "/group16.jpeg", alt: "Social club annual meeting", tags: ["groups", "social", "community"], category: "Group Events" },
  { id: "g12", type: "image", src: "/group17.jpeg", alt: "Extended family weekend gathering", tags: ["groups", "family", "weekend"], category: "Group Events" },
  { id: "g13", type: "image", src: "/group18.jpeg", alt: "Corporate training seminar", tags: ["groups", "corporate", "training"], category: "Group Events" },
  
  // Luxury Accommodations
  { id: "r1", type: "image", src: "/room14.jpeg", alt: "Presidential suite panoramic view", tags: ["rooms", "luxury", "suites"], category: "Accommodations" },
  { id: "r2", type: "image", src: "/room11.jpeg", alt: "Executive boardroom suite", tags: ["rooms", "executive", "business"], category: "Accommodations" },
  { id: "r3", type: "image", src: "/room6.jpeg", alt: "Deluxe family suite", tags: ["rooms", "family", "spacious"], category: "Accommodations" },
  { id: "r4", type: "image", src: "/room2.jpeg", alt: "Premium double room", tags: ["rooms", "premium", "couples"], category: "Accommodations" },
  { id: "r5", type: "image", src: "/room3.jpeg", alt: "Comfort single executive", tags: ["rooms", "executive", "business"], category: "Accommodations" },
  { id: "r6", type: "image", src: "/room4.jpeg", alt: "Standard twin room", tags: ["rooms", "twin", "friends"], category: "Accommodations" },
  { id: "r7", type: "image", src: "/room5.jpeg", alt: "Junior suite with lounge", tags: ["rooms", "suite", "lounge"], category: "Accommodations" },
  { id: "r8", type: "image", src: "/room7.jpeg", alt: "Corner room with city view", tags: ["rooms", "views", "corner"], category: "Accommodations" },
  { id: "r9", type: "image", src: "/room9.jpeg", alt: "Accessible deluxe room", tags: ["rooms", "accessible", "deluxe"], category: "Accommodations" },
  { id: "r10", type: "image", src: "/room10.jpeg", alt: "Connecting family rooms", tags: ["rooms", "family", "connecting"], category: "Accommodations" },
  { id: "r11", type: "image", src: "/room12.jpeg", alt: "VIP penthouse suite", tags: ["rooms", "vip", "penthouse"], category: "Accommodations" },
  { id: "r12", type: "image", src: "/room43.jpeg", alt: "Grand luxury suite", tags: ["rooms", "luxury", "grand"], category: "Accommodations" },
  { id: "r13", type: "image", src: "/rooma.jpeg", alt: "Classic heritage room", tags: ["rooms", "classic", "heritage"], category: "Accommodations" },
  { id: "r14", type: "image", src: "/roomb.jpeg", alt: "Modern minimalist suite", tags: ["rooms", "modern", "minimalist"], category: "Accommodations" },
  { id: "r15", type: "image", src: "/roomc.jpeg", alt: "Business traveler suite", tags: ["rooms", "business", "traveler"], category: "Accommodations" },
  { id: "r16", type: "image", src: "/roomd.jpeg", alt: "Extended stay apartment", tags: ["rooms", "extended", "apartment"], category: "Accommodations" },
  { id: "r17", type: "image", src: "/roome.jpeg", alt: "Romantic couple retreat", tags: ["rooms", "romantic", "couples"], category: "Accommodations" },
  { id: "r18", type: "image", src: "/roomf.jpeg", alt: "Premium workspace suite", tags: ["rooms", "workspace", "premium"], category: "Accommodations" },

  // Dining & Culinary Experiences
  { id: "d1", type: "image", src: "/dining.jpeg", alt: "Main restaurant dining hall", tags: ["dining", "restaurant", "formal"], category: "Dining" },
  { id: "d2", type: "image", src: "/dining2.jpeg", alt: "Private dining room", tags: ["dining", "private", "exclusive"], category: "Dining" },
  { id: "d3", type: "image", src: "/dining4.jpeg", alt: "Casual café breakfast", tags: ["dining", "casual", "breakfast"], category: "Dining" },
  { id: "d4", type: "image", src: "/gesta.jpeg", alt: "Elegant dinner setting", tags: ["dining", "elegant", "dinner"], category: "Dining" },
  
  // Wellness & Spa Facilities
  { id: "w1", type: "image", src: "/bath.jpeg", alt: "Luxury spa bathroom", tags: ["wellness", "spa", "luxury"], category: "Wellness" },
  { id: "w2", type: "image", src: "/bath2.jpeg", alt: "Therapeutic bath suite", tags: ["wellness", "therapeutic", "bath"], category: "Wellness" },
  { id: "w3", type: "image", src: "/bath4.jpeg", alt: "Modern wellness center", tags: ["wellness", "modern", "center"], category: "Wellness" },
  { id: "w4", type: "image", src: "/bathroom3.jpeg", alt: "Premium spa treatment room", tags: ["wellness", "spa", "treatment"], category: "Wellness" },
  
  // Hotel Ambience & Common Areas
  { id: "a1", type: "image", src: "/hallway.jpeg", alt: "Grand entrance hallway", tags: ["ambience", "entrance", "grand"], category: "Hotel Features" },
  { id: "a2", type: "image", src: "/niceview.jpeg", alt: "Panoramic city views", tags: ["views", "panoramic", "city"], category: "Hotel Features" },
  { id: "a3", type: "image", src: "/guests2.jpeg", alt: "Guest lounge social area", tags: ["lounge", "social", "guests"], category: "Hotel Features" },
  { id: "a4", type: "image", src: "/hfdsll.jpeg", alt: "Reception and concierge", tags: ["reception", "concierge", "service"], category: "Hotel Features" },
];

const allTags = ["all", "groups", "events", "corporate", "family", "celebrations", "rooms", "luxury", "dining", "wellness", "ambience", "views", "business", "social"] as const;

type Tag = typeof allTags[number];

export default function GalleryPage() {
  const [tag, setTag] = useState<Tag>("all");
  const [lightbox, setLightbox] = useState<null | { id: string }>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = mediaData;
    
    if (tag !== "all") {
      result = result.filter((m) => m.tags.includes(tag));
    }
    
    if (selectedCategory) {
      result = result.filter((m) => m.category === selectedCategory);
    }
    
    return result;
  }, [tag, selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set(mediaData.map(item => item.category));
    return Array.from(cats);
  }, []);

  const openLightbox = useCallback((id: string) => setLightbox({ id }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Get category stats
  const getCategoryStats = (category: string) => {
    return mediaData.filter(item => item.category === category).length;
  };

  // Disable page scroll when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
  }, [lightbox]);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Enhanced Header */}
      <section className="section-padding pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200 mb-6"
            >
              <Filter className="w-5 h-5 mr-2" /> 
              <span className="font-semibold">Visual Experience Gallery</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent"
            >
              Gallery & Experiences
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Explore our comprehensive collection showcasing group accommodations, luxury suites, dining experiences, wellness facilities, and memorable moments from corporate retreats, family celebrations, and social gatherings.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{mediaData.length}</div>
                  <div className="text-sm text-gray-600">Total Images</div>
                </div>
                <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{getCategoryStats("Group Events")}</div>
                  <div className="text-sm text-gray-600">Group Events</div>
                </div>
                <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{getCategoryStats("Accommodations")}</div>
                  <div className="text-sm text-gray-600">Room Types</div>
                </div>
                <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{categories.length}</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Browse by Category</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-lg"
                    : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-700 shadow-sm"
                }`}
              >
                All Categories ({mediaData.length})
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-700 shadow-sm"
                  }`}
                >
                  {category} ({getCategoryStats(category)})
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tag Filters */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Filter by Tags</h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {allTags.map((t) => (
                <motion.button
                  key={t}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTag(t)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    tag === t
                      ? "bg-teal-500 text-white border-teal-500 shadow"
                      : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:text-teal-700 shadow-sm"
                  }`}
                >
                  {t === "all" ? "All Tags" : t[0].toUpperCase() + t.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced responsive gallery grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Current Selection Info */}
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-emerald-600">{filtered.length}</span> images
              {selectedCategory && <span> in <span className="font-semibold">{selectedCategory}</span></span>}
              {tag !== "all" && <span> tagged with <span className="font-semibold">#{tag}</span></span>}
            </p>
          </div>

          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            transition={{ layout: { duration: 0.3 } }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.02 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(item.id)}
                >
                  <Card className="overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                    <CardContent className="p-0 relative">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          priority={index < 8}
                        />
                        {/* Enhanced overlay effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      {/* Enhanced content overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`
                            ${item.category === 'Group Events' ? 'bg-purple-500/90' : ''}
                            ${item.category === 'Accommodations' ? 'bg-emerald-500/90' : ''}
                            ${item.category === 'Dining' ? 'bg-orange-500/90' : ''}
                            ${item.category === 'Wellness' ? 'bg-blue-500/90' : ''}
                            ${item.category === 'Hotel Features' ? 'bg-gray-500/90' : ''}
                            text-white shadow-lg backdrop-blur-sm
                          `}>
                            {item.category}
                          </Badge>
                          <Button 
                            size="sm" 
                            className="bg-white/90 text-gray-900 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); openLightbox(item.id); }}
                          >
                            View Full
                          </Button>
                        </div>
                        <h3 className="font-semibold text-sm mb-1 drop-shadow-lg">{item.alt}</h3>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
                              #{tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="text-xs bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
                              +{item.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More or Show All Button */}
          {filtered.length > 12 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full">
                View All {filtered.length} Images
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Group Events Highlight Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Perfect for Group Events
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate family gatherings to large corporate conferences, we specialize in creating memorable experiences for groups of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Corporate Events</h3>
              <p className="text-gray-600">Team building, conferences, and business retreats with dedicated meeting spaces and catering.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Family Celebrations</h3>
              <p className="text-gray-600">Weddings, anniversaries, and reunions with customizable packages and group dining options.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Special Occasions</h3>
              <p className="text-gray-600">Birthday parties, social gatherings, and milestone celebrations with personalized service.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accommodation Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Luxury Accommodations for Every Need
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse range of rooms and suites cater to solo travelers, couples, families, and large groups with modern amenities and thoughtful design.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {['Standard Rooms', 'Executive Suites', 'Family Accommodations', 'VIP Penthouse'].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">
                  {index === 0 && '🏨'}
                  {index === 1 && '👔'}
                  {index === 2 && '👨‍👩‍👧‍👦'}
                  {index === 3 && '👑'}
                </div>
                <h3 className="font-semibold text-lg mb-2">{type}</h3>
                <p className="text-gray-600 text-sm">
                  {index === 0 && 'Comfortable and well-appointed rooms for individual guests'}
                  {index === 1 && 'Spacious suites perfect for business travelers'}
                  {index === 2 && 'Connecting rooms and family-friendly amenities'}
                  {index === 3 && 'Ultimate luxury with panoramic views and premium service'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining & Wellness Preview */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Dining & Wellness Experiences</h2>
              <p className="text-lg text-gray-600 mb-8">
                Indulge in exquisite dining experiences and rejuvenating wellness treatments designed to complement your stay and enhance group activities.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🍽️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Group Dining Options</h3>
                    <p className="text-gray-600">Private dining rooms, customizable menus, and special occasion catering.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🧘</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Wellness & Spa Services</h3>
                    <p className="text-gray-600">Therapeutic treatments, group spa packages, and relaxation facilities.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {['/dining.jpeg', '/bath.jpeg', '/dining2.jpeg', '/bath2.jpeg'].map((src, index) => (
                <motion.div
                  key={src}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => openLightbox(`preview-${index}`)}
                >
                  <Image
                    src={src}
                    alt="Dining and wellness preview"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Experience Glenanda Hotel?</h2>
            <p className="text-xl mb-8 text-emerald-50">
              Whether you're planning a corporate retreat, family celebration, or romantic getaway, we're here to create an unforgettable experience tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold"
                asChild
              >
                <a href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book%20a%20group%20stay." target="_blank">
                  Book Group Stay
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-full font-semibold"
                asChild
              >
                <a href="/contact">
                  Contact Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" onClick={closeLightbox} />
            <motion.button
              className="absolute top-6 right-6 text-white/90 hover:text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="relative max-w-5xl w-full"
            >
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
                {(() => {
                  const active = mediaData.find((m) => m.id === lightbox.id)!;
                  return (
                    <Image
                      src={active.src}
                      alt={active.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
