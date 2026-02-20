import React from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "Bespoke Architecture",
    description: "Every residence begins as a blank canvas — proportions, light, and material chosen for the unique landscape and the lives that will unfold within.",
  },
  {
    number: "02",
    title: "Enduring Materials",
    description: "We select stone, timber, and steel that improve with time. No veneer, no compromise — only surfaces that grow more beautiful over decades.",
  },
  {
    number: "03",
    title: "Living in Harmony",
    description: "Our homes integrate with nature, neighbourhood, and community — creating places of quiet belonging that feel inevitable from the first day.",
  },
];

export default function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-[#0F1E2E] py-32 px-8 md:px-16">

      {/* Decorative background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Two-column header */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-6 h-px bg-[#C4A97D]" />
              <span className="text-[#C4A97D] text-[10px] tracking-[0.45em] uppercase font-light">Our Philosophy</span>
            </div>
            <h2 className="text-4xl md:text-[3.5rem] font-thin text-white leading-tight tracking-tight">
              Crafted for<br />
              <span className="italic font-extralight text-white/60">a quiet life.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex items-end"
          >
            <p className="text-white/35 font-light leading-relaxed text-lg max-w-sm">
              Lotus Brothers was founded on a simple belief — that where you live shapes how you feel. Every decision we make flows from that conviction.
            </p>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="border-t border-white/8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="grid md:grid-cols-12 gap-8 py-10 border-b border-white/8 group hover:border-[#C4A97D]/20 transition-colors"
            >
              <div className="md:col-span-1">
                <span className="text-[#C4A97D]/60 text-xs font-light tracking-[0.3em]">{p.number}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-light text-white tracking-tight">{p.title}</h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-white/35 font-light text-sm leading-relaxed">{p.description}</p>
              </div>
              <div className="md:col-span-1 flex justify-end items-center">
                <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C4A97D]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Side image accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-20 relative overflow-hidden h-72 md:h-96"
        >
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1800&q=85"
            alt="Interior detail"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E2E] via-transparent to-[#0F1E2E]" />
          <div className="absolute inset-0 bg-[#0F1E2E]/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <blockquote className="text-center max-w-lg px-8">
              <p className="text-white/70 text-xl md:text-2xl font-thin italic leading-relaxed tracking-wide">
                "A home should feel like an exhale."
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="w-6 h-px bg-[#C4A97D]/50" />
                <span className="text-[#C4A97D]/60 text-[10px] tracking-[0.35em] uppercase font-light">Lotus Brothers</span>
                <div className="w-6 h-px bg-[#C4A97D]/50" />
              </div>
            </blockquote>
          </div>
        </motion.div>

      </div>
    </section>
  );
}