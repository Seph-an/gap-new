import React from "react";
import { CheckCircle } from "lucide-react";

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
        <h2 className="text-3xl  font-bold mb-8 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-[#1e1e1e] p-6 rounded-lg shadow-md hover:shadow-[0_0_15px_5px_#51D4D6] transition-shadow duration-500"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle size={24} className="text-[#51D4D6]" />
                <h3 className="text-xl font-semibold">{value.title}</h3>
              </div>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
