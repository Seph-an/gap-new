"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-screen px-4 sm:px-6 md:px-12 lg:px-20 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1e1e1e] shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="Gap Recruitment Services, Payroll Management and Workforce Outsourcing Logo"
              priority
              width={250}
              height={250}
              className="w-[100px] lg:w-[120px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden z-50"
            onClick={() => {
              console.log("Before toggle:", isOpen);
              setIsOpen(!isOpen);
              console.log("After toggle:", !isOpen);
            }}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={52} color="#51d4d6" />
            ) : (
              <Menu size={52} color="#51d4d6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && <MobileNav setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
