"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, Wifi, Coffee, BedDouble, Shield, Car, Leaf, Clock, 
  ArrowRight, Calendar, Check, Users, Briefcase, PartyPopper, Building2, ChefHat, Mic,
  MapPin, Gift, Phone, MessageCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Enhanced amenity groups with services for all guest types
const amenityGroups = [
  {
    icon: Wifi,
    title: "High-Speed Fibre Wi‑Fi",
    description: "Enterprise-grade connectivity perfect for business travelers and leisure guests.",
    features: ["Unlimited high-speed access", "Secure business network", "Guest network available", "24/7 technical support"],
    groupFriendly: false
  },
  {
    icon: Coffee,
    title: "Flexible Dining Services",
    description: "Dining options for every need - from solo breakfast to group celebrations.",
    features: ["Room service available", "Restaurant dining", "Private dining rooms", "Dietary accommodations"],
    groupFriendly: false
  },
  {
    icon: BedDouble,
    title: "Comfortable Accommodations",
    description: "Premium bedding and quiet rooms ensure restful sleep for every guest.",
    features: ["Anti‑allergy pillows", "Blackout curtains", "Individual climate control", "Various room types"],
    groupFriendly: false
  },
  {
    icon: Building2,
    title: "Business & Event Facilities",
    description: "Professional spaces for meetings, events, and special occasions.",
    features: ["Various room sizes", "AV equipment included", "Flexible seating", "Business center access"],
    groupFriendly: true
  },
  {
    icon: Car,
    title: "Transportation & Parking",
    description: "Secure parking and transportation services for all guests.",
    features: ["Secure parking", "Airport transfers", "Local tour information", "Taxi booking assistance"],
    groupFriendly: false
  },
  {
    icon: Users,
    title: "Dedicated Group Services",
    description: "Personal group coordinator to ensure seamless experience for all attendees.",
    features: ["Pre-arrival planning", "On-site coordination", "24/7 group support", "Custom itinerary planning"],
    groupFriendly: true
  }
];

// Group-specific services
const groupServices = [
  {
    icon: Briefcase,
    title: "Corporate Events",
    description: "Complete business event hosting from board meetings to company retreats.",
    features: ["Meeting rooms", "AV equipment", "Business center", "Executive services"],
    capacity: "10-200 people",
    image: "/group14.jpeg"
  },
  {
    icon: PartyPopper,
    title: "Social Celebrations",
    description: "Memorable celebrations for families, weddings, and special occasions.",
    features: ["Event planning", "Decoration services", "Photography", "Entertainment coordination"],
    capacity: "20-300 people", 
    image: "/group3.jpeg"
  },
  {
    icon: ChefHat,
    title: "Group Catering",
    description: "Customized dining experiences for groups of all sizes and preferences.",
    features: ["Custom menus", "Dietary accommodations", "Buffet or plated service", "Private dining rooms"],
    capacity: "Any size group",
    image: "/dining2.jpeg"
  },
  {
    icon: Mic,
    title: "Conference Services",
    description: "Professional conference hosting with full technical support.",
    features: ["Live streaming", "Recording services", "Translation services", "Registration support"],
    capacity: "50-500 attendees",
    image: "/group12.jpeg"
  }
];

const support = [
  { icon: Shield, title: "24/7 Group Support", text: "Dedicated assistance for group needs at any hour." },
  { icon: Leaf, title: "Sustainable Practices", text: "Eco-friendly group services and green event options." },
  { icon: Clock, title: "Flexible Scheduling", text: "Adaptable check-in/out times for group convenience." },
  { icon: Phone, title: "Concierge Services", text: "Local expertise for activities, dining, and entertainment." },
  { icon: MapPin, title: "Prime Location", text: "Easy access to Johannesburg's business and leisure districts." },
  { icon: Gift, title: "Group Discounts", text: "Volume pricing and special packages for large bookings." }
];

const journey = [
  { step: "01", title: "Inquiry & Planning", desc: "Initial consultation and custom proposal creation" },
  { step: "02", title: "Coordination", desc: "Pre-arrival planning and logistics coordination" },
  { step: "03", title: "Arrival & Setup", desc: "Seamless check-in and event space preparation" },
  { step: "04", title: "Event Execution", desc: "Full support throughout your stay or event" },
  { step: "05", title: "Follow-up", desc: "Post-event wrap-up and feedback collection" }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">Premium Hotel Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
            Exceptional Services
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              For Every Guest
            </span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
            From solo business travelers and romantic couples to families and large corporate groups, our comprehensive services ensure every guest experience exceeds expectations.
          </p>
        </motion.div>

        {/* Group-Specific Services */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Comprehensive Hotel Solutions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Whether you&apos;re traveling alone, as a couple, with family, or with a large group, we have specialized services to make your stay exceptional.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {groupServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/90 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg dark:hover:bg-zinc-800/70 transition-all duration-300 group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-emerald-500 p-2 rounded-full shadow-md">
                          <Icon className="w-5 h-5 text-emerald-600 dark:text-white" />
                        </div>
                        <div className="absolute bottom-4 left-4 text-emerald-500 dark:text-emerald-400 font-semibold">
                          {service.capacity}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{service.title}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">{service.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        
                        <Link href={`https://wa.me/27123456789?text=I&apos;m interested in ${service.title} services`} target="_blank">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white group">
                            Inquire Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Core Amenities */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Core Hotel Amenities
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Essential services and facilities designed to enhance every group member&apos;s stay.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenityGroups.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg dark:hover:bg-zinc-800/50 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-emerald-500/15 dark:bg-emerald-500/20 p-3 rounded-xl">
                          <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        {amenity.groupFriendly && (
                          <div className="bg-blue-500/15 dark:bg-blue-500/20 px-2 py-1 rounded-full">
                            <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{amenity.title}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">{amenity.description}</p>
                      
                      <div className="space-y-2">
                        {amenity.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                            <div className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Support Services */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Additional Support Services
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Comprehensive support to ensure your group experience is seamless from start to finish.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {support.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white/85 dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500/50 transition-all duration-300 shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/15 dark:bg-emerald-500/20 rounded-xl mb-4">
                      <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Service Journey */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Your Group Service Journey
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              From initial inquiry to post-event follow-up, we guide you through every step.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {journey.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/90 rounded-xl mb-4 font-bold text-white shadow">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item.desc}</p>
                  </div>
                  
                  {index < journey.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500/60 to-zinc-300 dark:to-zinc-600 transform -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-white/90 dark:bg-gradient-to-r dark:from-emerald-500/20 dark:to-teal-500/20 border border-emerald-200 dark:border-emerald-500/30 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                Ready To Plan Your Group Experience?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-6 max-w-2xl mx-auto">
                Contact our group services team to discuss your requirements and receive a customized proposal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`https://wa.me/27123456789?text=I&apos;d like to inquire about group services and availability`} target="_blank">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white group">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Inquiry
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-500/10">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}