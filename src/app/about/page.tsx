"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  Users, 
  Award, 
  Heart,
  Shield,
  ArrowRight,
  Star,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Coffee,
  Wifi,
  BedDouble,
  Clock,
  UtensilsCrossed,
  Trees
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Hotel journey timeline
const milestones = [
  {
    year: "2009",
    title: "A Boutique Beginning",
    description: "Glenanda Hotel opened its doors with 12 rooms and a heartfelt promise: warm hospitality that feels like coming home.",
    icon: Sparkles
  },
  {
    year: "2014",
    title: "Growing Comfort",
    description: "Expanded to 40 elegantly appointed rooms & suites while introducing our signature breakfast lounge.",
    icon: Users
  },
  {
    year: "2018",
    title: "Modern Enhancements",
    description: "Full refurbishment adding high‑speed Wi‑Fi, premium bedding, curated local art & refined interiors.",
    icon: Star
  },
  {
    year: "2022",
    title: "Sustainable Shift",
    description: "Adopted eco‑friendly housekeeping practices and energy‑efficient systems across the property.",
    icon: Award
  },
  {
    year: "Today",
    title: "Your City Retreat",
    description: "A trusted stay for business travellers, families & weekend explorers—rooted in personal service.",
    icon: Heart
  }
];

// Hospitality leadership (placeholder imagery references reused from public assets)
const team = [
  {
    name: "Nomsa Dlamini",
    role: "General Manager",
    description: "Leads guest experience with a focus on warmth, efficiency and consistent service standards.",
    image: "/room4.jpeg"
  },
  {
    name: "Jared Mokoena",
    role: "Front Office Lead",
    description: "Ensures seamless arrivals, smart room allocation and attentive concierge assistance.",
    image: "/room6.jpeg"
  },
  {
    name: "Lerato Khumalo",
    role: "Guest Relations",
    description: "Dedicated to resolving requests promptly—every stay should feel effortless and personal.",
    image: "/room7.jpeg"
  },
  {
    name: "Chef Roberto Silva",
    role: "Culinary Head",
    description: "Crafts fresh, comforting seasonal menus highlighting local produce and simple elegance.",
    image: "/dining.jpeg"
  }
];

const values = [
  {
    icon: Heart,
    title: "Genuine Hospitality",
    description: "Small, thoughtful touches—remembered preferences, warm greetings, quiet service."
  },
  {
    icon: Shield,
    title: "Reliability & Safety",
    description: "24/7 assistance, secure on‑site parking and well‑maintained facilities for peace of mind."
  },
  {
    icon: Coffee,
    title: "Everyday Comfort",
    description: "Quality beds, fresh linens, strong showers, good coffee and calm shared spaces."
  },
  {
    icon: Wifi,
    title: "Modern Essentials",
    description: "Fast Wi‑Fi, workspace-friendly rooms and power access for business & leisure guests alike."
  }
];

const stats = [
  { number: "40", suffix: "+", label: "Rooms & Suites" },
  { number: "15", suffix: "+", label: "Team Members" },
  { number: "98", suffix: "%", label: "Guest Satisfaction" },
  { number: "14", suffix: "+", label: "Years Welcoming" }
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
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Glenanda Hotel</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                A privately run city retreat blending relaxed character with dependable comfort. We focus on restful rooms, sincere service and effortless stays—without unnecessary fuss.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/rooms">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl">
          <BedDouble className="w-5 h-5 mr-2" />
          View Rooms
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
                  alt="Glenanda Hotel Lobby"
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
                  &quot;To provide consistently comfortable stays and thoughtful service—so every guest leaves rested, welcomed and ready for what&apos;s next.&quot;
                </p>
                <div className="text-emerald-600 font-semibold mt-6">
                  — The Glenanda Promise
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
              What Guides Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The pillars behind a stay that feels calm, efficient and quietly memorable.
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
              Our Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a handful of cosy rooms to a trusted stop for travellers and families.
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
              Meet The Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The people making sure your stay runs smoothly—front desk to kitchen.
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
              Ready To Stay With Us?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Come experience simple comfort, reliable amenities and attentive local hospitality.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/rooms">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold">
                  <Calendar className="mr-2 h-5 w-5" />
                  Check Availability
                </Button>
              </Link>

              <Link href="/booking">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Book Direct
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+27 76 207 3299</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>stay@glenandahotel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Glenanda, Johannesburg, South Africa</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
