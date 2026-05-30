"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, BarChart2, Heart } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Elite Talent & Executive Search Networks",
      description:
        "As a premier headhunting firm in Kenya, we maintain an active pipeline of pre-vetted, high-caliber professionals. We connect your enterprise with specialized experts who align seamlessly with your corporate culture and organizational goals across East Africa.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Streamlined, High-Velocity Hiring",
      description:
        "Our data-backed screening models eliminate hiring bottlenecks. By functioning as an agile recruitment company in Nairobi, we reduce your time-to-hire significantly, ensuring critical vacancies are filled quickly without sacrificing candidate quality or compliance.",
      icon: <Target size={24} />,
    },
    {
      title: "Advanced Market Insights & Analytics",
      description:
        "Standout recruitment firms in Kenya don’t just fill roles; they guide growth. We provide deep compensation benchmarking, labor market analytics, and talent mapping to help you build an incredibly competitive local or regional hiring strategy.",
      icon: <BarChart2 size={24} />,
    },
    {
      title: "Scalable Regional Workforce Support",
      description:
        "Our commitment extends far beyond the initial placement. Recognized among growing recruitment companies in Kenya, we offer dedicated, end-to-end consulting to support your talent retention and workforce scaling goals as you expand across Africa.",
      icon: <Heart size={24} />,
    },
  ];

  return (
    <section id="benefits" className="section-light">
      <div className="container">
        {/* Title */}
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="gap-title"
        >
          Why Choose Us as Your Recruitment Agency in Kenya?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="gap-subtitle"
        >
          Partner with a premier recruitment agency in Nairobi to access elite
          networks, streamline your hiring velocity, and leverage advanced market
          intelligence for scalable regional growth across Africa.
        </motion.p>

        {/* Benefit Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2 + index * 0.2, // Staggered animation for each card
              }}
              className="gap-card bg-[#0a0a0a]"
            >
              <div className="gap-icon">{benefit.icon}</div>
              <h3 className="card-title">{benefit.title}</h3>
              <p className="card-content">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
