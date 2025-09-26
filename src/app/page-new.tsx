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
  Heart,
  Zap,
  Award
} from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const services = [
  {
    icon: Sparkles,
    title: "Facial Treatments",
    description: "Professional deep cleansing and rejuvenating facials for all skin types."
  },
  {
    icon: Shield,
    title: "Anti-Aging",
    description: "Advanced treatments to reduce fine lines and restore youthful appearance."
  },
  {
    icon: Heart,
    title: "Skin Health",
    description: "Comprehensive skin analysis and personalized treatment plans."
  },
  {
    icon: Zap,
    title: "Quick Treatments",
    description: "Express services perfect for busy schedules with immediate results."
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
      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="video-container h-full">
            <div className="image-placeholder h-full">
              <div className="text-center">
                <Play className="w-16 h-16 text-emerald-500 mb-4 mx-auto" />
                <p>Hero Video Background</p>
                <p className="text-sm mt-2">Replace with skincare treatment video</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 text-center max-w-5xl mx-auto px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Beautiful Skin
              <br />
              <span className="text-emerald-400">Starts Here</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Discover professional skincare treatments that reveal your natural glow. 
              Our expert team uses the latest techniques for healthy, radiant skin.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link href="/services">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-4 rounded-full group">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full group">
                <Play className="mr-2 h-5 w-5" />
                Watch Video
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="section-padding skincare-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your skin with our professional treatments designed to address 
              your unique needs and reveal your natural beauty.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="relative">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-6 relative"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <service.icon className="w-full h-full text-emerald-500" />
                        <div className="absolute inset-0 rounded-full bg-emerald-100 -z-10"></div>
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Amazing Results
            </h2>
            <p className="text-xl text-gray-600">
              See the transformation our treatments can achieve
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <div className="image-container aspect-[4/3]">
                    <div className="image-placeholder">
                      <div className="text-center">
                        <Award className="w-12 h-12 text-emerald-500 mb-2 mx-auto" />
                        <p>Before/After #{item}</p>
                        <p className="text-xs mt-1">Treatment results</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding skincare-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from happy clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg">
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
                      <p className="text-emerald-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Ready to Glow?
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Book your consultation today and discover the perfect treatment 
              plan for your skin goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-12 py-6 rounded-full group">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Consultation
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
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
