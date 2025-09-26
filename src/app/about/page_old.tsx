"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  Users, 
  Award, 
  Heart,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  Brain,
  Globe,
  Trophy
  
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const milestones = [
  {
    year: "2018",
    title: "Foundation",
    description: "GlowSkin started with a simple mission: make professional skincare accessible to everyone.",
    icon: Sparkles
  },
  {
    year: "2020",
    title: "Expert Team",
    description: "Assembled a team of certified dermatologists and skincare specialists.",
    icon: Users
  },
  {
    year: "2022",
    title: "Premium Products",
    description: "Launched our signature line of clinically-proven skincare products.",
    icon: Star
  },
  {
    year: "2024",
    title: "Recognition",
    description: "Awarded 'Best Skincare Clinic' by the Beauty Excellence Council.",
    icon: Award
  },
  {
    year: "2025",
    title: "Present Day",
    description: "Continuing to help thousands achieve their best skin with personalized care.",
    icon: Heart
  }
];

const team = [
  {
    name: "Dr. Aria Chen",
    role: "Chief Technology Officer",
    description: "Pioneering quantum computing applications in hospitality with over 20 years of experience in advanced AI systems.",
    achievements: ["PhD Quantum Physics", "50+ Patents", "AI Innovation Award 2098"]
  },
  {
    name: "Marcus Volt",
    role: "Director of Guest Experience",
    description: "Master of holographic hospitality design, creating immersive experiences that blur the line between reality and dreams.",
    achievements: ["Holographic Design Master", "Guest Satisfaction 99.9%", "Experience Innovation Leader"]
  },
  {
    name: "Dr. Nova Sterling",
    role: "Chief Security Architect",
    description: "Expert in biometric security and neural protection, ensuring guest privacy in the digital age.",
    achievements: ["Cybersecurity Expert", "Neural Protection Pioneer", "Security Innovation Award"]
  },
  {
    name: "Zara Quantum",
    role: "Sustainability Director",
    description: "Leading the charge in eco-tech innovation, making luxury sustainable through quantum energy systems.",
    achievements: ["Green Tech Pioneer", "Carbon Neutral Certification", "Sustainability Excellence Award"]
  }
];

const values = [
  {
    icon: Brain,
    title: "Innovation First",
    description: "We push the boundaries of what's possible, constantly evolving and adapting to create experiences that seemed impossible yesterday."
  },
  {
    icon: Users,
    title: "Guest-Centric AI",
    description: "Our advanced AI systems learn and adapt to each guest's preferences, creating truly personalized experiences."
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Cutting-edge biometric security and neural encryption ensure your data and privacy are absolutely protected."
  },
  {
    icon: Globe,
    title: "Sustainable Future",
    description: "Quantum energy systems and eco-tech innovations make luxury sustainable for generations to come."
  }
];

const stats = [
  { number: "99.9", suffix: "%", label: "Guest Satisfaction Rate" },
  { number: "500", suffix: "+", label: "Quantum-Enhanced Rooms" },
  { number: "10", suffix: "", label: "Years of Innovation" },
  { number: "50", suffix: "+", label: "Technology Patents" },
  { number: "24/7", suffix: "", label: "AI Concierge Service" },
  { number: "100", suffix: "%", label: "Carbon Neutral Operations" }
];

const awards = [
  {
    year: "2099",
    title: "Future Hospitality Excellence",
    organization: "Global Hotel Innovation Council",
    icon: Trophy
  },
  {
    year: "2098",
    title: "Best AI Integration",
    organization: "Technology in Hospitality Awards",
    icon: Star
  },
  {
    year: "2097",
    title: "Sustainability Pioneer",
    organization: "Eco-Tourism Foundation",
    icon: Globe
  },
  {
    year: "2096",
    title: "Guest Experience Innovation",
    organization: "Luxury Travel Alliance",
    icon: Users
  }
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient font-['Orbitron'] mb-6">
              PIONEERING THE FUTURE
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Born from a vision to revolutionize hospitality, Glow Suite stands at the 
              intersection of cutting-edge technology and unparalleled luxury, creating 
              experiences that redefine what&apos;s possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              OUR MISSION
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Card className="glass-morphism neon-border p-12">
                <CardContent className="space-y-8 p-0">
                  <motion.p 
                    className="text-2xl md:text-3xl text-white/90 leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    &quot;To bridge the gap between today&apos;s hospitality and tomorrow&apos;s possibilities, 
                    creating immersive experiences that inspire, amaze, and elevate the human spirit 
                    through the thoughtful integration of revolutionary technology.&quot;
                  </motion.p>
                  
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-blue-400 font-semibold">
                      — The Glow Suite Founding Vision
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              BY THE NUMBERS
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div 
                  className="text-3xl md:text-5xl font-bold text-gradient font-['Orbitron'] mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.number}{stat.suffix}
                </motion.div>
                <div className="text-white/60 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              OUR JOURNEY
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              A decade of revolutionary breakthroughs that transformed the hospitality industry forever.
            </p>
          </motion.div>

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1">
                  <Card className="glass-morphism neon-border hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <milestone.icon className="w-8 h-8 text-blue-400" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-white font-['Orbitron']">
                            {milestone.title}
                          </h3>
                          <div className="text-blue-400 font-semibold">{milestone.year}</div>
                        </div>
                      </div>
                      <p className="text-white/70 text-lg leading-relaxed">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              CORE VALUES
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The fundamental principles that guide every decision and innovation at Glow Suite.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-morphism neon-border h-full hover:bg-white/10 transition-all duration-500">
                  <CardContent className="p-8 text-center space-y-6">
                    <motion.div
                      className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <value.icon className="w-8 h-8 text-blue-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white font-['Orbitron']">
                      {value.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              VISIONARY TEAM
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Meet the brilliant minds behind Glow Suite&apos;s revolutionary approach to luxury hospitality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-morphism neon-border h-full hover:bg-white/10 transition-all duration-500">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white font-['Orbitron'] mb-2">
                        {member.name}
                      </h3>
                      <div className="text-blue-400 font-medium mb-4">{member.role}</div>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        {member.description}
                      </p>
                      <div className="space-y-2">
                        {member.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center justify-center space-x-2 text-xs text-white/60">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-8">
              RECOGNITION
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Industry accolades that validate our commitment to innovation and excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-morphism neon-border h-full hover:bg-white/10 transition-all duration-500">
                  <CardContent className="p-6 text-center space-y-4">
                    <motion.div
                      className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <award.icon className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                    <div className="text-yellow-400 font-bold text-lg">{award.year}</div>
                    <h3 className="text-white font-semibold font-['Orbitron']">
                      {award.title}
                    </h3>
                    <p className="text-white/60 text-sm">{award.organization}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-gradient font-['Orbitron'] mb-8">
              JOIN OUR JOURNEY
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Be part of the future. Experience technology and luxury like never before 
              at Glow Suite - where innovation meets hospitality.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/booking">
                <Button size="lg" className="cyber-button text-lg px-12 py-6 group">
                  <Calendar className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Experience the Future
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button variant="outline" size="lg" className="cyber-button text-lg px-12 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
