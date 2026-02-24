"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="section-dark">
      <div className="container hero-container mt-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <div className="max-w-2xl text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="page-header"
          >
            Elevate Your Career Today!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="page-subheader"
          >
            Professional{" "}
            <span className="text-[#51D4D6]">
              CV Writing, LinkedIn Optimization,
            </span>{" "}
            & <span className="text-[#51D4D6]">Interview Coaching + </span>
            to help you land your dream job faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="https://cvitup.com"
              className="inline-flex items-center bg-[#51D4D6] text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Boost your job search <ArrowRight size={20} className="ml-2" />
            </a>
            <a
              href="https://www.careers-page.com/gaprecruitment"
              className="bg-gray-200 text-[#0a0a0a] px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Listed jobs
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
            src="/assets/find-a-job-with-expert-cv-writing-linkedin-optimization-and-interview-preparation-services-in-kenya.svg"
            alt="find-a-job-with-expert-cv-writing-linkedin-optimization-and-interview-preparation-services-in-kenya"
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
