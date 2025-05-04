"use client";

import {
  DollarSign,
  Percent,
  UserPlus,
  BarChart2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const types = [
    {
      icon: <DollarSign size={24} />,
      title: "Salary Processing",
      description:
        "Automate your salary runs with seamless integration and on-time processing every time.",
    },
    {
      icon: <Percent size={24} />,
      title: "Tax Compliance",
      description:
        "Ensure every tax deduction is handled accurately while staying compliant with local laws.",
    },
    {
      icon: <UserPlus size={24} />,
      title: "Employee Benefits",
      description:
        "Manage benefits effortlessly with our integrated solutions designed for modern workplaces.",
    },
    {
      icon: <BarChart2 size={24} />,
      title: "Reporting & Analytics",
      description:
        "Gain actionable insights with comprehensive reports and real-time analytics.",
    },
  ];

  return (
    <section id="payroll-services" className="section-dark">
      <div className="container">
        {/* Title */}
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="gap-title"
        >
          Our Payroll Services
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="gap-subtitle"
        >
          Step into a new era where every paycheck is a breeze, taxes are tamed,
          and benefits are{" "}
          <span className="text-[#51D4D6]">built just for you.</span>
        </motion.p>

        {/* Service Cards */}
        <div className="service-grid">
          {types.map((type, index) => (
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
              className="flex flex-col items-center p-6 bg-[#1e1e1e] rounded-lg gap-shadow"
            >
              <div className="gap-icon">{type.icon}</div>
              <h3 className="card-title">{type.title}</h3>
              <p className="card-content">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="w-full flex flex-col items-center gap-8"
        >
          <p className="gap-subtitle max-w-3xl ">
            <span className="text-[#51D4D6]">Fed up with payroll puzzles?</span>{" "}
            Let’s craft a flawless pay experience together!
          </p>

          <a href="/contact-us" className="gap-button gap-button-primary mt-8">
            Connect with us <ArrowRight size={20} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
