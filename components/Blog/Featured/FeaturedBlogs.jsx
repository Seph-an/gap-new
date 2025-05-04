"use client";

import Link from "next/link";
import BlogCards from "./BlogCards";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FeaturedBlogs = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="blog"
      className="w-screen min-h-screen bg-gray-900 flex flex-col items-center"
    >
      <motion.div
        className="container py-16 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Title */}
        <motion.h2 variants={itemVariants} className="gap-title">
          Discover Insights From Our Blog
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-8 gap-subtitle max-w-5xl"
        >
          A few stories, ideas, developments and updates in the world of{" "}
          <span className="text-[#51D4D6]">recruitment, jobs,</span> and{" "}
          <span className="text-[#51D4D6]">career placements</span> that we
          think you'll actually enjoy.
        </motion.p>

        {/* Blog Cards */}
        <BlogCards />

        {/* Second Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-5 gap-subtitle max-w-5xl"
        >
          We are constantly updating our blog with{" "}
          <span className="text-[#51D4D6]">new content,</span> so be sure to
          check back often for the latest insights and trends in the industry.
        </motion.p>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="mt-5">
          <Link href="/blog" className="gap-button gap-button-primary">
            <span> Visit Blog</span>
            <ArrowRight
              color="#0a0a0a"
              size={20}
              strokeWidth={2}
              className="ml-2"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedBlogs;
