import Hero from "../components/Home/Hero";
import Why from "../components/Home/Why";
import Services from "../components/Home/Services";
import FeaturedBlogs from "../components/Blog/Featured/FeaturedBlogs";

export default function Home() {
  return (
    <div>
      <Hero />
      <Why />
      <Services />
      <FeaturedBlogs />
    </div>
  );
}
