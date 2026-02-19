import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail, Phone, ArrowRight, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", inquiry_type: "general" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.ContactInquiry.create(form);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#FAFAF8] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <span className="text-[#C4A97D] text-xs tracking-[0.3em] uppercase font-light">
              Connect
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extralight text-[#0F1E2E] tracking-tight">
              Let's build <span className="italic font-light">together</span>
            </h2>
            <p className="mt-6 text-[#0F1E2E]/45 font-light leading-relaxed">
              Whether you're an investor, partner, or community member, we'd love to hear from you.
            </p>

            <div className="mt-14 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0F1E2E]/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#C4A97D]" />
                </div>
                <div>
                  <p className="text-[#0F1E2E] text-sm font-light">123 Innovation Drive</p>
                  <p className="text-[#0F1E2E]/40 text-sm font-light">Austin, TX 78701</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0F1E2E]/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#C4A97D]" />
                </div>
                <div>
                  <p className="text-[#0F1E2E] text-sm font-light">hello@lotusbrothers.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0F1E2E]/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#C4A97D]" />
                </div>
                <div>
                  <p className="text-[#0F1E2E] text-sm font-light">+1 (512) 555-0180</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 rounded-full bg-[#C4A97D]/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-[#C4A97D]" />
                </div>
                <h3 className="text-2xl font-light text-[#0F1E2E]">Thank you</h3>
                <p className="mt-3 text-[#0F1E2E]/45 font-light">
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#0F1E2E]/60 text-xs tracking-wider uppercase font-light mb-2 block">
                      Full Name
                    </label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="border-0 border-b border-[#0F1E2E]/15 rounded-none bg-transparent px-0 py-3 text-[#0F1E2E] font-light focus-visible:ring-0 focus-visible:border-[#C4A97D] transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="text-[#0F1E2E]/60 text-xs tracking-wider uppercase font-light mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="border-0 border-b border-[#0F1E2E]/15 rounded-none bg-transparent px-0 py-3 text-[#0F1E2E] font-light focus-visible:ring-0 focus-visible:border-[#C4A97D] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#0F1E2E]/60 text-xs tracking-wider uppercase font-light mb-2 block">
                      Phone
                    </label>
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="border-0 border-b border-[#0F1E2E]/15 rounded-none bg-transparent px-0 py-3 text-[#0F1E2E] font-light focus-visible:ring-0 focus-visible:border-[#C4A97D] transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="text-[#0F1E2E]/60 text-xs tracking-wider uppercase font-light mb-2 block">
                      Inquiry Type
                    </label>
                    <Select value={form.inquiry_type} onValueChange={(v) => setForm({ ...form, inquiry_type: v })}>
                      <SelectTrigger className="border-0 border-b border-[#0F1E2E]/15 rounded-none bg-transparent px-0 py-3 text-[#0F1E2E] font-light focus:ring-0 h-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-[#0F1E2E]/60 text-xs tracking-wider uppercase font-light mb-2 block">
                    Message
                  </label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    className="border-0 border-b border-[#0F1E2E]/15 rounded-none bg-transparent px-0 py-3 text-[#0F1E2E] font-light focus-visible:ring-0 focus-visible:border-[#C4A97D] transition-colors resize-none"
                    placeholder="Tell us about your vision..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex items-center gap-3 text-[#0F1E2E] text-sm tracking-widest uppercase font-light hover:text-[#C4A97D] transition-colors duration-500 group"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}