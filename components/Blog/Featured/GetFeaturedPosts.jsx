const getFeaturedPosts = (data) => {
  // Filter posts with `isFeatured: true`
  const featuredPosts = data?.filter((post) => post.isFeatured);

  //If more than 3 featured posts, sort by `updatedAt` (most recent first) and get the top 3
  if (featuredPosts?.length > 3) {
    return featuredPosts
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort descending (newest first)
      .slice(0, 3); // Take the first 3
  }

  //If 3 or fewer, return them as they are
  return featuredPosts;
};

export default getFeaturedPosts;
//   console.log(getFeaturedPosts(data));
