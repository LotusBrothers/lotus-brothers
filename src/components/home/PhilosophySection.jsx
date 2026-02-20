import React from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "Thoughtful Design",
    description: "Every home begins with a deep understanding of how people actually live — light, flow, and space considered from the first sketch.",
  },
  {
    number: "02",
    title: "Quality Materials",
    description: "We source enduring materials that age gracefully. No shortcuts. Every finish, fixture, and surface is chosen with intention.",
  },
  {
    number: "03",
    title: "Community First",
    description: "Our developments integrate with their neighbourhoods — respecting context, adding value, and building communities that last.",
  },
];

export default function PhilosophySection() {
  return (
    <section className="bg-white py-28 px-8 md:px-16 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#C4A97D]" />
              <span className="text-[#C4A97D] text-[10px] tracking-[0.4em] uppercase font-light">Our Approach</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-thin text-[#0F1E2E] leading-tight tracking-tight">
              Built with<br /><span className="italic font-extralight">purpose.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex items-end"
          >
            <p className="text-[#0F1E2E]/45 font-light leading-relaxed text-lg">
              Lotus Brothers was founded on the belief that residential development should enrich lives — not just provide shelter.
            </p>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-black/8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="py-10 pr-12 border-b md:border-b-0 md:border-r border-black/8 last:border-r-0 group"
            >
              <span className="text-[#C4A97D] text-xs font-light tracking-[0.3em]">{p.number}</span>
              <h3 className="mt-4 text-xl font-light text-[#0F1E2E] tracking-tight">{p.title}</h3>
              <p className="mt-4 text-[#0F1E2E]/40 font-light text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}