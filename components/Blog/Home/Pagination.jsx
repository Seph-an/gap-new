///components/Blog/Home/Pagination.jsx
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination, filter }) => {
  const { page, pageCount } = pagination;
  if (pageCount <= 1) return null;

  const makeHref = (pageNumber) => {
    const basePath =
      filter === "all"
        ? "/blog"
        : `/blog/category/${encodeURIComponent(filter)}`;

    return pageNumber === 1 ? basePath : `${basePath}/${pageNumber}`;
  };

  return (
    <div className="my-6 md:my-12 lg:my-16 flex gap-3">
      {page > 1 && (
        <Link
          href={makeHref(page - 1)}
          className="w-8 h-8 grid place-content-center rounded-[0.325rem] bg-[#51D4D6] shadow-sm"
        >
          <ChevronLeft size={20} strokeWidth={2} className="text-[#0a0a0a]" />
        </Link>
      )}

      {Array.from({ length: pageCount }, (_, i) => (
        <Link
          key={i}
          href={makeHref(i + 1)}
          className={`w-8 h-8 grid place-content-center rounded-[0.325rem] ${
            i + 1 === page ? "bg-[#51D4D6]" : "bg-gray-300 shadow-sm"
          } text-[#0a0a0a] text-base`}
        >
          {i + 1}
        </Link>
      ))}

      {page < pageCount && (
        <Link
          href={makeHref(page + 1)}
          className="w-8 h-8 grid place-content-center rounded-[0.325rem] bg-[#51D4D6] shadow-sm"
        >
          <ChevronRight size={20} strokeWidth={2} className="text-[#0a0a0a]" />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
