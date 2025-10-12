"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

// WhatsApp number
const WHATSAPP_E164 = "+27603114115";

export default function FloatingActions() {
  return (
    <motion.div
      className="fixed right-5 bottom-6 z-50 select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.a
        href={`https://wa.me/${WHATSAPP_E164.replace("+", "")}?text=Hi%20Glenanda%20Hotel%2C%20I'd%20like%20to%20make%20an%20inquiry.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center gap-3 pl-3 pr-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_14px_40px_rgba(16,185,129,0.35)] hover:shadow-[0_18px_50px_rgba(16,185,129,0.45)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.03 }}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
          <MessageCircle className="h-5 w-5 text-white" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-xs uppercase tracking-[0.32em] text-emerald-100/85">Whatsapp</span>
          <span className="text-sm font-semibold">Chat with us</span>
        </div>

        <span className="absolute -inset-1 rounded-full bg-emerald-400/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      </motion.a>
    </motion.div>
  );
}
