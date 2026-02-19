import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import FooterSection from "@/components/home/FooterSection";
import ProjectModal from "@/components/projects/ProjectModal";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69968e273c35546c21525210/b8bc91192_transparentlogo.png";

const categories = [
  { key: "all", label: "All" },
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "mixed_use", label: "Mixed Use" },
  { key: "hospitality", label: "Hospitality" }
];

const fallbackProjects = [
  { id: "1", title: "The Meridian", location: "Austin, TX", category: "residential", image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", year: "2025", status: "in_progress", description: "A 120-unit luxury residential tower featuring biophilic design, rooftop gardens, and panoramic city views.", square_footage: "185,000" },
  { id: "2", title: "Sage Commerce Center", location: "Denver, CO", category: "commercial", image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", year: "2024", status: "completed", description: "A LEED Platinum certified office campus integrating natural light, green spaces, and wellness amenities.", square_footage: "320,000" },
  { id: "3", title: "Harmony Residences", location: "Portland, OR", category: "mixed_use", image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", year: "2026", status: "planning", description: "Mixed-use development combining residential lofts, artisan retail, and community green space.", square_footage: "240,000" },
  { id: "4", title: "Oasis Hotel & Spa", location: "Scottsdale, AZ", category: "hospitality", image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", year: "2025", status: "in_progress", description: "A desert wellness retreat blending contemporary architecture with traditional Southwestern materials.", square_footage: "95,000" },
  { id: "5", title: "Cedar Park Villas", location: "Austin, TX", category: "residential", image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", year: "2024", status: "completed", description: "Boutique community of 24 single-family homes with private courtyards and shared meditation gardens.", square_footage: "72,000" },
  { id: "6", title: "Lumina Tower", location: "Seattle, WA", category: "commercial", image_url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80", year: "2027", status: "planning", description: "Next-generation commercial high-rise with integrated smart building systems and vertical gardens.", square_footage: "410,000" }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const { data: projects } = useQuery({
    queryKey: ["all-projects"],
    queryFn: () => base44.entities.Project.list("-created_date"),
    initialData: []
  });

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;
  const filtered = activeCategory === "all" ? displayProjects : displayProjects.filter(p => p.category === activeCategory);

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

      {/* Hero banner */}
      <div className="bg-[#0F1E2E] pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-white/30 text-sm font-light mb-8 hover:text-[#C4A97D] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extralight text-white tracking-tight"
          >
            Our <span className="italic font-light text-[#C4A97D]">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-white/40 text-lg font-light max-w-xl"
          >
            A curated portfolio of developments that reflect our commitment to mindful, modern architecture.
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 -mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-sm border border-[#0F1E2E]/5 inline-flex p-1 gap-1">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 text-xs tracking-widest uppercase font-light transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-[#0F1E2E] text-white"
                    : "text-[#0F1E2E]/40 hover:text-[#0F1E2E]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                      src={project.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2E]/80 via-[#0F1E2E]/20 to-transparent" />

                    {project.status && (
                      <div className="absolute top-4 left-4">
                        <span className={`text-[10px] tracking-widest uppercase font-light px-3 py-1.5 backdrop-blur-sm ${
                          project.status === "completed" ? "bg-[#C4A97D]/20 text-[#C4A97D]" :
                          project.status === "in_progress" ? "bg-white/10 text-white" :
                          "bg-white/10 text-white/60"
                        }`}>
                          {project.status.replace(/_/g, " ")}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-[#C4A97D] text-[10px] tracking-[0.25em] uppercase font-light">
                        {project.category?.replace(/_/g, " ")}
                      </span>
                      <h3 className="mt-2 text-xl font-light text-white tracking-wide">
                        {project.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-white/40 text-sm font-light">
                          {project.location}
                        </p>
                        <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#C4A97D] transition-colors duration-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white max-w-3xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img
                  src={selectedProject.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2E]/60 to-transparent" />
              </div>
              <div className="p-8 md:p-12">
                <span className="text-[#C4A97D] text-xs tracking-[0.25em] uppercase font-light">
                  {selectedProject.category?.replace(/_/g, " ")}
                </span>
                <h2 className="mt-3 text-3xl font-extralight text-[#0F1E2E] tracking-tight">
                  {selectedProject.title}
                </h2>
                <p className="mt-2 text-[#0F1E2E]/40 text-sm font-light">
                  {selectedProject.location} {selectedProject.year && `· ${selectedProject.year}`}
                </p>
                <p className="mt-6 text-[#0F1E2E]/60 font-light leading-relaxed">
                  {selectedProject.description}
                </p>
                {selectedProject.square_footage && (
                  <div className="mt-8 pt-6 border-t border-[#0F1E2E]/10">
                    <span className="text-[#0F1E2E]/35 text-xs tracking-widest uppercase font-light">Total Area</span>
                    <p className="mt-1 text-2xl font-extralight text-[#0F1E2E]">{selectedProject.square_footage} <span className="text-sm text-[#0F1E2E]/40">sq ft</span></p>
                  </div>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="mt-8 text-[#0F1E2E]/40 text-sm tracking-widest uppercase font-light hover:text-[#C4A97D] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FooterSection />
    </div>
  );
}