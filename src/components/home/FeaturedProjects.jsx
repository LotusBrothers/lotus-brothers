import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
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
    image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85",
    year: "2025",
    square_footage: "185,000",
  },
  {
    id: "2",
    title: "Cedar Park Villas",
    location: "Austin, TX",
    category: "residential",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=85",
    year: "2024",
    square_footage: "72,000",
  },
  {
    id: "3",
    title: "Harmony Residences",
    location: "Portland, OR",
    category: "mixed_use",
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=85",
    year: "2026",
    square_footage: "240,000",
  },
];

export default function FeaturedProjects() {
  const { data: projects } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => base44.entities.Project.list("-created_date", 3),
    initialData: [],
  });

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;
  const [main, ...rest] = displayProjects;

  return (
    <section className="bg-[#F7F6F4] py-28 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#C4A97D]" />
              <span className="text-[#C4A97D] text-[10px] tracking-[0.4em] uppercase font-light">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-thin text-[#0F1E2E] tracking-tight">
              Featured <span className="italic font-extralight">homes.</span>
            </h2>
          </motion.div>
          <Link
            to={createPageUrl("Projects")}
            className="hidden md:flex items-center gap-2 text-[#0F1E2E]/35 text-xs tracking-[0.25em] uppercase font-light hover:text-[#0F1E2E] transition-colors"
          >
            All Projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Layout: 1 large + 2 smaller */}
        <div className="grid md:grid-cols-12 gap-4">
          {/* Main */}
          {main && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="md:col-span-7 group cursor-pointer"
            >
              <Link to={createPageUrl("Projects")}>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={main.image_url}
                    alt={main.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
                    style={{ transform: "scale(1)" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2E]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-[#C4A97D] text-[10px] tracking-[0.3em] uppercase font-light">{main.category?.replace(/_/g, " ")}</span>
                      <h3 className="mt-1.5 text-2xl font-light text-white">{main.title}</h3>
                      <p className="text-white/50 text-sm font-light mt-0.5">{main.location}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Side cards */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {rest.slice(0, 2).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.1 }}
                className="group cursor-pointer flex-1"
              >
                <Link to={createPageUrl("Projects")}>
                  <div className="relative overflow-hidden h-full min-h-[200px]">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                      style={{ transform: "scale(1)" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2E]/65 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                      <div>
                        <h3 className="text-lg font-light text-white">{project.title}</h3>
                        <p className="text-white/45 text-xs font-light mt-0.5">{project.location}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#C4A97D] transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link to={createPageUrl("Projects")} className="flex items-center gap-2 text-[#0F1E2E]/40 text-xs tracking-[0.25em] uppercase font-light">
            All Projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}