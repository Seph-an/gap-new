import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="section-dark ">
      <div className="container hero-container mt-20 xl:mt-24">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="page-header">
            Find the <span className="text-[#51D4D6]">Best Talent</span> for
            Your Business
          </h1>
          <p className="page-subheader">
            Our expert{" "}
            <span className="text-[#51D4D6]">recruitment services</span> help
            you connect with top professionals efficiently and seamlessly.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#types-of-recruitment"
              className="inline-flex items-center bg-[#51D4D6] text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Find the Best Talent <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
        <div className="w-full max-w-md lg:max-w-lg ">
          <Image
            src="/assets/hire-best-talent-with-our-expert-recruitment-services-in-nairobi.svg"
            alt="hire-best-talent-with-our-expert-recruitment-services-in-nairobi"
            width={400}
            height={300}
            sizes="(max-width: 600px) 100%, (max-width: 1200px) 500px, 33vw"
            className="mx-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
// <a href="https://storyset.com/business">Business illustrations by Storyset</a>
