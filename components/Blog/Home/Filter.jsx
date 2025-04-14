// filter buttons
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriess } from "@/utils/fetchBlogs";

const Filter = ({ filter }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriess,
    staleTime: 5 * 60 * 1000,
  });

  // console.log("data is:", data);
  const categories = data?.data?.data;
  console.log("categories is:", categories);

  if (isLoading)
    return <div className="text-[#51D4D6]">Loading categories...</div>;

  return (
    <div className="flex gap-2 mt-5 mb-12 ">
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#51D4D6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span className="font-medium secondary">Filter:</span>
      </div>
      <div className="flex gap-2 flex-wrap ">
        <Link
          href={"/blog"}
          className={`rounded-[0.325rem] ${
            !filter ? "bg-[#51D4D6] " : "bg-white/90 shadow-sm"
          } text-[#1e1e1e] text-sm px-3 py-1`}
        >
          All
        </Link>

        {categories?.map((category, index) => (
          <Link
            href={`/blog?filter=${category.Title}`}
            key={index}
            className={`rounded-[0.325rem]  ${
              category.Title === filter
                ? "bg-[#51D4D6]"
                : "bg-white/90 shadow-sm"
            } text-[#0a0a0a] text-sm px-3 py-1`}
          >
            {category.Filter}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Filter;
