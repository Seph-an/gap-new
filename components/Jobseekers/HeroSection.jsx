import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="section-dark">
      <div className="container hero-container mt-20">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="page-header">Elevate Your Career Today!</h1>
          <p className="page-subheader">
            Professional{" "}
            <span className="text-[#51D4D6]">
              CV Writing, LinkedIn Optimization,
            </span>{" "}
            & <span className="text-[#51D4D6]">Interview Coaching + </span>
            to help you land your dream job faster.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#"
              className="inline-flex items-center bg-[#51D4D6] text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Boost your job search <ArrowRight size={20} className="ml-2" />
            </a>
            <a className="bg-gray-200 text-[#0a0a0a] px-6 py-3 rounded-lg hover:opacity-90 transition">
              Listed jobs
            </a>
          </div>
        </div>
        <div className="w-full max-w-md lg:max-w-lg ">
          <Image
            src="/assets/find-a-job-with-expert-cv-writing-linkedin-optimization-and-interview-preparation-services-in-kenya.svg"
            alt="find-a-job-with-expert-cv-writing-linkedin-optimization-and-interview-preparation-services-in-kenya"
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
