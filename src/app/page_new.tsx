"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  Wifi, 
  Shield, 
  Zap, 
  Star, 
  ChevronDown,
  Play,
  Calendar,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const features = [
  {
    icon: Zap,
    title: "Quantum Computing",
    description: "Experience lightning-fast service powered by quantum processors that anticipate your every need."
  },
  {
    icon: Shield,
    title: "Bio-Security",
    description: "Advanced biometric security systems ensure your privacy and safety with futuristic encryption."
  },
  {
    icon: Wifi,
    title: "Neural Network",
    description: "Connected spaces that learn and adapt to your preferences using advanced AI technology."
  },
  {
    icon: Sparkles,
    title: "Holographic Concierge",
    description: "24/7 assistance from our AI-powered holographic concierge service."
  }
];

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Tech Innovator",
  content: "The most incredible hotel experience I&apos;ve ever had. The future is now!",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Space Engineer",
    content: "Felt like staying in a space station. Absolutely mind-blowing technology.",
    rating: 5
  },
  {
    name: "Aria Nakamura",
    role: "Digital Artist",
    content: "The holographic amenities and neural interfaces exceeded all expectations.",
    rating: 5
  }
];

const stats = [
  { number: "2089", label: "Year Established", suffix: "" },
  { number: "99.9", label: "Guest Satisfaction", suffix: "%" },
  { number: "500", label: "Quantum Suites", suffix: "+" },
  { number: "24", label: "AI Concierges", suffix: "/7" }
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center cyber-grid">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-gradient font-['Orbitron'] leading-tight"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              THE FUTURE
              <br />
              <span className="neon-text">OF LUXURY</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Experience hospitality reimagined through cutting-edge technology, 
              quantum computing, and AI-powered personalization in the world&apos;s 
              most advanced luxury hotel.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link href="/booking">
                <Button size="lg" className="cyber-button text-lg px-8 py-4 group">
                  <Calendar className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Book Your Experience
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="cyber-button text-lg px-8 py-4 group">
                <Play className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Virtual Tour
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-white/60 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-gradient font-['Orbitron'] mb-6">
              QUANTUM FEATURES
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the impossible made possible through revolutionary technology 
              that redefines the boundaries of hospitality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group"
              >
                <Card className="glass-morphism neon-border h-full hover:bg-white/10 transition-all duration-500">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="relative">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-6 relative"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <feature.icon className="w-full h-full text-blue-400 group-hover:text-cyan-400 transition-colors" />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-blue-400/20 group-hover:bg-cyan-400/30 transition-colors"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-semibold text-white font-['Orbitron']">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-gradient font-['Orbitron'] mb-6">
              GUEST EXPERIENCES
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Hear from visionaries who have experienced the future of hospitality firsthand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-morphism neon-border h-full hover:bg-white/10 transition-all duration-500">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/80 text-lg leading-relaxed italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="border-t border-white/20 pt-6">
                      <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                      <p className="text-blue-400">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-gradient font-['Orbitron'] mb-8">
              READY FOR THE FUTURE?
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Step into tomorrow today. Book your quantum suite and experience 
              luxury beyond imagination.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/booking">
                <Button size="lg" className="cyber-button text-lg px-12 py-6 group">
                  <CheckCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Reserve Your Suite
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button variant="outline" size="lg" className="cyber-button text-lg px-12 py-6">
                  Contact Concierge
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
