// components/TestimonialsSection.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const testimonies = testimoniesData[activeCategory];
  const totalTestimonies = testimonies.length;

  const prevTestimonyWithFade = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalTestimonies - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 800);
  };

  //   const prevTestimony = () => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === 0 ? totalTestimonies - 1 : prevIndex - 1
  //     );
  //   };

  const nextTestimonyWithFade = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalTestimonies - 1 ? 0 : prevIndex + 1
      );
      setIsFading(false);
    }, 800); // 800ms fade duration
  };

  //   const nextTestimony = () => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === totalTestimonies - 1 ? 0 : prevIndex + 1
  //     );
  //   };

  // Reset index when category changes

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  // Set up Intersection Observer to detect if section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto-cycle the carousel every 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      nextTestimonyWithFade();
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, activeCategory, currentIndex]);
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       nextTestimony();
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }, [activeCategory, currentIndex]);

  return (
    <section
      ref={containerRef}
      className="py-20 w-screen px-6 md:px-12 lg:px-20 "
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-white/90">
          What Some of Our Clients Say
        </h2>
        <p className="text-lg text-gray-400 mb-12">
          Hear from jobseekers who have transformed their careers with our
          services.
        </p>
        {/* Service Category Toggle */}
        <div className="flex justify-center flex-wrap md:flex-nowrap space-x-4 mb-8">
          {serviceCategories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`px-4 py-2 rounded-md transition-shadow duration-300 delay-150 ease-in-out ${
                activeCategory === category.key
                  ? "bg-[#51D4D6] text-[#0a0a0a]"
                  : "bg-gray-200 text-gray-800 hover:shadow-[0_0_10px_#51D4D6]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        {/* Testimonial Carousel */}
        <div className="relative bg-[#1e1e1e] p-8 rounded-lg shadow-md flex flex-col justify-center min-h-[250px]">
          {/* Huge Opening Quotation Mark */}
          <div className="absolute top-[-50%] left-[50%] -translate-x-1/2 text-[450px] text-gray-600 opacity-10 select-none pointer-events-none">
            &ldquo;
          </div>
          <div
            className={`relative z-10 text-gray-300 transition-opacity duration-500 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-xl italic mb-2 md:mb-4">
              "{testimonies[currentIndex].content}"
            </p>
            <p className="font-bold">- {testimonies[currentIndex].name}</p>
          </div>
          {/* Carousel Navigation */}
          <div className="flex justify-between mt-[-20px] relative z-10">
            <button
              onClick={prevTestimonyWithFade}
              className="text-[#51D4D6] p-2 rounded-lg transition-colors duration-300 hover:bg-[#0a0a0a]"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextTestimonyWithFade}
              className="text-[#51D4D6] p-2 rounded-lg transition-colors duration-300 hover:bg-[#0a0a0a]"
            >
              <ChevronRight size={32} />
            </button>
          </div>
          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 space-x-2 relative z-10">
            {testimonies.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-[#51D4D6]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        {/* CTA at the end of Testimonials */}
        <p className="text-base lg:text-lg text-gray-400 text-center max-w-5xl mx-auto mt-16">
          Join the ranks of our satisfied jobseekers and experience the
          difference firsthand! If you're ready to{" "}
          <span className="text-[#51D4D6]">supercharge your job search, </span>
          get in touch with us today.
        </p>
        <a
          href="/contact-us"
          className="mt-8 inline-flex items-center bg-[#51D4D6] text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Get in touch now <ArrowRight size={20} className="ml-2" />
        </a>
      </div>
    </section>
  );
};

export default TestimonialsSection;
