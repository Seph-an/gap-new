"use client";

import BlogCTA from "./BlogCTA";
import Ad from "./Ad";
import Filter from "./Filter";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import { motion } from "framer-motion";

const BlogHome = ({ filter, page, blogPosts, pagination, categories }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Gap Recruitment Services Blog",
    url: "https://gaprecruitment.co.ke/blog",
    description:
      "Insights on hiring, payroll, and HR in Kenya from Gap Recruitment.",
    image:
      "https://gaprecruitment.co.ke/assets/blog-page-about-jobs-in-kenya-jobs-in-nairobi-recruitment-payroll-services-and-workforce-outsourcing.svg",
    publisher: {
      "@type": "Organization",
      name: "Gap Recruitment",
      logo: {
        "@type": "ImageObject",
        url: "https://gaprecruitment.co.ke/logo.png",
      },
    },
    datePublished: "2021-05-01",
    dateModified: "2025-05-01",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://gaprecruitment.co.ke/blog/${post.slug}`,
      datePublished: post.createdAt,
      dateModified: post.updatedAt,
      description: post.description || "",
      image:
        post.image ||
        "https://gaprecruitment.co.ke/assets/blog-page-about-jobs-in-kenya-jobs-in-nairobi-recruitment-payroll-services-and-workforce-outsourcing.svg",
      author: {
        "@type": "Organization",
        name: "Gap Recruitment",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://gaprecruitment.co.ke/blog/${post.slug}`,
      },
    })),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animation for child elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="w-screen min-h-screen mt-8">
        {/* Header */}
        <motion.header
          className="px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-transparent via-gray-900 to-[#0a0a0a] pt-16 md:pt-24 xl:pt-28 pb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="max-w-6xl mx-auto flex flex-col items-center gap-4 md:gap-8"
          >
            <h2 className="font-bold text-lg text-[#51D4D6]">Our Blog</h2>
            <h1 className="max-w-4xl text-center text-gray-300 text-lg font-semibold md:text-xl xl:text-3xl">
              Stay <span className="text-[#51D4D6]">in the loop</span> with
              <br />
              the latest insights about recruitment, payroll management, job
              opportunities and many more.
            </h1>
          </motion.div>
        </motion.header>

        {/* Main Content */}
        <motion.div
          className="px-4 sm:px-6 md:px-12 lg:px-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Filter Section */}
          <motion.div variants={itemVariants} className="w-full my-8 lg:my-5">
            <h2 className="font-bold text-xl text-white/90">Articles</h2>
            <Filter filter={filter} categories={categories} />
          </motion.div>

          <div className="flex flex-col md:flex-row gap-10 overflow-hidden">
            {/* Posts List */}
            <motion.div
              className="w-full max-w-[700px]"
              variants={containerVariants}
            >
              <motion.div
                className="blog-lists flex flex-col gap-5"
                variants={containerVariants}
              >
                {!blogPosts || blogPosts.length === 0 ? (
                  <motion.div
                    variants={itemVariants}
                    className="text-red-500 text-center my-16"
                  >
                    Oops! No matching posts available
                  </motion.div>
                ) : (
                  blogPosts.map((post) => (
                    <motion.div
                      key={post.slug}
                      variants={itemVariants}
                      className="bg-[#1e1e1e] p-4 rounded-lg shadow-md"
                    >
                      <BlogPost post={post} filter={filter} page={page} />
                    </motion.div>
                  ))
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Pagination pagination={pagination} filter={filter} />
              </motion.div>
            </motion.div>

            {/* Sidebar Ad */}
            <motion.div variants={itemVariants}>
              <Ad pagination={pagination} />
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <BlogCTA pagination={pagination} />
        </motion.div>
      </section>
    </>
  );
};

export default BlogHome;
