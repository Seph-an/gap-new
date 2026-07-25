"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { imageUrl } from "@/lib/cms/strapi";

export default function Navbar({ global }) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = global?.navLinks || [];
  const serviceLinks = global?.serviceLinks || [];
  const logo = global?.assets?.logo;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-screen px-4 sm:px-6 md:px-12 lg:px-20 z-50 transition-all duration-300 ${scrolled ? "bg-[#1e1e1e] shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/">
            {logo && <Image src={imageUrl(logo)} alt={global?.footer?.brand || ""} width={250} height={250} className="w-[100px] lg:w-[120px] object-contain" />}
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => item.href === "/services" ? (
              <div key={item.name} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center font-medium text-white/90 hover:text-[#51D4D6]">
                  {item.name}<ChevronDown size={16} className="ml-1" />
                </button>
                <AnimatePresence>{servicesOpen && <ServiceDropdown services={serviceLinks} />}</AnimatePresence>
              </div>
            ) : <NavLink key={item.name} item={item} />)}
          </div>
          <motion.button className="lg:hidden z-50" onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}>
            {isOpen ? <X size={52} color="#51d4d6" /> : <Menu size={52} color="#51d4d6" />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>{isOpen && <MobileNav navLinks={navLinks} serviceLinks={serviceLinks} setIsOpen={setIsOpen} />}</AnimatePresence>
    </nav>
  );
}

function NavLink({ item }) {
  const className = item.external ? "rounded-md bg-[#51D4D6] px-6 py-3 text-base font-medium text-[#1e1e1e] transition-colors hover:bg-[#3FAFB1]" : "font-medium text-white/90 hover:text-[#51D4D6] transition-colors duration-200";
  if (item.external || item.href?.startsWith("http")) return <a href={item.href} className={className}>{item.name}</a>;
  return <Link href={item.href} className={className}>{item.name}</Link>;
}

function ServiceDropdown({ services }) {
  return <motion.div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><div className="py-2">{services.map((service) => <div key={service.title} className="px-4 py-3 hover:bg-[#0a0a0a] transition-colors duration-200"><Link href={service.link?.url || "#"} className="block"><span className="block text-sm font-medium text-white/90">{service.title}</span><span className="block mt-1 text-xs text-gray-300">{service.description}</span></Link></div>)}</div></motion.div>;
}

function MobileNav({ navLinks, serviceLinks, setIsOpen }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  return <motion.div className="lg:hidden fixed inset-0 bg-[#0a0a0a] z-40 pt-20 pb-6 px-4 overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="flex flex-col space-y-4">{navLinks.filter((item) => item.href !== "/services").map((item) => <div key={item.name}><Link href={item.href} className="block py-3 text-lg font-medium text-white/90 hover:text-[#51D4D6]" onClick={() => setIsOpen(false)}>{item.name}</Link></div>)}<button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full py-3 text-lg font-medium text-white/90 hover:text-[#51D4D6]"><span>{navLinks.find((item) => item.href === "/services")?.name}</span><ChevronDown size={20} /></button>{servicesOpen && <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-md mt-2">{serviceLinks.map((service) => <Link key={service.title} href={service.link?.url || "#"} className="block py-2 text-gray-700 hover:text-[#51D4D6]" onClick={() => setIsOpen(false)}>{service.title}</Link>)}</div>}</div></motion.div>;
}
