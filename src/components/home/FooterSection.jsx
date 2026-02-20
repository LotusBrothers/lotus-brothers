import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69968e273c35546c21525210/b8bc91192_transparentlogo.png";

export default function FooterSection() {
  return (
    <footer className="bg-[#0F1E2E] py-16 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-white/8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src={LOGO_URL} alt="Lotus Brothers" className="w-7 h-7 object-contain" style={{ filter: "brightness(0) invert(1) opacity(0.5)" }} />
              <span className="text-white/50 text-sm font-light tracking-[0.18em] uppercase">Lotus Brothers</span>
            </div>
            <p className="text-white/25 text-sm font-light leading-relaxed max-w-xs">Residential Development Focused On Quality, Community, and Enduring Design. Based in Dallas, TX.

            </p>
          </div>
          <div>
            <h4 className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light mb-6">Navigate</h4>
            <div className="space-y-3.5">
              {[["Home", "Home"], ["Projects", "Projects"], ["About", "About"], ["Contact", "Contact"]].map(([label, page]) =>
              <Link key={page} to={createPageUrl(page)} className="block text-white/30 text-sm font-light hover:text-white/60 transition-colors">
                  {label}
                </Link>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light mb-6">Follow</h4>
            <div className="space-y-3.5">
              {["LinkedIn", "Instagram", "Twitter"].map((s) =>
              <a key={s} href="#" className="block text-white/30 text-sm font-light hover:text-white/60 transition-colors">{s}</a>
              )}
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs font-light tracking-wider">© 2026 Lotus Brothers. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 text-xs font-light hover:text-white/40 transition-colors">Privacy</a>
            <a href="#" className="text-white/20 text-xs font-light hover:text-white/40 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>);

}