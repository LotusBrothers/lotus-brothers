import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

const fallbackProjects = [
  {
    id: "1",
    title: "The Meridian",
    location: "Austin, TX",
    category: "residential",
    image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    year: "2025"
  },
  {
    id: "2",
    title: "Sage Commerce Center",
    location: "Denver, CO",
    category: "commercial",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    year: "2024"
  },
  {
    id: "3",
    title: "Harmony Residences",
    location: "Portland, OR",
    category: "mixed_use",
    image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    year: "2026"
  }
];

export default function FeaturedProjects() {
  const { data: projects } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => base44.entities.Project.list("-created_date", 3),
    initialData: []
  });

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="projects" className="bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-[#C4A97D] text-xs tracking-[0.3em] uppercase font-light">
              Portfolio
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extralight text-[#0F1E2E] tracking-tight">
              Featured <span className="italic font-light">projects</span>
            </h2>
          </div>
          <Link
            to={createPageUrl("Projects")}
            className="mt-6 md:mt-0 text-[#0F1E2E]/50 text-sm tracking-widest uppercase font-light hover:text-[#C4A97D] transition-colors duration-500 flex items-center gap-2"
          >
            View All
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={project.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2E]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[#C4A97D] text-xs tracking-[0.2em] uppercase font-light">
                    {project.category?.replace(/_/g, " ") || "Development"}
                  </span>
                  <h3 className="mt-2 text-xl font-light text-white tracking-wide">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-white/50 text-sm font-light">
                    {project.location} {project.year && `· ${project.year}`}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}