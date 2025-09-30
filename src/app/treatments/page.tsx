"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Leaf, Sparkles, Phone, Mail, Users, User, Heart, Star, Calendar, ArrowRight, Eye, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useMemo } from "react";

const spaPackages = [
  {
    id: "individual-retreat",              
    title: "Personal Wellness Retreat",
    subtitle: "Individual relaxation journey",
    duration: "2-3 hours",
    price: "From R850 per person",
    popular: true,
    category: "individual",
    image: "/bath.jpeg",
    treatments: ["Full body massage", "Facial treatment", "Aromatherapy session", "Refreshment included"],
    description: "Escape into tranquility with our personalized spa experience designed for ultimate relaxation and rejuvenation."
  },
  {
    id: "couples-bliss",
    title: "Couples Spa Experience",
    subtitle: "Share moments of bliss",
    duration: "2.5 hours",
    price: "From R1 500 for two",
    popular: true,
    category: "couples",
    image: "/bath2.jpeg",
    treatments: ["Side-by-side massages", "Couples facial", "Private relaxation suite", "Champagne & treats"],
    description: "Reconnect and unwind together in our exclusive couples spa suite with synchronized treatments."
  },
  {
    id: "friends-getaway",
    title: "Friends Spa Day",
    subtitle: "Perfect for small groups",
    duration: "3-4 hours",
    price: "From R650 per person",
    popular: false,
    category: "group",
    image: "/group12.jpeg",
    treatments: ["Group massage session", "Mini facials", "Manicure & pedicure", "Healthy spa lunch"],
    description: "Celebrate friendship with a fun and relaxing spa day designed for groups of 3-6 people."
  },
  {
    id: "express-refresh",
    title: "Express Refresh",
    subtitle: "Quick rejuvenation",
    duration: "60-90 minutes",
    price: "From R450 per person",
    popular: false,
    category: "individual",
    image: "/bathroom3.jpeg",
    treatments: ["Express massage", "Mini facial", "Scalp treatment", "Relaxation time"],
    description: "Perfect for busy schedules - get refreshed and revitalized in under 2 hours."
  }
];

const treatments = [
  {
    title: "Signature Deep Tissue Massage",
    summary: "Therapeutic massage targeting deep muscle tension and stress relief for complete relaxation.",
    bullets: [
      "Relieves chronic muscle tension",
      "Improves circulation and flexibility",
      "Reduces stress and promotes relaxation",
      "Customized pressure levels"
    ],
    duration: "60-90 minutes",
    price: "R450 - R650"
  },
  {
    title: "Rejuvenating Facial Treatment",
    summary: "Advanced skincare treatment using premium products to cleanse, nourish, and revitalize your skin.",
    bullets: [
      "Deep cleansing and exfoliation",
      "Hydrating mask application",
      "Anti-aging and brightening benefits",
      "Personalized for your skin type"
    ],
    duration: "75 minutes",
    price: "R380 - R550"
  },
  {
    title: "Aromatherapy Wellness Session",
    summary: "Holistic treatment combining essential oils, gentle massage, and mindfulness techniques.",
    bullets: [
      "Stress reduction and mental clarity",
      "Improved sleep quality",
      "Enhanced mood and energy",
      "Custom essential oil blends"
    ],
    duration: "90 minutes",
    price: "R520 - R750"
  },
  {
    title: "Hot Stone Therapy",
    summary: "Ancient healing technique using heated stones to melt away tension and promote deep relaxation.",
    bullets: [
      "Deep muscle relaxation",
      "Improved blood circulation",
      "Stress and anxiety relief",
      "Chakra balancing benefits"
    ],
    duration: "90 minutes",
    price: "R580 - R850"
  }
];

const filterOptions = [
  { value: "all", label: "All Packages" },
  { value: "individual", label: "Individual" },
  { value: "couples", label: "Couples" },
  { value: "group", label: "Small Groups" }
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
};

export default function TreatmentsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const filteredPackages = useMemo(() => spaPackages.filter(pkg => 
    selectedFilter === "all" || pkg.category === selectedFilter
  ), [selectedFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Modern Hero Section - Fully Responsive */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bath2.jpeg"
            alt="Luxury spa experience"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-slate-900/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-transparent to-slate-800/30" />
        </div>

        {/* Floating Elements - Hidden on small screens */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6 sm:space-y-8"
          >
            {/* Premium Badge - Responsive */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-emerald-300"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium tracking-wide">PREMIUM SPA & WELLNESS CENTER</span>
            </motion.div>
            
            {/* Main Heading - Fully Responsive Typography */}
            <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-4 sm:space-y-6">
              <h1 
                className="font-bold leading-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                  lineHeight: 'clamp(2.7rem, 8.5vw, 6.2rem)'
                }}
              >
                <span className="block text-white">Luxury Spa &</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  Wellness Retreat
                </span>
              </h1>
              
              <p 
                className="text-slate-300 max-w-4xl mx-auto leading-relaxed font-light"
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                  lineHeight: 'clamp(1.4rem, 4vw, 2rem)'
                }}
              >
                Indulge in personalized spa experiences designed for individuals, couples, and small groups. 
                Escape into tranquility and emerge refreshed, renewed, and revitalized.
              </p>
            </motion.div>

            {/* Service Types - Responsive Grid */}
            <motion.div 
              variants={fadeUp} 
              transition={{ duration: 0.6, ease: "easeOut" }} 
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 pt-6 sm:pt-8 max-w-4xl mx-auto"
            >
              {[
                { icon: User, label: "Individual Treatments", color: "emerald" },
                { icon: Heart, label: "Couples Experiences", color: "pink" },
                { icon: Users, label: "Group Wellness", color: "purple" }
              ].map((service) => (
                <motion.div 
                  key={service.label}
                  variants={scaleIn}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`group flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-${service.color}-500/30 transition-all duration-300 min-w-0 flex-1 sm:flex-none`}
                >
                  <service.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${service.color}-400 group-hover:scale-110 transition-transform flex-shrink-0`} />
                  <span className="text-white font-medium text-sm sm:text-base text-center">{service.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Responsive Layout */}
            <motion.div 
              variants={fadeUp} 
              transition={{ duration: 0.6, ease: "easeOut" }} 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 max-w-lg sm:max-w-none mx-auto"
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">Book Your Experience</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">View Treatments</span>
              </Button>
            </motion.div>

            {/* Quick Stats - Responsive Grid */}
            <motion.div 
              variants={fadeUp} 
              transition={{ duration: 0.6, ease: "easeOut" }} 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 pt-8 sm:pt-12 max-w-5xl mx-auto"
            >
              {[
                { number: "15+", label: "Spa Treatments", icon: Leaf },
                { number: "2-6", label: "Group Size", icon: Users },
                { number: "4.9", label: "Client Rating", icon: Star },
                { number: "24/7", label: "Booking Available", icon: Clock }
              ].map((stat) => (
                <motion.div 
                  key={stat.label} 
                  variants={scaleIn}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mx-auto mb-2" />
                  <div 
                    className="font-bold text-white mb-1"
                    style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-slate-400"
                    style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on small screens */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center hidden sm:flex"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-white/60 to-transparent" />
          <div className="mt-2 text-xs text-white/60 tracking-widest">SCROLL</div>
        </motion.div>
      </section>

      {/* Spa Packages Filter Section */}
      <section className="py-16 bg-slate-800/50 backdrop-blur-sm border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Spa Experience</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Select from our curated wellness packages designed for individuals, couples, and small groups</p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {filterOptions.map((option) => (
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }} key={option.value}>
                <Button
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`rounded-full px-8 py-3 transition-all duration-300 ${
                    selectedFilter === option.value 
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25" 
                      : "border-slate-600 text-slate-300 hover:border-emerald-400 hover:text-emerald-400 bg-slate-800/50"
                  }`}
                >
                  <span>{option.label}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Spa Packages Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.08 }}
                className="group relative"
              >
                <Card className="bg-slate-800/50 border border-slate-700/50 shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 backdrop-blur-sm transition-all duration-500 overflow-hidden h-full group-hover:transform group-hover:scale-[1.02]">
                  {/* Package Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div 
                      className="absolute inset-0" 
                      initial={{ scale: 1 }} 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        priority={index < 2}
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 50vw"
                        className="object-cover object-center group-hover:brightness-110 transition-all duration-700"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Price overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-emerald-400 text-xl font-bold">
                            {pkg.price}
                          </div>
                          <div className="text-white/70 text-sm">
                            {pkg.duration}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white/90 text-sm capitalize">{pkg.category}</div>
                          {pkg.popular && (
                            <div className="text-amber-400 text-xs font-medium">Most Popular</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur shadow-lg ${
                        pkg.category === 'individual' ? 'bg-emerald-500/90' :
                        pkg.category === 'couples' ? 'bg-pink-500/90' :
                        pkg.category === 'group' ? 'bg-purple-500/90' :
                        'bg-slate-500/90'
                      }`}>
                        {pkg.category === 'individual' ? 'Individual' : 
                         pkg.category === 'couples' ? 'Couples' : 'Small Group'}
                      </span>
                    </div>

                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-medium backdrop-blur shadow-sm">
                          Popular
                        </span>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                      <p className="text-emerald-400 font-medium">{pkg.subtitle}</p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-1">
                    <p className="text-slate-300 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Treatments Included */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">Treatments Included:</h4>
                      <div className="space-y-1">
                        {pkg.treatments.map((treatment, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            <span>{treatment}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4 border-t border-slate-700">
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full"
                        asChild
                      >
                        <a 
                          href={`https://wa.me/27762073299?text=${encodeURIComponent(`Hi Glenanda Hotel, I&apos;d like to book the ${pkg.title} spa package.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Package
                        </a>
                      </Button>
                      <Button variant="outline" className="rounded-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Individual Treatments Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Individual Treatment Menu
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Customize your spa experience with our individual treatments, perfect for creating your own wellness journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-xl font-semibold text-white">{treatment.title}</h3>
                </div>
                
                <p className="text-slate-300 mb-6 leading-relaxed">{treatment.summary}</p>
                
                <ul className="space-y-3 mb-6">
                  {treatment.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="space-y-1">
                    <div className="text-emerald-400 font-bold text-lg">{treatment.price}</div>
                    <div className="text-slate-400 text-sm">{treatment.duration}</div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-emerald-600 hover:bg-emerald-500 rounded-full">
                      Book Treatment
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spa Gallery Section */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white text-center mb-12"
          >
            Tranquil Spa Environment
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { image: "/bath.jpeg", title: "Relaxation Suites", description: "Private treatment rooms with ambient lighting" },
              { image: "/bath2.jpeg", title: "Couples Sanctuary", description: "Shared wellness experiences in luxury" },
              { image: "/group11.jpeg", title: "Group Wellness Areas", description: "Spacious areas for small group treatments" },
              { image: "/bathroom3.jpeg", title: "Premium Facilities", description: "State-of-the-art wellness amenities" },
              { image: "/gesta.jpeg", title: "Peaceful Ambiance", description: "Serene environment for ultimate relaxation" },
              { image: "/niceview.jpeg", title: "Scenic Views", description: "Beautiful vistas to enhance your experience" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/50 shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose Our Spa
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the perfect blend of luxury, wellness, and personalized service in our world-class spa facility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Therapists",
                description: "Certified professionals with years of experience in wellness and relaxation techniques",
                icon: "👩‍⚕️",
                benefits: ["Fully certified professionals", "Personalized treatment plans", "Holistic wellness approach"]
              },
              {
                title: "Premium Products",
                description: "Only the finest organic and luxury spa products for your treatments",
                icon: "🌿",
                benefits: ["Organic and natural ingredients", "Luxury brand partnerships", "Eco-friendly practices"]
              },
              {
                title: "Flexible Booking",
                description: "Easy online booking with flexible scheduling for individuals and groups",
                icon: "📅",
                benefits: ["24/7 online booking", "Group coordination", "Flexible cancellation policy"]
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">{benefit.title}</h3>
                <p className="text-slate-300 mb-6 text-center">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.benefits.map((item) => (
                    <li key={item} className="flex items-center text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {[
              {
                q: "What's included in the spa packages?",
                a: "Each package includes specific treatments, access to relaxation areas, refreshments, and use of spa facilities. Individual packages vary - check each package details for specifics.",
              },
              {
                q: "Can I book for a group of friends?",
                a: "Absolutely! Our &apos;Friends Spa Day&apos; package is perfect for groups of 3-6 people, and we can accommodate larger groups with advance booking.",
              },
              {
                q: "Do you offer couples treatments?",
                a: "Yes, our &apos;Couples Spa Experience&apos; includes side-by-side treatments in a private suite with champagne and treats included.",
              },
              {
                q: "What should I bring to my spa appointment?",
                a: "We provide robes, slippers, and towels. Just bring yourself and prepare to relax! We recommend arriving 15 minutes early to settle in.",
              },
              {
                q: "Is there a cancellation policy?",
                a: "We require 24-hour notice for cancellations or rescheduling. Cancellations within 24 hours may incur a fee.",
              }
            ].map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-slate-700/50 rounded-xl p-6 bg-slate-800/50 backdrop-blur-sm hover:border-emerald-500/30 transition-colors duration-300"
              >
                <p className="font-medium text-white mb-3">{faq.q}</p>
                <p className="text-slate-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-900/20 via-slate-800 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Unwind?
          </motion.h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Book your perfect spa experience today. Whether you&apos;re seeking solo relaxation, a romantic couples retreat, or a fun day with friends.
            </p>          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full shadow-xl font-semibold"
              asChild
            >
              <a 
                href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I&apos;d%20like%20to%20book%20a%20spa%20treatment."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="mr-2 h-5 w-5"/>
                Book Now via WhatsApp
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-emerald-400 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-300 px-8 py-4 rounded-full font-semibold backdrop-blur-sm"
              asChild
            >
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5"/>
                Contact Us
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-300">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-emerald-400" />
              <span>+27 60 311 4115</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>Glenanda, Johannesburg</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span>Daily: 9AM - 8PM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
