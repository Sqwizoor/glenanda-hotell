"use client";

import { useState } from "react";
import type { SVGProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";

// Update these to your preferred numbers
const PHONE_E164 = "+27727389214"; // South Africa +27
const WHATSAPP_E164 = "+27727389214";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {/* Green circular background */}
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      {/* White WhatsApp glyph */}
      <path
        fill="#ffffff"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.768.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.672-1.617-.922-2.221-.242-.58-.487-.5-.672-.51-.173-.01-.372-.012-.571-.012-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.123-.272-.198-.57-.347m-5.421 5.451h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.519-5.269c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.897a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.878 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.935L0 24l6.305-1.654a11.86 11.86 0 0 0 5.694 1.448h.005c6.554 0 11.89-5.336 11.893-11.893a11.82 11.82 0 0 0-3.49-8.413Z"
      />
    </svg>
  );

  const items = [
    {
      id: "wa",
      href: `https://wa.me/${WHATSAPP_E164.replace("+", "")}`,
      label: "WhatsApp",
      color: "",
      Icon: WhatsAppIcon,
      target: "_blank" as const,
    },
    {
      id: "call",
      href: `tel:${PHONE_E164}`,
      label: "Call Us",
      color: "",
      Icon: Phone,
      target: undefined,
    },
  ];

  return (
    <div className="fixed right-5 bottom-6 z-50 select-none">
  {/* Expanded actions */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
    className="mb-3 flex flex-col items-end gap-3"
          >
            {items.map(({ id, href, label, color, Icon, target }) => (
              <motion.a
                key={id}
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="group transition-transform p-2 flex items-center justify-center text-emerald-600 hover:text-emerald-700 focus:outline-none"
        whileHover={{ y: -2, scale: 1.12 }}
                onClick={() => setOpen(false)}
              >
        <Icon className="w-6 h-6" />
        <span className="sr-only">{label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        onClick={() => setOpen((v) => !v)}
        className="relative w-14 h-14 rounded-full bg-emerald-600 text-white shadow-xl hover:shadow-2xl flex items-center justify-center"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          key={open ? "x" : "dots"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {open ? (
            <X className="w-6 h-6" />
          ) : (
            // Three pulsing dots look
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse [animation-delay:300ms]" />
            </div>
          )}
        </motion.div>
        {/* subtle ring */}
        <span className="absolute inset-0 rounded-full ring-2 ring-white/20" />
      </motion.button>
    </div>
  );
}
