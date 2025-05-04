"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, BarChart2, Heart } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Access to Top Talent",
      description:
        "We connect you with industry-leading professionals who fit your company's culture and goals.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Efficient Hiring Process",
      description:
        "Our streamlined process saves you time and resources, ensuring you get the right candidate quickly.",
      icon: <Target size={24} />,
    },
    {
      title: "Data-Driven Insights",
      description:
        "Benefit from advanced analytics and market insights to inform your hiring strategy.",
      icon: <BarChart2 size={24} />,
    },
    {
      title: "Dedicated Support",
      description:
        "Our team is committed to your success, providing continuous support and guidance.",
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
          Why Choose Our Recruitment Services?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="gap-subtitle"
        >
          Discover the advantages of partnering with us for your hiring needs.
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
