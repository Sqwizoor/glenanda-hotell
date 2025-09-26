"use client";

import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { 
  Sparkles, 
  Users, 
  Award, 
  Heart,
  Leaf,
  Shield,
  ArrowRight,
  Star,
  Calendar,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    name: "Dr. Sarah Johnson",
    role: "Lead Dermatologist",
    description: "Board-certified dermatologist with 15+ years of experience in advanced skincare treatments.",
    image: "/aesthetic.jpg"
  },
  {
    name: "Emily Rodriguez",
    role: "Master Esthetician",
    description: "Licensed esthetician specializing in facial treatments and skincare consultations.",
    image: "/algae.jpg"
  },
  {
    name: "Dr. Michael Chen",
    role: "Cosmetic Specialist",
    description: "Expert in non-invasive cosmetic procedures and anti-aging treatments.",
    image: "/algae2.jpg"
  },
  {
    name: "Lisa Thompson",
    role: "Skincare Consultant",
    description: "Personalized skin analysis and product recommendation specialist.",
    image: "/algae3.jpg"
  }
];

const values = [
  {
    icon: Heart,
    title: "Client-Centered Care",
    description: "Every treatment is personalized to your unique skin needs and goals."
  },
  {
    icon: Shield,
    title: "Safe & Effective",
    description: "We use only clinically-proven treatments and premium quality products."
  },
  {
    icon: Leaf,
    title: "Natural Approach",
    description: "Combining nature's best ingredients with advanced skincare science."
  },
  {
    icon: Award,
    title: "Expert Excellence",
    description: "Our certified professionals deliver exceptional results you can trust."
  }
];

const stats = [
  { number: "10,000", suffix: "+", label: "Happy Clients" },
  { number: "7", suffix: "", label: "Years Experience" },
  { number: "15", suffix: "+", label: "Expert Staff" },
  { number: "98", suffix: "%", label: "Satisfaction Rate" }
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                About
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent"> GlowSkin</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                We&apos;re passionate about helping you achieve your best skin. Our expert team combines 
                years of experience with the latest skincare innovations to deliver exceptional results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Our Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/algae-peel.jpg"
                  alt="GlowSkin Clinic"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent" />
              </div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">98%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-12">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic">
                  &quot;To empower every person to feel confident in their skin by providing 
                  personalized, professional skincare treatments that deliver real, 
                  lasting results.&quot;
                </p>
                <div className="text-emerald-600 font-semibold mt-6">
                  — The GlowSkin Promise
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do, ensuring you receive the best possible care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to a trusted skincare destination, here&apos;s how we&apos;ve grown.
            </p>
          </motion.div>

          <div className="space-y-12">
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
                  <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                          <milestone.icon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {milestone.title}
                          </h3>
                          <div className="text-emerald-600 font-semibold">{milestone.year}</div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-4 h-4 bg-emerald-500 rounded-full flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced professionals are dedicated to helping you achieve your skincare goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <div className="text-emerald-600 font-medium mb-3">{member.role}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Skin?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have discovered their best skin with GlowSkin.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Consultation
                </Button>
              </Link>
              
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  View Services
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@glowskin.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Beauty Ave, City</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
