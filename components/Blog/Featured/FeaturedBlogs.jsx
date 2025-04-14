"use client";

import Link from "next/link";
import BlogCards from "./BlogCards";
import { ArrowRight } from "lucide-react";

const FeaturedBlogs = () => {
  return (
    <section
      id="blog"
      className="w-screen min-h-screen bg-gray-900 flex flex-col items-center "
    >
      <div className="container py-16 flex flex-col items-center">
        <h2 className="gap-title">Discover Insights From Our Blog</h2>
        <p className="mt-8 gap-subtitle max-w-5xl">
          A few stories, ideas, developments and updates in the world of{" "}
          <span className="text-[#51D4D6]">recruitment, jobs,</span> and{" "}
          <span className="text-[#51D4D6]">career placements</span> that we
          think you'll actually enjoy.
        </p>
        <BlogCards />
        <p className="text-center gap-subtitle">
          <span className="text-[#51D4D6] ">💡 Want more? </span>
          Discover more expert insights - click{" "}
          <span className="text-[#51D4D6] font-semibold">"Visit Blog"</span> to
          stay ahead.
        </p>
        <Link href="/blog" className="gap-button gap-button-primary mt-8">
          <span> Visit Blog</span>
          <ArrowRight color="#0a0a0a" size={20} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
