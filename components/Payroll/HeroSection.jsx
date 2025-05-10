"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="section-dark">
      <div className="container hero-container mt-20 xl:24">
        {/* Text Section */}
        <div className="max-w-2xl text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="page-header"
          >
            Streamline Your{" "}
            <span className="text-[#51D4D6]">Payroll Process</span> For Business
            Growth
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="page-subheader"
          >
            Experience{" "}
            <span className="text-[#51D4D6]">seamless, secure, </span>and
            <span className="text-[#51D4D6]"> scalable </span>payroll solutions
            tailored for your business needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-12"
          >
            <a
              href="#payroll-services"
              className="gap-button gap-button-primary"
            >
              Get Payroll Solutions <ArrowRight size={20} className="ml-2" />
            </a>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="w-full max-w-md lg:max-w-lg"
        >
          <Image
            src="/assets/payroll-management-solutions-for-successfull-businesses.svg"
            alt="payroll-management-solutions-for-successfull-businesses"
            width={400}
            height={300}
            sizes="(max-width: 600px) 100%, (max-width: 1200px) 500px, 33vw"
            className="mx-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
