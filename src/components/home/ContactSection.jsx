import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CheckCircle } from "lucide-react";

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
    <section id="contact" className="bg-white py-28 px-8 md:px-16 border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#C4A97D]" />
              <span className="text-[#C4A97D] text-[10px] tracking-[0.4em] uppercase font-light">Contact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-thin text-[#0F1E2E] tracking-tight leading-tight">
              Start a<br /><span className="italic font-extralight">conversation.</span>
            </h2>
            <p className="mt-8 text-[#0F1E2E]/40 font-light text-base leading-relaxed max-w-sm">
              Whether you're looking to invest, partner, or find your next home — we'd love to hear from you.
            </p>

            <div className="mt-14 space-y-6 text-sm font-light">
              {[
                { label: "Email", value: "hello@lotusbrothers.com" },
                { label: "Phone", value: "+1 (512) 555-0180" },
                { label: "Address", value: "123 Innovation Drive, Austin, TX 78701" },
              ].map(item => (
                <div key={item.label} className="flex gap-6 border-b border-black/5 pb-6">
                  <span className="text-[#0F1E2E]/30 text-[10px] tracking-[0.3em] uppercase w-20 pt-0.5">{item.label}</span>
                  <span className="text-[#0F1E2E]/60">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full py-16">
                <div className="w-12 h-12 rounded-full bg-[#C4A97D]/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-[#C4A97D]" />
                </div>
                <h3 className="text-2xl font-light text-[#0F1E2E]">Message received.</h3>
                <p className="mt-3 text-[#0F1E2E]/40 font-light">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-7">
                  <Field label="Full Name">
                    <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Jane Smith" className={inputCls} />
                  </Field>
                  <Field label="Email">
                    <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="jane@example.com" className={inputCls} />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-7">
                  <Field label="Phone">
                    <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" className={inputCls} />
                  </Field>
                  <Field label="Inquiry Type">
                    <Select value={form.inquiry_type} onValueChange={v => setForm({ ...form, inquiry_type: v })}>
                      <SelectTrigger className="border-0 border-b border-black/15 rounded-none bg-transparent px-0 py-3 text-[#0F1E2E] font-light focus:ring-0 h-auto text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field label="Message">
                  <Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4} placeholder="Tell us about your project..." className={`${inputCls} resize-none`} />
                </Field>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-3 bg-[#0F1E2E] text-white text-xs tracking-[0.25em] uppercase font-light px-8 py-4 hover:bg-[#1a2e42] transition-colors group mt-2"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const inputCls = "border-0 border-b border-black/15 rounded-none bg-transparent px-0 py-3 text-[#0F1E2E] font-light focus-visible:ring-0 focus-visible:border-[#0F1E2E] transition-colors text-sm";

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[#0F1E2E]/35 text-[10px] tracking-[0.3em] uppercase font-light mb-2 block">{label}</label>
      {children}
    </div>
  );
}