import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69968e273c35546c21525210/b8bc91192_transparentlogo.png";

const NAV_LINKS = ["Projects", "About", "Contact"];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-7 border-b border-black/5">
        <Link to={createPageUrl("Home")} className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Lotus Brothers" className="w-8 h-8 object-contain" style={{ filter: "brightness(0)" }} />
          <span className="text-[#0F1E2E] text-sm font-light tracking-[0.18em] uppercase">Lotus Brothers</span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(page => (
            <Link key={page} to={createPageUrl(page)} className="text-[#0F1E2E]/40 text-xs tracking-[0.22em] uppercase font-light hover:text-[#0F1E2E] transition-colors duration-300">
              {page}
            </Link>
          ))}
          <Link to={createPageUrl("Contact")} className="ml-2 px-5 py-2.5 bg-[#0F1E2E] text-white text-[10px] tracking-[0.25em] uppercase font-light hover:bg-[#1a2e42] transition-colors">
            Inquire
          </Link>
        </div>
      </nav>

      {/* Hero body */}
      <div className="flex-1 grid md:grid-cols-2 gap-0">
        {/* Left — text */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-[#C4A97D]" />
              <span className="text-[#C4A97D] text-[10px] tracking-[0.4em] uppercase font-light">Residential Development</span>
            </div>

            <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-thin text-[#0F1E2E] leading-[1.0] tracking-[-0.03em]">
              Homes built<br />
              <span className="font-extralight italic">for living.</span>
            </h1>

            <p className="mt-8 text-[#0F1E2E]/45 font-light text-base md:text-lg leading-relaxed max-w-sm">
              We design and develop residential properties that balance beauty, function, and lasting quality — spaces where life unfolds naturally.
            </p>

            <div className="mt-12 flex items-center gap-6">
              <Link
                to={createPageUrl("Projects")}
                className="flex items-center gap-3 bg-[#0F1E2E] text-white text-xs tracking-[0.25em] uppercase font-light px-8 py-4 hover:bg-[#1a2e42] transition-colors group"
              >
                View Projects
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={createPageUrl("About")}
                className="text-[#0F1E2E]/40 text-xs tracking-[0.25em] uppercase font-light hover:text-[#0F1E2E] transition-colors"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right — image collage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative bg-[#F7F6F4] overflow-hidden min-h-[60vw] md:min-h-0"
        >
          {/* Main image */}
          <img
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=90"
            alt="Modern residential home"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-white/5" />

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-8 bg-white p-6 shadow-xl max-w-[200px]"
          >
            <div className="text-3xl font-thin text-[#0F1E2E]">48+</div>
            <div className="text-[#0F1E2E]/40 text-[10px] tracking-[0.3em] uppercase font-light mt-1">Homes Delivered</div>
            <div className="mt-4 w-full h-px bg-[#0F1E2E]/8" />
            <div className="text-2xl font-thin text-[#0F1E2E] mt-4">12</div>
            <div className="text-[#0F1E2E]/40 text-[10px] tracking-[0.3em] uppercase font-light mt-1">Years Experience</div>
          </motion.div>

          {/* Label tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute top-8 right-8 bg-[#C4A97D] text-white text-[9px] tracking-[0.35em] uppercase font-light px-4 py-2"
          >
            Austin, TX
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}