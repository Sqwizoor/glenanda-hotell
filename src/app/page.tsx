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
  Phone
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
    id: "single-occupancy",
    title: "Single Occupancy Rooms",
    subtitle: "Perfect for solo travelers",
    duration: "Single occupancy",
    price: "from R500 / night",
    popular: true,
    groupFriendly: false,
    image: "/group5.jpeg",
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
    image: "/group13.jpeg",
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
    image: "/group16.jpeg",
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
    image: "/soccer3.jpeg",
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
  // Mixed & Randomized - Spa, Rooms, Braai, Soccer, Dining, Groups
  { type: "image", src: "/new-massages.jpeg", alt: "Serene spa treatment room with calming ambiance" },
  { type: "image", src: "/room14.jpeg", alt: "Presidential suite for VIP group stays" },
  { type: "image", src: "/soccer3.jpeg", alt: "Soccer team accommodation - team bonding and training stays" },
  { type: "image", src: "/brai.jpeg", alt: "Outdoor braai area with guests enjoying a barbecue" },
  { type: "image", src: "/group11.jpeg", alt: "Large group enjoying hotel amenities together" },
  
  { type: "image", src: "/new-massages2.jpeg", alt: "Luxury spa facilities for ultimate relaxation" },
  { type: "image", src: "/soccer-dining.jpeg", alt: "Soccer team group dining setup" },
  { type: "image", src: "/room6.jpeg", alt: "Executive rooms perfect for business groups" },
  { type: "image", src: "/dining.jpeg", alt: "Fine dining restaurant services" },
  { type: "image", src: "/new-massages3.jpeg", alt: "Professional massage therapy services" },
  
  { type: "image", src: "/brai2.jpeg", alt: "Group gathering around the braai for a social event" },
  { type: "image", src: "/soccer4.jpeg", alt: "Professional soccer team group accommodation facilities" },
  { type: "image", src: "/group12.jpeg", alt: "Corporate team meeting in our conference facilities" },
  { type: "image", src: "/room11.jpeg", alt: "Connecting rooms for families and teams" },
  { type: "image", src: "/new-massages4.jpeg", alt: "Tranquil spa environment with natural elements" },
  
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
  { type: "image", src: "/soccer-dining-3.jpeg", alt: "Team dining facilities for sports groups" },
  { type: "image", src: "/group16.jpeg", alt: "Business retreat participants networking" },
  
  { type: "image", src: "/brai5.jpeg", alt: "Evening braai event with festive lighting" },
  { type: "image", src: "/new-massages8.jpeg", alt: "Wellness and relaxation lounge" },
  { type: "image", src: "/soccer7.jpeg", alt: "Team gathering space for sports groups" },
  { type: "image", src: "/guests2.jpeg", alt: "Relaxed social atmosphere in guest areas" },
  { type: "image", src: "/group17.jpeg", alt: "Multi-generational family reunion gathering" },
  
  { type: "image", src: "/new-massages9.jpeg", alt: "Spa therapy and holistic healing" },
  { type: "image", src: "/soccer8.jpeg", alt: "Soccer team accommodation setup" },
  { type: "image", src: "/dining4.jpeg", alt: "Elegant dining experience for guests" },
  { type: "image", src: "/group18.jpeg", alt: "Social club event with group dining" },
  { type: "image", src: "/new-massages10.jpeg", alt: "Premium spa amenities and services" },
  
  { type: "image", src: "/soccer10.jpeg", alt: "Sports event participants in hotel facilities" },
  { type: "image", src: "/soccer-dining4.jpeg", alt: "Large group dining for soccer teams" },
  { type: "image", src: "/group2.jpeg", alt: "Corporate conference with full group accommodation" },
  { type: "image", src: "/soccer11.jpeg", alt: "Soccer team enjoying hospitality services" },
  { type: "image", src: "/group3.jpeg", alt: "Birthday celebration party setup" },
  
  { type: "image", src: "/soccer-dining5.jpeg", alt: "Professional catering for sports events" },
  { type: "image", src: "/soccer12.jpeg", alt: "Professional sports team accommodation" },
  { type: "image", src: "/group4.jpeg", alt: "Team building activities in common areas" },
  { type: "image", src: "/soccer-dining6.jpeg", alt: "Team meal times at hotel dining area" },
  { type: "image", src: "/soccer13.jpeg", alt: "Team sports event hosting facilities" },
  
  { type: "image", src: "/group5.jpeg", alt: "Anniversary dinner with extended family" },
  { type: "image", src: "/soccer-dining7.jpeg", alt: "Soccer team breakfast and dining services" },
  { type: "image", src: "/soccer14.jpeg", alt: "Soccer team group photo at hotel" },
  { type: "image", src: "/group8.jpeg", alt: "Executive retreat with group accommodation" },
  { type: "image", src: "/soccer-new.jpeg", alt: "Modern facilities for sports team accommodation" },
  
  { type: "image", src: "/soccer-dining8.jpeg", alt: "Group dining setup for athletic teams" },
  { type: "image", src: "/group9.jpeg", alt: "Social gathering in our spacious lounge" },
  { type: "image", src: "/soccer-dining9.jpeg", alt: "Sports nutrition and team dining" },
  { type: "image", src: "/soccer-dining10.jpeg", alt: "Team celebration dining experience" },
  { type: "image", src: "/soccer-dining11.jpeg", alt: "Professional sports team catering services" },
  
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
  <div className="absolute inset-0 bg-white/55 dark:bg-black/40" />
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

      {/* Modern Hero Section — Enhanced with better mobile responsiveness */}
  <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-visible pt-20">
        {/* Enhanced Background slideshow with better mobile optimization */}
        <Slideshow images={["/room14.jpeg","/soccer3.jpeg","/brai2.jpeg","/room6.jpeg","/soccer-dining.jpeg","/niceview.jpeg","/brai4.jpeg","/soccer11.jpeg","/room11.jpeg","/soccer-dining4.jpeg"]} />
        
        {/* Enhanced overlay with better gradients */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/55 to-slate-100/60 dark:from-slate-950/90 dark:via-slate-900/70 dark:to-slate-950/80" />
  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/40 dark:from-slate-950/90 dark:via-transparent dark:to-slate-900/40" />
        
        {/* Dynamic floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-emerald-500/12 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/12 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
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
              className="inline-flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/85 dark:bg-black/20 backdrop-blur-xl border border-emerald-100 dark:border-white/10 text-emerald-700 dark:text-white/90 mb-2 sm:mb-4 shadow-lg"
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
              className="font-bold leading-[0.95] text-slate-900 dark:text-white mb-2 sm:mb-3"
              style={{
                fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
                lineHeight: 'clamp(1.7rem, 6.5vw, 3.8rem)'
              }}
            >
              <span className="block">Unforgettable Experiences</span>
              <span className="block">for Every Guest</span>
              <motion.span 
                className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-500 to-teal-500 dark:from-emerald-300 dark:via-cyan-200 dark:to-emerald-100 font-light tracking-wide"
                style={{ fontSize: 'clamp(0.875rem, 3vw, 1.5rem)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Solo travelers, couples, families, sports teams & corporate groups
              </motion.span>
            </motion.h1>
            
            {/* Enhanced description */}
            <motion.p
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.8, duration:0.8 }}
              className="mt-2 sm:mt-3 text-slate-600 dark:text-slate-200/90 max-w-3xl mx-auto leading-relaxed"
              style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)' }}
            >
              Premium accommodation in South Johannesburg with fibre Wi‑Fi, on-site security, executive transport and a concierge team who tailor every stay for business travellers, couples, families, sports teams and corporate groups.
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
                  className="w-full sm:w-auto rounded-full px-4 sm:px-8 py-2.5 sm:py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-xl shadow-emerald-900/15 dark:shadow-emerald-900/40 hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300"
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
                  className="w-full sm:w-auto rounded-full px-4 sm:px-8 py-2.5 sm:py-4 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 dark:border-white/40 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/60 backdrop-blur-sm font-semibold transition-all duration-300"
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
              className="mt-3 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto"
            >
              {[
                {label:'Accommodations', value:'50+ Rooms', icon: '🏨'},
                {label:'All Guest Types', value:'1-200 People', icon: '👥'},
                {label:'Sports Teams', value:'⚽ Welcome', icon: '🏆'},
                {label:'Support', value:'24/7 Service', icon: '🔧'}
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center p-2 sm:p-3 rounded-xl bg-white/85 dark:bg-white/5 backdrop-blur-lg border border-emerald-100 dark:border-white/10 hover:bg-emerald-50 dark:hover:bg-white/10 hover:border-emerald-300 dark:hover:border-emerald-400/30 transition-all duration-300 group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-lg sm:text-2xl mb-1 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="font-bold text-emerald-700 dark:text-white mb-1" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)' }}>
                    {stat.value}
                  </div>
                  <div className="text-slate-600 dark:text-white/60 font-medium" style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)' }}>
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
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20"
            >
              <Users className="inline-block w-4 h-4 mr-2" />
              For Every Guest
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6"
            >
              Tailored Packages for Every Stay
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-slate-600 dark:text-slate-300/90 max-w-3xl mx-auto"
            >
              Whether you&apos;re traveling solo on business, planning a romantic getaway, enjoying a family reunion, hosting a sports team, or organizing a corporate retreat, we provide personalized service and exclusive amenities for every type of stay.
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
                <Card className="h-full text-center p-8 bg-white dark:bg-slate-900/70 border border-emerald-100 dark:border-white/5 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/15 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
                      <feature.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-200" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300/90">{feature.description}</p>
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
                <Button size="lg" className="rounded-full px-10 py-6 bg-emerald-500 hover:bg-emerald-600 text-white text-base font-semibold shadow-lg shadow-emerald-900/30">
                  Book Your Perfect Stay
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/menu" className="group relative">
                <Button size="lg" variant="outline" className="rounded-full px-10 py-6 border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-200 dark:hover:bg-emerald-500/10 text-base shadow-lg shadow-emerald-900/10">
                  View Room Service Menu
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
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20"
            >
        ✨ Accommodation for Every Traveler
            </motion.div>
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6"
            >
        Rooms & Suites for Individuals & Groups
            </motion.h2>
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-slate-600 dark:text-slate-300/90 max-w-3xl mx-auto"
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
                <Card className="group h-full bg-white/90 dark:bg-slate-900/80 border border-emerald-100 dark:border-white/5 shadow-lg hover:shadow-emerald-500/10 transition-all duration-500 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <div className="flex justify-between items-center text-white drop-shadow-lg">
                          <div className="flex items-center space-x-4">
                            <motion.div 
                              className="flex items-center bg-slate-950/60 px-3 py-1.5 rounded-lg backdrop-blur-md"
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">{service.duration}</span>
                            </motion.div>
                            <motion.div 
                              className="flex items-center bg-emerald-500 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-lg"
                            >
                              <span className="text-sm font-bold whitespace-nowrap">{service.price}</span>
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
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-200 text-sm font-medium">
                          {service.subtitle}
                        </p>
                      </motion.div>

                      <motion.p 
                        className="text-slate-600 dark:text-slate-300/90 text-sm leading-relaxed line-clamp-3"
                        transition={{ duration: 0.2 }}
                      >
                        {service.description}
                      </motion.p>

                      {/* Price and Duration - Always Visible */}
                      <div className="flex items-center justify-between py-2 border-t border-slate-200 dark:border-white/5">
                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="text-emerald-600 dark:text-emerald-200 font-bold text-lg">
                          {service.price}
                        </div>
                      </div>

                      <motion.div 
                        className="pt-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 group shadow-lg shadow-emerald-900/30 hover:shadow-emerald-500/30 transition-all duration-300 text-slate-950 font-semibold">
                          <a
                            href={`https://wa.me/27603114115?text=${encodeURIComponent(`Hi Glenanda Hotel, I&apos;d like to enquire about the ${service.title}.`)}`}
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
                <div className="relative h-full bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-emerald-100 dark:border-white/20 shadow-xl">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative p-6 h-full flex flex-col">
                    {/* Icon */}
                    <motion.div
                      className="text-5xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Title & Info */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
                    <div className="flex flex-col gap-2 mb-3">
                      <span className="inline-flex items-center justify-center w-max px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-white/10 dark:text-slate-100 dark:border-white/20">
                        Custom Packages Available
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-200/90 leading-snug">
                        {service.availability}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-200/80 text-sm mb-4">{service.description}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-200/90">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Book Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-auto w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/40"
                    >
                      Book Now
                    </motion.button>
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
              <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Our Spa</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Exceptional service meets luxury amenities</p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white rounded-xl p-6 text-center border border-emerald-100 shadow-md dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-sm"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action - Modern Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src="/new-massages10.jpeg"
                alt="Spa CTA Background"
                fill
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-emerald-100/60 dark:from-slate-950/95 dark:via-slate-900/85 dark:to-emerald-900/80" />
            </div>

            <div className="relative p-12 md:p-20 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                ✨💆‍♀️✨
              </motion.div>

              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                Ready to Experience Bliss?
              </h3>
              
              <p className="text-xl text-slate-600 dark:text-slate-200/90 mb-10 max-w-2xl mx-auto">
                Book your spa treatment today and discover why we&apos;re rated as one of the finest wellness destinations
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/27817609224?text=Hi!%20I%27d%20like%20to%20book%20a%20spa%20treatment"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Book Treatment
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-50 text-emerald-700 font-semibold rounded-full border-2 border-emerald-200 hover:bg-emerald-100 transition-all duration-300 dark:bg-white/10 dark:text-slate-100 dark:border-white/20 dark:hover:bg-white/15"
                >
                  <Sparkles className="w-5 h-5" />
                  View Packages
                </motion.button>
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
              className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-full text-orange-700 dark:text-orange-300 text-sm font-medium mb-6 shadow-lg"
            >
              <span className="text-2xl">🔥</span>
              <span className="tracking-wide">AUTHENTIC SOUTH AFRICAN BRAAI EXPERIENCE</span>
              <UtensilsCrossed className="w-5 h-5" />
            </motion.div>
            
            <motion.h2 
              variants={itemFadeUp} 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent mb-6"
            >
              Braai & Outdoor Events
            </motion.h2>
            
            <motion.p 
              variants={itemFadeUp} 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
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
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg"
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
                  <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                  <p className="text-sm opacity-90">{item.description}</p>
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
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
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
                className="text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
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
            <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-12 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">Book Your Braai Event Today!</h3>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Perfect for groups of 10-100 people. We provide everything you need for an unforgettable South African braai experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-50 px-12 py-6 rounded-full shadow-lg text-lg">
                    <a
                      href="https://wa.me/27603114115?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book%20a%20braai%20event."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-2xl mr-2">🔥</span>
                      Book Braai Event
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-12 py-6 rounded-full text-lg">
                    <Link href="/contact">
                      📞 Get Custom Quote
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <div className="mt-8 text-white/90">
                <p className="font-semibold text-lg">📞 +27 60 311 4115</p>
                <p>Available for bookings 7 days a week</p>
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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
                          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 flex-shrink-0" />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Book Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        Request Team Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Teams We've Hosted Section */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Sports Teams Choose Us</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">Proven track record with professional and amateur teams</p>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { icon: "🏆", title: "100+ Teams", subtitle: "Hosted Annually" },
                { icon: "⚽", title: "Soccer Clubs", subtitle: "Primary Focus" },
                { icon: "🎯", title: "Match Day", subtitle: "Support Services" },
                { icon: "🍴", title: "Sports Nutrition", subtitle: "Expert Menus" },
                { icon: "🛡️", title: "Private Floors", subtitle: "Team Security" },
                { icon: "🚌", title: "Transport", subtitle: "Included" }
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

          {/* Image Showcase Grid - Team Experiences */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Team Experiences at Glenanda</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">See how we support teams throughout their stay</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { src: "/soccer-dining5.jpeg", title: "Team Dining", subtitle: "Nutritious Meals" },
                { src: "/soccer7.jpeg", title: "Team Bonding", subtitle: "Common Areas" },
                { src: "/soccer-dining9.jpeg", title: "Pre-Match Meals", subtitle: "Performance Focus" },
                { src: "/soccer12.jpeg", title: "Comfortable Stay", subtitle: "Rest & Recovery" }
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
                    className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-emerald-600/80 dark:from-green-700/80 dark:to-emerald-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1 }}
                  >
                    <div className="text-white text-center">
                      <Eye className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">View Full Gallery</p>
                    </div>
                  </motion.div>
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
            className="grid gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3"
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
                title: "Sports Team Venue",
                capacity: "20-50 athletes",
                features: ["Team briefing rooms", "Coach facilities", "Equipment storage"],
                image: "/soccer6.jpeg",
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
                <Card className="h-full bg-white border border-emerald-100 shadow-lg hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden dark:bg-slate-900/80 dark:border-emerald-500/10">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={venue.image}
                        alt={venue.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center text-2xl shadow-md dark:bg-slate-950/80 dark:border-white/10 dark:text-emerald-300">
                          {venue.icon}
                        </div>
                      </div>
                    </div>
                      <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">{venue.title}</h3>
                      <p className="text-emerald-600 dark:text-emerald-300 font-semibold mb-4">{venue.capacity}</p>
                      <ul className="space-y-2">
                        {venue.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>
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
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 dark:bg-white/10 dark:border-white/20 dark:backdrop-blur-sm">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
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
            className="bg-white rounded-3xl p-12 shadow-xl border border-emerald-100 dark:bg-white/10 dark:border-white/20 dark:backdrop-blur-sm"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Perfect Venue for Every Occasion</h3>
              <p className="text-lg text-gray-600">We&apos;ve successfully hosted a wide variety of events for groups of all sizes</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
              {[
                {
                  category: "Corporate Events",
                  events: ["Board meetings", "Product launches", "Team retreats", "Annual conferences"],
                  color: "bg-blue-100 text-blue-800"
                },
                {
                  category: "Sports Teams",
                  events: ["Soccer teams", "Training camps", "Match day stays", "Team tournaments"],
                  color: "bg-green-100 text-green-800"
                },
                {
                  category: "Braai & Outdoor",
                  events: ["Braai parties", "Garden events", "Outdoor celebrations", "Family gatherings"],
                  color: "bg-orange-100 text-orange-800"
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
              <Link href="https://wa.me/27603114115?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20enquire%20about%20event%20facilities." target="_blank" className="group relative">
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
      <Link href="https://wa.me/27603114115?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20book%20a%20stay." target="_blank">
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
