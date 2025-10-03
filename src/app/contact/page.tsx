"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Building2,
  PartyPopper,
  Briefcase,
  Heart,
  Star,
  Wifi,
  Car,
  Coffee,
  Headphones
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Immediate Assistance",
    description: "24/7 help for bookings and late night check-ins",
    contact: "+27 76 207 3299",
    availability: "24 Hours Available",
    link: "https://wa.me/27762073299"
  },
  {
    icon: Phone,
    title: "Direct Phone",
    description: "Speak directly with our hospitality team for immediate assistance",
    contact: "+27 60 311 4115",
    availability: "24/7 Reception"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick reservations and massage bookings",
    contact: "+27 60 311 4115",
    availability: "Quick Response",
    link: "https://wa.me/27603114115"
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send detailed inquiries and receive comprehensive responses",
    contact: "info@glenandahotel.co.za",
    availability: "Response within 24 hours"
  },
  {
    icon: Building2,
    title: "In-Person",
    description: "Visit our front desk for personal consultation and tours",
    contact: "39 vorster AVE glenanda",
    availability: "8:00 AM - 10:00 PM"
  }
];

const departments = [
  {
    name: "Reservations",
    description: "Individual rooms, couples suites, family bookings, and group reservations",
    icon: Users,
    contact: "reservations@glenandahotel.co.za",
    phone: "+27 11 234 5679"
  },
  {
    name: "Event Planning",
    description: "Romantic dinners, family celebrations, corporate events, and weddings",
    icon: PartyPopper,
    contact: "events@glenandahotel.co.za",
    phone: "+27 11 234 5680"
  },
  {
    name: "Business Services",
    description: "Solo business travel, meeting rooms, and corporate packages",
    icon: Briefcase,
    contact: "business@glenandahotel.co.za"
  },
  {
    name: "Guest Relations",
    description: "General inquiries, feedback, and personalized guest assistance",
    icon: Heart,
    contact: "guest@glenandahotel.co.za"
  }
];

const services = [
  { icon: Wifi, service: "Free WiFi", description: "High-speed internet throughout the hotel" },
  { icon: Car, service: "Parking", description: "Secure on-site parking for all guests" },
  { icon: Coffee, service: "Dining", description: "Restaurant and room service available" },
  { icon: Headphones, service: "Concierge", description: "Local expertise and assistance" }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    department: "general",
    groupSize: "",
    eventDate: "",
    inquiryType: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-6">
              Contact Glenanda Hotel
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
              Ready to plan your stay? Whether you&apos;re traveling solo, as a couple, with family, or organizing a group event, 
              our dedicated team is here to help make your experience exceptional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 border-b border-zinc-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Multiple ways to connect with our hospitality team for all your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 hover:border-emerald-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {method.title}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {method.description}
                    </p>
                    <div className="space-y-2">
                      {method.link ? (
                        <Link href={method.link} target="_blank" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold block">
                          {method.contact}
                        </Link>
                      ) : (
                        <div className="text-emerald-400 font-semibold">{method.contact}</div>
                      )}
                      <div className="text-zinc-500 text-xs">{method.availability}</div>
                    </div>
                    {method.link && (
                      <Link href={method.link} target="_blank">
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                          Contact Now
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-white text-center">
                    Send Us a Message
                  </CardTitle>
                  <p className="text-zinc-400 text-center">
                    Fill out the form below and we&apos;ll get back to you promptly
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            Name *
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className="bg-zinc-900/50 border-zinc-600 text-white placeholder:text-zinc-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            Email *
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="bg-zinc-900/50 border-zinc-600 text-white placeholder:text-zinc-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            Phone
                          </label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+27 XX XXX XXXX"
                            className="bg-zinc-900/50 border-zinc-600 text-white placeholder:text-zinc-500"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-300 text-sm font-medium mb-2">
                            Inquiry Type
                          </label>
                          <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full h-9 rounded-md border border-zinc-600 bg-zinc-900/50 px-3 py-1 text-white text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="group">Group Booking</option>
                            <option value="event">Event Planning</option>
                            <option value="business">Business Services</option>
                            <option value="wedding">Wedding/Celebration</option>
                          </select>
                        </div>
                      </div>

                      {(formData.inquiryType === 'group' || formData.inquiryType === 'event') && (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-zinc-300 text-sm font-medium mb-2">
                              Group Size
                            </label>
                            <Input
                              name="groupSize"
                              value={formData.groupSize}
                              onChange={handleInputChange}
                              placeholder="Number of guests"
                              className="bg-zinc-900/50 border-zinc-600 text-white placeholder:text-zinc-500"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-300 text-sm font-medium mb-2">
                              Event Date
                            </label>
                            <Input
                              name="eventDate"
                              type="date"
                              value={formData.eventDate}
                              onChange={handleInputChange}
                              className="bg-zinc-900/50 border-zinc-600 text-white"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-zinc-300 text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief subject line"
                          className="bg-zinc-900/50 border-zinc-600 text-white placeholder:text-zinc-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-300 text-sm font-medium mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your requirements..."
                          rows={6}
                          className="w-full rounded-md border border-zinc-600 bg-zinc-900/50 px-3 py-2 text-white text-sm transition-colors placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none"
                          required
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 group"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                        
                        <Link href="https://wa.me/27603114115?text=Hello, I'd like to inquire about your services" target="_blank">
                          <Button type="button" variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-6">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6 py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                      <p className="text-zinc-400">
                        Thank you for contacting us. We&apos;ll respond within 24 hours.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                        className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Departments */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Departments */}
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">
                    Specialized Departments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={dept.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors"
                    >
                      <dept.icon className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">{dept.name}</h4>
                        <p className="text-zinc-400 text-sm mb-3">{dept.description}</p>
                        <div className="space-y-1">
                          <a 
                            href={`mailto:${dept.contact}`}
                            className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors block"
                          >
                            {dept.contact}
                          </a>
                          <a 
                            href={`tel:${dept.phone}`}
                            className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors block"
                          >
                            {dept.phone}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Hotel Services */}
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Building2 className="w-6 h-6 mr-2" />
                    Hotel Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.service}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <service.icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="text-white font-medium">{service.service}</div>
                        <div className="text-zinc-400">{service.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Operating Hours */}
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Clock className="w-6 h-6 mr-2" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300">Reception</span>
                      <span className="text-emerald-400 font-semibold">24/7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300">Restaurant</span>
                      <span className="text-zinc-300">6:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300">Room Service</span>
                      <span className="text-zinc-300">6:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300">Check-in/out</span>
                      <span className="text-zinc-300">Flexible times available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-white">Glenanda Hotel</p>
                    <p className="text-zinc-300">39 vorster AVE glenanda<br />South Africa</p>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Car className="w-4 h-4" />
                      Free parking available on-site
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-t border-zinc-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Pricing
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Transparent and competitive rates for all our services and accommodations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Room Rates */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 hover:border-emerald-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Building2 className="w-6 h-6 mr-2 text-emerald-400" />
                    Room Rates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Single Occupancy</span>
                    <span className="text-emerald-400 font-bold">from R500</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Sleeps 2</span>
                    <span className="text-emerald-400 font-bold">from R600</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Sleeps 3-4</span>
                    <span className="text-emerald-400 font-bold">from R900</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-zinc-300">Group (10-50)</span>
                    <span className="text-emerald-400 font-bold">R300 pp</span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-4">
                    * Per night, sharing room for group bookings
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Massage Services */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 hover:border-emerald-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Heart className="w-6 h-6 mr-2 text-emerald-400" />
                    Massage Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Swedish</span>
                    <span className="text-emerald-400 font-bold">R400/hr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Deep Tissue</span>
                    <span className="text-emerald-400 font-bold">R450/hr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Aromatherapy</span>
                    <span className="text-emerald-400 font-bold">R450/hr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Hot Stone</span>
                    <span className="text-emerald-400 font-bold">R500/hr</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-zinc-300">Thai Massage</span>
                    <span className="text-emerald-400 font-bold">R500/hr</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Special Packages */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 hover:border-emerald-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Star className="w-6 h-6 mr-2 text-emerald-400" />
                    Special Packages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Couples Package</span>
                    <span className="text-emerald-400 font-bold">R1,254</span>
                  </div>
                  <div className="text-xs text-zinc-500 mb-3">Stay + 1hr Swedish massage</div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Romantic Package</span>
                    <span className="text-emerald-400 font-bold">from R1,600</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-300">Anniversary Special</span>
                    <span className="text-emerald-400 font-bold">from R2,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-zinc-300">Honeymoon Package</span>
                    <span className="text-emerald-400 font-bold">from R2,500</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-zinc-400 mb-6">
              All prices are subject to availability and may vary during peak seasons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.me/27762073299?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20get%20a%20quote%20for%20my%20stay." target="_blank">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white group">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Quote Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/rooms">
                <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
                  <Calendar className="mr-2 h-5 w-5" />
                  View Rooms
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 border-t border-zinc-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Host your special occasions at Glenanda Hotel with our exceptional event facilities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Birthday Parties */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 hover:border-emerald-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    🎂 Birthday Parties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-zinc-300">
                    Celebrate your special day with us! Our dedicated team will help you create unforgettable birthday memories with customized decorations, catering, and entertainment options.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Users className="w-4 h-4" />
                      Suitable for all group sizes
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <PartyPopper className="w-4 h-4" />
                      Custom decoration packages available
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Coffee className="w-4 h-4" />
                      Catering and cake services
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Conference Room Booking */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 hover:border-emerald-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Building2 className="w-6 h-6 mr-2 text-emerald-400" />
                    Conference Room Booking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-zinc-300">
                    Professional meeting spaces equipped with modern amenities for your business needs. Perfect for corporate meetings, seminars, and business conferences.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Wifi className="w-4 h-4" />
                      High-speed internet and AV equipment
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Users className="w-4 h-4" />
                      Flexible seating arrangements
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Coffee className="w-4 h-4" />
                      Refreshment services available
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information for Events */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-zinc-800/30 rounded-xl p-8 border border-zinc-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Plan Your Event?</h3>
              <p className="text-zinc-300 mb-6">
                Contact our events team to discuss your requirements and get a personalized quote
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:reservations@glenanda.co.za" className="hover:text-emerald-300 transition-colors">
                    reservations@glenanda.co.za
                  </a>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+27603114115" className="hover:text-emerald-300 transition-colors">
                    +27 60 311 4115
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-zinc-700/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-6">
              Ready to Book Your Stay?
            </h2>
            
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Experience exceptional hospitality designed for groups of all sizes. 
              Contact us today to plan your perfect stay or event.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.me/27603114115?text=I'd like to make a reservation at Glenanda Hotel" target="_blank">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white group">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Booking
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/rooms">
                <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
                  <Calendar className="mr-2 h-5 w-5" />
                  View Rooms
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                Professional Service
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                Group Specialists
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                Event Facilities
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
