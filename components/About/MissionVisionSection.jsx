// import React from "react";

// const MissionVisionSection = () => {
//   return (
//     <section id="mission-vision" className="py-20 px-4 bg-[#1e1e1e] ">
//       <div className="container mx-auto">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="gap-title">Our Mission & Vision</h2>
//           <p className="gap-subtitle">
//             Guiding principles that define our purpose and future aspirations.
//           </p>
//         </div>
//         <div className="grid md:grid-cols-2 gap-8 mt-12">
//           {[
//             {
//               title: "Mission",
//               text: "To help businesses find and hire top talents, resulting in mutually beneficial partnerships and success for all parties involved.",
//             },
//             {
//               title: "Vision",
//               text: "To be the trusted partner that helps companies grow and succeed through our talent acquisition services.",
//             },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-[#0a0a0a] p-6 lg:p-8 rounded-lg gap-shadow"
//             >
//               <h3 className="text-2xl font-semibold mb-3 text-white/90">
//                 {item.title}
//               </h3>
//               <p className="text-lg text-gray-300">{item.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MissionVisionSection;

"use client";

import { motion } from "framer-motion";
import React from "react";

const MissionVisionSection = () => {
  return (
    <section id="mission-vision" className="py-20 px-4 bg-[#1e1e1e]">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="gap-title"
          >
            Our Mission & Vision
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="gap-subtitle"
          >
            The principles behind how Gap Recruitment Services Kenya supports
            employers, job seekers, and growing teams.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[
            {
              title: "Mission",
              text: "To connect employers in Kenya with skilled, reliable professionals through a recruitment process built on integrity, transparency, and practical market knowledge.",
            },
            {
              title: "Vision",
              text: "To be among the most trusted recruitment agencies in Kenya, known for helping businesses hire confidently and helping candidates access meaningful career opportunities.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2 + 0.4, // staggers between cards
              }}
              className="bg-[#0a0a0a] p-6 lg:p-8 rounded-lg gap-shadow"
            >
              <h3 className="text-2xl font-semibold mb-3 text-white/90">
                {item.title}
              </h3>
              <p className="text-lg text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-14 bg-[#0a0a0a] p-6 lg:p-8 rounded-lg gap-shadow"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-semibold text-white/90 mb-4">
              Recruitment Support Built for Kenya
            </h3>
            <p className="text-lg text-gray-300">
              Companies comparing recruitment agencies in Kenya need more than
              CV forwarding. Gap Recruitment Services helps employers evaluate
              talent, manage hiring needs, and access workforce solutions while
              giving job seekers a clearer path to verified vacancies and
              career opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "For Employers",
                text: "We support businesses that need qualified candidates, dependable recruitment services, and hiring guidance grounded in the Kenyan market.",
              },
              {
                title: "For Job Seekers",
                text: "We connect candidates with verified vacancies, practical career support, and opportunities that match real employer needs.",
              },
              {
                title: "For Growing Teams",
                text: "We bring recruitment, payroll management, and staff outsourcing together so organizations can build and manage teams with confidence.",
              },
            ].map((item, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-5">
                <h4 className="text-xl font-semibold text-white/90 mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
