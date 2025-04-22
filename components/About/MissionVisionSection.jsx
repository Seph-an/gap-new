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
            Guiding principles that define our purpose and future aspirations.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[
            {
              title: "Mission",
              text: "To help businesses find and hire top talents, resulting in mutually beneficial partnerships and success for all parties involved.",
            },
            {
              title: "Vision",
              text: "To be the trusted partner that helps companies grow and succeed through our talent acquisition services.",
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
      </div>
    </section>
  );
};

export default MissionVisionSection;
