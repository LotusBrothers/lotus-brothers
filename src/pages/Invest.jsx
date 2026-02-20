import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, MapPin, TrendingUp, DollarSign, Users, Clock, Home, Shield } from "lucide-react";
import FooterSection from "@/components/home/FooterSection";
import WalletButton from "@/components/invest/WalletButton";
import InvestModal from "@/components/invest/InvestModal";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69968e273c35546c21525210/b8bc91192_transparentlogo.png";

const PROJECTS = [
  {
    id: "1",
    title: "The Meridian",
    location: "Dallas, TX",
    image_url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=90",
    asset_type: "Multi-Family",
    status: "in_progress",
    raise: "$18.5M",
    roi: 24,
    target_roi: 28,
    raise_pct: 82,
    hold_period: "5 yrs",
    min_invest: "$1,000",
    description: "120-unit luxury high-rise in Uptown Dallas with floor-to-ceiling glass, rooftop gardens, and panoramic city views.",
    raised_usd: 15170000,
    total_usd: 18500000,
  },
  {
    id: "2",
    title: "Lotus Villas",
    location: "Dallas, TX",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=90",
    asset_type: "Single Family",
    status: "completed",
    raise: "$12.4M",
    roi: 21,
    target_roi: 21,
    raise_pct: 100,
    hold_period: "3 yrs",
    min_invest: "$1,000",
    description: "24 bespoke single-family villas in North Dallas with private courtyards and resort-grade finishes.",
    raised_usd: 12400000,
    total_usd: 12400000,
  },
  {
    id: "3",
    title: "Biscayne Residences",
    location: "Miami, FL",
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=90",
    asset_type: "Luxury Condo",
    status: "in_progress",
    raise: "$17.3M",
    roi: 22,
    target_roi: 26,
    raise_pct: 66,
    hold_period: "5 yrs",
    min_invest: "$1,000",
    description: "Waterfront tower on Biscayne Bay with private marina access, infinity pool, and curated wellness amenities.",
    raised_usd: 11418000,
    total_usd: 17300000,
  },
  {
    id: "4",
    title: "The Palms Estate",
    location: "Miami, FL",
    image_url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=90",
    asset_type: "Estate Community",
    status: "in_progress",
    raise: "$22.1M",
    roi: 26,
    target_roi: 30,
    raise_pct: 45,
    hold_period: "6 yrs",
    min_invest: "$1,000",
    description: "Ultra-luxury gated estate on the waterfront with private docks, tropical landscaping, and smart-home technology.",
    raised_usd: 9945000,
    total_usd: 22100000,
  },
];

const STATUS_CONFIG = {
  completed: { label: "Fully Funded", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  in_progress: { label: "Raising Now", color: "bg-[#C4A97D]/15 text-[#C4A97D] border-[#C4A97D]/25" },
};

function FundRaiseBar({ pct, raisedUsd, totalUsd }) {
  const fmt = v => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`;
  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between text-xs font-light">
        <span className="text-white/30">Raised: <span className="text-white/60">{fmt(raisedUsd)}</span></span>
        <span className="text-white/30">Goal: <span className="text-white/60">{fmt(totalUsd)}</span></span>
      </div>
      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${pct === 100 ? "bg-emerald-400" : "bg-gradient-to-r from-[#C4A97D]/60 to-[#C4A97D]"}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <div className="flex justify-between text-[9px] text-white/22 font-light">
        <span>{pct}% funded</span>
        <span>{pct === 100 ? "Closed" : `${100 - pct}% remaining`}</span>
      </div>
    </div>
  );
}

export default function Invest() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const totalRaised = PROJECTS.reduce((s, p) => s + p.raised_usd, 0);
  const avgIRR = (PROJECTS.reduce((s, p) => s + p.roi, 0) / PROJECTS.length).toFixed(1);

  return (
    <div className="min-h-screen bg-[#080E16]">

      {/* Nav */}
      <div className="border-b border-white/8 py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Lotus Brothers" className="w-8 h-8 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
            <span className="text-white/60 font-light tracking-[0.18em] uppercase text-sm">Lotus Brothers</span>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8">
              {["Home", "Projects", "About", "Contact"].map(page => (
                <Link key={page} to={createPageUrl(page)} className="text-white/35 text-xs tracking-wider hover:text-[#C4A97D] transition-colors">
                  {page}
                </Link>
              ))}
            </nav>
            <WalletButton onConnected={setWalletAddress} />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 pt-14 pb-16 border-b border-white/6">
        <div className="max-w-7xl mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-white/25 text-sm font-light mb-8 hover:text-[#C4A97D] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-[#C4A97D]" />
                <span className="text-[#C4A97D] text-[10px] tracking-[0.45em] uppercase font-light">Crypto Investment Portal</span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-6xl font-thin text-white tracking-tight"
              >
                Invest in Real Estate<br />
                <span className="italic font-extralight text-[#C4A97D]">with Crypto.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-4 text-white/35 font-light max-w-lg leading-relaxed"
              >
                Own fractional shares in institutional-grade residential properties — starting at $1,000. Pay with ETH, USDC, or BTC.
              </motion.p>
            </div>

            {/* Wallet connect CTA */}
            {!walletAddress && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="border border-[#C4A97D]/20 p-5 max-w-xs"
              >
                <p className="text-white/40 text-xs font-light mb-4 leading-relaxed">Connect your MetaMask wallet to start investing in seconds.</p>
                <WalletButton onConnected={setWalletAddress} />
              </motion.div>
            )}
          </div>

          {/* Fund stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: DollarSign, value: `$${(totalRaised / 1000000).toFixed(1)}M`, label: "Total Capital Raised" },
              { icon: TrendingUp, value: `${avgIRR}%`, label: "Avg. Projected IRR" },
              { icon: Home, value: `${PROJECTS.length} Projects`, label: "Active Portfolio" },
              { icon: Shield, value: "Reg D 506(b)", label: "Offering Type" },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="border border-white/8 px-5 py-4 flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#C4A97D] flex-shrink-0" />
                  <div>
                    <div className="text-white text-xl font-extralight">{s.value}</div>
                    <div className="text-white/25 text-[9px] tracking-[0.22em] uppercase">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Project cards */}
      <div className="px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px bg-[#C4A97D]" />
            <span className="text-[#C4A97D] text-[10px] tracking-[0.4em] uppercase font-light">Open Opportunities</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => {
              const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.in_progress;
              const isOpen = project.status === "in_progress";
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="bg-[#0F1E2E] border border-white/8 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2E] via-[#0F1E2E]/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className={`text-[9px] tracking-[0.28em] uppercase font-light px-3 py-1.5 border backdrop-blur-sm ${status.color}`}>
                        {status.label}
                      </span>
                      <span className="text-[9px] tracking-[0.2em] uppercase font-light px-3 py-1.5 bg-black/40 text-white/50 backdrop-blur-sm">
                        {project.asset_type}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-light text-white">{project.title}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3 h-3 text-white/30" />
                        <span className="text-white/35 text-xs font-light">{project.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <p className="text-white/35 text-sm font-light leading-relaxed mb-5 line-clamp-2">{project.description}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-4 gap-2 mb-5">
                      {[
                        { label: "Raise", value: project.raise },
                        { label: "Proj. IRR", value: `${project.roi}%` },
                        { label: "Hold", value: project.hold_period },
                        { label: "Min.", value: project.min_invest },
                      ].map(m => (
                        <div key={m.label} className="border border-white/8 px-2 py-2.5 text-center">
                          <div className="text-white text-sm font-extralight">{m.value}</div>
                          <div className="text-white/22 text-[8px] tracking-[0.2em] uppercase mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Raise progress bar */}
                    <FundRaiseBar pct={project.raise_pct} raisedUsd={project.raised_usd} totalUsd={project.total_usd} />

                    {/* ROI bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[9px] tracking-[0.25em] uppercase text-white/25 font-light">Projected ROI</span>
                        <span className="text-[#C4A97D] text-xs font-light">{project.roi}% <span className="text-white/20">/ {project.target_roi}% target</span></span>
                      </div>
                      <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#C4A97D]/50 to-[#C4A97D] rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(project.roi / project.target_roi) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      disabled={!isOpen}
                      className={`mt-5 w-full flex items-center justify-center gap-2 text-[10px] tracking-[0.3em] uppercase font-medium py-3.5 transition-all ${
                        isOpen
                          ? "bg-[#C4A97D] text-[#080E16] hover:bg-[#d4b98d]"
                          : "border border-white/12 text-white/25 cursor-not-allowed"
                      }`}
                    >
                      {isOpen ? "Invest with Crypto" : "Fully Funded"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <p className="mt-12 text-white/15 text-[10px] font-light leading-relaxed text-center max-w-2xl mx-auto">
            Past performance is not indicative of future results. All projections are forward-looking estimates subject to market conditions. Securities offered to accredited investors only under Regulation D, Rule 506(b). Cryptocurrency investments carry additional volatility risk.
          </p>
        </div>
      </div>

      {/* Invest Modal */}
      <AnimatePresence>
        {selectedProject && (
          <InvestModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <FooterSection />
    </div>
  );
}