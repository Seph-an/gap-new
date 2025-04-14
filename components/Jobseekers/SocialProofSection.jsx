// components/SocialProofSection.jsx
import React from "react";
import { ArrowRight } from "lucide-react";

const SocialProofSection = () => {
  const stats = [
    { id: 1, value: "300", label: "Winning CVs Written" },
    { id: 2, value: "100", label: "Interview Preparation Sessions" },
    { id: 3, value: "80", label: "LinkedIn Profiles Optimised" },
    { id: 4, value: "50", label: "New Jobs Placed Weekly" },
  ];

  return (
    <section className="py-12 w-screen px-6 md:px-12 lg:px-20  bg-[#1e1e1e]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Our Success Stories</h2>
        <p className="text-lg text-gray-400 mb-8">
          We are proud of{" "}
          <span className="text-[#51D4D6]">our track record</span> and the
          positive impact on our jobseekers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#0a0a0a] p-6 rounded-lg gap-shadow"
            >
              <h3 className="text-3xl font-bold text-white/90 mb-2">
                {stat.value} +
              </h3>
              <p className="text-[#51D4D6]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
