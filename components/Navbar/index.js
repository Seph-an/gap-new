"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { imageUrl } from "@/lib/cms/strapi";
import { normalizeListedJobsLink } from "@/lib/jobs";

const JOBS_ROUTE = "/jobs-at-gap-recruitment-services-kenya";

function pathnameFromHref(href) {
  if (!href) return "";
  let value;
  try {
    value = new URL(href, "http://localhost").pathname;
  } catch {
    value = href.split(/[?#]/)[0];
  }
  if (value.length > 1 && value.endsWith("/")) value = value.slice(0, -1);
  return value || "/";
}

function isActiveRoute(pathname, href) {
  const target = pathnameFromHref(normalizeListedJobsLink(href));
  const current = pathnameFromHref(pathname || "/");
  if (!target || target === "/") return current === target;
  return current === target || current.startsWith(target + "/");
}

export default function Navbar({ global }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [jobSeekersOpen, setJobSeekersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = (global?.navLinks || []).filter((item) => item.enabled !== false);
  const serviceLinks = global?.serviceLinks || [];
  const jobSeekerLinks = global?.jobSeekerLinks || [];
  const logo = global?.assets?.logo;
  const servicesActive = serviceLinks.some((service) => isActiveRoute(pathname, service.link?.url));
  const jobSeekersActive = isActiveRoute(pathname, "/job-seeker") || jobSeekerLinks.some((link) => isActiveRoute(pathname, link.link?.url));

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
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((item) => item.href === "/services" ? (
              <div key={item.name} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                <button onClick={() => setServicesOpen(!servicesOpen)} aria-current={servicesActive ? "page" : undefined} className={"flex items-center font-medium transition-colors duration-200 hover:text-[#51D4D6] " + (servicesActive ? "text-[#51D4D6]" : "text-white/90")}>
                  {item.name}<ChevronDown size={16} className="ml-1" />
                </button>
                <AnimatePresence>{servicesOpen && <ServiceDropdown services={serviceLinks} pathname={pathname} />}</AnimatePresence>
              </div>
            ) : item.href === "/job-seeker" ? (
              <div key={item.name} className="relative" onMouseEnter={() => setJobSeekersOpen(true)} onMouseLeave={() => setJobSeekersOpen(false)}>
                <div className="flex items-center">
                  <Link href={item.href} aria-current={jobSeekersActive ? "page" : undefined} className={"relative inline-flex font-medium transition-colors duration-200 hover:text-[#51D4D6] " + (jobSeekersActive ? "text-[#51D4D6]" : "text-white/90")}>
                    {item.name}{item.showBadge && item.badgeText && <NavBadge item={item} />}
                  </Link>
                  <button type="button" onClick={() => setJobSeekersOpen(!jobSeekersOpen)} aria-label={`Toggle ${item.name} menu`} aria-expanded={jobSeekersOpen} className="ml-1 p-1 text-white/90 transition-colors hover:text-[#51D4D6]">
                    <ChevronDown size={16} />
                  </button>
                </div>
                <AnimatePresence>{jobSeekersOpen && <ServiceDropdown services={jobSeekerLinks} pathname={pathname} />}</AnimatePresence>
              </div>
            ) : <NavLink key={item.name} item={item} pathname={pathname} />)}
          </div>
          <motion.button className="lg:hidden z-50" onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}>
            {isOpen ? <X size={52} color="#51d4d6" /> : <Menu size={52} color="#51d4d6" />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>{isOpen && <MobileNav navLinks={navLinks} serviceLinks={serviceLinks} jobSeekerLinks={jobSeekerLinks} setIsOpen={setIsOpen} pathname={pathname} />}</AnimatePresence>
    </nav>
  );
}

function NavLink({ item, pathname }) {
  const href = normalizeListedJobsLink(item.href);
  const active = isActiveRoute(pathname, href);
  const jobsListingActive = pathnameFromHref(pathname) === JOBS_ROUTE && pathnameFromHref(href) === JOBS_ROUTE;
  const className = item.external
    ? "rounded-md px-6 py-3 text-base font-medium transition-colors " + (jobsListingActive ? "cursor-not-allowed bg-gray-500 text-gray-200" : "bg-[#51D4D6] text-[#1e1e1e] hover:bg-[#3FAFB1]")
    : "relative inline-flex font-medium transition-colors duration-200 hover:text-[#51D4D6] " + (active ? "text-[#51D4D6]" : "text-white/90");

  if (jobsListingActive) return <span className={className} aria-current="page" aria-disabled="true">{item.name}</span>;
  if ((item.external && href === item.href) || href?.startsWith("http")) return <a href={href} className={className} aria-current={active ? "page" : undefined}>{item.name}{item.showBadge && item.badgeText && <NavBadge item={item} />}</a>;
  return <Link href={href} className={className} aria-current={active ? "page" : undefined}>{item.name}{item.showBadge && item.badgeText && <NavBadge item={item} />}</Link>;
}

function NavBadge({ item }) {
  const animation = item.badgeAnimated ? { rotate: [0, 7, 0] } : { rotate: 0 };
  const transition = item.badgeAnimated ? { duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.35 } : undefined;
  return <motion.span aria-hidden="true" className="absolute right-2 -top-3 rounded-[3px] bg-red-600 px-1.5 py-0.5 text-[8px] font-extrabold leading-none tracking-wide text-white shadow-sm" animate={animation} transition={transition}>{item.badgeText}</motion.span>;
}

function ServiceDropdown({ services, pathname }) {
  return <motion.div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><div className="py-2">{services.map((service) => {
    const active = isActiveRoute(pathname, service.link?.url);
    return <div key={service.title} className="group px-4 py-3 hover:bg-[#0a0a0a] transition-colors duration-200"><Link href={service.link?.url || "#"} aria-current={active ? "page" : undefined} className="block"><span className={"block text-sm font-medium transition-colors duration-200 group-hover:text-[#51D4D6] " + (active ? "text-[#51D4D6]" : "text-white/90")}>{service.title}</span><span className="block mt-1 text-xs text-gray-300">{service.description}</span></Link></div>;
  })}</div></motion.div>;
}

function MobileNav({ navLinks, serviceLinks, jobSeekerLinks, setIsOpen, pathname }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [jobSeekersOpen, setJobSeekersOpen] = useState(false);
  const servicesActive = serviceLinks.some((service) => isActiveRoute(pathname, service.link?.url));
  const jobSeekersActive = isActiveRoute(pathname, "/job-seeker") || jobSeekerLinks.some((link) => isActiveRoute(pathname, link.link?.url));

  return <motion.div className="lg:hidden fixed inset-0 bg-[#0a0a0a] z-40 pt-20 pb-6 px-4 overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="flex flex-col space-y-4">{navLinks.map((item) => item.href === "/services" ? <div key={item.name}><button onClick={() => setServicesOpen(!servicesOpen)} aria-current={servicesActive ? "page" : undefined} className={"flex items-center justify-between w-full py-3 text-lg font-medium hover:text-[#51D4D6] " + (servicesActive ? "text-[#51D4D6]" : "text-white/90")}><span>{item.name}</span><ChevronDown size={20} /></button>{servicesOpen && <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-md mt-2">{serviceLinks.map((service) => {
    const active = isActiveRoute(pathname, service.link?.url);
    return <Link key={service.title} href={service.link?.url || "#"} aria-current={active ? "page" : undefined} className={"block py-2 hover:text-[#51D4D6] " + (active ? "text-[#51D4D6]" : "text-gray-700")} onClick={() => setIsOpen(false)}>{service.title}</Link>;
  })}</div>}</div> : item.href === "/job-seeker" ? <div key={item.name}><div className="flex items-center justify-between"><Link href={item.href} aria-current={jobSeekersActive ? "page" : undefined} className={"relative py-3 text-lg font-medium hover:text-[#51D4D6] " + (jobSeekersActive ? "text-[#51D4D6]" : "text-white/90")} onClick={() => setIsOpen(false)}>{item.name}{item.showBadge && item.badgeText && <NavBadge item={item} />}</Link><button type="button" onClick={() => setJobSeekersOpen(!jobSeekersOpen)} aria-label={`Toggle ${item.name} menu`} aria-expanded={jobSeekersOpen} className="p-3 text-white/90 hover:text-[#51D4D6]"><ChevronDown size={20} /></button></div>{jobSeekersOpen && <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-md mt-2">{jobSeekerLinks.map((link) => {
    const active = isActiveRoute(pathname, link.link?.url);
    return <Link key={link.title} href={link.link?.url || "#"} aria-current={active ? "page" : undefined} className={"block py-2 hover:text-[#51D4D6] " + (active ? "text-[#51D4D6]" : "text-gray-700")} onClick={() => setIsOpen(false)}>{link.title}</Link>;
  })}</div>}</div> : <MobileNavLink key={item.name} item={item} pathname={pathname} setIsOpen={setIsOpen} />)}</div></motion.div>;
}

function MobileNavLink({ item, pathname, setIsOpen }) {
  const href = normalizeListedJobsLink(item.href);
  const active = isActiveRoute(pathname, href);
  const jobsListingActive = pathnameFromHref(pathname) === JOBS_ROUTE && pathnameFromHref(href) === JOBS_ROUTE;
  const className = "relative w-fit py-3 text-lg font-medium transition-colors " + (jobsListingActive ? "cursor-not-allowed text-gray-500" : active ? "text-[#51D4D6]" : "text-white/90 hover:text-[#51D4D6]");

  if (jobsListingActive) return <span className={className} aria-current="page" aria-disabled="true">{item.name}</span>;
  return <Link href={href} className={className} aria-current={active ? "page" : undefined} onClick={() => setIsOpen(false)}>{item.name}{item.showBadge && item.badgeText && <NavBadge item={item} />}</Link>;
}
