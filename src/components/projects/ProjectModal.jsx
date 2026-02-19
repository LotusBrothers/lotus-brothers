import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, MapPin, Maximize2, Leaf, Wifi, Car, Dumbbell, Waves, Wind, Coffee, Shield } from "lucide-react";

// Per-project gallery images and amenities (keyed by title for fallback data)
const PROJECT_EXTRAS = {
  "The Meridian": {
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85",
    ],
    amenities: ["Rooftop Gardens", "Smart Home Tech", "Concierge", "Fitness Center", "EV Charging"],
    mapQuery: "Austin, TX downtown",
  },
  "Sage Commerce Center": {
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85",
    ],
    amenities: ["LEED Platinum", "Green Spaces", "Wellness Hub", "High-Speed Fiber", "Secure Parking"],
    mapQuery: "Denver, CO downtown",
  },
  "Harmony Residences": {
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85",
    ],
    amenities: ["Artisan Retail", "Community Garden", "Co-working Lounge", "Bike Storage", "Rooftop Terrace"],
    mapQuery: "Portland, OR Pearl District",
  },
  "Oasis Hotel & Spa": {
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=85",
    ],
    amenities: ["Full Spa", "Infinity Pool", "Desert Gardens", "Farm-to-Table", "Meditation Pavilion"],
    mapQuery: "Scottsdale, AZ",
  },
  "Cedar Park Villas": {
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
    ],
    amenities: ["Private Courtyards", "Meditation Gardens", "Smart Security", "EV Charging", "Dog Park"],
    mapQuery: "Cedar Park, Austin TX",
  },
  "Lumina Tower": {
    gallery: [
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=85",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=85",
    ],
    amenities: ["Vertical Gardens", "Smart Building AI", "Sky Lounge", "Conference Suites", "Wellness Floor"],
    mapQuery: "Seattle, WA downtown",
  },
};

const AMENITY_ICONS = {
  "Rooftop Gardens": Leaf, "Smart Home Tech": Wifi, "Concierge": Coffee,
  "Fitness Center": Dumbbell, "EV Charging": Wind, "LEED Platinum": Leaf,
  "Green Spaces": Leaf, "Wellness Hub": Dumbbell, "High-Speed Fiber": Wifi,
  "Secure Parking": Car, "Artisan Retail": Coffee, "Community Garden": Leaf,
  "Co-working Lounge": Coffee, "Bike Storage": Car, "Rooftop Terrace": Leaf,
  "Full Spa": Waves, "Infinity Pool": Waves, "Desert Gardens": Leaf,
  "Farm-to-Table": Coffee, "Meditation Pavilion": Wind, "Private Courtyards": Leaf,
  "Meditation Gardens": Leaf, "Smart Security": Shield, "Dog Park": Leaf,
  "Vertical Gardens": Leaf, "Smart Building AI": Wifi, "Sky Lounge": Coffee,
  "Conference Suites": Coffee, "Wellness Floor": Dumbbell,
};

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const prev = (e) => { e.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setCurrent(i => (i + 1) % images.length); };

  return (
    <div className="relative aspect-[16/9] bg-[#0F1E2E] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2E]/50 to-transparent pointer-events-none" />

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-[#C4A97D] w-4" : "bg-white/40"}`}
            />
          ))}
        </div>
      )}

      {/* Image count */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 text-white/70 text-[10px] tracking-widest uppercase">
        <Maximize2 className="w-3 h-3" />
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

function LocationMap({ query }) {
  const encoded = encodeURIComponent(query);
  const src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU3MOU&q=${encoded}`;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-3.5 h-3.5 text-[#C4A97D]" />
        <span className="text-[#0F1E2E]/40 text-xs tracking-[0.2em] uppercase font-light">Location</span>
      </div>
      <div className="relative w-full h-48 overflow-hidden border border-[#0F1E2E]/8">
        {/* Static map via OpenStreetMap embed — no API key needed */}
        <iframe
          title="Project Location"
          className="w-full h-full"
          style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=-180%2C-90%2C180%2C90&layer=mapnik&marker=0%2C0`}
          // Use a simple staticmap approach instead
        />
        {/* Overlay with location label since embed needs coordinates */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAFAF8]">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={`https://staticmap.openstreetmap.de/staticmap.php?center=0,0&zoom=13&size=800x300&markers=0,0,red-pushpin`}
              alt="map"
              className="w-full h-full object-cover opacity-0"
            />
            {/* Styled placeholder map */}
            <div className="absolute inset-0 bg-[#EEF0F2]" style={{
              backgroundImage: `
                linear-gradient(rgba(200,210,220,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200,210,220,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }} />
            {/* Roads */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1.5 bg-white/80 rounded-full absolute" style={{top: "35%"}} />
              <div className="w-full h-1 bg-white/60 rounded-full absolute" style={{top: "60%"}} />
              <div className="h-full w-1.5 bg-white/80 rounded-full absolute" style={{left: "40%"}} />
              <div className="h-full w-1 bg-white/60 rounded-full absolute" style={{left: "65%"}} />
            </div>
            {/* Location pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#0F1E2E] flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-[#C4A97D]" />
                </div>
                <div className="w-1 h-3 bg-[#0F1E2E]" />
                <div className="w-2 h-1 bg-[#0F1E2E]/30 rounded-full" />
              </div>
            </div>
            {/* Location label */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span className="bg-white/90 backdrop-blur-sm text-[#0F1E2E] text-xs font-light tracking-wider px-3 py-1.5">
                {query}
              </span>
            </div>
          </div>
        </div>
      </div>
      <a
        href={`https://maps.google.com?q=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="mt-2 inline-flex items-center gap-1.5 text-[#0F1E2E]/35 text-[10px] tracking-widest uppercase font-light hover:text-[#C4A97D] transition-colors"
      >
        <MapPin className="w-3 h-3" />
        Open in Google Maps
      </a>
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const extras = PROJECT_EXTRAS[project.title] || {
    gallery: [project.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85"],
    amenities: ["Modern Design", "Premium Finishes", "Sustainable Build"],
    mapQuery: project.location || "United States",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Carousel */}
        <ImageCarousel images={extras.gallery} />

        {/* Content */}
        <div className="p-8 md:p-10">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left: main info */}
            <div className="md:col-span-2">
              <span className="text-[#C4A97D] text-[10px] tracking-[0.35em] uppercase font-light">
                {project.category?.replace(/_/g, " ")}
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-extralight text-[#0F1E2E] tracking-tight">
                {project.title}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-3.5 h-3.5 text-[#C4A97D]" />
                <p className="text-[#0F1E2E]/40 text-sm font-light">
                  {project.location} {project.year && `· Est. ${project.year}`}
                </p>
              </div>

              <p className="mt-6 text-[#0F1E2E]/55 font-light leading-relaxed text-[0.95rem]">
                {project.description}
              </p>

              {/* Stats row */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {project.square_footage && (
                  <div className="p-4 bg-[#FAFAF8] border border-[#0F1E2E]/5">
                    <span className="text-[#0F1E2E]/30 text-[10px] tracking-widest uppercase font-light block">Total Area</span>
                    <span className="mt-1 text-xl font-extralight text-[#0F1E2E]">{project.square_footage} <span className="text-sm text-[#0F1E2E]/35">sq ft</span></span>
                  </div>
                )}
                {project.status && (
                  <div className="p-4 bg-[#FAFAF8] border border-[#0F1E2E]/5">
                    <span className="text-[#0F1E2E]/30 text-[10px] tracking-widest uppercase font-light block">Status</span>
                    <span className={`mt-1 text-sm font-light tracking-wide ${
                      project.status === "completed" ? "text-[#C4A97D]" :
                      project.status === "in_progress" ? "text-[#0F1E2E]" : "text-[#0F1E2E]/50"
                    }`}>
                      {project.status.replace(/_/g, " ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Map */}
              <LocationMap query={extras.mapQuery} />
            </div>

            {/* Right: amenities */}
            <div>
              <span className="text-[#0F1E2E]/30 text-[10px] tracking-[0.3em] uppercase font-light">Amenities</span>
              <div className="mt-4 space-y-3">
                {extras.amenities.map(amenity => {
                  const Icon = AMENITY_ICONS[amenity] || Leaf;
                  return (
                    <div key={amenity} className="flex items-center gap-3 py-3 border-b border-[#0F1E2E]/6">
                      <div className="w-7 h-7 rounded-full bg-[#C4A97D]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#C4A97D]" />
                      </div>
                      <span className="text-[#0F1E2E]/65 text-sm font-light">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}