"use client";
import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "How do we begin our partnership?",
    answer:
      "Contact us through our website or phone. Our team will set up an initial consultation to understand your needs.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We cater to a broad range of industries including tech, healthcare, finance, and more.",
  },
  {
    question: "How does our recruitment process work?",
    answer:
      "We start with a thorough consultation, then source and screen candidates, followed by interviews and final placement.",
  },
  {
    question: "Can you help with payroll and outsourcing?",
    answer:
      "Absolutely! Our solutions are designed to streamline recruitment, payroll processing, and outsourcing operations.",
  },
  {
    question:
      "What is the difference between direct hiring and outsourced recruitment?",
    answer:
      "Direct hiring involves adding permanent employees to your team, while outsourced recruitment lets you leverage external professionals without long-term commitments.",
  },

  // Payroll FAQs
  {
    question: "What payroll services do you offer?",
    answer:
      "We handle salary processing, tax deductions, benefits administration, compliance reporting, and direct deposits, ensuring smooth payroll management.",
  },
  {
    question: "How do you ensure payroll compliance with labor laws?",
    answer:
      "We stay updated on labor regulations to ensure timely and accurate payroll processing while complying with tax laws and employee benefits requirements.",
  },
  {
    question: "Can you manage payroll for international employees?",
    answer:
      "Yes! We provide payroll solutions for both local and international employees, ensuring compliance with global labor laws and tax regulations.",
  },

  // Staff Outsourcing FAQs
  {
    question: "What is staff outsourcing and how does it work?",
    answer:
      "Staff outsourcing is the process of hiring external professionals to handle specific business functions. We manage contracts, payroll, and compliance while you focus on growth.",
  },
  {
    question: "What are the benefits of outsourcing staff?",
    answer:
      "Outsourcing reduces recruitment costs, provides access to specialized talent, increases efficiency, and allows businesses to scale without administrative burdens.",
  },
  {
    question: "How can I get started with your outsourcing services?",
    answer:
      "Simply reach out via our website or phone. We’ll analyze your business needs and provide a tailored outsourcing solution to match your goals.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className=" w-screen px-6 md:px-12 lg:px-20  ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold  mb-12 text-center text-white/90">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#1e1e1e] p-4 rounded-lg gap-shadow">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div className="mt-3 text-gray-400">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full mx-auto flex flex-col items-center">
          <p className="text-lg text-gray-300 text-center max-w-5xl mx-auto mt-16">
            Still have questions? 🤔 We’re here to help! and we’d love to hear
            from you. Let’s make your hiring process{" "}
            <span className="text-[#51D4D6]">seamless</span> and{" "}
            <span className="text-[#51D4D6]">efficient!</span>
          </p>
          <a href="/contact-us" className="gap-button gap-button-primary my-8">
            Schedule a free consultation{" "}
            <ArrowRight color="#0a0a0a" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
