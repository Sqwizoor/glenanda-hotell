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
  Eye
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
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

// Carousel component for gallery
function GalleryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', dragFree: false });
  const { open } = useLightbox();
  const [selected, setSelected] = useState(0);

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

  return (
    <div className="relative" aria-label="Hotel Gallery carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {resultsMedia.map((item, idx) => {
            // Determine content type for badge
            const contentType = item.src.includes('spa') ? 'Spa & Wellness' :
                               item.src.includes('group') ? 'Group Events' :
                               item.src.includes('room') ? 'Accommodations' :
                               item.src.includes('dining') ? 'Dining' :
                               'Hotel Amenities';
            
            const badgeColor = item.src.includes('spa') ? 'bg-emerald-500' :
                              item.src.includes('group') ? 'bg-purple-500' :
                              item.src.includes('room') ? 'bg-blue-500' :
                              item.src.includes('dining') ? 'bg-amber-500' :
                              'bg-gray-500';
            
            return (
              <motion.div
                key={item.src}
                className="relative min-w-[80%] sm:min-w-[55%] md:min-w-[40%] lg:min-w-[30%] aspect-[4/3] overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => open(idx)}
              >
                {item.type === 'image' ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width:640px) 80vw, (max-width:768px) 55vw, (max-width:1024px) 40vw, 30vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    priority={idx < 2}
                  />
                ) : (
                  <LazyVideo src={item.src} className="w-full h-full object-cover" />
                )}
                
                {/* Enhanced overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Content type badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${badgeColor} backdrop-blur-sm shadow-lg opacity-90 group-hover:opacity-100 transition-opacity`}>
                    {contentType}
                  </span>
                </div>
                
                {/* View icon on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Enhanced description */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium leading-relaxed drop-shadow-lg">
                    {item.alt}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Enhanced Prev/Next Buttons */}
      <div className="absolute -top-16 right-0 flex items-center gap-3">
        <button
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="Previous images"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => emblaApi && emblaApi.scrollNext()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="Next images"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {resultsMedia.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2.5 w-2.5 rounded-full ${i===selected?'bg-emerald-600':'bg-gray-300 hover:bg-gray-400'} transition-colors`}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
}

const homeServices = [
  {
    id: "business-executive",
    title: "Executive Business Rooms",
    subtitle: "Perfect for solo business travelers",
    duration: "Single occupancy",
    price: "From R950 / night",
    popular: true,
    groupFriendly: false,
    image: "/group5.jpeg",
    description: "Premium single rooms with work desk, high-speed WiFi, and business center access - ideal for the executive traveler."
  },
  {
    id: "couples-romantic",
    title: "Romantic Couples Suites",
    subtitle: "Intimate getaway accommodations",
    duration: "Sleeps 2 people",
    price: "From R1 800 / night",
    popular: true,
    groupFriendly: false,
    image: "/group13.jpeg",
    description: "Elegant suites with private balcony, king-size bed, and romantic amenities - perfect for anniversaries and honeymoons."
  },
  {
    id: "family-suites",
    title: "Family & Group Suites",
    subtitle: "Spacious family accommodations",
    duration: "Sleeps 4-8 people",
    price: "From R2 200 / night",
    popular: true,
    groupFriendly: true,
    image: "/group16.jpeg",
    description: "Extra-large suites with multiple bedrooms, living areas, and kitchenettes - perfect for families and small groups."
  },
  {
    id: "corporate-package",
    title: "Corporate Events & Groups",
    subtitle: "All-inclusive business solutions",
    duration: "10-200 participants",
    price: "From R850 / person / night",
    popular: false,
    groupFriendly: true,
    image: "/group11.jpeg",
    description: "Comprehensive packages including accommodation, meeting rooms, catering, and event coordination for corporate groups."
  }
];

// (removed unused testimonials array)

// Spaces & Atmosphere gallery media — using real hotel/public images with group focus
// Keep only images for performance & consistency
type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; poster?: string };

const resultsMedia: MediaItem[] = [
  { type: "image", src: "/spa.jpeg", alt: "Serene spa treatment room with calming ambiance" },
  { type: "image", src: "/spa2.jpeg", alt: "Luxury spa facilities for ultimate relaxation" },
  { type: "image", src: "/group11.jpeg", alt: "Large group enjoying hotel amenities together" },
  { type: "image", src: "/group12.jpeg", alt: "Corporate team meeting in our conference facilities" },
  { type: "image", src: "/room14.jpeg", alt: "Presidential suite for VIP group stays" },
  { type: "image", src: "/room6.jpeg", alt: "Executive rooms perfect for business groups" },
  { type: "image", src: "/group13.jpeg", alt: "Family celebration in our event space" },
  { type: "image", src: "/room11.jpeg", alt: "Connecting rooms for families and teams" },
  { type: "image", src: "/dining2.jpeg", alt: "Group dining setup for special occasions" },
  { type: "image", src: "/group14.jpeg", alt: "Wedding party in our elegant dining room" },
  { type: "image", src: "/room12.jpeg", alt: "Spacious suites accommodating larger groups" },
  { type: "image", src: "/group16.jpeg", alt: "Business retreat participants networking" },
  { type: "image", src: "/niceview.jpeg", alt: "Panoramic views enjoyed by all our guests" },
  { type: "image", src: "/group17.jpeg", alt: "Multi-generational family reunion gathering" },
  { type: "image", src: "/guests2.jpeg", alt: "Relaxed social atmosphere in guest areas" },
  { type: "image", src: "/group18.jpeg", alt: "Social club event with group dining" },
  { type: "image", src: "/group2.jpeg", alt: "Corporate conference with full group accommodation" },
  { type: "image", src: "/group3.jpeg", alt: "Birthday celebration party setup" },
  { type: "image", src: "/group4.jpeg", alt: "Team building activities in common areas" },
  { type: "image", src: "/group5.jpeg", alt: "Anniversary dinner with extended family" },
  { type: "image", src: "/group8.jpeg", alt: "Executive retreat with group accommodation" },
  { type: "image", src: "/group9.jpeg", alt: "Social gathering in our spacious lounge" },
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

// Simple crossfade slideshow background component
function Slideshow({ images, interval = 6000 }: { images: string[]; interval?: number }) {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);
  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <motion.div
          key={src + i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{ pointerEvents: 'none' }}
        >
          <Image
            src={src}
            alt="Hero background"
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center will-change-transform"
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-black/40" />
    </div>
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
      {/* Floating Quick Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[48] md:hidden">
        <div className="flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-lg shadow-emerald-900/10 dark:shadow-emerald-300/10 border border-white/40 dark:border-gray-700/40">
          <Link href="/rooms" className="flex flex-col items-center text-[10px] font-medium text-gray-700 dark:text-gray-300">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">R</div>
            <span className="mt-1">Rooms</span>
          </Link>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-emerald-300/50 dark:via-emerald-600/50 to-transparent" />
          <a
            href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book."
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-[10px] font-medium text-gray-700 dark:text-gray-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">WA</div>
            <span className="mt-1">Chat</span>
          </a>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-emerald-300/50 dark:via-emerald-600/50 to-transparent" />
          <Link href="/contact" className="flex flex-col items-center text-[10px] font-medium text-gray-700 dark:text-gray-300">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">✉</div>
            <span className="mt-1">Contact</span>
          </Link>
        </div>
      </div>
      {/* Modern Hero Section — Enhanced with better mobile responsiveness */}
  <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-visible pt-20">
        {/* Enhanced Background slideshow with better mobile optimization */}
        <Slideshow images={["/room14.jpeg","/room6.jpeg","/niceview.jpeg","/room11.jpeg"]} />
        
        {/* Enhanced overlay with better gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        
        {/* Dynamic floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
        
        {/* Enhanced Content with better responsive design */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
          className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        >
          <div className="max-w-6xl mx-auto text-center">
            {/* Enhanced Badge with animation */}
            <motion.div
              className="inline-flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 text-white/95 mb-2 sm:mb-4 shadow-lg"
              initial={{ opacity:0, y:20, scale: 0.9 }}
              animate={{ opacity:1, y:0, scale: 1 }}
              transition={{ delay:0.3, duration:0.8, ease:[0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 dark:text-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm tracking-[0.15em] font-semibold">GLENANDA LUXURY HOTEL</span>
            </motion.div>
            
            {/* Enhanced Main Heading with better typography */}
            <motion.h1
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.5, duration:1, ease:[0.22, 1, 0.36, 1] }}
              className="font-bold leading-[0.95] text-white mb-2 sm:mb-3"
              style={{
                fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
                lineHeight: 'clamp(1.7rem, 6.5vw, 3.8rem)'
              }}
            >
              <span className="block">Unforgettable Experiences</span>
              <span className="block">for Every Guest</span>
              <motion.span 
                className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-200 to-emerald-200 font-light tracking-wide"
                style={{ fontSize: 'clamp(0.875rem, 3vw, 1.5rem)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Solo travelers, couples, families & corporate groups
              </motion.span>
            </motion.h1>
            
            {/* Enhanced description */}
            <motion.p
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.8, duration:0.8 }}
              className="mt-2 sm:mt-3 text-white/85 max-w-3xl mx-auto leading-relaxed"
              style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)' }}
            >
              Premium accommodations in South Johannesburg&apos;s finest location • Fiber Wi‑Fi • 24/7 Support • 
              Secure Parking • Perfect for solo business trips, romantic getaways, family vacations, and corporate events.
            </motion.p>
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:1.1, duration:0.7 }}
              className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Link href="/rooms" className="group relative w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full px-4 sm:px-8 py-2.5 sm:py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-2xl shadow-emerald-900/40 hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300"
                  style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}
                >
                  <Eye className="mr-2 w-4 h-4" />
                  Explore Rooms
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full px-4 sm:px-8 py-2.5 sm:py-4 border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 backdrop-blur-sm font-semibold transition-all duration-300"
                  style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}
                >
                  <Users className="mr-2 w-4 h-4" />
                  Book Your Stay
                </Button>
              </Link>
            </motion.div>
            
            {/* Enhanced Stats Grid with better mobile responsive design */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:1.4 }}
              className="mt-3 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto"
            >
              {[
                {label:'Accommodations', value:'50+ Rooms', icon: '🏨'},
                {label:'All Guest Types', value:'1-200 People', icon: '👥'},
                {label:'Support', value:'24/7 Service', icon: '🔧'}
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center p-2 sm:p-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-lg sm:text-2xl mb-1 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="font-bold text-white mb-1" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)' }}>
                    {stat.value}
                  </div>
                  <div className="text-white/60 font-medium" style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
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

      {/* Accommodation Packages Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
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
              className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-4"
            >
              <Users className="inline-block w-4 h-4 mr-2" />
              For Every Guest
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Tailored Packages for Every Stay
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Whether you&apos;re traveling solo on business, planning a romantic getaway, enjoying a family reunion, or organizing a corporate retreat, we provide personalized service and exclusive amenities for every type of stay.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
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
              <motion.div key={feature.title} variants={itemFadeUp}>
                <Card className="h-full text-center p-8 bg-gray-50/50 dark:bg-gray-800/50 border-0 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mt-16"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="group relative">
                <Button size="lg" className="rounded-full px-10 py-6 bg-emerald-600 hover:bg-emerald-500 text-white text-base shadow-lg shadow-emerald-900/30">
                  Book Your Perfect Stay
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/menu" className="group relative">
                <Button size="lg" variant="outline" className="rounded-full px-10 py-6 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-base shadow-lg">
                  View Room Service Menu
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview (styled like Services page, with images) */}
      <section className="section-padding skincare-gradient dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-4"
            >
        ✨ Accommodation for Every Traveler
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
              whileInView={{ 
                background: [
          "linear-gradient(90deg, #065f46, #f59e0b)",
          "linear-gradient(90deg, #f59e0b, #10b981)",
          "linear-gradient(90deg, #10b981, #f59e0b)",
          "linear-gradient(90deg, #f59e0b, #065f46)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
        Rooms & Suites for Individuals & Groups
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              whileInView={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
        Choose from a variety of thoughtfully designed spaces, from cozy rooms for solo travelers to spacious suites perfect for families and groups.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {homeServices.map((service, index) => (
              <motion.div 
                key={service.id} 
                variants={itemFadeUp} 
                className="group"
                whileHover={{ 
                  y: -12,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  duration: 0.4 
                }}
              >
                <Card className="h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  <CardContent className="p-0 relative z-10">
                    {/* Service Image with Enhanced Effects */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full h-full">
                        <SmartImage
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                          className="object-cover w-full h-full"
                          priority={index < 2}
                          asMotion={false}
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>

                      {/* Animated overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {service.popular && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                        >
                          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                            ⭐ Most Popular
                          </Badge>
                        </motion.div>
                      )}
                      {service.groupFriendly && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                        >
                          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                            <Users className="w-3 h-3 mr-1" />
                            Group-Friendly
                          </Badge>
                        </motion.div>
                      )}

                      <motion.div 
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-center text-white drop-shadow-lg">
                          <div className="flex items-center space-x-4">
                            <motion.div 
                              className="flex items-center bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">{service.duration}</span>
                            </motion.div>
                            <motion.div 
                              className="flex items-center bg-emerald-500/80 px-2 py-1 rounded-full backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              <span className="text-sm font-bold">{service.price}</span>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Service Content with Enhanced Animations */}
                    <div className="p-6 space-y-4">
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                          {service.subtitle}
                        </p>
                      </motion.div>

                      <motion.p 
                        className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3"
                        whileHover={{ color: "#374151" }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.description}
                      </motion.p>

                      <motion.div 
                        className="pt-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button asChild className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 group shadow-lg hover:shadow-xl transition-all duration-300">
                          <a
                            href={`https://wa.me/27762073299?text=${encodeURIComponent(`Hi Glenanda Hotel, I&apos;d like to enquire about the ${service.title}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="flex items-center justify-center">
                              Book This Room
                            </span>
                            <motion.span
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="inline-flex ml-2"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.span>
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Spaces & Atmosphere Section with Carousel & Lightbox */}
      <section className="section-padding bg-white dark:bg-gray-900" id="spaces-atmosphere">
        <LightboxProvider>
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-16"
            >
              <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Hotel Gallery & Experiences
              </motion.h2>
              <motion.p variants={itemFadeUp} className="text-xl text-gray-600 dark:text-gray-400">
                Discover our luxurious spaces - from serene spa facilities and elegant rooms to vibrant social areas and stunning views that create unforgettable moments.
              </motion.p>
            </motion.div>
            <GalleryCarousel />
          </div>
        </LightboxProvider>
      </section>

      {/* Modern Massage & Spa Section */}
      <section className="section-padding bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-pink-400 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-rose-400 rounded-full blur-2xl animate-pulse delay-2000" />
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
              className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium mb-6 shadow-lg"
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="tracking-wide">LUXURY MASSAGE & SPA EXPERIENCE</span>
              <Heart className="w-5 h-5 animate-pulse" />
            </motion.div>
            
            <motion.h2 
              variants={itemFadeUp} 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent mb-8"
              style={{ lineHeight: '1.1' }}
            >
              Premium Massage & Spa Services
            </motion.h2>
            
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              Escape to our world-class spa sanctuary where expert therapists use premium techniques and organic products to rejuvenate your body, mind, and spirit. From deep tissue massages to luxury facial treatments, we offer everything you need for complete relaxation.
            </motion.p>
          </motion.div>

          {/* Hero Image Gallery Carousel */}
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
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              >
                {[
                  { src: "/massage-spa.jpeg", alt: "Luxury spa treatment room with ambient lighting" },
                  { src: "/massage-spa2.jpeg", alt: "Professional massage therapy session" },
                  { src: "/massage-spa3.jpeg", alt: "Serene spa environment with natural elements" },
                  { src: "/massage-spa4.jpeg", alt: "Hot stone massage therapy setup" },
                  { src: "/massage-spa5.jpeg", alt: "Aromatherapy and essential oils treatment" },
                  { src: "/massage-spa6.jpeg", alt: "Couples massage suite with romantic ambiance" },
                  { src: "/massage-spa7.jpeg", alt: "Facial treatment and skincare services" },
                  { src: "/massage-spa9.jpeg", alt: "Relaxation lounge with premium amenities" },
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-white text-lg font-medium drop-shadow-lg">
                        {image.alt}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-pink-600/20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {[
              {
                icon: "💆‍♀️",
                title: "Therapeutic Massage",
                description: "Deep tissue, Swedish, hot stone, and aromatherapy massages by certified professionals",
                services: ["Deep Tissue", "Swedish Relaxation", "Hot Stone", "Aromatherapy"],
                image: "/massage-spa.jpeg"
              },
              {
                icon: "✨",
                title: "Luxury Facial Treatments",
                description: "Anti-aging facials, deep cleansing, and premium skincare using organic products",
                services: ["Anti-Aging Facial", "Deep Cleansing", "Hydrating Treatment", "Organic Skincare"],
                image: "/massage-spa3.jpeg"
              },
              {
                icon: "💑",
                title: "Couples' Spa Packages",
                description: "Romantic spa experiences designed for two with side-by-side treatments",
                services: ["Couples Massage", "Romantic Package", "Anniversary Special", "Honeymoon Spa"],
                image: "/massage-spa6.jpeg"
              },
              {
                icon: "🧘‍♀️",
                title: "Wellness & Relaxation",
                description: "Complete wellness programs including meditation, yoga, and holistic healing",
                services: ["Meditation Sessions", "Wellness Consultation", "Stress Relief", "Energy Healing"],
                image: "/massage-spa7.jpeg"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemFadeUp}
                className="group"
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Services List */}
                    <div className="space-y-2 mb-8">
                      {service.services.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 flex-shrink-0" />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Book Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        Book Treatment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium Features Section */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Choose Our Spa?</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">Premium amenities and professional service that sets us apart</p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { icon: "🏆", title: "Award-Winning", subtitle: "Certified Therapists" },
                { icon: "🌿", title: "Organic Products", subtitle: "Natural & Premium" },
                { icon: "🕐", title: "Flexible Hours", subtitle: "7 Days a Week" },
                { icon: "👥", title: "Group Packages", subtitle: "Special Rates" },
                { icon: "🎯", title: "Personalized", subtitle: "Tailored Treatments" },
                { icon: "🛡️", title: "Private Suites", subtitle: "Complete Privacy" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemFadeUp}
                  className="text-center group"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="text-3xl mb-3 group-hover:animate-bounce"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Showcase Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Experience Our Spa Facilities</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">Take a virtual tour of our premium spa environments</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { src: "/massage-spa2.jpeg", title: "Treatment Rooms", subtitle: "Private & Serene" },
                { src: "/massage-spa4.jpeg", title: "Hot Stone Setup", subtitle: "Premium Equipment" },
                { src: "/massage-spa5.jpeg", title: "Aromatherapy", subtitle: "Essential Oils" },
                { src: "/massage-spa9.jpeg", title: "Relaxation Lounge", subtitle: "Post-Treatment" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeUp}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm opacity-90">{item.subtitle}</p>
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-pink-600/80 dark:from-purple-700/80 dark:to-pink-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1 }}
                  >
                    <div className="text-white text-center">
                      <Eye className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">View Details</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 left-8 w-20 h-20 border border-white rounded-full" />
                <div className="absolute bottom-8 right-8 w-32 h-32 border border-white rounded-full" />
                <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full" />
              </div>
              
              <div className="relative z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-6xl mb-6"
                >
                  💆‍♀️✨
                </motion.div>
                
                <h3 className="text-4xl font-bold mb-6">Ready to Unwind & Rejuvenate?</h3>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Book your premium spa experience today. Our expert therapists are ready to provide you with the ultimate relaxation and wellness journey.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-50 px-12 py-6 rounded-full shadow-lg text-lg">
                      <Link href="/treatments">
                        <Sparkles className="mr-2 h-5 w-5" />
                        View All Treatments
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-12 py-6 rounded-full text-lg">
                      <a
                        href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book%20a%20spa%20treatment."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📱 Book via WhatsApp
                      </a>
                    </Button>
                  </motion.div>
                </div>

                <div className="mt-8 text-white/90">
                  <p className="font-semibold text-lg">📞 +27 76 207 3299</p>
                  <p>Open 7 days a week • Professional certified therapists</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Room Service Menu Section */}
      <section className="section-padding bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-900/10 dark:to-gray-900">
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
              className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-4"
            >
              <UtensilsCrossed className="inline-block w-4 h-4 mr-2" />
              Room Service Available 24/7
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Delicious Room Service Menu
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Enjoy fresh, delicious meals delivered directly to your room. From crispy chicken wings to traditional South African favorites with our signature hotel gravy.
            </motion.p>
          </motion.div>

          {/* Featured Menu Items Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {[
              {
                name: "Wings with Chips",
                description: "Crispy golden chicken wings served with fresh-cut seasoned chips",
                price: "From R65",
                category: "Most Popular",
                image: "/dining.jpeg",
                prepTime: "15-20 min",
                sizes: "4, 6, 8 or 12 pieces"
              },
              {
                name: "Wings with Pap & Gravy",
                description: "Tender wings with traditional pap and our hotel gravy prepared by professional chefs",
                price: "From R50",
                category: "Chef's Special", 
                image: "/dining2.jpeg",
                prepTime: "15-25 min",
                sizes: "4, 6, 8 or 12 pieces"
              },
              {
                name: "House Special Samosas",
                description: "12 crispy samosas with signature spice blend - Glen Special, Sweetcorn & Cheese, or Mince",
                price: "R99 (12 pieces)",
                category: "Snacks & Sides",
                image: "/dining4.jpeg",
                prepTime: "15-20 min",
                sizes: "12 pieces per order"
              }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                variants={itemFadeUp}
                className="group"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <motion.div 
                        whileHover={{ scale: 1.08 }} 
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full"
                      >
                        <SmartImage
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                          className="object-cover w-full h-full"
                          priority={index < 2}
                          asMotion={false}
                        />
                      </motion.div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-orange-500 text-white shadow-lg">
                          {item.category}
                        </Badge>
                      </div>
                      
                      {/* Price Badge */}
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="font-bold text-orange-600">{item.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      
                      {/* Details */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.prepTime}
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{item.sizes}</span>
                        </div>
                      </div>
                      
                      {/* Order Button */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                          <a
                            href={`https://wa.me/27762073299?text=${encodeURIComponent(`Hi Glenanda Hotel, I'd like to order ${item.name} for room service delivery.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Order Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Fresh Juices Section */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Fresh Tropical Juices</h3>
              <p className="text-gray-600 dark:text-gray-400">Freshly squeezed daily • Perfect refreshment for any time</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Fresh Mango Juice", price: "R30", icon: "🥭" },
                { name: "Fruit Cocktail", price: "R30", icon: "🍸" },
                { name: "Passion Fruit Juice", price: "R30", icon: "🧡" }
              ].map((juice, index) => (
                <motion.div
                  key={juice.name}
                  variants={itemFadeUp}
                  className="text-center p-6 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-3">{juice.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{juice.name}</h4>
                  <p className="text-orange-600 dark:text-orange-400 font-bold text-lg">{juice.price}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Service Info & CTA */}
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">24/7 Room Service Available</h3>
              <p className="text-lg mb-6 text-white/90">
                Professional chefs • Free delivery to your room • Call or WhatsApp anytime
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-4 rounded-full shadow-lg">
                    <Link href="/menu">
                      <UtensilsCrossed className="mr-2 h-5 w-5" />
                      View Full Menu
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 rounded-full">
                    <a
                      href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20see%20your%20room%20service%20menu."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📱 WhatsApp Order
                    </a>
                  </Button>
                </motion.div>
              </div>

              <div className="text-center text-white/90">
                <p className="font-semibold">📞 +27 76 207 3299</p>
                <p className="text-sm">Available 24 hours a day, 7 days a week</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Why Stay With Us?
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Blending understated style with warm South African hospitality and smart conveniences.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Secure & Tranquil",
                description: "24/7 monitored premises & calm residential setting",
              },
              {
                icon: Award,
                title: "Quality Sleep",
                description: "Premium bedding, blackout curtains & climate control",
              },
              {
                icon: Heart,
                title: "Thoughtful Amenities",
                description: "Fast Wi‑Fi, artisan coffee, flexible workspaces",
              },
              {
                icon: Sparkles,
                title: "Impeccably Clean",
                description: "Professional housekeeping & fresh linen standards",
              },
              {
                icon: Users,
                title: "Spacious Common Areas",
                description: "Ample space for your group to connect and relax.",
              },
              {
                icon: ClipboardList,
                title: "Customizable Itineraries",
                description: "We'll help you plan the perfect group experience.",
              }
            ].map((feature) => (
              <motion.div key={feature.title} variants={itemFadeUp}>
                <Card className="h-full text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 group">
                  <CardContent className="space-y-6">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Why Choose Us CTA */}
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mt-16"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rooms" className="group relative">
                <Button size="lg" className="rounded-full px-10 py-6 bg-emerald-600 hover:bg-emerald-500 text-white text-base shadow-lg shadow-emerald-900/30">
                  Explore Our Rooms
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/menu" className="group relative">
                <Button size="lg" variant="outline" className="rounded-full px-10 py-6 border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-base shadow-lg">
                  View Our Menu
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="section-padding skincare-gradient dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Simple Booking Journey
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Reserve in minutes—arrive relaxed and ready to unwind.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                step: "01",
                title: "Explore Rooms",
                description: "Browse categories & amenities that suit your stay",
                icon: "�️",
                duration: "2 min"
              },
              {
                step: "02", 
                title: "Select Dates",
                description: "Choose check‑in / check‑out and guest count",
                icon: "📅",
                duration: "1 min"
              },
              {
                step: "03",
                title: "Confirm & Secure",
                description: "Instant WhatsApp / phone confirmation assistance",
                icon: "�",
                duration: "5 min"
              },
              {
                step: "04",
                title: "Arrive & Unwind",
                description: "Seamless check‑in & personalized welcome touch",
                icon: "🌅",
                duration: "Stay"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemFadeUp}
                className="text-center relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated Connecting Line */}
                {index < 3 && (
                  <motion.div 
                    className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-emerald-200 z-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                    style={{ originX: 0 }}
                  />
                )}
                
                <div className="relative z-10">
                  {/* Enhanced Step Circle */}
                  <motion.div 
                    className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-lg relative overflow-hidden group cursor-pointer"
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 10,
                      boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15 
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    style={{ 
                      transitionDelay: `${index * 150}ms` 
                    }}
                  >
                    {/* Pulsing background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-200 to-teal-200 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    
                    {/* Icon with bounce */}
                    <motion.span 
                      className="text-2xl mb-1 relative z-10"
                      animate={{ 
                        y: [0, -2, 0] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      {step.icon}
                    </motion.span>
                    
                    {/* Step number badge */}
                    <motion.div 
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.step}
                    </motion.div>
                    
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-emerald-300 rounded-full opacity-0"
                      animate={{ 
                        scale: [1, 2], 
                        opacity: [0.5, 0] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.4
                      }}
                    />
                  </motion.div>
                  
                  {/* Step content with enhanced animations */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.h3 
                      className="text-xl font-semibold text-gray-900 mb-3"
                      whileInView={{ 
                        color: ["#111827", "#059669", "#111827"]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      viewport={{ once: true }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-3 leading-relaxed"
                      whileHover={{ color: "#374151" }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.description}
                    </motion.p>
                    <motion.div 
                      className="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full inline-block"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "#ecfdf5"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      ⏱️ {step.duration}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about our treatments
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            {[ 
              {
                q: "What time is check‑in and check‑out?",
                a: "Standard check‑in is from 14:00 and check‑out by 10:30. Early arrivals / late departures are subject to availability—message us on WhatsApp to arrange."
              },
              {
                q: "Do you offer on‑site parking?",
                a: "Yes, complimentary secure parking is available for registered guests within the gated property."
              },
              {
                q: "Is Wi‑Fi included?",
                a: "Uncapped high‑speed Wi‑Fi is included in all rooms and public areas—ideal for remote work or streaming."
              },
              {
                q: "How do I confirm a booking?",
                a: "You can reserve directly via WhatsApp (+27 76 207 3299) or phone. A small deposit may be requested for peak dates to secure your stay."
              },
              {
                q: "What is your cancellation policy?",
                a: "Flexible: Free cancellation up to 48 hours before arrival (standard dates). Peak / event periods may have different terms—shared during enquiry."
              }
            ].map((faq, index) => (
              <motion.div key={index} variants={itemFadeUp}>
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-sm font-bold mr-3">
                        Q
                      </span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 ml-11 leading-relaxed">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event & Conference Facilities Section */}
      <section className="section-padding bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-gray-900">
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
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4"
            >
              🏛️ World-Class Event Facilities
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6"
            >
              Host Memorable Events for Any Size Group
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
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
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {[
              {
                title: "Executive Boardroom",
                capacity: "10-25 people",
                features: ["Premium AV setup", "Climate controlled", "Private entrance"],
                image: "/room6.jpeg",
                icon: "👔"
              },
              {
                title: "Conference Hall",
                capacity: "50-150 people",
                features: ["Theater-style seating", "Stage platform", "Live streaming"],
                image: "/group14.jpeg", 
                icon: "🎤"
              },
              {
                title: "Grand Banquet Hall",
                capacity: "200-350 people",
                features: ["Elegant chandeliers", "Dance floor", "Full catering kitchen"],
                image: "/dining2.jpeg",
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
              <motion.div key={venue.title} variants={itemFadeUp} className="group">
                <Card className="h-full bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={venue.image}
                        alt={venue.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
                          {venue.icon}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{venue.title}</h3>
                      <p className="text-emerald-600 font-semibold mb-4">{venue.capacity}</p>
                      <ul className="space-y-2">
                        {venue.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Event Services Grid */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
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
              <motion.div key={service.title} variants={itemFadeUp}>
                <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
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
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Perfect Venue for Every Occasion</h3>
              <p className="text-lg text-gray-600">We&apos;ve successfully hosted a wide variety of events for groups of all sizes</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  category: "Corporate Events",
                  events: ["Board meetings", "Product launches", "Team retreats", "Annual conferences"],
                  color: "bg-blue-100 text-blue-800"
                },
                {
                  category: "Social Celebrations",
                  events: ["Weddings", "Anniversaries", "Birthday parties", "Graduation celebrations"],
                  color: "bg-pink-100 text-pink-800"
                },
                {
                  category: "Community Gatherings",
                  events: ["Charity galas", "Fundraising events", "Community meetings", "Award ceremonies"],
                  color: "bg-emerald-100 text-emerald-800"
                },
                {
                  category: "Educational Events",
                  events: ["Workshops", "Seminars", "Training sessions", "Academic conferences"],
                  color: "bg-purple-100 text-purple-800"
                }
              ].map((category) => (
                <motion.div key={category.category} variants={itemFadeUp}>
                  <div className={`${category.color} rounded-2xl p-6`}>
                    <h4 className="font-bold text-lg mb-4">{category.category}</h4>
                    <ul className="space-y-2">
                      {category.events.map((event) => (
                        <li key={event} className="text-sm">• {event}</li>
                      ))}
                    </ul>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Plan Your Event?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our event specialists are ready to help you create an unforgettable experience. Get in touch to discuss your requirements and receive a custom quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20enquire%20about%20event%20facilities." target="_blank" className="group relative">
                <Button size="lg" className="rounded-full px-10 py-6 bg-indigo-600 hover:bg-indigo-500 text-white text-base shadow-lg shadow-indigo-900/30">
                  Request Event Quote
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-full px-10 py-6 border-indigo-300 text-indigo-700 hover:bg-indigo-50">
                  Schedule Site Visit
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
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              animate={{ textShadow: ["0 0 18px rgba(255,255,255,0.4)", "0 0 36px rgba(255,255,255,0.7)", "0 0 18px rgba(255,255,255,0.4)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Book Your Stay?
            </motion.h2>
            
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Reserve directly for the best flexibility. Instant assistance via WhatsApp for special requests, group enquiries or extended stays.
            </p>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center space-x-8 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">4 Types</div>
                  <div className="text-sm opacity-80">Room Options</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Fast</div>
                  <div className="text-sm opacity-80">Check-In</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Support</div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <Link href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book%20a%20stay." target="_blank">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-12 py-6 rounded-full group shadow-2xl">
        <Calendar className="mr-2 h-5 w-5" />
        WhatsApp Reservation
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="inline-block w-5">→</span>
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              
      <Link href="/rooms">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-12 py-6 rounded-full">
        View All Rooms
                  </Button>
                </motion.div>
              </Link>
            </div>

            <motion.div 
              className="text-white/80 text-sm mt-8"
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
