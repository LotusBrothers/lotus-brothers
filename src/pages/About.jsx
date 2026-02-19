import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Leaf, Building2, Users, Shield } from "lucide-react";
import FooterSection from "@/components/home/FooterSection";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69856e2bed8858906fe3acb2/0e454fe17_LotusBlue0F1E2E.png";

const team = [
  { name: "Marcus Chen", role: "Co-Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "David Chen", role: "Co-Founder & COO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Elena Rodriguez", role: "Head of Design", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  { name: "James Park", role: "Director of Development", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80" }
];

const values = [
  { icon: Leaf, title: "Sustainability", desc: "Every project is designed with environmental responsibility at its core." },
  { icon: Building2, title: "Innovation", desc: "We push boundaries with smart technology and forward-thinking design." },
  { icon: Users, title: "Community", desc: "Our spaces are built to foster connection and enhance quality of life." },
  { icon: Shield, title: "Integrity", desc: "Transparent partnerships and uncompromising quality in everything we do." }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0F1E2E] py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Lotus Brothers" className="w-8 h-8 rounded-md object-cover" />
            <span className="text-white font-light tracking-wider">Lotus Brothers</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            {["Home", "Projects", "About", "Contact"].map(page => (
              <Link key={page} to={createPageUrl(page)} className="text-white/50 text-sm font-light tracking-wider hover:text-[#C4A97D] transition-colors">
                {page}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-[#0F1E2E] pt-16 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1E2E]/70 to-[#0F1E2E]" />
        <div className="relative max-w-7xl mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-white/30 text-sm font-light mb-8 hover:text-[#C4A97D] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            About <span className="italic font-light text-[#C4A97D]">Us</span>
          </motion.h1>
        </div>
      </div>

      {/* Story */}
      <div className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid md:grid-cols-5 gap-12"
          >
            <div className="md:col-span-2">
              <span className="text-[#C4A97D] text-xs tracking-[0.3em] uppercase font-light">Our Story</span>
              <h2 className="mt-4 text-3xl font-extralight text-[#0F1E2E] tracking-tight">
                Rooted in <span className="italic font-light">balance</span>
              </h2>
            </div>
            <div className="md:col-span-3 space-y-6">
              <p className="text-[#0F1E2E]/55 font-light leading-relaxed">
                Founded by brothers Marcus and David Chen, Lotus Brothers was born from a shared belief that real estate development should harmonize profit with purpose. Inspired by the lotus flower — a symbol of purity, growth, and resilience — we build spaces that rise above the ordinary.
              </p>
              <p className="text-[#0F1E2E]/55 font-light leading-relaxed">
                From our first project in Austin to developments across six cities, we've stayed true to our founding vision: creating environments where people thrive. We integrate biophilic design, sustainable technology, and mindful architecture into every development.
              </p>
              <p className="text-[#0F1E2E]/55 font-light leading-relaxed">
                Today, Lotus Brothers is recognized as a leader in conscious development — proving that you don't have to choose between beautiful design, sustainable practice, and smart investment.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[#FAFAF8] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#C4A97D] text-xs tracking-[0.3em] uppercase font-light">Core Values</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extralight text-[#0F1E2E] tracking-tight">
              What drives <span className="italic font-light">us</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#0F1E2E]/5 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-[#C4A97D]" />
                </div>
                <h3 className="text-lg font-light text-[#0F1E2E] tracking-wide">{v.title}</h3>
                <p className="mt-3 text-[#0F1E2E]/40 text-sm font-light leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[#C4A97D] text-xs tracking-[0.3em] uppercase font-light">Leadership</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extralight text-[#0F1E2E] tracking-tight">
              Our <span className="italic font-light">team</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="text-[#0F1E2E] font-light tracking-wide">{member.name}</h3>
                <p className="text-[#0F1E2E]/40 text-sm font-light mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}