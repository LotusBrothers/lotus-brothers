import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "48", label: "Homes Built", detail: "Across 6 states" },
  { value: "2.4M", label: "Square Feet", detail: "Residential space" },
  { value: "12+", label: "Years", detail: "In the industry" },
  { value: "98%", label: "Client Satisfaction", detail: "Post-move-in survey" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#0F1E2E] py-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="px-8 py-10 first:pl-0"
            >
              <div className="text-4xl md:text-5xl font-thin text-white tracking-tight">{s.value}</div>
              <div className="mt-3 text-[#C4A97D] text-xs tracking-[0.25em] uppercase font-light">{s.label}</div>
              <div className="mt-1 text-white/25 text-xs font-light">{s.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}