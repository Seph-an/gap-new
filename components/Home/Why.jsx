"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import ClientsMarquee from "./ClientsMarquee";

const accolades = [
  "Certified HR Solutions - IHRM",
  "Certified Data Handler - ODPC",
  "Certified HR Trainer - NITA",
  "A Certified Blue Company",
];

const stats = [
  { value: 5, label: "Years of Experience" },
  { value: 100, label: "Trusted Partners" },
  { value: 5000, label: "Hired Talent" },
  { value: 10, label: "Payroll Solutions" },
];

const WhyUs = () => {
  const [visibleStats, setVisibleStats] = useState(stats.map(() => 0));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        const increment = Math.ceil(stat.value / 100); // Increment value for smooth animation
        let currentValue = 0;

        const interval = setInterval(() => {
          setVisibleStats((prev) => {
            const newStats = [...prev];
            if (currentValue < stat.value) {
              currentValue += increment;
              newStats[index] = Math.min(currentValue, stat.value); // Ensure it doesn't exceed the target value
            }
            return newStats;
          });

          if (currentValue >= stat.value) {
            clearInterval(interval); // Stop the interval when the target value is reached
          }
        }, 20); // Update every 20ms
      });
    }
  }, [isInView]); // Only run when `isInView` changes

  return (
    <section id="why-us" className="section-light">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container"
      >
        {/* Title */}
        <motion.h3
          variants={itemVariants}
          className="text-lg md:text-xl text-[#51d4d6] text-center font-semibold mb-4"
        >
          Why work with us?
        </motion.h3>
        {/* Main Title */}
        <motion.h2 variants={itemVariants} className="gap-title">
          We are experienced and trusted
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="gap-subtitle max-w-5xl mx-auto text-center"
        >
          Businesses trust us for top-tier payroll solutions, recruitment, and
          staff outsourcing. We streamline workforce management with{" "}
          <span className="text-[#51d4d6]">efficiency, speed </span> and{" "}
          <span className="text-[#51d4d6]">accuracy.</span>
        </motion.p>

        {/* Partner Logos */}
        <motion.div variants={itemVariants}>
          <ClientsMarquee />
        </motion.div>

        {/* Social Proof Numbers */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 my-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center bg-[#0a0a0a] p-6 rounded-lg shadow-md"
            >
              <span className="text-2xl md:text-3xl font-bold text-white/80">
                {visibleStats[index]}+
              </span>
              <p className="mt-2 text-base text-[#51d4d6]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Accolades Section */}
        <motion.h3 variants={itemVariants} className="gap-title">
          We are qualified and proficient.
        </motion.h3>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-8"
        >
          {accolades.map((accolade, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="gap-card bg-[#0a0a0a]"
            >
              <CheckCircle className="text-[#51d4d6]" />
              <p className="card-content">{accolade}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <div className="flex flex-col items-center gap-4">
          <motion.p variants={itemVariants} className="gap-subtitle ">
            Discover more about why we are{" "}
            <span className="text-[#51D4D6]">your</span> best{" "}
            <span className="text-[#51D4D6]">talent solutions partner </span>
            here:
          </motion.p>
          <motion.a
            variants={itemVariants}
            href="/about-us"
            className="gap-button gap-button-primary"
          >
            <span>More about us</span>
            <ArrowRight className="ml-2" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyUs;
