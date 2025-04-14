import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BlogCTA = ({ pagination }) => {
  const { pageCount } = pagination;
  return (
    <section className="w-screen">
      <div
        className={`${
          pageCount < 2 && "mt-0 md:mt-5 lg:mt-20"
        } pt-5 pb-8 w-screen bg-gradient-to-b from-transparent via-gray-900 to-[#0a0a0a]`}
      >
        <div className="container flex flex-col items-center gap-6 pb-8">
          <h2 className="font-bold text-base text-[#51D4D6]">Jobseekers</h2>
          <h1 className="text-white/90 max-w-[600px] text-center text-xl font-semibold md:text-3xl xl:text-4xl">
            Advance your career with{" "}
            <span className="text-[#51D4D6]">expertise</span>
          </h1>
          <span className="text-gray-300 px-[16px] max-w-3xl text-center text-base">
            Find out why our{" "}
            <span className="text-[#51D4D6]">
              CV writing, interview preparation,
            </span>{" "}
            and <span className="text-[#51D4D6]">LinkedIn optimization</span>{" "}
            services are trusted and impactful to various professionals from
            every corner.
          </span>
          <Link
            href="/frequently-asked-questions"
            className="gap-button gap-button-primary"
          >
            Start now
            <ArrowRight
              color="#0a0a0a"
              size={20}
              strokeWidth={2}
              className="ml-2"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCTA;
