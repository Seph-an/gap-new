// "use client";

// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section
//       className="relative w-full py-32 flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/assets/gap-bg.webp')" }}
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-70"></div>

//       {/* Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="relative z-10 text-center max-w-6xl"
//       >
//         {/* Title */}
//         <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white/90">
//           We Provide{" "}
//           <span className="text-[#51D4D6]">Payroll, Recruitment, </span> and
//           Staff <span className="text-[#51D4D6]">Outsourcing</span> Solutions
//         </h1>

//         {/* Subtitle */}
//         <p className="my-12 text-lg md:text-xl text-white/90">
//           Streamline Your Hiring Process, Simplify Payroll, and Scale Your
//           Workforce with Our Expert Services.
//         </p>

//         {/* Buttons */}
//         <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
//           {/* Recruit. Outsource. Pay Button */}
//           <motion.a
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             href="/services"
//             className="flex items-center gap-2 bg-[#51d4d6] text-[#1e1e1e] font-semibold text-lg py-3 px-6 rounded-lg transition-all shadow-md"
//           >
//             Recruit. Outsource. Pay <ArrowRight size={20} />
//           </motion.a>

//           {/* Jobseekers Button */}
//           <motion.a
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             href="/jobseekers"
//             className="bg-white/90 text-[#1e1e1e] font-semibold text-lg py-3 px-6 rounded-lg transition-all shadow-md"
//           >
//             Jobseekers
//           </motion.a>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative section-dark">
      {/* Background Image */}
      <Image
        src="/assets/gap-bg.webp"
        alt="Hero Background"
        fill
        priority
        className="absolute inset-0 z-5"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/90 z-10"></div>
      {/* Content */}

      <div className="container hero-container relative z-30 mt-16">
        <div className="flex flex-col gap-4 max-w-2xl text-center lg:text-left">
          <h1 className="page-header ">
            <span className="text-[#51D4D6]">Payroll, Recruitment, </span> and
            Staff <span className="text-[#51D4D6]">Outsourcing</span> Solutions
          </h1>
          <p className="page-subheader">
            Streamline Your Hiring Process, Simplify Payroll, and Scale Your
            Workforce with Our Expert Services.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="flex items-center gap-2 gap-button gap-button-primary"
            >
              Recruit. Outsource. Pay <ArrowRight size={20} />
            </a>
            <a href="/job-seekers" className="gap-button gap-button-light">
              Jobseekers
            </a>
          </div>
        </div>
        <div className="w-full max-w-md lg:max-w-lg ">
          <Image
            src="/assets/outsourcing-staff-for-efficiency-and-speed.svg"
            alt="outsourcing-staff-for-efficiency-and-speed"
            width={400}
            height={300}
            priority
            sizes="(max-width: 600px) 100%, (max-width: 1200px) 500px, 33vw"
            className="mx-auto w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

/**
 *
 */
