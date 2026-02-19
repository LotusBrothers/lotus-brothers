import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69856e2bed8858906fe3acb2/0e454fe17_LotusBlue0F1E2E.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#080E16]">

      {/* Full-bleed background image — high-end architectural photo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2000&q=90"
          alt="Modern architecture"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080E16]/95 via-[#080E16]/60 to-[#080E16]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080E16] via-transparent to-[#080E16]/30" />
        {/* Warm vignette */}
        <div className="absolute inset-0" style={{background: "radial-gradient(ellipse at 70% 50%, transparent 30%, rgba(8,14,22,0.7) 100%)"}} />
      </div>

      {/* Thin horizontal accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4A97D]/30 to-transparent" />

      {/* Navbar area */}
      <div className="relative z-20 flex items-center justify-between px-8 md:px-16 pt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3"
        >
          <img src={LOGO_URL} alt="Lotus Brothers" className="w-9 h-9 object-cover" style={{filter: "brightness(0) invert(1)"}} />
          <span className="text-white/80 text-sm tracking-[0.2em] uppercase font-light hidden sm:block">Lotus Brothers</span>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:flex items-center gap-10"
        >
          {["Projects", "About", "Contact"].map(page => (
            <a
              key={page}
              href={`#${page.toLowerCase()}`}
              className="text-white/40 text-xs tracking-[0.25em] uppercase font-light hover:text-[#C4A97D] transition-colors duration-500"
            >
              {page}
            </a>
          ))}
        </motion.nav>
      </div>

      {/* Main hero content — left-aligned for luxury editorial feel */}
      <div className="relative z-10 flex-1 flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-8 h-px bg-[#C4A97D]" />
            <span className="text-[#C4A97D] text-[10px] tracking-[0.45em] uppercase font-light">
              Real Estate Development
            </span>
          </motion.div>

          {/* Main headline — serif-feel through weight contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(3.5rem,9vw,8rem)] font-thin text-white leading-[0.95] tracking-[-0.02em]"
          >
            Lotus
            <br />
            <span className="font-extralight" style={{ WebkitTextStroke: "1px rgba(196,169,125,0.6)", color: "transparent" }}>
              Brothers
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mt-8 text-white/40 text-base md:text-lg font-extralight tracking-wide leading-relaxed max-w-md"
          >
            Where stillness meets structure. We craft spaces of enduring beauty, rooted in intention.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-12 flex items-center gap-8"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-[#C4A97D] text-[#080E16] text-xs tracking-[0.3em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[#D4B98D]"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="text-white/35 text-xs tracking-[0.3em] uppercase font-light hover:text-[#C4A97D] transition-colors duration-500 flex items-center gap-3"
            >
              <span>Get in Touch</span>
              <svg width="20" height="1" viewBox="0 0 20 1" className="overflow-visible">
                <line x1="0" y1="0.5" x2="20" y2="0.5" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar with stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="relative z-10 border-t border-white/[0.06] grid grid-cols-3 divide-x divide-white/[0.06]"
      >
        {[
          { value: "48", label: "Projects" },
          { value: "2.4M", label: "Sq Ft Built" },
          { value: "12+", label: "Years" }
        ].map(stat => (
          <div key={stat.label} className="py-6 px-8 md:px-12 text-center">
            <div className="text-white text-xl md:text-2xl font-extralight tracking-wide">{stat.value}</div>
            <div className="text-white/25 text-[10px] tracking-[0.3em] uppercase mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Thin bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4A97D]/20 to-transparent" />
    </section>
  );
}