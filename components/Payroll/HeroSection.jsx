import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="section-dark">
      <div className="container hero-container">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="page-header">
            Streamline Your{" "}
            <span className="text-[#51D4D6]">Payroll Process</span> For Business
            Growth
          </h1>
          <p className="page-subheader">
            Experience{" "}
            <span className="text-[#51D4D6]">seamless, secure, </span>and
            <span className="text-[#51D4D6]"> scalable </span>payroll solutions
            tailored for your business needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#payroll-services"
              className="inline-flex items-center bg-[#51D4D6] text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Get Payroll Solutions <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
        <div className="w-full max-w-md lg:max-w-lg ">
          <Image
            src="/assets/payroll-management-solutions-for-successfull-businesses.svg"
            alt="payroll-management-solutions-for-successfull-businesses"
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
}
// <a href="https://storyset.com/business">Business illustrations by Storyset</a>
