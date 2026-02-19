import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import ContactSection from "@/components/home/ContactSection";
import FooterSection from "@/components/home/FooterSection";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69968e273c35546c21525210/b8bc91192_transparentlogo.png";

export default function Contact() {
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
      <div className="bg-[#0F1E2E] pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-white/30 text-sm font-light mb-8 hover:text-[#C4A97D] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-extralight text-white tracking-tight">
            Contact <span className="italic font-light text-[#C4A97D]">Us</span>
          </h1>
        </div>
      </div>

      <ContactSection />
      <FooterSection />
    </div>
  );
}