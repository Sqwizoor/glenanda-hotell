"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Bed, 
  Star, 
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Wifi,
  Clock,
  MapPin,
  Phone,
  Mail,
  Plus,
  Minus,
  AlertCircle,
  Gift
} from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const rooms = [
  {
    id: 1,
    name: "Quantum Luxury Suite",
    price: 2089,
    originalPrice: 2500,
    size: "85 m²",
    guests: 2,
    beds: 1,
    image: "/api/placeholder/400/300",
    features: ["Holographic Entertainment", "Neural Climate Control", "Quantum Memory Foam"],
    amenities: [
      { icon: Wifi, name: "Quantum WiFi 7.0" },
      { icon: Zap, name: "Wireless Charging" },
      { icon: Shield, name: "Biometric Security" }
    ]
  },
  {
    id: 2,
    name: "Cyberpunk Penthouse",
    price: 3500,
    originalPrice: 4200,
    size: "150 m²",
    guests: 4,
    beds: 2,
    image: "/api/placeholder/400/300",
    features: ["360° City View", "Quantum Gaming Station", "Personal Teleportation Pod"],
    amenities: [
      { icon: Wifi, name: "Neural Network" },
      { icon: Zap, name: "Quantum Power Core" },
      { icon: Shield, name: "Elite Security" }
    ]
  },
  {
    id: 3,
    name: "Neo-Tokyo Standard",
    price: 1200,
    originalPrice: 1500,
    size: "45 m²",
    guests: 2,
    beds: 1,
    image: "/api/placeholder/400/300",
    features: ["Smart Mirror Interface", "Voice Control", "Digital Art Gallery"],
    amenities: [
      { icon: Wifi, name: "High-Speed Quantum" },
      { icon: Zap, name: "Wireless Everything" },
      { icon: Shield, name: "Smart Security" }
    ]
  }
];

const addOns = [
  {
    id: "holo-butler",
    name: "Holographic Butler",
    description: "Personal AI assistant available 24/7",
    price: 200,
    unit: "per night"
  },
  {
    id: "quantum-spa",
    name: "Quantum Spa Access",
    description: "Advanced healing and relaxation chambers",
    price: 350,
    unit: "per stay"
  },
  {
    id: "neural-dining",
    name: "Neural Gastronomy",
    description: "AI-curated molecular cuisine experience",
    price: 150,
    unit: "per meal"
  },
  {
    id: "vr-entertainment",
    name: "Premium VR Entertainment",
    description: "Access to exclusive virtual reality experiences",
    price: 100,
    unit: "per night"
  },
  {
    id: "quantum-transport",
    name: "Quantum Transportation",
    description: "Personal teleportation service within the city",
    price: 500,
    unit: "per ride"
  }
];

const steps = [
  { id: 1, title: "Select Room", description: "Choose your quantum suite" },
  { id: 2, title: "Dates & Guests", description: "Pick your travel dates" },
  { id: 3, title: "Add-ons", description: "Enhance your experience" },
  { id: 4, title: "Guest Details", description: "Your information" },
  { id: 5, title: "Payment", description: "Secure quantum checkout" },
  { id: 6, title: "Confirmation", description: "Booking complete" }
];

function BookingPageContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const heroRef = useRef(null);
  const searchParams = useSearchParams();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Pre-select room from URL params
  useEffect(() => {
    const roomId = searchParams.get('room');
    if (roomId) {
      setSelectedRoom(parseInt(roomId));
      setCurrentStep(2);
    }
  }, [searchParams]);

  // Calculate totals
  const selectedRoomData = rooms.find(room => room.id === selectedRoom);
  const nights = checkIn && checkOut ? 
    Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  
  const roomTotal = selectedRoomData ? selectedRoomData.price * nights : 0;
  const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
    const addOn = addOns.find(a => a.id === addOnId);
    if (addOn) {
      if (addOn.unit === "per night") {
        return total + (addOn.price * nights);
      } else {
        return total + addOn.price;
      }
    }
    return total;
  }, 0);
  const subtotal = roomTotal + addOnTotal;
  const taxes = subtotal * 0.15;
  const total = subtotal + taxes;

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    nextStep();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedRoom !== null;
      case 2: return checkIn && checkOut && guests > 0;
      case 3: return true; // Add-ons are optional
      case 4: return guestInfo.firstName && guestInfo.lastName && guestInfo.email && guestInfo.phone;
      case 5: return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.nameOnCard;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gradient font-['Orbitron'] mb-4">
              QUANTUM BOOKING
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Reserve your spot in the future. Experience luxury beyond imagination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`flex items-center space-x-4 ${
                    index < steps.length - 1 ? "flex-1" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all duration-300 ${
                    currentStep === step.id 
                      ? "border-blue-400 bg-blue-400/20 text-blue-300 neon-border" 
                      : currentStep > step.id 
                        ? "border-green-400 bg-green-400/20 text-green-300"
                        : "border-white/30 text-white/60"
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className={`font-semibold text-sm ${
                      currentStep >= step.id ? "text-white" : "text-white/60"
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-white/50">{step.description}</div>
                  </div>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-green-400" : "bg-white/20"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Select Room */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Choose Your Quantum Suite
                    </h2>
                    
                    <div className="space-y-6">
                      {rooms.map((room) => (
                        <motion.div
                          key={room.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedRoom(room.id)}
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedRoom === room.id ? "ring-2 ring-blue-400" : ""
                          }`}
                        >
                          <Card className={`glass-morphism hover:bg-white/10 transition-all duration-300 ${
                            selectedRoom === room.id ? "neon-border" : "border-white/20"
                          }`}>
                            <CardContent className="p-6">
                              <div className="grid md:grid-cols-3 gap-6 items-center">
                                <div className="md:col-span-1">
                                  <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                    <Sparkles className="w-16 h-16 text-blue-400 animate-pulse" />
                                  </div>
                                </div>
                                
                                <div className="md:col-span-2 space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-xl font-bold text-white font-['Orbitron'] mb-2">
                                        {room.name}
                                      </h3>
                                      <div className="flex items-center space-x-4 text-sm text-white/60">
                                        <span className="flex items-center space-x-1">
                                          <MapPin className="w-4 h-4" />
                                          <span>{room.size}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                          <Users className="w-4 h-4" />
                                          <span>{room.guests} guests</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                          <Bed className="w-4 h-4" />
                                          <span>{room.beds} bed{room.beds > 1 ? 's' : ''}</span>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-gradient">
                                        R{room.price}
                                      </div>
                                      <div className="text-sm text-white/50 line-through">
                                        R{room.originalPrice}
                                      </div>
                                      <div className="text-xs text-white/60">per night</div>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-white/80">Features:</h4>
                                    <div className="grid md:grid-cols-2 gap-2">
                                      {room.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2 text-sm text-white/60">
                                          <CheckCircle className="w-3 h-3 text-green-400" />
                                          <span>{feature}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex space-x-3">
                                    {room.amenities.map((amenity, index) => (
                                      <div key={index} className="flex items-center space-x-1 text-xs text-blue-400">
                                        <amenity.icon className="w-3 h-3" />
                                        <span>{amenity.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Dates & Guests */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Select Dates & Guests
                    </h2>
                    
                    <Card className="glass-morphism neon-border">
                      <CardContent className="p-8 space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Check-in Date
                            </label>
                            <Input
                              type="date"
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              className="glass-morphism border-white/20 text-white"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Check-out Date
                            </label>
                            <Input
                              type="date"
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              className="glass-morphism border-white/20 text-white"
                              min={checkIn || new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-4">
                            Number of Guests
                          </label>
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setGuests(Math.max(1, guests - 1))}
                              className="cyber-button"
                              disabled={guests <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-2xl font-bold text-white w-16 text-center">
                              {guests}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setGuests(Math.min(selectedRoomData?.guests || 1, guests + 1))}
                              className="cyber-button"
                              disabled={guests >= (selectedRoomData?.guests || 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-white/60 mt-2">
                            Maximum {selectedRoomData?.guests} guests for this room
                          </p>
                        </div>

                        {nights > 0 && (
                          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                            <div className="flex items-center space-x-2 text-blue-300">
                              <Clock className="w-5 h-5" />
                              <span className="font-semibold">
                                {nights} night{nights > 1 ? 's' : ''} stay
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: Add-ons */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Enhance Your Experience
                    </h2>
                    
                    <div className="space-y-4">
                      {addOns.map((addOn) => (
                        <motion.div
                          key={addOn.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => toggleAddOn(addOn.id)}
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedAddOns.includes(addOn.id) ? "ring-2 ring-blue-400" : ""
                          }`}
                        >
                          <Card className={`glass-morphism hover:bg-white/10 transition-all duration-300 ${
                            selectedAddOns.includes(addOn.id) ? "neon-border" : "border-white/20"
                          }`}>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                                    selectedAddOns.includes(addOn.id) 
                                      ? "border-blue-400 bg-blue-400/20" 
                                      : "border-white/30"
                                  }`}>
                                    {selectedAddOns.includes(addOn.id) && (
                                      <CheckCircle className="w-4 h-4 text-blue-400" />
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-white">{addOn.name}</h3>
                                    <p className="text-white/60 text-sm">{addOn.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-gradient">
                                    +R{addOn.price}
                                  </div>
                                  <div className="text-xs text-white/60">{addOn.unit}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
                      <div className="flex items-start space-x-2 text-yellow-300">
                        <Gift className="w-5 h-5 mt-0.5" />
                        <div>
                          <p className="font-semibold">Special Offer</p>
                          <p className="text-sm text-yellow-300/80">
                            Add 3 or more services and get 15% off your add-ons!
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Guest Details */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Guest Information
                    </h2>
                    
                    <Card className="glass-morphism neon-border">
                      <CardContent className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              First Name *
                            </label>
                            <Input
                              value={guestInfo.firstName}
                              onChange={(e) => setGuestInfo(prev => ({...prev, firstName: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="Enter first name"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Last Name *
                            </label>
                            <Input
                              value={guestInfo.lastName}
                              onChange={(e) => setGuestInfo(prev => ({...prev, lastName: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="Enter last name"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              value={guestInfo.email}
                              onChange={(e) => setGuestInfo(prev => ({...prev, email: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Phone Number *
                            </label>
                            <Input
                              type="tel"
                              value={guestInfo.phone}
                              onChange={(e) => setGuestInfo(prev => ({...prev, phone: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">
                            Special Requests
                          </label>
                          <textarea
                            value={guestInfo.specialRequests}
                            onChange={(e) => setGuestInfo(prev => ({...prev, specialRequests: e.target.value}))}
                            className="w-full h-32 rounded-md border border-white/20 bg-transparent px-3 py-2 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                            placeholder="Any special requests or preferences..."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 5: Payment */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-bold text-gradient font-['Orbitron']">
                      Secure Payment
                    </h2>
                    
                    <Card className="glass-morphism neon-border">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex items-center space-x-2 text-green-400 mb-6">
                          <Shield className="w-5 h-5" />
                          <span className="text-sm">Quantum-encrypted secure payment</span>
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">
                            Card Number *
                          </label>
                          <Input
                            value={paymentInfo.cardNumber}
                            onChange={(e) => setPaymentInfo(prev => ({...prev, cardNumber: e.target.value}))}
                            className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Expiry Date *
                            </label>
                            <Input
                              value={paymentInfo.expiryDate}
                              onChange={(e) => setPaymentInfo(prev => ({...prev, expiryDate: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              CVV *
                            </label>
                            <Input
                              value={paymentInfo.cvv}
                              onChange={(e) => setPaymentInfo(prev => ({...prev, cvv: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="123"
                              maxLength={4}
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                              Name on Card *
                            </label>
                            <Input
                              value={paymentInfo.nameOnCard}
                              onChange={(e) => setPaymentInfo(prev => ({...prev, nameOnCard: e.target.value}))}
                              className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                          <div className="flex items-start space-x-2 text-blue-300">
                            <AlertCircle className="w-5 h-5 mt-0.5" />
                            <div>
                              <p className="font-semibold">Payment Security</p>
                              <p className="text-sm text-blue-300/80">
                                Your payment is protected by quantum encryption and biometric verification.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 6: Confirmation */}
                {currentStep === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center space-y-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
                    </motion.div>
                    
                    <h2 className="text-4xl font-bold text-gradient font-['Orbitron']">
                      BOOKING CONFIRMED
                    </h2>
                    
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                      Welcome to the future! Your quantum suite has been reserved. 
                      A confirmation has been sent to your neural implant and email.
                    </p>

                    <Card className="glass-morphism neon-border max-w-md mx-auto">
                      <CardContent className="p-6 space-y-4">
                        <div className="text-center">
                          <div className="text-sm text-white/60">Booking Reference</div>
                          <div className="text-2xl font-bold text-gradient font-mono">
                            QS{Date.now().toString().slice(-6)}
                          </div>
                        </div>
                        <div className="border-t border-white/20 pt-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">Room:</span>
                            <span className="text-white">{selectedRoomData?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Dates:</span>
                            <span className="text-white">{checkIn} to {checkOut}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Guests:</span>
                            <span className="text-white">{guests}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg">
                            <span className="text-white">Total:</span>
                            <span className="text-gradient">R{total.toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="cyber-button">
                        <Mail className="mr-2 h-4 w-4" />
                        View Confirmation
                      </Button>
                      <Button variant="outline" className="cyber-button">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < 6 && (
                <div className="flex justify-between pt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="cyber-button"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  
                  {currentStep === 5 ? (
                    <Button
                      onClick={handleBooking}
                      disabled={!canProceed() || isProcessing}
                      className="cyber-button"
                    >
                      {isProcessing ? (
                        <>
                          <Zap className="mr-2 h-4 w-4 animate-pulse" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Complete Booking
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="cyber-button"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="glass-morphism neon-border">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gradient font-['Orbitron']">
                      Booking Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedRoomData && (
                      <div>
                        <h3 className="font-semibold text-white mb-2">{selectedRoomData.name}</h3>
                        <div className="text-sm space-y-1 text-white/60">
                          <div>Size: {selectedRoomData.size}</div>
                          <div>Guests: {guests}</div>
                          {nights > 0 && <div>Nights: {nights}</div>}
                        </div>
                      </div>
                    )}

                    {checkIn && checkOut && (
                      <div className="border-t border-white/20 pt-4">
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white/60">Check-in:</span>
                            <span className="text-white">{checkIn}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Check-out:</span>
                            <span className="text-white">{checkOut}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedAddOns.length > 0 && (
                      <div className="border-t border-white/20 pt-4">
                        <h4 className="font-semibold text-white mb-2">Add-ons:</h4>
                        <div className="space-y-2 text-sm">
                          {selectedAddOns.map(addOnId => {
                            const addOn = addOns.find(a => a.id === addOnId);
                            return addOn ? (
                              <div key={addOnId} className="flex justify-between text-white/80">
                                <span>{addOn.name}</span>
                                <span>R{addOn.price}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {roomTotal > 0 && (
                      <div className="border-t border-white/20 pt-4 space-y-2 text-sm">
                        <div className="flex justify-between text-white/80">
                          <span>Room ({nights} night{nights > 1 ? 's' : ''})</span>
                          <span>R{roomTotal.toFixed(2)}</span>
                        </div>
                        {addOnTotal > 0 && (
                          <div className="flex justify-between text-white/80">
                            <span>Add-ons</span>
                            <span>R{addOnTotal.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-white/80">
                          <span>Taxes & Fees</span>
                          <span>R{taxes.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-white/20 pt-2 flex justify-between text-lg font-bold">
                          <span className="text-white">Total</span>
                          <span className="text-gradient">R{total.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {currentStep < 6 && (
                      <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-blue-300 text-sm">
                          <Shield className="w-4 h-4" />
                          <span>Free cancellation until 24 hours before check-in</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookingPage() {
  // Wrap the content in Suspense so hooks like useSearchParams are allowed
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center text-white/70">Loading booking…</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
