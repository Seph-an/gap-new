"use client";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

const values = [
  {
    title: "Integrity",
    description:
      "We embrace and uphold the highest standards of personal and professional ethics, honesty and trust.",
  },
  {
    title: "Respect",
    description:
      "We treat each other, our clients and candidates with mutual respect and sensitivity.",
  },
  {
    title: "Collaboration",
    description:
      "We work as a team and share knowledge for continuous improvement, learning and innovation.",
  },
  {
    title: "Communication",
    description:
      "We believe in keeping open communication throughout our process, ensuring our clients and candidates are well updated at all times.",
  },
  {
    title: "Responsibility",
    description:
      "We are responsible to fulfill our commitments to clients with a clear understanding of the urgency and accountability inherent in those commitments.",
  },
  {
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, continuously improving our services and delivering outstanding results for our clients and candidates.",
  },
];

const CoreValuesSection = () => {
  return (
    <section
      id="core-values"
      className="w-screen py-16 px-6 md:px-12 lg:px-20  bg-gray-900 text-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Our Core Values
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.15 + 0.2,
              }}
              className="bg-[#1e1e1e] p-6 rounded-lg gap-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle size={24} className="text-[#51D4D6]" />
                <h3 className="text-xl font-semibold">{value.title}</h3>
              </div>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="w-full flex flex-col items-center mt-12 gap-8">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="gap-subtitle max-w-3xl text-center"
          >
            Connect with us to power your business with expert{" "}
            <span className="text-[#51D4D6]">
              talent acquisition, payrol management
            </span>{" "}
            and <span className="text-[#51D4D6]">staff outsourcing</span> to
            streamline operations, and unlock growth.
          </motion.p>

          <motion.a
            href="/contact-us"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="gap-button gap-button-primary"
          >
            Work with us <ArrowRight size={20} className="ml-2" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
