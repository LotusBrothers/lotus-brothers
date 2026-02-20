import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, BedDouble, Maximize, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

const fallbackProjects = [
  {
    id: "1",
    title: "The Meridian",
    location: "Dallas, TX",
    category: "residential",
    image_url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=90",
    year: "2025",
    square_footage: "185,000",
    description: "A collection of 120 residences in the heart of Dallas, where floor-to-ceiling glass, rooftop gardens, and biophilic interiors create a sanctuary above the city.",
    beds: "2–4",
    status: "in_progress",
  },
  {
    id: "2",
    title: "Lotus Villas",
    location: "Dallas, TX",
    category: "residential",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=90",
    year: "2024",
    square_footage: "72,000",
    description: "24 single-family villas in North Dallas, arranged around private courtyards and shared meditation gardens. Each home is designed to disappear into its landscape.",
    beds: "3–5",
    status: "completed",
  },
  {
    id: "3",
    title: "Biscayne Residences",
    location: "Miami, FL",
    category: "residential",
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=90",
    year: "2025",
    square_footage: "95,000",
    description: "A waterfront retreat on Biscayne Bay blending coastal architecture with lush tropical landscaping. Infinity pool, private dock, and spa-level amenities throughout.",
    beds: "4–6",
    status: "in_progress",
  },
];

const STATUS_LABEL = {
  completed: "Available",
  in_progress: "Coming Soon",
  planning: "Pre-Launch",
};

export default function FeaturedProjects() {
  const [hovered, setHovered] = useState(null);

  const { data: projects } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => base44.entities.Project.list("-created_date", 3),
    initialData: [],
  });

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section className="bg-[#FAFAF8] py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#C4A97D]" />
              <span className="text-[#C4A97D] text-[10px] tracking-[0.45em] uppercase font-light">Curated Portfolio</span>
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
          >
            <p className="text-[#0F1E2E]/38 font-light text-base leading-relaxed max-w-xs mb-6">
              Each property is a considered balance of architecture, landscape, and lived experience.
            </p>
            <Link
              to={createPageUrl("Projects")}
              className="inline-flex items-center gap-2 text-[#0F1E2E]/40 text-[11px] tracking-[0.28em] uppercase font-light hover:text-[#C4A97D] transition-colors"
            >
              View All Properties <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <motion.img
                  src={project.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{ scale: hovered === project.id ? 1.04 : 1 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E16]/75 via-[#080E16]/10 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-5 left-5">
                  <span className={`text-[9px] tracking-[0.3em] uppercase font-light px-3 py-1.5 backdrop-blur-sm ${
                    project.status === "completed"
                      ? "bg-[#C4A97D]/20 text-[#C4A97D] border border-[#C4A97D]/30"
                      : "bg-white/10 text-white/60 border border-white/15"
                  }`}>
                    {STATUS_LABEL[project.status] || project.status}
                  </span>
                </div>

                {/* Arrow icon */}
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>

                {/* Bottom overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[#C4A97D] text-[9px] tracking-[0.3em] uppercase font-light">
                    {project.category?.replace(/_/g, " ")}
                  </span>
                  <h3 className="mt-2 text-2xl font-light text-white tracking-wide">{project.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin className="w-3 h-3 text-white/35" />
                    <span className="text-white/40 text-xs font-light">{project.location}</span>
                  </div>
                </div>
              </div>

              {/* Detail panel */}
              <div className="bg-white border border-[#0F1E2E]/6 border-t-0 p-6 flex-1">
                <p className="text-[#0F1E2E]/50 text-sm font-light leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-5 pt-5 border-t border-[#0F1E2E]/6 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-light text-[#0F1E2E]/35">
                    {project.square_footage && (
                      <span className="flex items-center gap-1.5">
                        <Maximize className="w-3 h-3" />
                        {project.square_footage} sf
                      </span>
                    )}
                    {project.beds && (
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="w-3 h-3" />
                        {project.beds} beds
                      </span>
                    )}
                    {project.year && (
                      <span className="text-[#0F1E2E]/25">{project.year}</span>
                    )}
                  </div>
                  <Link
                    to={createPageUrl("Projects")}
                    className="text-[#0F1E2E]/30 text-[10px] tracking-[0.25em] uppercase font-light hover:text-[#C4A97D] transition-colors flex items-center gap-1"
                  >
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}