"use client";

import { useState, useEffect } from "react";
import { ArrowUpFromDot } from "lucide-react";

const Top = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="fixed z-30 bottom-4 right-6 bg-[#51d4d6] hover:opacity-90 font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 hover:focus:ring-[#51D4D6] focus:ring-opacity-50"
          onClick={scrollToTop}
        >
          <ArrowUpFromDot color="#0a0a0a" size={20} strokeWidth={2} />
        </button>
      )}
    </>
  );
};

export default Top;
