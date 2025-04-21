import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
const GapAd = ({ pagination }) => {
  const { pageCount } = pagination;
  return (
    <div
      className={`${
        pageCount < 2 && "pb-0 md:pb-20 mt-12 md:mt-0"
      } grow flex flex-col gap-16 md:gap-12  min-w-[300px] pt-5`}
    >
      <Image
        priority
        src="/assets/blog-page-about-jobs-in-kenya-jobs-in-nairobi-recruitment-payroll-services-and-workforce-outsourcing.svg"
        alt="blog-page-about-jobs-in-kenya-jobs-in-nairobi-recruitment-payroll-services-and-workforce-outsourcing"
        width={300}
        height={200}
        className="w-full h-auto order-2 md:order-1 "
      />
      <div className=" order-1 md:order-2 bg-[#1e1e1e] rounded-lg shadow-sm flex flex-col gap-3  justify-center px-5 py-6">
        <h3 className="pl-2 border-l-2 border-[#51D4D6] font-semibold text-lg text-white/90">
          Elevate your business
        </h3>
        <h2 className="font-regular text-base mt-2 mb-3 opacity-90">
          Explore our{" "}
          <span className="text-[#51D4D6] opacity-100 font-bold">
            recruitment, payroll,
          </span>{" "}
          and{" "}
          <span className="text-[#51D4D6] opacity-100 font-bold">
            staff outsouring
          </span>{" "}
          solutions where we help you{" "}
          <span className="text-[#51D4D6] opacity-100 font-bold">
            streamline
          </span>{" "}
          your business in today's work landscape!
        </h2>
        <Link
          href="/home#services"
          className="w-fit gap-button gap-button-primary"
        >
          Explore solutions
          <ArrowRight
            color="#0a0a0a"
            size={20}
            strokeWidth={2}
            className="ml-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default GapAd;
