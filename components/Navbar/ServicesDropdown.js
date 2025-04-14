"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ServicesDropdown = () => {
  const serviceLinks = [
    {
      name: "Recruitment Services",
      href: "/recruitment-services",
      description: "Find the right talent for your organization",
    },
    {
      name: "Payroll Management",
      href: "/payroll-management",
      description: "Streamline your payroll processes",
    },
    {
      name: "Staff Outsourcing",
      href: "/workforce-outsourcing",
      description: "Flexible workforce solutions",
    },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
    hover: { x: 5 },
  };

  return (
    <motion.div
      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50"
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="py-2">
        {serviceLinks.map((service) => (
          <motion.div
            key={service.name}
            variants={itemVariants}
            whileHover="hover"
            className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <Link href={service.href} className="block">
              <span className="block text-sm font-medium text-gray-900">
                {service.name}
              </span>
              <span className="block mt-1 text-xs text-gray-500">
                {service.description}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServicesDropdown;
