"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import ServicesDropdown from "./ServicesDropdown";

const NavLinks = () => {
  const [servicesOpen, setServicesOpen] = useState(false);

  const linkVariants = {
    initial: { y: -5, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { scale: 1.05 },
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about-us" },
    { name: "Jobseekers", href: "/job-seeker" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      {navLinks.map((link, index) => (
        <motion.div
          key={link.name}
          variants={linkVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="relative"
        >
          {index === 1 ? (
            <motion.div
              className="relative"
              variants={linkVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              onHoverStart={() => setServicesOpen(true)}
              onHoverEnd={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center text-white/90 hover:text-[#51D4D6] font-medium transition-colors duration-200"
              >
                Services
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-1"
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && <ServicesDropdown />}
              </AnimatePresence>
            </motion.div>
          ) : (
            <Link
              href={link.href}
              className="text-white/90 hover:text-[#51D4D6] font-medium transition-colors duration-200"
            >
              {link.name}
            </Link>
          )}
        </motion.div>
      ))}

      {/* Jobs Button */}
      <motion.div
        variants={linkVariants}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/jobs"
          className="rounded-md bg-[#51D4D6] px-6 py-3 text-base font-medium text-[#1e1e1e] transition-colors hover:bg-[#3FAFB1]"
        >
          Listed Jobs
        </Link>
      </motion.div>
    </>
  );
};

export default NavLinks;
