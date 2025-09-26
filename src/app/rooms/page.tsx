"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wifi, 
  Zap, 
  Star, 
  Users, 
  Bed, 
  Monitor, 
  Sparkles,
  ArrowRight,
  Eye,
  Calendar,
  Check
} from "lucide-react";
import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Motion Variants (typed for TS compatibility)
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// Enhanced room types focusing on group accommodations and real hotel features
const roomTypes = [
  {
    id: 1,
    name: "Group Deluxe Rooms",
    price: 1150,
    originalPrice: 1300,
    image: "/room3.jpeg",
    category: "Group",
    size: "35 m²",
    guests: 4,
    beds: 2,
    groupCapacity: "2-8 rooms available",
    description: "Perfect for team bookings with multiple adjoining rooms available. Each room features modern amenities and comfortable twin or double bed configurations.",
    features: [
      "Adjoining room options available",
      "Shared common area access",
      "Group breakfast packages",
      "Team meeting space",
      "Complimentary WiFi",
      "24/7 room service"
    ],
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Monitor, name: "Smart TV" },
      { icon: Users, name: "Group-Friendly" },
      { icon: Star, name: "Premium Service" }
    ],
    rating: 4.7,
    reviews: 324,
    groupBenefits: "10% discount on 5+ rooms"
  },
  {
    id: 2,
    name: "Family & Corporate Suites",
    price: 2200,
    originalPrice: 2600,
    image: "/room10.jpeg",
    category: "Suite",
    size: "65 m²",
    guests: 6,
    beds: 3,
    groupCapacity: "Up to 4 suites",
    description: "Spacious suites ideal for families or small corporate groups. Features separate living areas, kitchenette, and flexible sleeping arrangements.",
    features: [
      "Separate living and sleeping areas",
      "Mini kitchen with refrigerator",
      "Multiple bathroom facilities",
      "Conference table for meetings",
      "Premium bedding and linens",
      "Concierge service included"
    ],
    amenities: [
      { icon: Wifi, name: "Business WiFi" },
      { icon: Monitor, name: "Multiple Screens" },
      { icon: Users, name: "Family-Friendly" },
      { icon: Star, name: "Luxury Service" }
    ],
    rating: 4.8,
    reviews: 156,
    groupBenefits: "Meeting room included with 2+ suites"
  },
  {
    id: 3,
    name: "Executive Business Rooms",
    price: 1580,
    originalPrice: 1800,
    image: "/room6.jpeg",
    category: "Business",
    size: "42 m²",
    guests: 2,
    beds: 1,
    groupCapacity: "Up to 15 rooms",
    description: "Professional accommodations designed for business travelers and corporate groups. Enhanced with work-friendly amenities and services.",
    features: [
      "Dedicated workspace area",
      "Business center access",
      "Executive lounge privileges",
      "Express check-in/out",
      "Complimentary newspapers",
      "Shoe shine service"
    ],
    amenities: [
      { icon: Wifi, name: "Business Network" },
      { icon: Monitor, name: "Large Work Display" },
      { icon: Bed, name: "Premium Mattress" },
      { icon: Star, name: "Executive Service" }
    ],
    rating: 4.6,
    reviews: 892,
    groupBenefits: "Corporate rates for 5+ rooms"
  },
  {
    id: 4,
    name: "Standard Comfort Rooms",
    price: 950,
    originalPrice: 1100,
    image: "/room2.jpeg",
    category: "Standard",
    size: "28 m²",
    guests: 2,
    beds: 1,
    groupCapacity: "Up to 20 rooms",
    description: "Comfortable and well-appointed rooms perfect for budget-conscious groups without compromising on quality and service.",
    features: [
      "Contemporary furnishing",
      "Efficient climate control",
      "Modern bathroom facilities",
      "Complimentary toiletries",
      "Safe deposit box",
      "Daily housekeeping"
    ],
    amenities: [
      { icon: Wifi, name: "Standard WiFi" },
      { icon: Monitor, name: "Cable TV" },
      { icon: Bed, name: "Comfortable Bed" },
      { icon: Star, name: "Quality Service" }
    ],
    rating: 4.4,
    reviews: 1547,
    groupBenefits: "Best value for large groups"
  },
  {
    id: 5,
    name: "Premium Double Rooms",
    price: 1350,
    originalPrice: 1550,
    image: "/room4.jpeg",
    category: "Premium",
    size: "38 m²",
    guests: 2,
    beds: 1,
    groupCapacity: "Up to 12 rooms",
    description: "Enhanced comfort with premium amenities, perfect for groups seeking a balance of luxury and value for corporate or leisure travel.",
    features: [
      "Premium bedding and pillows",
      "Marble bathroom with bathtub",
      "Mini-bar and coffee station",
      "Seating area with sofa",
      "Upgraded bathroom amenities",
      "Nightly turndown service"
    ],
    amenities: [
      { icon: Wifi, name: "Premium WiFi" },
      { icon: Monitor, name: "Smart Entertainment" },
      { icon: Bed, name: "Luxury Bedding" },
      { icon: Star, name: "Premium Service" }
    ],
    rating: 4.7,
    reviews: 678,
    groupBenefits: "Complimentary upgrades available"
  },
  {
    id: 6,
    name: "VIP Presidential Suite",
    price: 3500,
    originalPrice: 4200,
    image: "/room14.jpeg",
    category: "VIP",
    size: "120 m²",
    guests: 4,
    beds: 2,
    groupCapacity: "Exclusive booking",
    description: "Ultimate luxury accommodation for VIP guests and high-profile group events. Features panoramic views and exclusive services.",
    features: [
      "Panoramic city views",
      "Private dining area",
      "Jacuzzi and premium bathroom",
      "Butler service included",
      "Private entrance available",
      "Champagne welcome amenities"
    ],
    amenities: [
      { icon: Wifi, name: "VIP Network Access" },
      { icon: Monitor, name: "Entertainment System" },
      { icon: Users, name: "VIP Concierge" },
      { icon: Star, name: "5-Star Service" }
    ],
    rating: 5.0,
    reviews: 89,
    groupBenefits: "Exclusive event hosting available"
  }
];

const filterOptions = [
  { value: "all", label: "All Rooms" },
  { value: "group", label: "Group Rooms" },
  { value: "suite", label: "Suites" },
  { value: "business", label: "Business" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "vip", label: "VIP" }
];

export default function RoomsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const filteredRooms = useMemo(() => roomTypes.filter(room => 
    selectedFilter === "all" || room.category.toLowerCase() === selectedFilter
  ), [selectedFilter]);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/room14.jpeg"
            alt="Luxury hotel room"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 mb-6"
            >
              <Sparkles className="w-5 h-5 mr-2 text-emerald-300" />
              <span className="text-sm tracking-wide font-medium">GLENANDA HOTEL ACCOMMODATIONS</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Rooms & Suites for Every Group
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              From intimate business meetings to grand family celebrations, discover our range of accommodations designed to host groups of every size with comfort and elegance.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { number: "50+", label: "Total Rooms" },
                { number: "200", label: "Max Capacity" },
                { number: "6", label: "Room Types" },
                { number: "24/7", label: "Service" }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-emerald-300">{stat.number}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white/70 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Accommodation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Filter by room type to discover the ideal space for your individual stay or group booking</p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {filterOptions.map((option) => (
              <motion.div variants={fadeUp} key={option.value}>
                <Button
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`rounded-full px-6 py-3 transition-all duration-300 ${
                    selectedFilter === option.value 
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg" 
                      : "border-gray-300 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  <span>{option.label}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                onHoverStart={() => setHoveredRoom(room.id)}
                onHoverEnd={() => setHoveredRoom(null)}
                className="group relative"
              >
                <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  {/* Room Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div 
                      className="absolute inset-0" 
                      initial={{ scale: 1 }} 
                      whileHover={{ scale: 1.05 }} 
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        priority={index < 3}
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:brightness-110 transition-all duration-700"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Room specs overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: hoveredRoom === room.id ? 1 : 0, y: hoveredRoom === room.id ? 0 : 20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-medium text-white"
                    >
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur">{room.size}</span>
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur">{room.guests} Guests</span>
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur">{room.beds} Bed{room.beds>1?'s':''}</span>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold text-white backdrop-blur shadow-lg ${
                        room.category === 'Group' ? 'bg-purple-500/80' :
                        room.category === 'Suite' ? 'bg-emerald-500/80' :
                        room.category === 'Business' ? 'bg-blue-500/80' :
                        room.category === 'VIP' ? 'bg-amber-500/80' :
                        'bg-gray-500/80'
                      }`}>
                        {room.category}
                      </span>
                    </div>

                    {/* Group Capacity Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/80 text-white text-xs font-medium backdrop-blur">
                        {room.groupCapacity}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{room.rating}</span>
                          <span>({room.reviews} reviews)</span>
                        </div>
                        <div className="text-sm text-emerald-600 font-medium">
                          {room.groupBenefits}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">
                          R{room.price}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          R{room.originalPrice}
                        </div>
                        <div className="text-xs text-gray-500">per night</div>
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-1">
                    <p className="text-gray-600 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Amenities */}
                    <div className="grid grid-cols-2 gap-3">
                      {room.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                          <amenity.icon className="w-4 h-4 text-emerald-500" />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Key Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-800">Key Features:</h4>
                      <div className="space-y-1">
                        {room.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                            <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {room.features.length > 3 && (
                          <div className="text-xs text-emerald-600">
                            +{room.features.length - 3} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4 border-t border-gray-100">
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full"
                        asChild
                      >
                        <a 
                          href={`https://wa.me/27762073299?text=${encodeURIComponent(`Hi Glenanda Hotel, I'd like to book the ${room.name}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Room
                        </a>
                      </Button>
                      <Button variant="outline" className="rounded-full border-emerald-300 text-emerald-600 hover:bg-emerald-50">
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

      {/* Group Booking Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-100 via-white to-teal-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Special Benefits for Group Bookings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              The more rooms you book, the more you save. Enjoy exclusive perks and personalized service for your group stay.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Volume Discounts",
                description: "Save up to 25% when booking 10+ rooms",
                icon: "💰",
                benefits: ["5+ rooms: 10% discount", "10+ rooms: 20% discount", "20+ rooms: 25% discount"]
              },
              {
                title: "Complimentary Services",
                description: "Free meeting rooms and additional amenities",
                icon: "🎁",
                benefits: ["Free WiFi upgrade", "Meeting room included", "Group check-in service"]
              },
              {
                title: "Flexible Payment",
                description: "Corporate billing and extended payment terms",
                icon: "📋",
                benefits: ["Corporate invoicing", "Flexible cancellation", "Dedicated group coordinator"]
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{benefit.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.benefits.map((item) => (
                    <li key={item} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Additional Hotel Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Additional Hotel Services
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Airport Transfers",
                  description: "Group transportation to/from airport",
                  price: "From R150 per person"
                },
                {
                  title: "Event Catering",
                  description: "In-room dining and banquet services",
                  price: "From R85 per person"
                },
                {
                  title: "Business Services",
                  description: "Printing, meeting rooms, AV equipment",
                  price: "From R200 per day"
                },
                {
                  title: "Concierge Services",
                  description: "Local tours, restaurant bookings, activities",
                  price: "Complimentary"
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="text-emerald-600 font-semibold text-sm">{service.price}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-semibold"
                asChild
              >
                <a 
                  href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20enquire%20about%20group%20room%20bookings."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Request Group Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-full font-semibold"
                asChild
              >
                <Link href="/contact">
                  Schedule Visit
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
