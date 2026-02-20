import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronDown } from "lucide-react";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69968e273c35546c21525210/b8bc91192_transparentlogo.png";

const SLIDES = [
{
  image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2400&q=90",
  position: "center 40%",
  label: "The Meridian · Austin, TX",
  tag: "Luxury Residences"
},
{
  image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=2400&q=90",
  position: "center 30%",
  label: "Cedar Park Villas · Austin, TX",
  tag: "Private Estates"
},
{
  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2400&q=90",
  position: "center 50%",
  label: "Harmony Residences · Portland, OR",
  tag: "Urban Living"
},
{
  image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=90",
  position: "center 35%",
  label: "Oasis Estate · Scottsdale, AZ",
  tag: "Desert Sanctuary"
}];


const NAV_LINKS = ["Projects", "About", "Contact"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const duration = 5000;
    const interval = 50;
    let elapsed = 0;

    const ticker = setInterval(() => {
      elapsed += interval;
      setProgress(elapsed / duration * 100);
      if (elapsed >= duration) {
        setCurrent((c) => (c + 1) % SLIDES.length);
        elapsed = 0;
        setProgress(0);
      }
    }, interval);

    return () => clearInterval(ticker);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-[#080E16]">

      {/* Slide images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0">

          <img
            src={slide.image}
            alt={slide.label}
            className="w-full h-full object-cover"
            style={{ objectPosition: slide.position }} />

        </motion.div>
      </AnimatePresence>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080E16]/90 via-[#080E16]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080E16]/80 via-transparent to-[#080E16]/20" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4A97D]/30 to-transparent" />

      {/* ── Navigation ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8">
        <Link to={createPageUrl("Home")} className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Lotus Brothers" className="w-9 h-9 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
          <span className="text-white/70 text-sm font-light tracking-[0.22em] uppercase hidden sm:block">Lotus Brothers</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((page) =>
          <Link
            key={page}
            to={createPageUrl(page)}
            className="text-white/40 text-[11px] tracking-[0.28em] uppercase font-light hover:text-white transition-colors duration-400">

              {page}
            </Link>
          )}
          <Link
            to={createPageUrl("Contact")}
            className="ml-2 border border-white/20 text-white/60 text-[10px] tracking-[0.25em] uppercase font-light px-5 py-2.5 hover:border-[#C4A97D] hover:text-[#C4A97D] transition-all duration-400">

            Inquire
          </Link>
        </nav>
      </div>

      {/* ── Hero Content ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${current}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-10">

              <div className="w-8 h-px bg-[#C4A97D]" />
              <span className="text-[#C4A97D] text-[10px] tracking-[0.45em] uppercase font-light">{slide.tag}</span>
            </motion.div>
          </AnimatePresence>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[clamp(2.6rem,7vw,7.5rem)] font-thin text-white leading-[0.95] tracking-[-0.025em]">

            Where<br />
            <span
              className="font-extralight italic"
              style={{ WebkitTextStroke: "1px rgba(196,169,125,0.55)", color: "transparent" }}>

              Excellence
            </span>
            <br />
            <span className="font-thin">Blooms.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }} className="text-slate-50 mt-8 text-base font-extralight tracking-wide leading-relaxed md:text-lg max-w-md">


            Luxury residential developments crafted for those who appreciate beauty, silence, and space.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="mt-12 flex items-center gap-8">

            <Link
              to={createPageUrl("Projects")}
              className="bg-[#C4A97D] text-[#080E16] text-[11px] tracking-[0.3em] uppercase font-medium px-8 py-4 hover:bg-[#d4b98d] transition-colors duration-400">

              Explore Homes
            </Link>
            <Link
              to={createPageUrl("Contact")}
              className="text-white/35 text-[11px] tracking-[0.3em] uppercase font-light hover:text-[#C4A97D] transition-colors duration-400 flex items-center gap-3">

              Get in Touch
              <span className="inline-block w-8 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Slide Controls ── */}
      <div className="absolute bottom-24 left-8 md:left-16 z-20 flex items-center gap-4">
        {SLIDES.map((s, i) =>
        <button
          key={i}
          onClick={() => setCurrent(i)}
          className="group relative flex items-center">

            <div className={`h-px transition-all duration-500 ${i === current ? "w-10 bg-[#C4A97D]" : "w-4 bg-white/25 hover:bg-white/50"}`} />
            {i === current &&
          <div
            className="absolute top-0 left-0 h-px bg-[#C4A97D]/40 transition-all"
            style={{ width: `${progress / 100 * 40}px` }} />

          }
          </button>
        )}
        <AnimatePresence mode="wait">
          <motion.span
            key={`label-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-3 text-white/30 text-[10px] tracking-[0.25em] uppercase font-light">

            {slide.label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Bottom Stats Bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.07] grid grid-cols-3 divide-x divide-white/[0.07]">

        {[
        { value: "48+", label: "Homes Delivered" },
        { value: "2.4M", label: "Sq Ft Built" },
        { value: "12 Yrs", label: "Of Excellence" }].
        map((stat) =>
        <div key={stat.label} className="py-5 px-8 md:px-14 text-center">
            <div className="text-white text-xl md:text-2xl font-extralight tracking-wide">{stat.value}</div>
            <div className="text-white/22 text-[9px] tracking-[0.32em] uppercase mt-1 font-light">{stat.label}</div>
          </div>
        )}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-24 right-8 md:right-16 z-20 flex flex-col items-center gap-2">

        <ChevronDown className="w-4 h-4 text-white/20 animate-bounce" />
      </motion.div>
    </section>);

}