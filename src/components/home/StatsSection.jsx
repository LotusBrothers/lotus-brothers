import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "12+", label: "Years of Excellence" },
  { value: "48", label: "Projects Delivered" },
  { value: "2.4M", label: "Sq Ft Developed" },
  { value: "6", label: "Cities & Growing" }
];

export default function StatsSection() {
  return (
    <section className="bg-[#0F1E2E] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center py-6"
            >
              <div className="text-4xl md:text-5xl font-extralight text-[#C4A97D] tracking-tight">
                {stat.value}
              </div>
              <div className="mt-3 text-white/35 text-xs tracking-[0.2em] uppercase font-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}