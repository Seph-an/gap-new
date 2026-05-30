"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, Handshake } from "lucide-react";

export default function Process() {
  const steps = [
    {
      title: "Specialized Recruitment Sourcing",
      description:
        "We don't just post jobs; we actively map the market. Using our deep talent networks across Nairobi and East Africa, we headhunt both active and passive professionals tailored to your precise roles.",
      icon: <Search size={24} />,
    },
    {
      title: "Rigorous Vetting & Assessment",
      description:
        "Our recruitment experts conduct multi-layered screenings. We evaluate technical track records and cultural fit to ensure every candidate on your shortlist is ready to deliver.",
      icon: <UserCheck size={24} />,
    },
    {
      title: "Final Placement & Compliance",
      description:
        "We manage the entire recruitment pipeline, from interview coordination to local labor law compliance and salary benchmarking, ensuring a smooth onboarding transition.",
      icon: <Handshake size={24} />,
    },
  ];

  return (
    <section id="overview" className="section-light">
      <div className="container">
        {/* Title */}
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="gap-title"
        >
          Our Recruitment Process
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="gap-subtitle"
        >
          A structured, fully compliant recruitment journey delivered in{" "}
          <span className="text-[#51D4D6]">three simple phases.</span>
        </motion.p>

        {/* Process Steps */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2 + index * 0.2, // Staggered animation for each step
              }}
              className="relative gap-card bg-[#0a0a0a]"
            >
              <div className="gap-icon">{step.icon}</div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-content">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
