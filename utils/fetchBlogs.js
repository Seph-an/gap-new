import axios from "axios";

export const fetchBlogs = async ({ filter, page }) => {
  const { data } = await axios.get("/api/blogs", {
    params: { filter, page },
  });
  console.log("The page for fetch:", page);
  console.log("The fetched blogs in fetchbog are:", data?.data?.data);
  console.log("Meta details:", data?.data?.meta);
  console.log("Meta details two:", data?.data?.meta?.pagination);
  console.log("The fetched blogs categories:", data?.data?.data[0]?.categories);

  return data;
};

export const fetchCategoriess = async () => {
  const { data } = await axios.get("/api/fetchCategories");
  return data;
};
