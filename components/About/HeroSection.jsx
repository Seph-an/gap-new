import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="section-dark ">
      <div className="container hero-container mt-20 xl:mt-24">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="page-header">
            About <span className="text-[#51D4D6]">Gap Recruitment</span>{" "}
            Services Limited
          </h1>
          <p className="page-subheader">
            We specialize in empowering{" "}
            <span className="text-[#51D4D6]">talent acquisition</span> and{" "}
            <span className="text-[#51D4D6]">business success</span> to drive
            growth and innovation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#core-values"
              className="inline-flex items-center bg-[#51D4D6] text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              More about us <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
        <div className="w-full max-w-md lg:max-w-lg ">
          <Image
            src="/assets/about-gap-recrutiment-and-payroll-management-services-in-kenya-get-best-talent.svg"
            alt="about-gap-recrutiment-and-payroll-management-services-in-kenya"
            width={400}
            height={300}
            sizes="(max-width: 600px) 100%, (max-width: 1200px) 500px, 33vw"
            className="mx-auto w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
