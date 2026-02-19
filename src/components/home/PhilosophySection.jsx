import React from "react";
import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    title: "Mindful Design",
    description: "Every space we create begins with intention. We design environments that nurture well-being and elevate the human experience."
  },
  {
    number: "02",
    title: "Sustainable Vision",
    description: "We build for the future — integrating green technology, natural materials, and energy-conscious systems into every project."
  },
  {
    number: "03",
    title: "Precision Craft",
    description: "From concept to completion, we hold ourselves to the highest standards of quality, detail, and architectural integrity."
  }
];

export default function PhilosophySection() {
  return (
    <section className="bg-[#FAFAF8] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-[#C4A97D] text-xs tracking-[0.3em] uppercase font-light">
            Our Philosophy
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl font-extralight text-[#0F1E2E] tracking-tight">
            Building with <span className="italic font-light">purpose</span>
          </h2>
          <p className="mt-6 text-[#0F1E2E]/50 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            We believe great spaces are born from the harmony of aesthetics, function, and sustainability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-0 md:gap-0">
          {values.map((value, index) => (
            <motion.div
              key={value.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative p-10 md:p-12 group"
            >
              {index < values.length - 1 && (
                <div className="hidden md:block absolute right-0 top-12 bottom-12 w-px bg-[#0F1E2E]/10" />
              )}
              <span className="text-[#C4A97D]/60 text-sm tracking-widest font-light">
                {value.number}
              </span>
              <h3 className="mt-4 text-xl font-light text-[#0F1E2E] tracking-wide">
                {value.title}
              </h3>
              <p className="mt-4 text-[#0F1E2E]/45 font-light leading-relaxed text-sm">
                {value.description}
              </p>
              <div className="mt-6 h-px w-8 bg-[#C4A97D]/30 group-hover:w-16 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}