import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, TrendingUp, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import InvestModal from "@/components/invest/InvestModal";

const PORTFOLIO_STATS = [
  { value: "$48.2M", label: "Total Capital Raised", icon: DollarSign },
  { value: "22.4%", label: "Avg. Projected IRR", icon: TrendingUp },
  { value: "312", label: "Accredited Investors", icon: Users },
];

const fallbackProjects = [
  {
    id: "1",
    title: "The Meridian",
    location: "Dallas, TX",
    image_url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=90",
    year: "2025",
    square_footage: "185,000",
    description: "120-unit luxury high-rise featuring floor-to-ceiling glass, rooftop gardens, and panoramic city views in Uptown Dallas.",
    beds: "2–4",
    status: "in_progress",
    raise: "$18.5M",
    roi: 24,
    target_roi: 28,
    raise_pct: 82,
    hold_period: "5 yrs",
    asset_type: "Multi-Family",
  },
  {
    id: "2",
    title: "Lotus Villas",
    location: "Dallas, TX",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=90",
    year: "2024",
    square_footage: "72,000",
    description: "24 bespoke single-family villas in North Dallas with private courtyards, meditation gardens, and resort-grade finishes.",
    beds: "3–5",
    status: "completed",
    raise: "$12.4M",
    roi: 21,
    target_roi: 21,
    raise_pct: 100,
    hold_period: "3 yrs",
    asset_type: "Single Family",
  },
  {
    id: "3",
    title: "Biscayne Residences",
    location: "Miami, FL",
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=90",
    year: "2025",
    square_footage: "95,000",
    description: "Waterfront tower on Biscayne Bay with private marina access, infinity pool, and curated wellness amenities.",
    beds: "4–6",
    status: "in_progress",
    raise: "$17.3M",
    roi: 22,
    target_roi: 26,
    raise_pct: 66,
    hold_period: "5 yrs",
    asset_type: "Luxury Condo",
  },
];

const STATUS_CONFIG = {
  completed: { label: "Fully Funded", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  in_progress: { label: "Raising Now", color: "bg-[#C4A97D]/15 text-[#C4A97D] border-[#C4A97D]/25" },
  planning: { label: "Pre-Launch", color: "bg-white/10 text-white/50 border-white/15" },
};

function ROIBar({ current, target, pct }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="mt-5 pt-5 border-t border-[#0F1E2E]/8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#0F1E2E]/35 font-light">Projected ROI</span>
        <span className="text-[#C4A97D] text-sm font-light">{current}% <span className="text-[#0F1E2E]/25 text-xs">/ {target}% target</span></span>
      </div>
      <div
        className="relative h-1.5 bg-[#0F1E2E]/8 rounded-full overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C4A97D]/60 to-[#C4A97D] rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${(current / target) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        />
        {hovered && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0F1E2E] text-white text-[9px] px-2 py-1 rounded whitespace-nowrap">
            {current}% projected IRR
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-[9px] text-[#0F1E2E]/25 font-light">Capital Raise: <span className="text-[#0F1E2E]/50">{pct}% funded</span></span>
        <div className="w-20 h-1 bg-[#0F1E2E]/6 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${pct === 100 ? "bg-emerald-400/60" : "bg-[#C4A97D]/50"}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [hovered, setHovered] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="bg-[#FAFAF8] py-16 md:py-32 px-5 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#C4A97D]" />
              <span className="text-[#C4A97D] text-[10px] tracking-[0.45em] uppercase font-light">Investment Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-[3.5rem] font-thin text-[#0F1E2E] tracking-tight leading-tight">
              Residences of<br />
              <span className="italic font-extralight">distinction.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-right"
          >
            <p className="text-[#0F1E2E]/38 font-light text-sm leading-relaxed max-w-xs mb-5">
              Institutional-grade residential developments open to accredited investors.
            </p>
            <Link
              to={createPageUrl("Projects")}
              className="inline-flex items-center gap-2 text-[#0F1E2E]/40 text-[11px] tracking-[0.28em] uppercase font-light hover:text-[#C4A97D] transition-colors"
            >
              View All Opportunities <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Portfolio Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-3 border border-[#0F1E2E]/8 bg-white mb-12"
        >
          {PORTFOLIO_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`py-6 px-6 md:px-10 flex items-center gap-4 ${i < 2 ? "border-r border-[#0F1E2E]/8" : ""}`}>
                <div className="w-8 h-8 rounded-full bg-[#C4A97D]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#C4A97D]" />
                </div>
                <div>
                  <div className="text-[#0F1E2E] text-lg md:text-2xl font-extralight tracking-tight">{stat.value}</div>
                  <div className="text-[#0F1E2E]/35 text-[9px] tracking-[0.25em] uppercase font-light mt-0.5">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fallbackProjects.map((project, index) => {
            const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.planning;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className="group flex flex-col bg-white border border-[#0F1E2E]/6"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/11]">
                  <motion.img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: hovered === project.id ? 1.05 : 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080E16]/70 via-[#080E16]/10 to-transparent" />

                  {/* Status */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-[9px] tracking-[0.28em] uppercase font-light px-3 py-1.5 backdrop-blur-sm border ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Asset type */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[9px] tracking-[0.22em] uppercase font-light px-3 py-1.5 bg-[#0F1E2E]/60 text-white/60 backdrop-blur-sm">
                      {project.asset_type}
                    </span>
                  </div>

                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-light text-white tracking-wide">{project.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3 h-3 text-white/35" />
                      <span className="text-white/40 text-xs font-light">{project.location}</span>
                    </div>
                  </div>
                </div>

                {/* Detail Panel */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-[#0F1E2E]/45 text-sm font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Key metrics */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Raise", value: project.raise },
                      { label: "Hold", value: project.hold_period },
                      { label: "Sq Ft", value: project.square_footage ? `${project.square_footage.split(",")[0]}K` : "—" },
                    ].map(m => (
                      <div key={m.label} className="bg-[#FAFAF8] px-3 py-2.5 text-center">
                        <div className="text-[#0F1E2E] text-sm font-light">{m.value}</div>
                        <div className="text-[#0F1E2E]/30 text-[9px] tracking-[0.25em] uppercase mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* ROI Bar */}
                  <ROIBar current={project.roi} target={project.target_roi} pct={project.raise_pct} />

                  {/* CTAs */}
                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      disabled={project.status === "completed"}
                      className={`flex-1 flex items-center justify-center gap-2 text-[10px] tracking-[0.25em] uppercase font-medium py-3 transition-all duration-300 ${
                        project.status !== "completed"
                          ? "bg-[#0F1E2E] text-white hover:bg-[#1a2e42]"
                          : "border border-[#0F1E2E]/10 text-[#0F1E2E]/25 cursor-not-allowed"
                      }`}
                    >
                      {project.status === "completed" ? "Fully Funded" : "Invest with Crypto"}
                    </button>
                    <Link
                      to={createPageUrl("Projects")}
                      className="flex items-center justify-center border border-[#0F1E2E]/12 text-[#0F1E2E]/40 px-4 hover:border-[#C4A97D] hover:text-[#C4A97D] transition-all duration-300"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Invest Modal */}
        <AnimatePresence>
          {selectedProject && (
            <InvestModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-[#0F1E2E]/20 text-[10px] font-light leading-relaxed text-center max-w-2xl mx-auto"
        >
          Past performance is not indicative of future results. All projections are forward-looking estimates and subject to market conditions. Available to accredited investors only under Regulation D.
        </motion.p>
      </div>
    </section>
  );
}