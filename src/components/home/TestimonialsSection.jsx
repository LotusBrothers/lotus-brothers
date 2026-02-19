import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { ChevronLeft, ChevronRight } from "lucide-react";

const fallbackTestimonials = [
  {
    id: "1",
    client_name: "Marcus Chen",
    company: "Vantage Capital Group",
    quote: "Lotus Brothers brought a rare combination of architectural vision and execution discipline. The Meridian project exceeded our investment thesis in every metric — occupancy, design awards, and community reception.",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
  },
  {
    id: "2",
    client_name: "Priya Nair",
    company: "Sage Ventures",
    quote: "Working with the Lotus Brothers team felt like a true creative partnership. They listened deeply to our sustainability goals and delivered a campus that genuinely reflects our company's values.",
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
  },
  {
    id: "3",
    client_name: "James Whitmore",
    company: "Whitmore Family Office",
    quote: "The attention to detail in Cedar Park Villas is extraordinary. Every material, every sight line — it all feels considered. This is what luxury real estate should feel like.",
    photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => base44.entities.Testimonial.list("order"),
    initialData: []
  });

  const items = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const total = items.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  return (
    <section className="bg-[#0F1E2E] py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div>
            <span className="text-[#C4A97D] text-xs tracking-[0.3em] uppercase font-light">
              Client Stories
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extralight text-white tracking-tight">
              Voices of <span className="italic font-light text-[#C4A97D]">trust</span>
            </h2>
          </div>

          {/* Nav controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C4A97D]/50 hover:text-[#C4A97D] transition-all duration-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white/20 text-xs tracking-widest font-light">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C4A97D]/50 hover:text-[#C4A97D] transition-all duration-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-5 gap-12 items-start"
          >
            {/* Quote */}
            <div className="md:col-span-3">
              {/* Large decorative quote mark */}
              <div className="text-[#C4A97D]/15 text-[120px] font-serif leading-none select-none -mb-8 -ml-2">"</div>
              <p className="text-white/70 text-xl md:text-2xl font-extralight leading-relaxed tracking-wide">
                {items[current].quote}
              </p>
            </div>

            {/* Author */}
            <div className="md:col-span-2 flex flex-col justify-between h-full pt-4 md:pt-16">
              <div className="flex items-center gap-5">
                {items[current].photo_url ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <img
                      src={items[current].photo_url}
                      alt={items[current].client_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#C4A97D] text-xl font-extralight">
                      {items[current].client_name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-white font-light tracking-wide">{items[current].client_name}</p>
                  {items[current].company && (
                    <p className="text-white/30 text-sm font-light mt-0.5">{items[current].company}</p>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-12 flex gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-px transition-all duration-500 ${
                      i === current ? "bg-[#C4A97D] flex-[2]" : "bg-white/15 flex-1"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}