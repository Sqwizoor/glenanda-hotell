"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  Star, 
  ChevronDown,
  Play,
  Calendar,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle,
  Leaf,
  Beaker,
  ClipboardCheck,
  HeartPulse
} from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

// Feature highlights displayed in the Features section
const features = [
  {
    icon: Shield,
    title: "Safe for all skin",
    description: "Clinically guided treatments designed for sensitive to resilient skin types."
  },
  {
    icon: Sparkles,
    title: "Visible results",
    description: "Target discoloration, texture, and dullness with measurable improvements."
  },
  {
    icon: ClipboardCheck,
    title: "Expert plans",
    description: "Personalized care plans to match your goals and lifestyle."
  },
  {
    icon: HeartPulse,
    title: "Gentle & effective",
    description: "Comfortable sessions with minimal downtime and long‑lasting results."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Client",
    content: "My skin has never looked better! The team is professional and the results are amazing.",
    rating: 5
  },
  {
    name: "Emily Chen",
    role: "Beauty Enthusiast",
    content: "The facial treatments here are transformative. I always leave feeling refreshed.",
    rating: 5
  },
  {
    name: "Maria Rodriguez",
    role: "Skincare Lover",
    content: "Outstanding service and incredible results. This place is a hidden gem!",
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
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-white">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-100/40 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-green-300/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold font-orbitron leading-tight text-gray-900"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              MODERN HOTEL
              <br />
              <span className="text-green-500">EXPERIENCE</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Discover a new era of hospitality—simple, clean, and powered by technology. Enjoy seamless comfort, smart amenities, and a fresh, modern design.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link href="/booking">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 group">
                  <Calendar className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Book Your Experience
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="border-green-500 text-green-600 hover:bg-green-50 text-lg px-8 py-4 rounded-full transition-all duration-300 group">
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
          <ChevronDown className="h-8 w-8 text-green-400" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative bg-white">
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
                <div className="text-4xl md:text-6xl font-extrabold font-orbitron text-gray-900 mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments Preview */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-6xl font-orbitron font-extrabold text-gray-900">Our signature treatments</h2>
            <p className="mt-4 text-lg text-gray-600">MediBright Skin Peel, Algae Peel, and Dermaplaning — curated to target hyperpigmentation, acne scarring, and skin rejuvenation.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[{
              icon: Leaf,
              title: 'MediBright Skin Peel',
              desc: 'Brightening Kojic & Lactic acid formula that helps prevent melanin production and fades dark marks.'
            },{
              icon: Beaker,
              title: 'Algae Peel',
              desc: 'Seaweed micro-needles stimulate collagen and accelerate cellular renewal for smoother skin.'
            },{
              icon: Sparkles,
              title: 'Dermaplaning',
              desc: 'Reveals softer, brighter skin and improves product penetration for enhanced results.'
            }].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm"
              >
                <card.icon className="h-8 w-8 text-green-500" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-gray-600">{card.desc}</p>
                <div className="mt-6">
                  <Link href="/treatments">
                    <Button className="bg-green-500 hover:bg-green-600">Explore</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-orbitron font-extrabold text-gray-900 text-center"
          >
            How it works
          </motion.h2>
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {[{
              icon: ClipboardCheck, title: '1. Free consult', text: 'We assess your skin and create a tailored plan.'
            },{
              icon: Beaker, title: '2. Targeted therapy', text: 'Choose the treatment best suited to your goals.'
            },{
              icon: HeartPulse, title: '3. Gentle sessions', text: 'Comfortable procedures with minimal downtime.'
            },{
              icon: Sparkles, title: '4. Track progress', text: 'See visible improvements over 2–4 sessions.'
            }].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-gray-50 border border-gray-200 p-6"
              >
                <s.icon className="h-6 w-6 text-green-500" />
                <h3 className="mt-3 font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-1 text-gray-600 text-sm">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-orbitron font-extrabold text-gray-900 mb-6">
              Skin-first features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple, modern care powered by proven ingredients and thoughtful technology to help your skin look its best.
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
                <Card className="rounded-2xl bg-white border border-gray-200 shadow-sm h-full transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="relative">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-6 relative"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <feature.icon className="w-full h-full text-green-500 transition-colors" />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-green-100"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ opacity: 0.4 }}
                        />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 font-orbitron">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
      <section className="py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-orbitron font-extrabold text-gray-900 mb-6">
              Client experiences
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories from clients who trusted us with their skin.
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
                <Card className="rounded-2xl bg-white border border-gray-200 shadow-sm h-full transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="border-t border-gray-200 pt-6">
                      <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                      <p className="text-green-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-orbitron font-extrabold text-gray-900 mb-8">
              Start your skin journey
            </h2>
            
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Book a free consultation and get a tailored plan for brighter, smoother, more confident skin.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-lg px-12 py-6 group rounded-full">
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
                <Button variant="outline" size="lg" className="border-green-500 text-green-600 hover:bg-green-50 text-lg px-12 py-6 rounded-full">
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
