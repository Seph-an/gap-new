import Link from "next/link";
import BlogCards from "./BlogCards";
import { ArrowRight } from "lucide-react";

const FeaturedBlogs = () => {
  return (
    <section
      id="blog"
      className="w-screen min-h-screen bg-gray-900 flex flex-col items-center"
    >
      <div className="container py-16 flex flex-col items-center">
        {/* Title */}
        <h2 className="gap-title">Discover Insights From Our Blog</h2>

        {/* Subtitle */}
        <p className="mt-8 gap-subtitle max-w-5xl">
          A few stories, ideas, developments and updates in the world of{" "}
          <span className="text-[#51D4D6]">recruitment, jobs,</span> and{" "}
          <span className="text-[#51D4D6]">career placements</span> that we
          think you'll actually enjoy.
        </p>

        {/* Blog Cards */}
        <BlogCards />

        {/* Second Subtitle */}
        <p className="mt-5 gap-subtitle max-w-5xl">
          We are constantly updating our blog with{" "}
          <span className="text-[#51D4D6]">new content,</span> so be sure to
          check back often for the latest insights and trends in the industry.
        </p>

        {/* Call to Action */}
        <div className="mt-5">
          <Link href="/blog" className="gap-button gap-button-primary">
            <span> Visit Blog</span>
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

export default FeaturedBlogs;
