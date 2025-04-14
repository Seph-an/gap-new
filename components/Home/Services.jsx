// "use client";

// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// const Services = () => {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.8 });

//   return (
//     <section ref={ref} id="services" className="py-16 bg-gray-100">
//       <div className="max-w-7xl mx-auto text-center">
//         {/* Catchy Headline */}
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="text-3xl font-bold text-gray-900"
//         >
//           Workforce Solutions That Drive Growth
//         </motion.h2>

//         {/* Subheadline */}
//         <motion.p
//           initial={{ opacity: 0, y: -10 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//           className="mt-4 text-lg max-w-3xl mx-auto text-gray-600"
//         >
//           From recruitment to payroll and outsourcing, we handle everything so
//           you can focus on what matters—growing your business.
//         </motion.p>
//       </div>

//       {/* Services Grid */}
//       <motion.div
//         className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-10 px-4"
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"}
//         variants={{
//           visible: { transition: { staggerChildren: 0.3 } },
//         }}
//       >
//         {/* Feature 1 */}
//         <motion.div
//           className="bg-white overflow-hidden shadow rounded-lg"
//           variants={{
//             hidden: { opacity: 0, y: -20 },
//             visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//           }}
//         >
//           <div className="px-4 py-5 sm:p-6">
//             <h3 className="text-lg font-medium text-gray-900">
//               Recruitment Services
//             </h3>
//             <p className="mt-2 text-sm text-gray-500">
//               Find the right talent for your organization with our comprehensive
//               recruitment solutions.
//             </p>
//           </div>
//         </motion.div>

//         {/* Feature 2 */}
//         <motion.div
//           className="bg-white overflow-hidden shadow rounded-lg"
//           variants={{
//             hidden: { opacity: 0, y: -20 },
//             visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//           }}
//         >
//           <div className="px-4 py-5 sm:p-6">
//             <h3 className="text-lg font-medium text-gray-900">
//               Payroll Management
//             </h3>
//             <p className="mt-2 text-sm text-gray-500">
//               Streamline your payroll processes with our efficient and reliable
//               payroll management services.
//             </p>
//           </div>
//         </motion.div>

//         {/* Feature 3 */}
//         <motion.div
//           className="bg-white overflow-hidden shadow rounded-lg"
//           variants={{
//             hidden: { opacity: 0, y: -20 },
//             visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//           }}
//         >
//           <div className="px-4 py-5 sm:p-6">
//             <h3 className="text-lg font-medium text-gray-900">
//               Staff Outsourcing
//             </h3>
//             <p className="mt-2 text-sm text-gray-500">
//               Access flexible workforce solutions with our staff outsourcing
//               services.
//             </p>
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default Services;

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Recruitment Services",
    description:
      "Find the right talent for your organization with our expert recruitment solutions.",
    link: "/recruitment-services",
    cta: "Find top talent",
  },
  {
    title: "Payroll Management",
    description:
      "Streamline payroll processes with our efficient and reliable payroll management services.",
    link: "/payroll-management",
    cta: "Simplify your payroll",
  },
  {
    title: "Staff Outsourcing",
    description:
      "Access flexible workforce solutions with our tailored staff outsourcing services.",
    link: "/staff-outsourcing",
    cta: "Scale your workforce",
  },
];

const Services = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.8 });

  return (
    <section ref={ref} id="services" className="section-dark ">
      <div className="container ">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="gap-title"
        >
          Our services
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="gap-subtitle"
        >
          We take care of{" "}
          <span className="text-[#51D4D6]">recruitment, payroll,</span> and{" "}
          <span className="text-[#51D4D6]">outsourcing</span> so you can focus
          on scaling your business.
        </motion.p>
        {/* Services Grid */}
        <motion.div
          className="grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16 px-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          {services.map((service, index) => (
            <motion.a
              href={service.link}
              key={service.title}
              className="bg-[#1e1e1e] gap-card"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.2 },
                },
              }}
            >
              <h3 className="card-title self-start">{service.title}</h3>
              <p className="mt-2 text-gray-400">{service.description}</p>
              <span className="self-start mt-4 inline-flex items-center text-[#51d4d6]">
                {service.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </motion.a>
          ))}
        </motion.div>
        {/* Additional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="gap-subtitle mb-6">
            Would you like to{" "}
            <span className="text-[#51d4d6]">talk to someone</span> about any of
            these solutions?
          </p>
          <Link href="/contact-us" className="gap-button gap-button-primary">
            <span>Get in touch now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
// mt-2 text-center text-gray-400
