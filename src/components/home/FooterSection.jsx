import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69968e273c35546c21525210/b8bc91192_transparentlogo.png";

export default function FooterSection() {
  return (
    <footer className="bg-[#0F1E2E] border-t border-white/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={LOGO_URL} alt="Lotus Brothers" className="w-8 h-8 rounded-md object-cover" />
              <span className="text-white font-light tracking-wider text-lg">Lotus Brothers</span>
            </div>
            <p className="text-white/30 text-sm font-light leading-relaxed max-w-sm">
              Creating mindful spaces that balance architectural beauty with sustainable innovation. Based in Austin, building nationwide.
            </p>
          </div>

          <div>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-6">Navigate</h4>
            <div className="space-y-3">
              {[
                { label: "Home", page: "Home" },
                { label: "Projects", page: "Projects" },
                { label: "About", page: "About" },
                { label: "Contact", page: "Contact" }
              ].map(link => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className="block text-white/30 text-sm font-light hover:text-[#C4A97D] transition-colors duration-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-6">Connect</h4>
            <div className="space-y-3">
              {["LinkedIn", "Instagram", "Twitter"].map(social => (
                <a
                  key={social}
                  href="#"
                  className="block text-white/30 text-sm font-light hover:text-[#C4A97D] transition-colors duration-500"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs font-light tracking-wider">
            © 2026 Lotus Brothers. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 text-xs font-light hover:text-white/40 transition-colors">Privacy</a>
            <a href="#" className="text-white/20 text-xs font-light hover:text-white/40 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}