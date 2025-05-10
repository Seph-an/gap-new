"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MobileNav = ({ setIsOpen }) => {
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-us" },
    { name: "Jobseekers", href: "/job-seeker" },
    { name: "Contact", href: "/contact-us" },
    { name: "Blog", href: "/blog" },
  ];

  const serviceLinks = [
    {
      name: "Recruitment",
      href: "/recruitment-services",
    },
    {
      name: "Payroll Management",
      href: "/payroll-management",
    },
    {
      name: "Staff Outsourcing",
      href: "/staff-outsourcing",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const servicesVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
          delay: 0.1,
        },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  return (
    <motion.div
      className="lg:hidden fixed inset-0 bg-[#0a0a0a] z-40 pt-20 pb-6 px-4 overflow-y-auto"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col space-y-4"
        variants={containerVariants}
      >
        {navLinks.map((link) => (
          <motion.div key={link.name} variants={itemVariants}>
            <Link
              href={link.href}
              className="block py-3 text-lg font-medium text-whie/90 hover:text-[#51D4D6]"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}

        {/* Services Dropdown */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="flex items-center justify-between w-full py-3 text-lg font-medium text-white/90 hover:text-[#51D4D6]"
          >
            <span>Services</span>
            <motion.span
              animate={{ rotate: servicesOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.span>
          </button>

          <motion.div
            initial="hidden"
            animate={servicesOpen ? "visible" : "hidden"}
            variants={servicesVariants}
            className="overflow-hidden"
          >
            <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-md mt-2">
              {serviceLinks.map((service) => (
                <motion.div key={service.name} variants={itemVariants}>
                  <Link
                    href={service.href}
                    className="block py-2 text-gray-700 hover:text-[#51D4D6]"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Jobs Button */}
        <motion.div variants={itemVariants} className="pt-2">
          <Link
            href="https://www.careers-page.com/gaprecruitment"
            className="bg-[#51D4D6] w-[200px] justify-center inline-flex items-center text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity duration-500 ease-in-out"
            onClick={() => setIsOpen(false)}
          >
            Jobs
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MobileNav;
