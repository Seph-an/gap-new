import ArticlePage from "@/components/Blog/Article/ArticlePage";

const page = async ({ params }) => {
  const parameters = await params;
  console.log("The params in the article page:", parameters);
  return <ArticlePage slug={parameters.slug} />;
};

export default page;
