"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function InternationalBanner() {
  return (
    <section className="section-light border-t border-white/5">
      <div className="container">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-6"
        >
          <h2 className="gap-title flex items-center justify-center gap-3">
            Hiring Internationally from the US, Europe, or the Middle East?
          </h2>
          
          <p className="gap-subtitle max-w-4xl mx-auto">
            Looking to build a compliant remote team or leverage an Employer of Record (EOR) 
            in Kenya without setting up a local legal entity?
          </p>

          <a href="/contact-us" className="gap-button gap-button-primary mt-4">
            Talk to Our EOR Experts <ArrowRight size={20} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
