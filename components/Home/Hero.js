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
	sizes="100vw"
        priority
        className="absolute inset-0 z-5"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/90 z-10"></div>
      {/* Content */}

      <div className="container hero-container relative z-30 mt-16">
        <motion.div
          className="flex flex-col gap-4 max-w-2xl text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="page-header"
          >
            <motion.span
              className="text-[#51D4D6] inline-block"
              animate={{ opacity: [1, 0.85, 0.6, 0.85, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
            >
              Recruitment,
            </motion.span>{" "}
            Staff{" "}
            <motion.span
              className="text-[#51D4D6] inline-block"
              animate={{ opacity: [1, 0.85, 0.6, 0.85, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            >
              Outsourcing,
            </motion.span>{" "}
            and{" "}
            <motion.span
              className="text-[#51D4D6] inline-block"
              animate={{ opacity: [1, 0.85, 0.6, 0.85, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 8,
              }}
            >
              Payroll
            </motion.span>{" "}
            Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-white font-medium"
          >
            Streamline Your Hiring Process, Simplify Payroll, and Scale Your
            Workforce with Our Expert Services.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
          >
            <motion.a
              href="#services"
              className="flex items-center gap-2 gap-button gap-button-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 0.8 }}
            >
              Recruit. Outsource. Pay <ArrowRight size={20} />
            </motion.a>

            <motion.a
              href="/job-seekers"
              className="gap-button gap-button-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut", delay: 1 }}
            >
              Jobseekers
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 1.2 }}
          className="w-full max-w-md lg:max-w-lg"
        >
          <Image
            src="/assets/outsourcing-staff-for-efficiency-and-speed.svg"
            alt="outsourcing-staff-for-efficiency-and-speed"
            width={400}
            height={300}
            priority
            sizes="(max-width: 600px) 100%, (max-width: 1200px) 500px, 33vw"
            className="mx-auto w-full"
          />
        </motion.div>

        {/* <div className="flex flex-col gap-4 max-w-2xl text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="page-header"
          >
            <motion.span
              className="text-[#51D4D6] inline-block"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
            >
              Payroll,
            </motion.span>{" "}
            <motion.span
              className="text-[#51D4D6] inline-block"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5, // starts when Payroll ends
              }}
            >
              Recruitment,
            </motion.span>{" "}
            and Staff{" "}
            <motion.span
              className="text-[#51D4D6] inline-block"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3, // starts after Recruitment
              }}
            >

              Outsourcing
            </motion.span>{" "}
            Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="page-subheader"
          >
            Streamline Your Hiring Process, Simplify Payroll, and Scale Your
            Workforce with Our Expert Services.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            <motion.a
              href="#services"
              className="flex items-center gap-2 gap-button gap-button-primary"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              Recruit. Outsource. Pay <ArrowRight size={20} />
            </motion.a>

            <motion.a
              href="/job-seekers"
              className="gap-button gap-button-light"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            >
              Jobseekers
            </motion.a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="w-full max-w-md lg:max-w-lg"
        >
          <Image
            src="/assets/outsourcing-staff-for-efficiency-and-speed.svg"
            alt="outsourcing-staff-for-efficiency-and-speed"
            width={400}
            height={300}
            priority
            sizes="(max-width: 600px) 100%, (max-width: 1200px) 500px, 33vw"
            className="mx-auto w-full"
          />
        </motion.div> */}
      </div>
    </section>
  );
};

export default HeroSection;

{
  /* <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="page-header"
        >
          <span className="text-[#51D4D6]">Payroll, Recruitment, </span> and
          Staff <span className="text-[#51D4D6]">Outsourcing</span> Solutions
        </motion.h1> */
}
