import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, ArrowLeft, MapPin, TrendingUp, DollarSign, Clock, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FooterSection from "@/components/home/FooterSection";
import ProjectModal from "@/components/projects/ProjectModal";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69968e273c35546c21525210/b8bc91192_transparentlogo.png";

const categories = [
  { key: "all", label: "All" },
  { key: "raising", label: "Raising Now" },
  { key: "funded", label: "Fully Funded" },
  { key: "completed", label: "Exited" },
];

const fallbackProjects = [
  {
    id: "1",
    title: "The Meridian",
    location: "Dallas, TX",
    category: "residential",
    filterKey: "raising",
    image_url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=90",
    year: "2025",
    status: "in_progress",
    description: "120-unit luxury high-rise in Uptown Dallas with floor-to-ceiling glass, rooftop gardens, and panoramic city views.",
    square_footage: "185,000",
    asset_type: "Multi-Family",
    raise: "$18.5M",
    roi: 24,
    target_roi: 28,
    raise_pct: 82,
    hold_period: "5 yrs",
    min_invest: "$50,000",
  },
  {
    id: "2",
    title: "Lotus Villas",
    location: "Dallas, TX",
    category: "residential",
    filterKey: "funded",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=90",
    year: "2024",
    status: "completed",
    description: "24 bespoke single-family villas in North Dallas with private courtyards, meditation gardens, and resort-grade finishes.",
    square_footage: "72,000",
    asset_type: "Single Family",
    raise: "$12.4M",
    roi: 21,
    target_roi: 21,
    raise_pct: 100,
    hold_period: "3 yrs",
    min_invest: "$25,000",
  },
  {
    id: "3",
    title: "Biscayne Residences",
    location: "Miami, FL",
    category: "residential",
    filterKey: "raising",
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=90",
    year: "2025",
    status: "in_progress",
    description: "Waterfront tower on Biscayne Bay with private marina access, infinity pool, and curated wellness amenities.",
    square_footage: "95,000",
    asset_type: "Luxury Condo",
    raise: "$17.3M",
    roi: 22,
    target_roi: 26,
    raise_pct: 66,
    hold_period: "5 yrs",
    min_invest: "$50,000",
  },
  {
    id: "4",
    title: "The Palms Estate",
    location: "Miami, FL",
    category: "residential",
    filterKey: "raising",
    image_url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=90",
    year: "2026",
    status: "in_progress",
    description: "Ultra-luxury gated estate community on the waterfront, featuring private docks, tropical landscaping, and smart-home technology.",
    square_footage: "140,000",
    asset_type: "Estate Community",
    raise: "$22.1M",
    roi: 26,
    target_roi: 30,
    raise_pct: 45,
    hold_period: "6 yrs",
    min_invest: "$100,000",
  },
  {
    id: "5",
    title: "Highland Park Estates",
    location: "Dallas, TX",
    category: "residential",
    filterKey: "completed",
    image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=90",
    year: "2023",
    status: "completed",
    description: "Boutique collection of 16 contemporary residences in Highland Park, blending traditional architecture with modern interiors.",
    square_footage: "58,000",
    asset_type: "Single Family",
    raise: "$9.8M",
    roi: 19,
    target_roi: 18,
    raise_pct: 100,
    hold_period: "2.5 yrs",
    min_invest: "$25,000",
  },
  {
    id: "6",
    title: "Coral Gables Villas",
    location: "Miami, FL",
    category: "residential",
    filterKey: "completed",
    image_url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1400&q=90",
    year: "2023",
    status: "completed",
    description: "12 Mediterranean-inspired villas in historic Coral Gables, fully repositioned and sold to luxury buyers above projection.",
    square_footage: "48,000",
    asset_type: "Luxury Villa",
    raise: "$8.2M",
    roi: 23,
    target_roi: 20,
    raise_pct: 100,
    hold_period: "3 yrs",
    min_invest: "$25,000",
  },
];

const STATUS_CONFIG = {
  completed: { label: "Fully Funded", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  in_progress: { label: "Raising Now", color: "bg-[#C4A97D]/15 text-[#C4A97D] border-[#C4A97D]/25" },
  planning: { label: "Pre-Launch", color: "bg-white/8 text-white/45 border-white/12" },
};

function ROIBar({ current, target, pct, animate: doAnimate }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9px] tracking-[0.28em] uppercase text-[#0F1E2E]/30 font-light">Proj. IRR</span>
        <span className="text-[#C4A97D] text-xs font-light">{current}% <span className="text-[#0F1E2E]/20">/ {target}%</span></span>
      </div>
      <div className="relative h-1 bg-[#0F1E2E]/6 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C4A97D]/50 to-[#C4A97D] rounded-full"
          initial={{ width: 0 }}
          animate={doAnimate ? { width: `${Math.min((current / target) * 100, 100)}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-[#0F1E2E]/22 font-light">Raise progress</span>
        <div className="flex items-center gap-1.5">
          <div className="w-14 h-0.5 bg-[#0F1E2E]/6 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${pct === 100 ? "bg-emerald-400/70" : "bg-[#C4A97D]/60"}`}
              initial={{ width: 0 }}
              animate={doAnimate ? { width: `${pct}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
          <span className="text-[#0F1E2E]/30 text-[9px] font-light">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [animatedIds, setAnimatedIds] = useState(new Set());

  const { data: projects } = useQuery({
    queryKey: ["all-projects"],
    queryFn: () => base44.entities.Project.list("-created_date"),
    initialData: []
  });

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;
  const filtered = activeCategory === "all"
    ? displayProjects
    : displayProjects.filter(p => p.filterKey === activeCategory || p.status === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      {/* Header */}
      <div className="bg-[#0F1E2E] py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Lotus Brothers" className="w-8 h-8 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
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

      {/* Hero banner */}
      <div className="bg-[#0F1E2E] pt-14 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-white/30 text-sm font-light mb-8 hover:text-[#C4A97D] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            Investment <span className="italic font-light text-[#C4A97D]">Opportunities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-white/40 text-base font-light max-w-xl"
          >
            Institutional-grade residential real estate — open to accredited investors seeking superior risk-adjusted returns.
          </motion.p>

          {/* Fund stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: DollarSign, value: "$48.2M", label: "Total Raised" },
              { icon: TrendingUp, value: "22.4%", label: "Avg. IRR" },
              { icon: Home, value: "6 Projects", label: "Active Portfolio" },
              { icon: Clock, value: "3–6 Yrs", label: "Hold Period" },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="border border-white/8 px-5 py-4 flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#C4A97D] flex-shrink-0" />
                  <div>
                    <div className="text-white text-xl font-extralight">{s.value}</div>
                    <div className="text-white/30 text-[9px] tracking-[0.25em] uppercase">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 -mt-5 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-sm border border-[#0F1E2E]/6 inline-flex p-1 gap-1">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 text-[10px] tracking-widest uppercase font-light transition-all duration-300 ${
                  activeCategory === cat.key ? "bg-[#0F1E2E] text-white" : "text-[#0F1E2E]/40 hover:text-[#0F1E2E]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((project, index) => {
                const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.planning;
                const isAnimated = animatedIds.has(project.id);
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onViewportEnter={() => setAnimatedIds(prev => new Set([...prev, project.id]))}
                    className="group cursor-pointer bg-white border border-[#0F1E2E]/6 flex flex-col"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={project.image_url || "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2E]/75 via-[#0F1E2E]/15 to-transparent" />

                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className={`text-[9px] tracking-[0.28em] uppercase font-light px-3 py-1.5 backdrop-blur-sm border ${status.color}`}>
                          {status.label}
                        </span>
                        {project.asset_type && (
                          <span className="text-[9px] tracking-[0.2em] uppercase font-light px-3 py-1.5 bg-[#0F1E2E]/55 text-white/55 backdrop-blur-sm">
                            {project.asset_type}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-xl font-light text-white tracking-wide">{project.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-white/35" />
                            <span className="text-white/40 text-xs font-light">{project.location}</span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-white/25 group-hover:text-[#C4A97D] transition-colors duration-500" />
                        </div>
                      </div>
                    </div>

                    {/* Investment details */}
                    <div className="p-5 flex-1 flex flex-col gap-4">
                      <p className="text-[#0F1E2E]/40 text-sm font-light leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Metrics row */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Raise", value: project.raise || "—" },
                          { label: "Min. Invest", value: project.min_invest || "—" },
                          { label: "Hold", value: project.hold_period || "—" },
                        ].map(m => (
                          <div key={m.label} className="bg-[#F8F8F6] px-2 py-2.5 text-center border border-[#0F1E2E]/5">
                            <div className="text-[#0F1E2E] text-sm font-light">{m.value}</div>
                            <div className="text-[#0F1E2E]/28 text-[8px] tracking-[0.22em] uppercase mt-0.5">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* ROI Bar */}
                      {project.roi && (
                        <ROIBar
                          current={project.roi}
                          target={project.target_roi}
                          pct={project.raise_pct}
                          animate={isAnimated}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Disclaimer */}
          <p className="mt-12 text-[#0F1E2E]/18 text-[10px] font-light leading-relaxed text-center max-w-2xl mx-auto">
            Past performance is not indicative of future results. All projections are forward-looking estimates subject to market conditions. Securities offered to accredited investors only under Regulation D, Rule 506(b).
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <FooterSection />
    </div>
  );
}