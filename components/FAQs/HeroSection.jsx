import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="section-dark mt-16">
      <div className="container hero-container">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="page-header">What Would You Like To Know?</h1>
          <p className="page-subheader">
            Find answers to common questions about our{" "}
            <span className="text-[#51D4D6]">payroll, recruitment,</span> and
            <span className="text-[#51D4D6]"> staff outsourcing </span>{" "}
            services.
          </p>
        </div>
        <div className="w-full max-w-md lg:max-w-lg ">
          <Image
            src="/assets/frequently-asked-questions-about-recruitment-payroll-staff-outsourcing-solutions-in-nairobi-kenya.svg"
            alt="frequently-asked-questions-about-recruitment-payroll-staff-outsourcing-solutions-in-nairobi-kenya"
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
//
