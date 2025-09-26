"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Leaf, Sparkles, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const treatments = [
  {
    title: "MediBright Skin Peel",
    summary:
      "Advanced brightening skin peel rich in Kojic and Lactic acids to control and prevent melanin production.",
    bullets: [
      "Addresses hyperpigmentation",
      "Helps post-acne scarring",
      "Improves signs of ageing",
    ],
  },
  {
    title: "Algae Peel",
    summary:
      "Seaweed powder with natural micro-needles stimulates collagen production and accelerates cellular renewal.",
    bullets: [
      "Targets acne of all grades",
      "Reduces post-acne scarring",
      "Improves hyperpigmentation & melasma",
      "Softens fine lines, wrinkles & pore size",
      "Reduces dark circles and boosts circulation",
      "Repairs microscopic injuries and resurfaces",
    ],
  },
  {
    title: "Dermaplaning",
    summary:
      "Gently removes dead skin cell layers for smoother, softer, brighter skin and improves product penetration.",
    bullets: [
      "Reveals healthy glowing skin",
      "Primes skin for peels & lasers",
      "Enhances treatment effectiveness",
    ],
  },
];

export default function TreatmentsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-orbitron font-extrabold text-gray-900"
          >
            Treatments designed for real results
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Simple, effective, and backed by science. Explore our signature peels and skin therapies tailored to your goals.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="rounded-2xl border border-gray-200 shadow-sm p-6 bg-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="h-5 w-5 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{item.summary}</p>
              <ul className="space-y-2">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <Button className="bg-green-500 hover:bg-green-600">Book consultation</Button>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">Learn more</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Before & After gallery */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold text-gray-900 text-center mb-10"
          >
            Real results, real confidence
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-green-600">
                  <span className="text-sm">Before / After</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">Visible improvement after 2–4 sessions.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="py-12 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {["Free consultations","Personalized treatment plans","Visible improvements from first sessions"].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-white border border-gray-200 p-5 flex items-start gap-3"
            >
              <Sparkles className="h-5 w-5 text-green-500" />
              <p className="text-gray-700">{t}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold text-gray-900 text-center"
          >
            Frequently asked questions
          </motion.h2>
          <div className="mt-8 space-y-4">
            {[{
              q: "How many sessions will I need?",
              a: "Most clients see noticeable results within 2–4 sessions, depending on skin goals and concerns.",
            },{
              q: "Is there downtime?",
              a: "Treatments are minimally invasive with little to no downtime. You can usually resume normal activities the same day.",
            },{
              q: "Are consultations free?",
              a: "Yes. We offer free consultations to assess your skin and recommend the best plan.",
            }].map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-gray-200 rounded-xl p-5 bg-white"
              >
                <p className="font-medium text-gray-900">{f.q}</p>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold text-gray-900"
          >
            Book your free consultation
          </motion.h2>
          <p className="mt-3 text-gray-600">Contact: <span className="font-semibold">072 7389 214</span> or <span className="font-semibold">bookings@mediglowaesthetics.co.za</span></p>
          <div className="mt-6 flex justify-center gap-4">
            <Button className="bg-green-500 hover:bg-green-600"><Phone className="mr-2 h-4 w-4"/>Call now</Button>
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50"><Mail className="mr-2 h-4 w-4"/>Email us</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
