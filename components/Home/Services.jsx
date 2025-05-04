"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Recruitment Services",
    description:
      "Find the right talent for your organization with our expert recruitment solutions.",
    link: "/recruitment-services",
    cta: "Find top talent",
  },
  {
    title: "Payroll Management",
    description:
      "Streamline payroll processes with our efficient and reliable payroll management services.",
    link: "/payroll-management",
    cta: "Simplify your payroll",
  },
  {
    title: "Staff Outsourcing",
    description:
      "Access flexible workforce solutions with our tailored staff outsourcing services.",
    link: "/staff-outsourcing",
    cta: "Scale your workforce",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-dark">
      <div className="container">
        {/* Title */}
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="gap-title"
        >
          Our Services
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="gap-subtitle"
        >
          We take care of{" "}
          <span className="text-[#51D4D6]">recruitment, payroll,</span> and{" "}
          <span className="text-[#51D4D6]">outsourcing</span> so you can focus
          on scaling your business.
        </motion.p>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16 px-4"
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          {services.map((service, index) => (
            <motion.a
              href={service.link}
              key={service.title}
              className="bg-[#1e1e1e] gap-card"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
            >
              <h3 className="card-title self-start">{service.title}</h3>
              <p className="mt-2 text-gray-400">{service.description}</p>
              <span className="self-start mt-4 inline-flex items-center text-[#51d4d6]">
                {service.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Additional CTA Section */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="gap-subtitle mb-6">
            Would you like to{" "}
            <span className="text-[#51d4d6]">talk to someone</span> about any of
            these solutions?
          </p>
          <Link href="/contact-us" className="gap-button gap-button-primary">
            <span>Get in touch now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
