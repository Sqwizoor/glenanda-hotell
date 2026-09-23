"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/SmartImage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Calendar,
  Clock,
  ArrowRight,
  Shield,
  Heart,
  Award,
  Crown,
  Users,
  ClipboardList,
  UtensilsCrossed,
  Dumbbell,
  Eye,
  Phone,
  BedDouble
} from "lucide-react";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";

// Lightbox Context to manage modal open state
interface LightboxContextValue {
  open: (index: number) => void;
}
const LightboxContext = React.createContext<LightboxContextValue | null>(null);

function useLightbox() {
  const ctx = React.useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}

const LightboxProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const open = useCallback((i: number) => {
    setIndex(i);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const next = useCallback(() => {
    setIndex(prev => (prev + 1) % resultsMedia.length);
  }, []);
  const prev = useCallback(() => {
    setIndex(prev => (prev - 1 + resultsMedia.length) % resultsMedia.length);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev]);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-white/10 shadow-2xl bg-black">
                {resultsMedia[index].type === 'image' && (
                  <Image
                    src={resultsMedia[index].src}
                    alt={resultsMedia[index].alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                )}
              </div>
              {/* Controls */}
              <button onClick={close} className="absolute top-3 right-3 text-white/80 hover:text-white text-sm bg-black/40 px-3 py-1 rounded-full">Close</button>
              <button onClick={prev} className="absolute top-1/2 -left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center">‹</button>
              <button onClick={next} className="absolute top-1/2 -right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center">›</button>
              <div className="mt-4 flex justify-center gap-2">
                {resultsMedia.map((m, i) => (
                  <button
                    key={m.src + i}
                    onClick={() => setIndex(i)}
                    className={`h-2 w-2 rounded-full ${i===index?'bg-white':'bg-white/40 hover:bg-white/70'}`}
                    aria-label={`Go to slide ${i+1}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-white/60 tracking-wide">{resultsMedia[index].alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
};

// Interactive category filter tabs for Hotel Gallery & Experiences
const galleryCategories = [
  { id: 'all', label: 'All Experiences', icon: Sparkles },
  { id: 'dining', label: 'Dining & Catering', icon: UtensilsCrossed },
  { id: 'groups', label: 'Group Events & Social', icon: Users },
  { id: 'rooms', label: 'Rooms & Suites', icon: BedDouble },
  { id: 'wellness', label: 'Spa & Wellness', icon: Heart },
] as const;

type GalleryCategory = typeof galleryCategories[number]['id'];

// Cool, modern Hotel Gallery & Experiences Carousel with interactive filters
function GalleryCarousel() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', dragFree: false });
  const { open } = useLightbox();
  const [selected, setSelected] = useState(0);

  // Map each item to include its original index in resultsMedia for perfect lightbox sync
  const itemsWithIndex = useMemo(() => {
    return resultsMedia.map((item, originalIndex) => ({
      ...item,
      originalIndex,
      category: item.src.includes('spa') || item.src.includes('massage') ? 'wellness' :
                (item.src.includes('dining') || item.src.includes('breakfast') || item.src.includes('catering') || item.src.includes('kitchen') || item.src.includes('buffet') || item.src.includes('banquet') || item.src.includes('fryer')) ? 'dining' :
                (item.src.includes('group') || item.src.includes('lounge') || item.src.includes('conference') || item.src.includes('soccer') || item.src.includes('gathering')) ? 'groups' :
                item.src.includes('room') ? 'rooms' : 'all'
    }));
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return itemsWithIndex;
    return itemsWithIndex.filter(item => item.category === activeCategory);
  }, [activeCategory, itemsWithIndex]);

  const scrollTo = useCallback((i: number) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Reset carousel position when category changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
      setSelected(0);
    }
  }, [activeCategory, emblaApi]);

  return (
    <div className="relative" aria-label="Hotel Gallery carousel">
      {/* Cool Modern Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {galleryCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25 scale-105 ring-2 ring-emerald-400/30'
                  : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-500 group-hover:scale-110'} transition-transform`} />
              <span>{cat.label}</span>
              {isActive && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-bold">
                  {filteredItems.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Carousel Container with Glass Nav */}
      <div className="relative">
        <div className="overflow-hidden rounded-3xl p-1" ref={emblaRef}>
          <div className="flex gap-5 sm:gap-6">
            {filteredItems.map((item, idx) => {
              const contentType = item.src.includes('spa') || item.src.includes('massage') ? 'Spa & Wellness' :
                                 (item.src.includes('group') || item.src.includes('lounge') || item.src.includes('conference')) ? 'Group Events' :
                                 item.src.includes('room') ? 'Accommodations' :
                                 (item.src.includes('dining') || item.src.includes('breakfast') || item.src.includes('catering') || item.src.includes('kitchen')) ? 'Dining & Catering' :
                                 'Hotel Amenities';
              
              const badgeColor = item.src.includes('spa') || item.src.includes('massage') ? 'bg-emerald-500/90 text-white border-emerald-300/30' :
                                (item.src.includes('group') || item.src.includes('lounge') || item.src.includes('conference')) ? 'bg-purple-500/90 text-white border-purple-300/30' :
                                item.src.includes('room') ? 'bg-blue-500/90 text-white border-blue-300/30' :
                                (item.src.includes('dining') || item.src.includes('breakfast') || item.src.includes('catering') || item.src.includes('kitchen')) ? 'bg-amber-500/90 text-white border-amber-300/30' :
                                'bg-teal-600/90 text-white border-teal-300/30';
              
              return (
                <motion.div
                  key={item.src + idx}
                  className="relative min-w-[85%] sm:min-w-[55%] md:min-w-[38%] lg:min-w-[30%] aspect-[4/3] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl group cursor-pointer border border-slate-200/50 dark:border-white/10 bg-slate-900"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onClick={() => open(item.originalIndex)}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width:640px) 85vw, (max-width:768px) 55vw, (max-width:1024px) 38vw, 30vw"
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                      priority={idx < 2}
                    />
                  ) : (
                    <video src={item.src} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                  )}
                  
                  {/* Modern Dual Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg border ${badgeColor}`}>
                      {contentType}
                    </span>
                  </div>
                  
                  {/* Quick Expand Icon on Hover */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <div className="w-9 h-9 bg-white/25 backdrop-blur-md border border-white/40 text-white rounded-full flex items-center justify-center shadow-lg">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Caption with subtle accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="w-8 h-0.5 bg-emerald-400 mb-2 rounded-full transform origin-left group-hover:w-16 transition-all duration-300" />
                    <p className="text-white text-xs sm:text-sm font-medium leading-snug drop-shadow line-clamp-2">
                      {item.alt}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Floating Nav Controls */}
        <div className="flex items-center justify-between mt-6 px-1">
          <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-emerald-600 dark:text-emerald-400">{filteredItems.length}</span> experiences
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-emerald-600 hover:border-emerald-600 dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 hover:text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              aria-label="Previous images"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-emerald-600 hover:border-emerald-600 dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 hover:text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              aria-label="Next images"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slide Progress Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {filteredItems.slice(0, 15).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === (selected % 15) ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Explore Full Gallery Link Banner */}
        <div className="mt-10 text-center">
          <Link href="/gallery">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-5 border-2 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold shadow-sm hover:shadow-md transition-all hover:scale-105 text-sm"
            >
              <span>Explore Complete Hotel Gallery (40+ Photos)</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const homeServices = [
  {
    id: "single-occupancy",
    title: "Single Occupancy Rooms",
    subtitle: "Perfect for solo travelers",
    duration: "Single occupancy",
    price: "from R500 / night",
    popular: true,
    groupFriendly: false,
    image: "/room14.jpeg",
    description: "Comfortable single rooms with modern amenities, work desk, and quality service - ideal for individual travelers."
  },
  {
    id: "sleeps-two",
    title: "Double Occupancy Rooms",
    subtitle: "Ideal for couples and friends",
    duration: "Sleeps 2 people",
    price: "from R600 / night",
    popular: true,
    groupFriendly: false,
    image: "/room12.jpeg",
    description: "Spacious rooms with comfortable beds and modern amenities - perfect for couples and two guests sharing."
  },
  {
    id: "sleeps-three-four",
    title: "Family Rooms",
    subtitle: "Spacious family accommodations",
    duration: "Sleeps 3-4 people",
    price: "from R900 / night",
    popular: true,
    groupFriendly: true,
    image: "/room11.jpeg",
    description: "Extra-large rooms with multiple beds and family-friendly amenities - perfect for families and small groups."
  },
  {
    id: "group-accommodation",
    title: "Group Accommodation",
    subtitle: "Special rates for large groups",
    duration: "10-50 participants",
    price: "R300 per person sharing room",
    popular: false,
    groupFriendly: true,
    image: "/new-images/hotel-lounge-emerald-sofas.jpeg",
    description: "Best group rates for large bookings with shared accommodations and group amenities - perfect for corporate groups and events."
  }
];

// (removed unused testimonials array)

// Spaces & Atmosphere gallery media — using real hotel/public images with group focus
// Keep only images for performance & consistency
type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; poster?: string };

const resultsMedia: MediaItem[] = [
  // Mixed & Randomized - Real Hotel Dining, Lounges, Spa, Rooms, Braai, Soccer, Groups
  { type: "image", src: "/new-images/hotel-catering-fresh-sandwiches-chips.jpeg", alt: "Fresh hotel catering spread with golden fries and sandwiches" },
  { type: "image", src: "/new-images/hotel-morning-buffet-sunlight-dining.jpeg", alt: "Morning breakfast buffet in our sunlit dining hall" },
  { type: "image", src: "/room14.jpeg", alt: "Presidential suite for VIP group stays" },
  { type: "image", src: "/new-images/hotel-lounge-emerald-sofas.jpeg", alt: "Cozy guest lounge with plush emerald velvet seating" },
  { type: "image", src: "/new-images/hotel-banquet-buffet-setup.jpeg", alt: "Banquet buffet dining setup for special occasions and functions" },
  { type: "image", src: "/new-images/hotel-full-breakfast-dining.jpeg", alt: "Full breakfast dining experience for hotel guests and groups" },
  { type: "image", src: "/brai.jpeg", alt: "Outdoor braai area with guests enjoying a barbecue" },
  { type: "image", src: "/new-images/hotel-breakfast-social-dining.jpeg", alt: "Social breakfast dining atmosphere for hotel guests" },
  
  { type: "image", src: "/new-images/hotel-breakfast-buffet-service-staff.jpeg", alt: "Morning breakfast buffet service with dedicated hotel staff" },
  { type: "image", src: "/new-massages2.jpeg", alt: "Luxury spa facilities for ultimate relaxation" },
  { type: "image", src: "/room6.jpeg", alt: "Executive rooms perfect for business groups" },
  { type: "image", src: "/new-images/hotel-buffet-station-tv-lounge.jpeg", alt: "Guest TV lounge with hot buffet station and comfortable seating" },
  { type: "image", src: "/new-images/hotel-breakfast-buffet-tableware.jpeg", alt: "Lavish dining buffet setup with chafing dishes and fine tableware" },
  { type: "image", src: "/new-images/hotel-conference-dining-table.jpeg", alt: "Group conference and dining gathering space" },
  { type: "image", src: "/new-images/hotel-group-breakfast-meeting.jpeg", alt: "Group breakfast meeting in our private dining facilities" },
  
  { type: "image", src: "/new-images/hotel-kitchen-golden-chips-sausages.jpeg", alt: "Kitchen hot fryer - golden crispy chips & breakfast sausages" },
  { type: "image", src: "/new-images/hotel-group-gathering-hall.jpeg", alt: "Spacious group gathering hall for celebrations and corporate events" },
  { type: "image", src: "/brai2.jpeg", alt: "Group gathering around the braai for a social event" },
  { type: "image", src: "/soccer4.jpeg", alt: "Professional soccer team group accommodation facilities" },
  { type: "image", src: "/new-images/hotel-guest-lounge-gathering.jpeg", alt: "Warm guest lounge gathering area for families and groups" },
  { type: "image", src: "/room11.jpeg", alt: "Connecting rooms for families and teams" },
  { type: "image", src: "/new-images/hotel-kitchen-fryer-prep-station.jpeg", alt: "Commercial kitchen fryer and fresh food preparation station" },
  { type: "image", src: "/new-massages4.jpeg", alt: "Tranquil spa environment with natural elements" },
  { type: "image", src: "/new-images/hotel-lounge-dining-atmosphere.jpeg", alt: "Relaxed lounge and dining atmosphere with ambient lighting" },
  
  { type: "image", src: "/soccer-dining2.jpeg", alt: "Sports team meal service with nutritious options" },
  { type: "image", src: "/niceview.jpeg", alt: "Panoramic views enjoyed by all our guests" },
  { type: "image", src: "/brai3.jpeg", alt: "Braai setup with delicious food and drinks" },
  { type: "image", src: "/new-massages5.jpeg", alt: "Aromatherapy and essential oils treatment" },
  { type: "image", src: "/group13.jpeg", alt: "Family celebration in our event space" },
  
  { type: "image", src: "/soccer5.jpeg", alt: "Sports team relaxation areas and common spaces" },
  { type: "image", src: "/room12.jpeg", alt: "Spacious suites accommodating larger groups" },
  { type: "image", src: "/new-massages6.jpeg", alt: "Couples massage and romantic spa experiences" },
  { type: "image", src: "/dining2.jpeg", alt: "Group dining setup for special occasions" },
  { type: "image", src: "/brai4.jpeg", alt: "Family and friends enjoying a braai at the hotel" },
  
  { type: "image", src: "/soccer6.jpeg", alt: "Soccer team members enjoying hotel amenities" },
  { type: "image", src: "/group14.jpeg", alt: "Wedding party in our elegant dining room" },
  { type: "image", src: "/new-massages7.jpeg", alt: "Facial treatment and premium skincare" },
  { type: "image", src: "/new-images/hotel-dining-hall-buffet-wide.jpeg", alt: "Spacious dining hall with breakfast buffet setup" },
  { type: "image", src: "/group16.jpeg", alt: "Business retreat participants networking" },
  
  { type: "image", src: "/brai5.jpeg", alt: "Evening braai event with festive lighting" },
  { type: "image", src: "/new-massages8.jpeg", alt: "Wellness and relaxation lounge" },
  { type: "image", src: "/soccer7.jpeg", alt: "Team gathering space for sports groups" },
  { type: "image", src: "/guests2.jpeg", alt: "Relaxed social atmosphere in guest areas" },
  { type: "image", src: "/group17.jpeg", alt: "Multi-generational family reunion gathering" },
  
  { type: "image", src: "/new-massages9.jpeg", alt: "Spa therapy and holistic healing" },
  { type: "image", src: "/soccer8.jpeg", alt: "Soccer team accommodation setup" },
  { type: "image", src: "/group18.jpeg", alt: "Social club event with group dining" },
  { type: "image", src: "/new-massages10.jpeg", alt: "Premium spa amenities and services" },
  
  { type: "image", src: "/soccer10.jpeg", alt: "Sports event participants in hotel facilities" },
  { type: "image", src: "/group2.jpeg", alt: "Corporate conference with full group accommodation" },
  { type: "image", src: "/soccer11.jpeg", alt: "Soccer team enjoying hospitality services" },
  { type: "image", src: "/group3.jpeg", alt: "Birthday celebration party setup" },
  
  { type: "image", src: "/soccer12.jpeg", alt: "Professional sports team accommodation" },
  { type: "image", src: "/group4.jpeg", alt: "Team building activities in common areas" },
  { type: "image", src: "/soccer13.jpeg", alt: "Team sports event hosting facilities" },
  
  { type: "image", src: "/group5.jpeg", alt: "Anniversary dinner with extended family" },
  { type: "image", src: "/soccer14.jpeg", alt: "Soccer team group photo at hotel" },
  { type: "image", src: "/group8.jpeg", alt: "Executive retreat with group accommodation" },
  { type: "image", src: "/soccer-new.jpeg", alt: "Modern facilities for sports team accommodation" },
  
  { type: "image", src: "/group9.jpeg", alt: "Social gathering in our spacious lounge" },
  
  { type: "image", src: "/soccer-bus.jpeg", alt: "Team transportation services and shuttle bus" },
  { type: "image", src: "/soccer-bus2.jpeg", alt: "Group transportation for sports teams and events" },
  
  // Braai Video
  { type: "video", src: "/braai-video.mp4", alt: "Braai and outdoor dining experience video", poster: "/brai.jpeg" },
];

// Lightweight lazy video that only loads when near viewport
function LazyVideo({ 
  src, 
  poster, 
  className, 
  muted, 
  loop, 
  playsInline, 
  autoPlay,
  ...props 
}: { 
  src: string; 
  poster?: string; 
  className?: string;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;
} & React.VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (active && ref.current) {
      // Set src and load to ensure the browser fetches the video once visible
      if (ref.current.src !== window.location.origin + src) {
        ref.current.src = src;
      }
      try {
        ref.current.load();
        // Auto play the video if autoPlay is enabled
        if (autoPlay && muted) {
          ref.current.play().catch(() => {
            // Auto-play failed, which is normal in some browsers
          });
        }
      } catch {
        // no-op
      }
    }
  }, [active, src, autoPlay, muted]);

  return (
    <video
      ref={ref}
      className={className}
      controls={!autoPlay}
      playsInline={playsInline}
      preload={active ? "metadata" : "none"}
      poster={poster}
      muted={muted}
      loop={loop}
      autoPlay={autoPlay}
  {...props}
    />
  );
}



export default function HomePage() {
  const heroRef = useRef(null);

  // Motion variants for cleaner, modern staggered animations
  const containerStagger: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <div className="overflow-hidden">

      {/* Modern Hero Section — Enhanced with better mobile responsiveness */}
      {/* Modern Hero Section — Enhanced with Video Background & Mother's Day Promotion */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-visible pt-20">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/massage-spa.jpeg"
            className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        </div>
        
        {/* Dynamic floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        {/* Enhanced Content with Mother's Day Special */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
          className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Top Luxury Location & Rating Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-4 shadow-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>★ 4.8 Guest Experience • Glenanda, Johannesburg South</span>
            </motion.div>

            {/* Special Event Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-rose-500/20 backdrop-blur-xl border border-rose-400/30 text-rose-100 mb-6 shadow-xl"
              initial={{ opacity:0, y:20, scale: 0.9 }}
              animate={{ opacity:1, y:0, scale: 1 }}
              transition={{ delay:0.3, duration:0.8 }}
            >
              <Heart className="w-4 h-4 text-rose-300 animate-pulse" />
              <span className="text-xs sm:text-sm tracking-[0.2em] font-bold uppercase">Mother&apos;s Day Special</span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.5, duration:1 }}
              className="font-serif font-bold text-white mb-6 drop-shadow-2xl"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                lineHeight: '1.1'
              }}
            >
              Come & Celebrate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-100 to-white">Mother&apos;s Day With Us</span>
            </motion.h1>
            
            {/* Promotion Details Grid */}
            <motion.div 
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.7, duration:0.8 }}
              className="mb-10 inline-block text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-white/90">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="text-lg font-medium">60m Full Body Massage + Hot Stones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="text-lg font-medium">45m Foot Soak, Filing & Scrub</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="text-lg font-medium">Bottle of Premium Wine</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="text-lg font-medium">Gourmet Light Snacks</span>
                </div>
              </div>
            </motion.div>

            {/* Price & CTA */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.9, duration:0.7 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-white/10 blur-xl rounded-full" />
                <div className="relative text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  <span className="text-rose-300 mr-2 text-2xl font-normal tracking-wide">R</span>
                  1,450 <span className="text-xl font-normal text-white/70">for two people</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto group">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto rounded-full px-12 py-7 bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-2xl shadow-rose-900/40 transform hover:scale-105 transition-all duration-300 text-lg"
                  >
                    <Calendar className="mr-3 w-5 h-5" />
                    Book Experience
                  </Button>
                </Link>
                <Link href="/rooms" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto rounded-full px-10 py-7 border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-md font-semibold transition-all duration-300 text-lg"
                  >
                    View Packages
                  </Button>
                </Link>
              </div>

              {/* Modern Trust & Hotel Perks Bar */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-xs sm:text-sm text-white/80 w-full max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center space-x-2 bg-black/20 backdrop-blur-sm py-2 px-3 rounded-full border border-white/10">
                  <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">24/7 Security & Parking</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-black/20 backdrop-blur-sm py-2 px-3 rounded-full border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">Free Fast Wi-Fi</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-black/20 backdrop-blur-sm py-2 px-3 rounded-full border border-white/10">
                  <Users className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">Groups from R300/p</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-black/20 backdrop-blur-sm py-2 px-3 rounded-full border border-white/10">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">On-Site Dining & Braai</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Scroll indicator with animation */}
        <motion.div
          className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div 
            className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/60 to-transparent"
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="mt-1 sm:mt-2 text-xs tracking-[0.3em] text-white/60 font-medium"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SCROLL
          </motion.div>
        </motion.div>
      </section>
      
      {/* Signature Massage Treatments Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/massage-spa6.jpeg" 
            alt="Spa Background" 
            fill 
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pure Relaxation</span>
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
              Signature Massage <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">Treatments</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Full Body Massage", duration: "60 Minutes", price: "600", icon: Heart },
              { title: "Full Body Massage", duration: "90 Minutes", price: "700", icon: Sparkles },
              { title: "Hot Stone Massage", duration: "60 Minutes", price: "650", icon: Award },
              { title: "Hot Stone Massage", duration: "90 Minutes", price: "750", icon: Crown },
              { title: "Back & Indian Head", duration: "30 Minutes", price: "400", icon: Shield },
              { title: "Foot Filling & Reflexology", duration: "45 Minutes", price: "350", icon: Sparkles },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/15 hover:border-emerald-400/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/60 flex flex-col justify-between overflow-hidden"
              >
                {/* Ambient Card Background Glow on Hover */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-all duration-500 pointer-events-none" />
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <service.icon className="w-20 h-20 text-white" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30 group-hover:bg-emerald-500/30 transition-colors duration-300">
                      <service.icon className="w-6 h-6 text-emerald-300" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-white/10 text-emerald-200/90 backdrop-blur-sm border border-white/10 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                      {service.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-emerald-400 text-sm font-semibold">R</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{service.price}</span>
                  </div>
                  <a
                    href={`https://wa.me/27817609224?text=${encodeURIComponent(`Hi Glenanda Spa, I'd like to book the ${service.title} (${service.duration} - R${service.price}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-semibold text-xs sm:text-sm border border-emerald-400/30 hover:border-emerald-400 transition-all duration-300 shadow-sm"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Link href="/contact">
              <Button className="rounded-full px-10 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base transition-all hover:scale-105 shadow-xl shadow-emerald-500/25">
                Book Your Treatment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Accommodation Packages Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20 shadow-sm"
            >
              <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-1.5" />
              <span>For Every Guest</span>
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 tracking-tight"
            >
              Tailored Packages for Every Stay
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Whether you&apos;re traveling solo on business, planning a romantic getaway, enjoying a family reunion, hosting a sports team, or organizing a corporate retreat, we provide personalized service and exclusive amenities for every type of stay.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              {
                icon: ClipboardList,
                title: "Personalized Itineraries",
                description: "Custom planning for activities, dining, and transport - whether solo or with companions.",
              },
              {
                icon: UtensilsCrossed,
                title: "Flexible Dining",
                description: "From intimate couple dinners to family meals and group banquets.",
              },
              {
                icon: Dumbbell,
                title: "Spa & Wellness",
                description: "Individual treatments, couples experiences, and group wellness packages.",
              },
              {
                icon: Crown,
                title: "Premium Service",
                description: "VIP treatment for all guests with welcome amenities and dedicated support.",
              },
            ].map((feature) => (
              <motion.div key={feature.title} variants={itemFadeUp} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <div className="h-full text-center p-8 bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group relative flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                        <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-300 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300/90 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mt-14"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="group relative">
                <Button size="lg" className="rounded-full px-10 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-base font-semibold shadow-lg shadow-emerald-600/25 transition-all hover:scale-105">
                  <span>Book Your Perfect Stay</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/menu" className="group relative">
                <Button size="lg" variant="outline" className="rounded-full px-10 py-6 border-2 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-base font-semibold shadow-sm hover:scale-105 transition-all">
                  <span>View Room Service Menu</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview (styled like Services page, with images) */}
      <section className="section-padding skincare-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20 shadow-sm"
            >
              <BedDouble className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-1.5" />
              <span>✨ Accommodation for Every Traveler</span>
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 tracking-tight"
            >
              Rooms & Suites for Individuals & Groups
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Choose from a variety of thoughtfully designed spaces, from cozy rooms for solo travelers to spacious suites perfect for families and groups.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {homeServices.map((service, index) => (
              <motion.div 
                key={service.id} 
                variants={itemFadeUp} 
                className="group"
                whileHover={{ 
                  y: -10,
                  scale: 1.015
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  duration: 0.4 
                }}
              >
                <div className="group h-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-500 overflow-hidden relative flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                  
                  <div>
                    {/* Service Image with Enhanced Effects */}
                    <div className="relative h-60 overflow-hidden">
                      <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
                        <SmartImage
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                          className="object-cover w-full h-full"
                          priority={index < 2}
                          asMotion={false}
                        />
                      </div>

                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                      {service.popular && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg backdrop-blur-md">
                            ⭐ Most Popular
                          </span>
                        </div>
                      )}
                      {service.groupFriendly && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg backdrop-blur-md">
                            <Users className="w-3 h-3 mr-1" />
                            Group-Friendly
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-between items-center text-white">
                        <div className="flex items-center bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs font-medium text-emerald-200">
                          <Clock className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="bg-emerald-500 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                          {service.price}
                        </div>
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold mt-1">
                          {service.subtitle}
                        </p>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300/90 text-sm leading-relaxed line-clamp-3 mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Booking Action */}
                  <div className="p-6 pt-0">
                    <div className="pt-3 border-t border-slate-100 dark:border-white/10">
                      <Button asChild className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-md hover:shadow-xl hover:shadow-emerald-500/20 text-slate-950 font-bold transition-all duration-300 py-5">
                        <a
                          href={`https://wa.me/27603114115?text=${encodeURIComponent(`Hi Glenanda Hotel, I'd like to enquire about the ${service.title}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2"
                        >
                          <span>Book This Room</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Spaces & Atmosphere Section with Carousel & Lightbox */}
      <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 relative overflow-hidden" id="spaces-atmosphere">
        {/* Subtle Luxury Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <LightboxProvider>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              variants={containerStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.div
                variants={itemFadeUp}
                className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Visual Journey</span>
              </motion.div>
              <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Hotel Gallery & Experiences
              </motion.h2>
              <motion.p variants={itemFadeUp} className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover our luxurious spaces - from serene spa facilities and elegant rooms to vibrant social areas and stunning views that create unforgettable moments.
              </motion.p>
            </motion.div>
            <GalleryCarousel />
          </div>
        </LightboxProvider>
      </section>

      {/* Hotel Dining, Lounges & Culinary Showcase - Authentic Real Hotel Experience */}
      <section className="section-padding bg-slate-50 dark:bg-slate-950/80 border-t border-b border-slate-200/80 dark:border-white/5 relative overflow-hidden" id="dining-showcase">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20 shadow-sm"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mr-1" />
              <span>Authentic Hospitality &amp; Dining</span>
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 tracking-tight"
            >
              Fresh Dining, Lounges &amp; Catering
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Enjoy real hospitality cooked with care. From our morning sunlit buffet and live breakfast fryers to generous catering platters and velvet executive lounges, our spaces are designed to bring guests together.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14"
          >
            {[
              {
                title: "Fresh Kitchen Catering & Platters",
                tag: "Catering & Snacks",
                image: "/new-images/hotel-catering-fresh-sandwiches-chips.jpeg",
                description: "Crispy golden chips, freshly toasted sandwiches, and tailored platters prepared daily for hotel guests and private functions."
              },
              {
                title: "Sunlit Morning Breakfast Buffet",
                tag: "Morning Dining",
                image: "/new-images/hotel-morning-buffet-sunlight-dining.jpeg",
                description: "Full breakfast dining service featuring hot eggs, savory sausages, baked breads, and warm breakfast favorites in our airy dining hall."
              },
              {
                title: "Executive Emerald Velvet Lounge",
                tag: "Guest Lounges",
                image: "/new-images/hotel-lounge-emerald-sofas.jpeg",
                description: "Plush, relaxing seating area designed for casual debriefs, team discussions, family reunions, and unwinding in luxury."
              },
              {
                title: "Live Fryer & Hot Breakfast Station",
                tag: "Live Kitchen",
                image: "/new-images/hotel-kitchen-golden-chips-sausages.jpeg",
                description: "Hot golden chips, sizzling breakfast sausages, and freshly cooked morning specialties prepared hot and crispy."
              },
              {
                title: "Banquet Buffet & Chafing Station",
                tag: "Banquet Facilities",
                image: "/new-images/hotel-banquet-buffet-setup.jpeg",
                description: "Full-scale dining setup with heated stainless chafing dishes, perfect for large group banquets and corporate retreats."
              },
              {
                title: "Guest TV Lounge & Social Amenities",
                tag: "Common Areas",
                image: "/new-images/hotel-buffet-station-tv-lounge.jpeg",
                description: "Comfortable entertainment and dining space with flat screen TV, buffet access, and flexible seating for group hospitality."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemFadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="h-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-amber-400/40 transition-all duration-500 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 font-bold text-xs border border-white/15 shadow-md">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300/90 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-7 pt-0">
                    <a
                      href={`https://wa.me/27603114115?text=${encodeURIComponent(`Hi Glenanda Hotel, I'd like to enquire about ${item.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-2xl bg-amber-50 hover:bg-amber-500 dark:bg-white/5 dark:hover:bg-amber-500 text-amber-900 hover:text-slate-950 dark:text-amber-200 dark:hover:text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all duration-300 shadow-sm"
                    >
                      <span>Enquire via WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" className="group relative">
                <Button size="lg" className="rounded-full px-10 py-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-base font-bold shadow-lg shadow-amber-600/25 transition-all hover:scale-105">
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  <span>View Room Service &amp; Dining Menu</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline" size="lg" className="rounded-full px-10 py-6 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-base transition-all hover:scale-105">
                  <span>Explore All Spaces in Gallery</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Massage & Spa Section - Completely Redesigned */}
  <section className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full opacity-30"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.28) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.22) 0%, transparent 55%)',
              backgroundSize: '100% 100%'
            }}
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-2xl opacity-40 animate-pulse" />
                <h2 className="relative text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-500 to-teal-500 dark:from-emerald-300 dark:via-cyan-200 dark:to-teal-200 tracking-tight">
                  LUXURY SPA
                </h2>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-200/90 max-w-3xl mx-auto leading-relaxed"
            >
              Immerse yourself in pure bliss with our award-winning spa treatments
            </motion.p>
          </motion.div>

          {/* Hero Split Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {/* Left - Large Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="/new-massages10.jpeg"
                  alt="Luxury Spa Signature Retreat"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/45 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <h3 className="text-4xl font-bold text-white mb-4">Premium Treatments</h3>
                  <p className="text-slate-200/90 text-lg">Experience ultimate relaxation in our world-class facilities</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Grid of Smaller Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { src: "/new-massages3.jpeg", title: "Aromatherapy" },
                { src: "/new-massages5.jpeg", title: "Hot Stone" },
                { src: "/new-massages6.jpeg", title: "Facial Care" },
                { src: "/new-massages8.jpeg", title: "Wellness" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative h-[285px] rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/25 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold text-lg">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Floating Service Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {[
              {
                icon: "💆‍♀️",
                title: "Deep Tissue Massage",
                description: "Intensive muscle therapy for tension relief",
                image: "/new-massages2.jpeg",
                availability: "Tailored treatment plans for every guest",
                features: ["Muscle Relief", "Pain Management", "Deep Relaxation"]
              },
              {
                icon: "🌺",
                title: "Aromatherapy",
                description: "Essential oils and soothing techniques",
                image: "/new-massages4.jpeg",
                availability: "Custom essential oil blends selected on arrival",
                features: ["Essential Oils", "Stress Relief", "Mind Balance"]
              },
              {
                icon: "✨",
                title: "Luxury Facial",
                description: "Premium skincare and rejuvenation",
                image: "/new-massages6.jpeg",
                availability: "Skincare consultation sets your perfect ritual",
                features: ["Anti-Aging", "Deep Cleansing", "Hydration"]
              },
              {
                icon: "💑",
                title: "Couples Spa",
                description: "Romantic side-by-side treatments",
                image: "/new-massages8.jpeg",
                availability: "Design your shared escape with our spa concierge",
                features: ["For Two", "Private Suite", "Champagne"]
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Glassmorphism Card */}
                <div className="relative h-full bg-white dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
                  {/* Background Image subtle hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative p-7 h-full flex flex-col justify-between">
                    <div>
                      {/* Icon */}
                      <motion.div
                        className="text-5xl mb-4"
                        whileHover={{ scale: 1.15, rotate: 6 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {service.icon}
                      </motion.div>

                      {/* Title & Info */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{service.title}</h3>
                      <div className="flex flex-col gap-2 mb-3">
                        <span className="inline-flex items-center justify-center w-max px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">
                          Custom Packages Available
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-300/90 leading-snug">
                          {service.availability}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300/80 text-sm mb-4">{service.description}</p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Book Button */}
                    <a
                      href={`https://wa.me/27817609224?text=${encodeURIComponent(`Hi Glenanda Spa, I'd like to book the ${service.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center space-x-2 text-sm"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Why Choose Us - Modern Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Why Choose Our Spa</h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg">Exceptional service meets luxury amenities</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: "🏆", title: "Award Winning", desc: "Certified Experts" },
                { icon: "🌿", title: "Organic", desc: "Natural Products" },
                { icon: "⏰", title: "Flexible", desc: "Open 7 Days" },
                { icon: "👥", title: "Groups", desc: "Special Rates" },
                { icon: "🎯", title: "Custom", desc: "Tailored Care" },
                { icon: "🔒", title: "Private", desc: "Luxury Suites" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="bg-white dark:bg-slate-900/80 rounded-2xl p-6 text-center border border-slate-200/80 dark:border-white/10 shadow-md hover:shadow-xl hover:border-emerald-400/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action - Modern Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/20"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src="/new-massages10.jpeg"
                alt="Spa CTA Background"
                fill
                className="object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-emerald-950/90" />
            </div>

            <div className="relative p-10 sm:p-16 md:p-20 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.08, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl sm:text-7xl mb-6"
              >
                ✨💆‍♀️✨
              </motion.div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Ready to Experience Bliss?
              </h3>
              
              <p className="text-lg sm:text-xl text-slate-200/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Book your spa treatment today and discover why we&apos;re rated as one of the finest wellness destinations
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/27817609224?text=Hi!%20I%27d%20like%20to%20book%20a%20spa%20treatment"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>Book Treatment</span>
                </motion.a>
                
                <Link href="/services">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 backdrop-blur-md transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span>View Packages</span>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Braai & Outdoor Events Section */}
      <section className="section-padding bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900/10 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-amber-400 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-500/20 dark:to-amber-500/20 rounded-full text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30 text-xs sm:text-sm font-bold tracking-wider uppercase mb-6 shadow-sm"
            >
              <span>🔥</span>
              <span>Authentic South African Braai Experience</span>
              <UtensilsCrossed className="w-4 h-4 ml-1" />
            </motion.div>
            
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 tracking-tight"
            >
              Braai &amp; Outdoor Events
            </motion.h2>
            
            <motion.p 
              variants={itemFadeUp} 
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed"
            >
              Experience the true South African tradition! Our outdoor braai facilities are perfect for family gatherings, corporate team building, birthday celebrations, and social events. Enjoy delicious grilled food in a festive garden atmosphere.
            </motion.p>
          </motion.div>

          {/* Featured Braai Images Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
          >
            {[
              {
                src: "/brai.jpeg",
                title: "Outdoor Braai Setup",
                description: "Authentic braai facilities in garden setting"
              },
              {
                src: "/brai2.jpeg",
                title: "Social Gatherings",
                description: "Perfect for family and friends celebrations"
              },
              {
                src: "/brai4.jpeg",
                title: "Evening Events",
                description: "Festive atmosphere with beautiful lighting"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemFadeUp}
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl border border-slate-200/80 dark:border-white/10 bg-slate-900 cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                  <div className="w-8 h-1 bg-amber-400 mb-2 rounded-full group-hover:w-16 transition-all duration-300" />
                  <h4 className="font-bold text-xl sm:text-2xl mb-1 text-white">{item.title}</h4>
                  <p className="text-sm text-slate-200/90 font-medium">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Braai Services Features */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              {
                icon: "🔥",
                title: "Professional Braai Master",
                description: "Experienced staff to handle all grilling"
              },
              {
                icon: "🥩",
                title: "Premium Meats",
                description: "Quality steaks, boerewors, and chicken"
              },
              {
                icon: "🌳",
                title: "Garden Setting",
                description: "Beautiful outdoor space with seating"
              },
              {
                icon: "🎉",
                title: "Full Service",
                description: "Setup, cooking, and cleanup included"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemFadeUp}
                className="text-center p-7 bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-amber-400/40 transition-all duration-300 group flex flex-col justify-between"
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{feature.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300/90 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-700 dark:via-amber-700 dark:to-yellow-700 rounded-3xl p-10 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-orange-400/20">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Book Your Braai Event Today!</h3>
              <p className="text-lg text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed">
                Perfect for groups of 10-100 people. We provide everything you need for an unforgettable South African braai experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="bg-white text-orange-700 hover:bg-orange-50 px-10 py-6 rounded-full shadow-xl font-bold text-base transition-all">
                    <a
                      href="https://wa.me/27603114115?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book%20a%20braai%20event."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <span className="text-xl">🔥</span>
                      <span>Book Braai Event</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg" className="border-2 border-white/80 text-white hover:bg-white/15 px-10 py-6 rounded-full font-bold text-base backdrop-blur-sm transition-all">
                    <Link href="/contact">
                      <span>📞 Get Custom Quote</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <div className="mt-8 text-white/90 text-sm sm:text-base">
                <p className="font-semibold text-lg">📞 +27 60 311 4115</p>
                <p className="opacity-90">Available for bookings 7 days a week</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sports Teams & Athletic Events Section */}
      <section className="section-padding bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/10 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-green-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-teal-400 rounded-full blur-2xl animate-pulse delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-20"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-6 shadow-lg"
            >
              <Award className="w-5 h-5 animate-pulse" />
              <span className="tracking-wide">PREMIER SPORTS TEAM ACCOMMODATION</span>
              <Users className="w-5 h-5 animate-pulse" />
            </motion.div>
            
            <motion.h2 
              variants={itemFadeUp} 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-8"
              style={{ lineHeight: '1.1' }}
            >
              Official Host for Sports Teams & Athletic Events
            </motion.h2>
            
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              We specialize in hosting professional soccer teams, sports clubs, and athletic groups. With dedicated facilities, nutritious team dining, secure accommodation, and transportation services, we ensure your team performs at their best.
            </motion.p>
          </motion.div>

          {/* Featured Sports Images Carousel */}
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <motion.div
                className="flex h-full"
                animate={{ x: [0, -100, -200, -300, -400, -500, -600, -700, 0] }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              >
                {[
                  { src: "/soccer3.jpeg", alt: "Soccer team enjoying premium hotel accommodation" },
                  { src: "/soccer-dining.jpeg", alt: "Professional team dining with nutritious meal options" },
                  { src: "/soccer6.jpeg", alt: "Team bonding and relaxation in comfort" },
                  { src: "/soccer-dining4.jpeg", alt: "Group dining setup for sports teams" },
                  { src: "/soccer11.jpeg", alt: "Athletes enjoying world-class hospitality" },
                  { src: "/soccer-bus.jpeg", alt: "Dedicated team transportation services" },
                  { src: "/soccer-dining7.jpeg", alt: "Nutritious breakfast for athletic performance" },
                  { src: "/soccer14.jpeg", alt: "Team gathering at hotel facilities" },
                ].map((image, index) => (
                  <motion.div
                    key={index}
                    className="min-w-full h-full relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-white text-lg font-medium drop-shadow-lg">
                        {image.alt}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-transparent to-emerald-600/20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Services for Sports Teams Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {[
              {
                icon: "⚽",
                title: "Team Accommodation",
                description: "Dedicated floors for teams with connecting rooms and secure access for privacy and focus",
                services: ["20-50 Players", "Coaching Staff Rooms", "Medical Staff Access", "24/7 Security"],
                image: "/soccer4.jpeg"
              },
              {
                icon: "🍽️",
                title: "Sports Nutrition Dining",
                description: "Professional catering with sports nutrition menu, pre-game meals, and dietary customization",
                services: ["Performance Meals", "Dietary Plans", "Hydration Stations", "Private Dining"],
                image: "/soccer-dining2.jpeg"
              },
              {
                icon: "🚌",
                title: "Team Transportation",
                description: "Dedicated shuttle services for training venues, matches, and airport transfers",
                services: ["Coach Bus", "Airport Transfers", "Training Venue", "Match Day Service"],
                image: "/soccer-bus2.jpeg"
              },
              {
                icon: "🏋️",
                title: "Recovery & Wellness",
                description: "Access to spa facilities, massage therapy, and relaxation areas for optimal recovery",
                services: ["Sports Massage", "Ice Baths", "Sauna Access", "Physio Support"],
                image: "/new-massages8.jpeg"
              }
            ].map((service) => (
              <motion.div
                key={service.title}
                variants={itemFadeUp}
                className="group"
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="h-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-500 overflow-hidden relative flex flex-col justify-between">
                  {/* Background Image on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-7 relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-500/20 text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300/90 text-sm mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Services List */}
                    <div className="space-y-2 mb-6">
                      {service.services.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Book Button */}
                  <div className="p-7 pt-0 relative z-10">
                    <Button asChild className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-md hover:shadow-xl hover:shadow-emerald-600/25 transition-all duration-300 py-5">
                      <a
                        href={`https://wa.me/27603114115?text=${encodeURIComponent(`Hi Glenanda Hotel, I'd like to request a quote for Sports Teams: ${service.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <span>Request Team Quote</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Teams We've Hosted Section */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white dark:bg-slate-900/90 rounded-3xl p-10 sm:p-14 shadow-xl border border-slate-200/80 dark:border-white/10 mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Why Sports Teams Choose Us</h3>
              <p className="text-lg text-slate-600 dark:text-slate-300">Proven track record with professional and amateur teams</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {[
                { icon: "🏆", title: "100+ Teams", subtitle: "Hosted Annually" },
                { icon: "⚽", title: "Soccer Clubs", subtitle: "Primary Focus" },
                { icon: "🎯", title: "Match Day", subtitle: "Support Services" },
                { icon: "🍴", title: "Sports Nutrition", subtitle: "Expert Menus" },
                { icon: "🛡️", title: "Private Floors", subtitle: "Team Security" },
                { icon: "🚌", title: "Transport", subtitle: "Included" }
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemFadeUp}
                  className="text-center p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200/60 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group"
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-sm sm:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{feature.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{feature.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Showcase Grid - Team Experiences */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Team Experiences at Glenanda</h3>
              <p className="text-lg text-slate-600 dark:text-slate-300">See how we support teams throughout their stay</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { src: "/new-images/hotel-full-breakfast-dining.jpeg", title: "Team Dining", subtitle: "Nutritious Meals" },
                { src: "/new-images/hotel-guest-lounge-gathering.jpeg", title: "Team Bonding", subtitle: "Common Areas" },
                { src: "/new-images/hotel-group-breakfast-meeting.jpeg", title: "Pre-Match Meals", subtitle: "Performance Focus" },
                { src: "/room12.jpeg", title: "Comfortable Stay", subtitle: "Rest & Recovery" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeUp}
                  className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl border border-slate-200/80 dark:border-white/10 bg-slate-900 cursor-pointer"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/gallery">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-sm opacity-90 font-medium">{item.subtitle}</p>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/85 to-teal-700/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <div className="text-white text-center">
                        <Eye className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-bold text-sm tracking-wide">View Full Gallery</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Event & Conference Facilities Section */}
  <section className="section-padding bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemFadeUp}
              className="inline-block px-6 py-3 rounded-full text-sm font-medium mb-4 bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20 backdrop-blur-sm"
            >
              🏛️ World-Class Event Facilities
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-6"
            >
              Host Memorable Events for Any Size Group
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed"
            >
              From intimate board meetings to grand celebrations accommodating up to 500 guests, our versatile event spaces and comprehensive services ensure your gathering is executed flawlessly.
            </motion.p>
          </motion.div>

          {/* Venue Capacity Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: "Executive Boardroom",
                capacity: "10-25 people",
                features: ["Premium AV setup", "Climate controlled", "Private entrance"],
                image: "/new-images/hotel-group-breakfast-meeting.jpeg",
                icon: "👔"
              },
              {
                title: "Conference Hall",
                capacity: "50-150 people",
                features: ["Theater-style seating", "Stage platform", "Live streaming"],
                image: "/new-images/hotel-conference-dining-table.jpeg", 
                icon: "🎤"
              },
              {
                title: "Sports Team Venue",
                capacity: "20-50 athletes",
                features: ["Team briefing rooms", "Coach facilities", "Equipment storage"],
                image: "/new-images/hotel-group-gathering-hall.jpeg",
                icon: "⚽"
              },
              {
                title: "Braai & Outdoor Events",
                capacity: "30-100 people",
                features: ["Outdoor braai facilities", "Garden setting", "Festive atmosphere"],
                image: "/brai3.jpeg",
                icon: "🔥"
              },
              {
                title: "Grand Banquet Hall",
                capacity: "200-350 people",
                features: ["Elegant chandeliers", "Dance floor", "Full catering kitchen"],
                image: "/new-images/hotel-banquet-buffet-setup.jpeg",
                icon: "🏛️"
              },
              {
                title: "Outdoor Pavilion", 
                capacity: "100-500 people",
                features: ["Garden setting", "Weather protection", "Scenic backdrop"],
                image: "/niceview.jpeg",
                icon: "🌳"
              }
            ].map((venue) => (
              <motion.div key={venue.title} variants={itemFadeUp} className="group" whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <div className="h-full bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-500 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={venue.image}
                        alt={venue.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white/90 dark:bg-slate-900/90 text-emerald-600 dark:text-emerald-300 border border-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-lg backdrop-blur-md">
                          {venue.icon}
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-4">
                        <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-md">
                          {venue.capacity}
                        </span>
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{venue.title}</h3>
                      <ul className="space-y-2.5">
                        {venue.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-7 pt-0">
                    <a
                      href={`https://wa.me/27603114115?text=${encodeURIComponent(`Hi Glenanda Hotel, I'd like to enquire about booking the ${venue.title} (${venue.capacity}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-emerald-600 dark:bg-white/5 dark:hover:bg-emerald-600 text-slate-800 hover:text-white dark:text-slate-200 dark:hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all duration-300"
                    >
                      <span>Enquire About Venue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Event Services Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
          >
            {[
              {
                icon: "📋",
                title: "Event Planning & coordination",
                description: "Dedicated event managers to handle every detail from concept to execution."
              },
              {
                icon: "🍽️",
                title: "Full-Service Catering",
                description: "Custom menus ranging from coffee breaks to multi-course gala dinners."
              },
              {
                icon: "🎬", 
                title: "Audio/Visual Technology",
                description: "State-of-the-art sound systems, projection, lighting, and recording equipment."
              },
              {
                icon: "🌸",
                title: "Decoration & Styling",
                description: "Professional florals, themed decorations, and ambient lighting design."
              },
              {
                icon: "🚐",
                title: "Transportation Services", 
                description: "Group shuttle services and VIP transportation arrangements."
              },
              {
                icon: "🏨",
                title: "Accommodation Packages",
                description: "Special group rates and room block reservations for multi-day events."
              }
            ].map((service) => (
              <motion.div key={service.title} variants={itemFadeUp} whileHover={{ y: -6 }}>
                <div className="text-center p-8 bg-white dark:bg-slate-900/80 rounded-3xl shadow-lg border border-slate-200/80 dark:border-white/10 hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300/90 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Event Types Showcase */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white dark:bg-slate-900/90 rounded-3xl p-10 sm:p-14 shadow-xl border border-slate-200/80 dark:border-white/10"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Perfect Venue for Every Occasion</h3>
              <p className="text-lg text-slate-600 dark:text-slate-300">We&apos;ve successfully hosted a wide variety of events for groups of all sizes</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {[
                {
                  category: "Corporate Events",
                  events: ["Board meetings", "Product launches", "Team retreats", "Annual conferences"],
                  color: "bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-500/20"
                },
                {
                  category: "Sports Teams",
                  events: ["Soccer teams", "Training camps", "Match day stays", "Team tournaments"],
                  color: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20"
                },
                {
                  category: "Braai & Outdoor",
                  events: ["Braai parties", "Garden events", "Outdoor celebrations", "Family gatherings"],
                  color: "bg-orange-500/10 text-orange-800 dark:text-orange-300 border border-orange-500/20"
                },
                {
                  category: "Social Celebrations",
                  events: ["Weddings", "Anniversaries", "Birthday parties", "Graduation celebrations"],
                  color: "bg-pink-500/10 text-pink-800 dark:text-pink-300 border border-pink-500/20"
                },
                {
                  category: "Community Gatherings",
                  events: ["Charity galas", "Fundraising events", "Community meetings", "Award ceremonies"],
                  color: "bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20"
                },
                {
                  category: "Educational Events",
                  events: ["Workshops", "Seminars", "Training sessions", "Academic conferences"],
                  color: "bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/20"
                }
              ].map((category) => (
                <motion.div key={category.category} variants={itemFadeUp} whileHover={{ y: -5 }}>
                  <div className={`${category.color} rounded-2xl p-6 h-full flex flex-col justify-between shadow-sm`}>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg mb-3">{category.category}</h4>
                      <ul className="space-y-1.5">
                        {category.events.map((event) => (
                          <li key={event} className="text-xs sm:text-sm opacity-90 leading-snug">• {event}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA for Event Bookings */}
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Ready to Plan Your Event?</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our event specialists are ready to help you create an unforgettable experience. Get in touch to discuss your requirements and receive a custom quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.me/27603114115?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20enquire%20about%20event%20facilities." target="_blank" className="group relative">
                <Button size="lg" className="rounded-full px-10 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-base font-bold shadow-lg shadow-emerald-600/25 transition-all hover:scale-105">
                  <span>Request Event Quote</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-full px-10 py-6 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-base transition-all hover:scale-105">
                  <span>Schedule Site Visit</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 dark:from-emerald-700 dark:via-emerald-800 dark:to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm"
              animate={{ textShadow: ["0 0 18px rgba(255,255,255,0.4)", "0 0 36px rgba(255,255,255,0.7)", "0 0 18px rgba(255,255,255,0.4)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Book Your Stay?
            </motion.h2>
            
            <p className="text-lg sm:text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Reserve directly for the best flexibility. Instant assistance via WhatsApp for special requests, group enquiries or extended stays.
            </p>

            <motion.div 
              className="bg-black/25 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 mb-10 inline-block shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center space-x-6 sm:space-x-12 text-white">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">4 Types</div>
                  <div className="text-xs sm:text-sm text-emerald-200 font-medium">Room Options</div>
                </div>
                <div className="w-px h-10 bg-white/25"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">Fast</div>
                  <div className="text-xs sm:text-sm text-emerald-200 font-medium">Check-In</div>
                </div>
                <div className="w-px h-10 bg-white/25"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">24/7</div>
                  <div className="text-xs sm:text-sm text-emerald-200 font-medium">Support</div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.me/27603114115?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book%20a%20stay." target="_blank">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-slate-950 hover:bg-emerald-50 text-base sm:text-lg px-10 py-6 rounded-full group shadow-2xl font-bold transition-all">
                    <Calendar className="mr-2 h-5 w-5 text-emerald-600" />
                    <span>WhatsApp Reservation</span>
                    <motion.span
                      className="ml-2 inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/rooms">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="border-2 border-white/80 text-white hover:bg-white/15 text-base sm:text-lg px-10 py-6 rounded-full font-bold backdrop-blur-sm transition-all">
                    <span>View All Rooms</span>
                  </Button>
                </motion.div>
              </Link>
            </div>

            <motion.div 
              className="text-emerald-100/90 text-sm mt-8 font-medium tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p>✓ Direct booking • ✓ Flexible support • ✓ Local hospitality</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
