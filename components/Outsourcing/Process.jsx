"use client";

import { motion } from "framer-motion";
import { Blocks, UserSearch, ClipboardCheck, LineChart } from "lucide-react";

export default function Process() {
  const benefits = [
    {
      icon: <ClipboardCheck size={24} />,
      title: "Understanding Your Needs",
      description:
        "Collaborate with you to identify the specific roles and skills required to propel your business forward.",
    },
    {
      icon: <UserSearch size={24} />,
      title: "Selecting the Perfect Talent",
      description:
        "Tap into our extensive network to find professionals who align with your company culture and objectives.",
    },
    {
      icon: <Blocks size={24} />,
      title: "Seamless Integration",
      description:
        "Ensure a smooth onboarding process, integrating outsourced staff into your existing workflows effortlessly.",
    },
    {
      icon: <LineChart size={24} />,
      title: "Continuous Growth Monitoring",
      description:
        "Regularly assess performance and provide support to ensure ongoing success and improvement.",
    },
  ];

  return (
    <section id="process" className="section-light">
      <div className="container">
        {/* Title */}
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="gap-title"
        >
          How it works.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="gap-subtitle"
        >
          Finding the right <span className="text-[#51D4D6]">talent pool</span>{" "}
          made effortless – Here’s how we do it!
        </motion.p>

        {/* Process Cards */}
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
