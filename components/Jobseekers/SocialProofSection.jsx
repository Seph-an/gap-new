"use client";

// components/SocialProofSection.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SocialProofSection = () => {
  const stats = [
    { id: 1, value: 1000, label: "Winning CVs Written" },
    { id: 2, value: 250, label: "Interview Preparation Sessions" },
    { id: 3, value: 150, label: "LinkedIn Profiles Optimised" },
    { id: 4, value: 50, label: "New Jobs Placed Weekly" },
  ];

  const CountUp = ({ end, duration, delay }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const start = 0;
      const increment = end / (duration * 60); // Increment per frame (assuming 60fps)
      let current = start;
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(interval);
          } else {
            setCount(Math.ceil(current));
          }
        }, 1000 / 60); // 60fps
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }, [end, duration, delay]);

    return <>{count}</>;
  };

  return (
    <section className="py-12 w-screen px-6 md:px-12 lg:px-20 bg-[#1e1e1e]">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-3xl font-bold mb-2"
        >
          Our Success Stories
        </motion.h2>
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-lg text-gray-400 mb-8"
        >
          We are proud of{" "}
          <span className="text-[#51D4D6]">our track record</span> and the
          positive impact on our jobseekers.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2 + index * 0.2, // Staggered animation for each card
              }}
              className="bg-[#0a0a0a] p-6 rounded-lg gap-shadow"
            >
              <h3 className="text-3xl font-bold text-white/90 mb-2">
                <CountUp
                  end={stat.value}
                  duration={1.5}
                  delay={0.2 + index * 0.2} // Sync count-up with card animation
                />{" "}
                +
              </h3>
              <p className="text-[#51D4D6]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
