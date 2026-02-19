import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69856e2bed8858906fe3acb2/0e454fe17_LotusBlue0F1E2E.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F1E2E]">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Modern architecture"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1E2E]/60 via-[#0F1E2E]/40 to-[#0F1E2E]" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img 
            src={LOGO_URL} 
            alt="Lotus Brothers" 
            className="w-20 h-20 mx-auto mb-10 rounded-xl object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#C4A97D]/40" />
            <span className="text-[#C4A97D] text-xs tracking-[0.35em] uppercase font-light">
              Real Estate Development
            </span>
            <div className="h-px w-12 bg-[#C4A97D]/40" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight leading-[1.05]"
        >
          Lotus
          <span className="block font-light text-[#C4A97D]">Brothers</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="mt-8 text-white/50 text-lg md:text-xl font-extralight tracking-wide max-w-2xl mx-auto leading-relaxed"
        >
          Where mindful design meets modern living.
          <br className="hidden md:block" />
          Building spaces that breathe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-14 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#projects"
            className="px-8 py-3.5 bg-[#C4A97D] text-[#0F1E2E] text-sm tracking-widest uppercase font-medium hover:bg-[#D4B98D] transition-all duration-500 rounded-none"
          >
            Our Projects
          </a>
          <a 
            href="#contact"
            className="px-8 py-3.5 border border-white/20 text-white/70 text-sm tracking-widest uppercase font-light hover:border-[#C4A97D]/50 hover:text-[#C4A97D] transition-all duration-500 rounded-none"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}