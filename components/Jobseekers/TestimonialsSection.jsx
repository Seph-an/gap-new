// components/TestimonialsSection.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { testimoniesData } from "./testimoniesData";

const serviceCategories = [
  { key: "cvRevamp", label: "CV Revamp" },
  { key: "linkedinOptimisation", label: "LinkedIn Optimisation" },
  { key: "interviewPreparation", label: "Interview Preparation" },
];

const TestimonialsSection = () => {
  const [activeCategory, setActiveCategory] = useState("cvRevamp");
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonies = testimoniesData[activeCategory];
  const totalTestimonies = testimonies.length;

  // Function to go to the previous testimony
  const prevTestimony = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalTestimonies - 1 : prevIndex - 1
    );
  };

  // Function to go to the next testimony
  const nextTestimony = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalTestimonies - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically move to the next testimony every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimony();
    }, 5000); // 5 seconds interval
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex, activeCategory]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.6 },
    }),
  };

  return (
    <motion.section
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20 w-screen px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-3xl font-bold mb-2 text-white/90"
        >
          What Some of Our Clients Say
        </motion.h2>
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-lg text-gray-400 mb-12"
        >
          Hear from jobseekers who have transformed their careers with our
          services.
        </motion.p>
        {/* Service Category Toggle */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="flex justify-center flex-wrap md:flex-nowrap space-x-4 mb-8"
        >
          {serviceCategories.map((category) => (
            <motion.button
              key={category.key}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              onClick={() => handleCategoryChange(category.key)}
              className={`px-4 py-2 rounded-md transition-shadow duration-300 delay-150 ease-in-out ${
                activeCategory === category.key
                  ? "bg-[#51D4D6] text-[#0a0a0a]"
                  : "bg-gray-200 text-gray-800 hover:shadow-[0_0_10px_#51D4D6]"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>
        {/* Testimonial Carousel */}
        <div className="relative bg-[#1e1e1e] p-8 rounded-lg shadow-md flex flex-col justify-center min-h-[250px]">
          {/* Huge Opening Quotation Mark */}
          <div className="absolute top-[-50%] left-[50%] -translate-x-1/2 text-[450px] text-gray-600 opacity-10 select-none pointer-events-none">
            &ldquo;
          </div>
          <div className="relative z-10 text-gray-300">
            <AnimatePresence initial={false} custom={1}>
              <motion.div
                key={currentIndex}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full"
              >
                <p className="text-xl italic mb-2 md:mb-4">
                  "{testimonies[currentIndex].content}"
                </p>
                <p className="font-bold">- {testimonies[currentIndex].name}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Carousel Navigation */}
          <div className="flex justify-between mt-[-20px] relative z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-16 text-[#51D4D6] p-2 rounded-lg transition-colors duration-300 hover:bg-[#0a0a0a]"
              onClick={prevTestimony}
            >
              <ChevronLeft size={32} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-16 text-[#51D4D6] p-2 rounded-lg transition-colors duration-300 hover:bg-[#0a0a0a]"
              onClick={nextTestimony}
            >
              <ChevronRight size={32} />
            </motion.button>
          </div>
          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 space-x-2 relative z-10">
            {testimonies.map((_, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-[#51D4D6]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        {/* CTA at the end of Testimonials */}
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="text-base lg:text-lg text-gray-400 text-center max-w-5xl mx-auto mt-16"
        >
          Join the ranks of our satisfied jobseekers and experience the
          difference firsthand! If you're ready to{" "}
          <span className="text-[#51D4D6]">supercharge your job search, </span>
          get in touch with us today.
        </motion.p>
        <motion.a
          href="/contact-us"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="mt-8 inline-flex items-center bg-[#51D4D6] text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Get in touch now <ArrowRight size={20} className="ml-2" />
        </motion.a>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
